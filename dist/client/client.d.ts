import { APIResponse, CheckPhoneNumberOptions, CommissionsOptions, CreateInvoiceOptions, GetOrdersOptions, ProductsOptions } from '../types/types.js';
export default class Client {
    url: string;
    private authorization;
    constructor(apiId: string, apiSecretKey: string, url?: string);
    _prepareHeaders(): {
        accept: string;
        Authorization: string;
        'X-Requested-With': string;
    };
    request(method: string, endpoint: string, params?: Record<string, any>): Promise<APIResponse>;
    ping(): Promise<APIResponse>;
    getBalance(): Promise<APIResponse>;
    checkPhoneNumber(params: CheckPhoneNumberOptions): Promise<APIResponse>;
    getCommissions(params: CommissionsOptions): Promise<APIResponse>;
    getProducts(start?: ProductsOptions | number, limit?: number, include_test_products?: boolean): Promise<APIResponse>;
    getProductsAll(include_test_products?: boolean): Promise<APIResponse>;
    createInvoice(product_id: CreateInvoiceOptions): Promise<APIResponse>;
    createInvoice(product_id: string, value: number, quantity: number): Promise<APIResponse>;
    createInvoice(product_id: string, value: number, quantity: number, auto_pay?: boolean, payment_method?: string, webhook_url?: string): Promise<APIResponse>;
    getInvoice(invoiceId: string): Promise<APIResponse>;
    payInvoice(invoiceId: string): Promise<APIResponse>;
    getOrder(orderId: string): Promise<APIResponse>;
    getOrders(params: GetOrdersOptions): Promise<APIResponse>;
    waitForInvoicePayment(invoiceId: string, secondsBetweenChecks?: number, maxAttempts?: null): Promise<APIResponse>;
}
