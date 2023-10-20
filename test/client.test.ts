import fetch from 'jest-fetch-mock'
// Note: if fetch doesn't work, import fetch instead of fetch and replace all occurences of fetch with fetch

import Client from '../src/index'
import * as testing from './expected/data'

// Mock the fetch function
fetch.enableMocks()

describe('Client', () => {

    test('Ping request - Pong response', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        const expectedData = { meta: { _endpoint: '/ping' }, message: 'pong' }
        fetch.mockResponse(JSON.stringify(expectedData))

        const result = await client.ping()
        expect(result).toEqual(expectedData)
    })

    test('Balance request', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        const expectedData = {
            meta: { _endpoint: '/accounts/balance' },
            data: { balance: 10000000, currency: 'BTC' }
        }
        fetch.mockResponse(JSON.stringify(expectedData))

        const result = await client.getBalance()
        expect(result).toEqual(expectedData)
    })

    test('Products request - Args variant', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponse(JSON.stringify(testing.expectedDataProducts))

        const result = await client.getProducts(0, 50, false)
        expect(result).toEqual(testing.expectedDataProducts)
    })

    test('Products request - Options variant', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponse(JSON.stringify(testing.expectedDataProducts))

        const result = await client.getProducts({
            start: 0,
            limit: 50,
            include_test_products: false
        })
        expect(result).toEqual(testing.expectedDataProducts)
    })

    test('All products request', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponses(
            JSON.stringify(testing.expectedDataProductsAll_request1),
            JSON.stringify(testing.expectedDataProductsAll_request2),
            // The other 8 requests of a 10 request batch would be empty when using batched requests
            ...[...Array(8)].map((_, i) => JSON.stringify(testing.expectedDataProductsAll_request_further))
        )

        const result = await client.getProductsAll()
        expect(result).toEqual(testing.expectedDataProductsAll)
    })

    test('Create invoice request - Args variant', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponse(JSON.stringify(testing.expectedDataCreateInvoice))

        const result = await client.createInvoice(testing.expectedDataProducts.data[0].id, parseInt(testing.expectedDataProducts.data[0]['packages'][0]['value']), 1)
        expect(result).toEqual(testing.expectedDataCreateInvoice)
    })

    test('Create invoice request - Options variant', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponse(JSON.stringify(testing.expectedDataCreateInvoice))

        const result = await client.createInvoice({
            product_id: testing.expectedDataProducts.data[0].id,
            value: parseInt(testing.expectedDataProducts.data[0]['packages'][0]['value']),
            quantity: 1
        })

        expect(result).toEqual(testing.expectedDataCreateInvoice)
    })

    test('Get invoice request', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponse(JSON.stringify(testing.expectedDataCreateInvoice))

        const result = await client.getInvoice(testing.expectedDataCreateInvoice['data']['id'])
        expect(result).toEqual(testing.expectedDataCreateInvoice)
    })

    test('Pay invoice request', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponse(JSON.stringify(testing.expectedDataPayInvoice))

        const result = await client.payInvoice(testing.expectedDataPayInvoice['data']['id'])
        expect(result).toEqual(testing.expectedDataPayInvoice)
    })

    test('Get order request', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponse(JSON.stringify(testing.expectedDataGetOrder))

        const result = await client.getOrder(testing.expectedDataPayInvoice['data']['id'])
        expect(result).toEqual(testing.expectedDataGetOrder)
    })

    test('Get orders list request', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        fetch.mockResponse(JSON.stringify(testing.expectedDataGetOrders))

        const result = await client.getOrders({
            limit: 1
        })
        expect(result).toEqual(testing.expectedDataGetOrders)
    })

    test('Request - Unsupported method', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')
        await expect(client.request('VOID', '/ping')).rejects.toThrow('Unsupported method: VOID (supported: GET and POST)')
    })

    test('Request - Bitrefill rate limit hit', async () => {
        const client = new Client('API_USER_ID', 'API_SECRET_KEY')

        // Mock API response
        const expectedData = { meta: { _endpoint: '/ping' }, message: 'pong' }
        const headers = {
            'content-type': 'application/json',
            'ratelimit-remaining': '0',
            'ratelimit-reset': '3'
        }
        fetch.mockResponseOnce(JSON.stringify(expectedData), {
            status: 200,
            headers
        })

        const result = await client.ping()
        expect(result).toEqual(expectedData)
    })
})