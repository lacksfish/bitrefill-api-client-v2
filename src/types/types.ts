export interface ProductsOptions {
    start: number
    limit: number
    include_test_products: boolean
}

export interface CreateInvoiceOptions {
    product_id: string
    value: number
    quantity: number
    auto_pay?: boolean
    payment_method?: string
    webhook_url?: string
}

export interface GetOrdersOptions {
    start?: number
    limit?: number
    after?: string
    before?: string
}

export interface CheckPhoneNumberOptions {
    phone_number: string
    operator?: string
}

export interface APIResponse {
    meta: APIResponseMetaField
    data: any | any[]
    [key: string]: any // TODO
}

export interface APIResponseMetaField {
    _endpoint: string
    _next?: string
    start?: number
    limit?: number
    include_test_products?: string
    [key: string]: any // TODO
}
