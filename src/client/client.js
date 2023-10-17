import {delay, headersToObject, getUrlParamsFromString} from '../utils/utils.js'

// TODO check and handle exceptions

export default class Client {
    url

    constructor(api_id, api_secret_key) {
        // TODO: Make this a param ? (for staging or localhost env's)
        this.url = 'https://api-bitrefill.com/v2'
        this.authorization = btoa(api_id + ':' + api_secret_key)
    }

    _prepare_headers() {
        const headers = {
            'accept': 'application/json',
            'Authorization': `Basic ${this.authorization}`,
            'X-Requested-With': 'Bitrefill V2 API client'
        }
        return headers
    }

    async request(method, endpoint, params=null) {
        const headers = this._prepare_headers()
        let response
        if (method.toLowerCase() == 'get') {
            response = await fetch(`${this.url}/${endpoint}?` + new URLSearchParams({
                ...params
            }), {
                method,
                headers
            })
        } else if (method.toLowerCase() == 'post') {
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
            return response
        } else {
            return response
        }
        
    }

    // --- API METHODS ---
    async ping() {
        const res = await this.request('GET', 'ping')
        const data = await res.json()
        return data
    }

    async balance() {
        const res = await this.request('GET', 'accounts/balance')
        const data = await res.json()
        return data
    }

    async products(start=0, limit=50, include_test_products=false) {
        // Support for options parameters
        if (typeof start == 'object') {
            const options = start
            start = options.start || 0
            limit = options.limit || 50
            include_test_products = options.include_test_products || false
        }

        const res = await this.request('GET', 'products', {
            start,
            limit,
            include_test_products
        })
        const data = await res.json()
        return data
    }

    async productsAll(include_test_products=false) {
        let products = {
            // TODO: Should provide synth meta data for batched request ?
            "meta": {"_endpoint": "/products", "include_test_products": `${include_test_products}`,},
            "data": [ ]
        }

        var res = await this.request('GET', 'products', {include_test_products})
        var data = await res.json()
        products.data = data.data

        let next = data.meta._next

        while (next) {
            let params = getUrlParamsFromString(next)
            res = await this.request('GET', 'products', {
                ...params,
                include_test_products
            })
            var data
            if(res.ok) {
                data = await res.json()
            } else {
                // TODO: this is only in because we could be hitting cloudflare rate limits
                console.log('Hitting unexpected rate limit ... waiting 10s')
                await delay(10 * 1000)
                continue
            }
            products.data = products.data.concat(data.data)
            next = data.meta._next
        }

        return products
    }

    // TODO eval all params...
    async createInvoice(product_id, value, quantity, auto_pay=false, payment_method="balance", webhook_url=null) {
        // Support for options parameters
        if (typeof product_id == 'object') {
            const options = product_id
            product_id = options.product_id
            value = options.value
            quantity = options.quantity
            auto_pay = options.auto_pay || false
            payment_method = options.payment_method || 'balance'
            webhook_url = options.webhook_url
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
        
        const res = await this.request('POST', 'invoices', body)
        const data = await res.json()
        return data
    }

    async getInvoice(invoice_id) {
        const res = await this.request('GET', `invoices/${invoice_id}`)
        const data = await res.json()
        return data
    }

    async payInvoice(invoice_id) {
        const res = await this.request('POST', `invoices/${invoice_id}/pay`, { })
        const data = await res.json()
        return data
    }

    async getOrder(order_id) {
        const res = await this.request('GET', `orders/${order_id}`)
        const data = await res.json()
        return data
    }

    // A way to wait for payment completion without relying on the webhook service
    async waitForInvoicePayment(invoice_id, seconds_between_checks=10, max_attempts=undefined) {
        let invoice_data = await this.getInvoice(invoice_id)
        let attempts = 0
        // TODO: Which states do we want to wait on
        const statusWorthChecking = ['unpaid', 'processing', 'payment_confirmed']
        while (statusWorthChecking.includes(invoice_data['data']['payment']['status'])) {
            if (max_attempts > 0 && attempts >= max_attempts) {
                throw new Error(`Waiting for payment processing not final after ${max_attempts} attempts`)
            }
            attempts += 1

            console.log(`Payment not processed yet, waiting ${seconds_between_checks} seconds.`)
            // TODO: perhaps add max wait time option (see args)
            await delay(seconds_between_checks * 1000)
            invoice_data = await this.getInvoice(invoice_id)
        }

        return invoice_data
    }
}