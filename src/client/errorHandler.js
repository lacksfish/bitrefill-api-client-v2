export async function handleAPIError(endpoint, response) {
    if (!response.ok) {
        if (response.status === 400) {
            throw new Error('Bad request. Missing parameters.')
        } else if (response.status === 429) {
            throw new Error('Too many request. Check rate limit headers')
        } else if (response.status === 500) {
            throw new Error('Server error. Please try again later.')
        }

        if (endpoint === 'check_phone_number') {
            if (response.status === 404) {
                throw new Error('Unable to find any providers for the specified phone number.')
            }
        }

        if (endpoint.includes('products/')) {
            if (response.status === 404) {
                throw new Error('Product not found.')
            }
        }

        if (endpoint === 'invoices') {
            if (response.status === 400) {
                // Special case, need to parse JSON here to access error message
                let data = await response.json()
                throw new Error(`${data.message} (${data.error_code})`)
            }
        }

        if (endpoint.includes('invoices/') && endpoint.includes('/pay')) {
            if (response.status === 403) {
                throw new Error('Forbidden. Not enough funds.')
            } else if (response.status === 404) {
                throw new Error('Invoice not found or already paid.')
            }
        }

        if (endpoint.includes('invoices/')) {
            if (response.status === 404) {
                throw new Error('Invoice not found.')
            }
        }

        if (endpoint.includes('orders/')) {
            if (response.status === 404) {
                throw new Error('Order not found.')
            }
        }
    }
    try {
        return response.json()
    } catch (error) {
        console.error('JSON parsing error:', error)
        throw new Error('JSON parsing error')
    }
}