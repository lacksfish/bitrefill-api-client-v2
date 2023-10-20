import { delay, headersToObject } from '../utils/utils.js'
import { handleAPIError } from './errorHandler.js'

import { APIResponse, CheckPhoneNumberOptions, CommissionsOptions, CreateInvoiceOptions, GetOrdersOptions, ProductsOptions } from '../types/types.js'
import { URLSearchParams } from 'url'

export default class Client {
    public url: string
    private authorization: string

    constructor(apiId: string, apiSecretKey: string, url: string = 'https://api-bitrefill.com/v2') {
        this.url = url
        this.authorization = btoa(apiId + ':' + apiSecretKey)
    }

    _prepareHeaders() {
        const headers = {
            'accept': 'application/json',
            'Authorization': `Basic ${this.authorization}`,
            'X-Requested-With': 'Bitrefill V2 API client'
        }
        return headers
    }

    async request(method: string, endpoint: string, params: Record<string, any> = null): Promise<APIResponse> {
        const headers = this._prepareHeaders()
        let response
        method = method.toUpperCase()
        if (method == 'GET') {
            response = await fetch(`${this.url}/${endpoint}?` + new URLSearchParams({
                ...params
            }), {
                method,
                headers
            })
        } else if (method == 'POST') {
            headers['Content-Type'] = 'application/json'
            response = await fetch(`${this.url}/${endpoint}`, {
                method,
                headers,
                body: JSON.stringify(params)
            })
        } else {
            throw new Error(`Unsupported method: ${method} (supported: GET and POST)`)
        }

        let responseHeaders = headersToObject(response.headers)

        // Handle rate limit with waiting
        if (responseHeaders['ratelimit-remaining'] == 0) {
            console.log(`Rate limit hit, waiting ${responseHeaders['ratelimit-reset']} seconds`)
            await delay(responseHeaders['ratelimit-reset'] * 1000)
        }

        return handleAPIError(endpoint, response)
    }

    // --- API METHODS ---
    async ping(): Promise<APIResponse> {
        const data = await this.request('GET', 'ping')
        return data
    }

    async getBalance(): Promise<APIResponse> {
        const data = await this.request('GET', 'accounts/balance')
        return data
    }

    async checkPhoneNumber(params: CheckPhoneNumberOptions): Promise<APIResponse> {
        const data = await this.request('GET', 'check_phone_number')
        return data
    }
    
    async getCommissions(params: CommissionsOptions): Promise<APIResponse> {
        const data = await this.request('GET', 'commissions')
        return data
    }

    async getProducts(start: ProductsOptions | number = 0, limit: number = 50, include_test_products: boolean = false): Promise<APIResponse> {
        // Support for options parameters
        if (typeof start == 'object') {
            const options = start
            start = options.start || 0
            limit = options.limit || 50
            include_test_products = options.include_test_products || false
        }

        const data = await this.request('GET', 'products', {
            start,
            limit,
            'include_test_products': include_test_products
        })
        return data
    }

    async getProductsAll(include_test_products: boolean = false): Promise<APIResponse> {
        let products = {
            // TODO: Should provide synth meta data for batched request ?
            "meta": { "_endpoint": "/products", "include_test_products": `${include_test_products}`, },
            "data": []
        }

        // NOTE: Too many simultaneous requests will get you temporarily banned on Cloudflare :(
        const increment = 50 // Max limit per request
        const batchSize = 10 // Good compromise value for now
        let count = 0
        let doRequests = true

        while (doRequests) {
            // Prepare parameters for batch requests
            const batch = [...Array(batchSize)].map((_, i) => {
                return {
                    start: (i * increment) + (count * batchSize * increment),
                    limit: increment
                }
            })

            // Fetch batch in parallel
            const batchRequests = batch.map(async (params) => {
                let res = await this.request('GET', 'products', {
                    ...params,
                    include_test_products
                })
                return res
            })

            try {
                let responses = await Promise.all(batchRequests)
                responses.map((response, idx) => {
                    // If last element in batch, check if more products are available
                    if (idx + 1 == batchSize && response.meta._next) {
                        doRequests = true
                        count += 1
                    } else {
                        doRequests = false
                    }

                    products.data = products.data.concat(response.data)
                })
            } catch (error) {
                console.error('Error in batch requests:', error)
                throw new Error(error)
            }
        }

        return products
    }

    createInvoice(product_id: CreateInvoiceOptions): Promise<APIResponse>
    createInvoice(product_id: string, value: number, quantity: number): Promise<APIResponse>
    createInvoice(product_id: string, value: number, quantity: number, auto_pay?: boolean, payment_method?: string, webhook_url?: string): Promise<APIResponse>
    async createInvoice(product_id: CreateInvoiceOptions | string, value?: number, quantity?: number, auto_pay: boolean = false, payment_method: string = "balance", webhook_url: string | null = null): Promise<APIResponse> {
        // Support for options parameters
        if (typeof product_id == 'object') {
            const options = product_id
            product_id = options.product_id
            value = options.value
            quantity = options.quantity
            auto_pay = options.auto_pay || false
            payment_method = options.payment_method || 'balance'
            webhook_url = options.webhook_url || null
        }
        let body = {
            "products": [
                {
                    "product_id": product_id,
                    "value": value,
                    "quantity": quantity
                }
            ],
            "auto_pay": auto_pay,
            "payment_method": payment_method // bitcoin
        }
        if (webhook_url) body['webhook_url'] = webhook_url

        const data = await this.request('POST', 'invoices', body)
        return data
    }

    async getInvoice(invoiceId: string): Promise<APIResponse> {
        const data = await this.request('GET', `invoices/${invoiceId}`)
        return data
    }

    async payInvoice(invoiceId: string): Promise<APIResponse> {
        const data = await this.request('POST', `invoices/${invoiceId}/pay`, {})
        return data
    }

    async getOrder(orderId: string): Promise<APIResponse> {
        const data = await this.request('GET', `orders/${orderId}`)
        return data
    }

    async getOrders(params: GetOrdersOptions): Promise<APIResponse> {
        const data = await this.request('GET', 'orders', params)
        return data
    }

    // A way to wait for payment completion without relying on the webhook service
    async waitForInvoicePayment(invoiceId: string, secondsBetweenChecks: number = 10, maxAttempts: null = null): Promise<APIResponse> {
        let invoiceData = await this.getInvoice(invoiceId)
        let attempts = 0
        // TODO: Which states do we want to wait on
        const statusWorthChecking = ['unpaid', 'processing', 'payment_confirmed']
        while (statusWorthChecking.includes(invoiceData['data']['payment']['status'])) {
            if (maxAttempts && maxAttempts > 0 && attempts >= maxAttempts) {
                throw new Error(`Waiting for payment processing not final after ${maxAttempts} attempts`)
            }
            attempts += 1

            console.log(`Payment not processed yet, waiting ${secondsBetweenChecks} seconds. (attempt ${attempts}${!!maxAttempts ? '/'+maxAttempts : ''})`)
            await delay(secondsBetweenChecks * 1000)
            invoiceData = await this.getInvoice(invoiceId)
        }

        return invoiceData
    }
}