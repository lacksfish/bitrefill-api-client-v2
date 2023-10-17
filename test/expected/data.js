export const expectedDataProducts = {
    meta: {
        include_test_products: 'false',
        limit: 50,
        start: 0,
        _endpoint: '/products'
    },
    data: [
        {
            id: 'a-test',
            name: 'A test',
            country_code: 'AA',
            country_name: 'Aruba',
            currency: 'XYZ',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'a-test',
            in_stock: true,
            packages: [
                {
                    "id": "a-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "a-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        },
    ]
}

export const expectedDataProductsAll_request1 = {
    meta: {
        include_test_products: 'false',
        _endpoint: '/products',
        _next: 'https://api-bitrefill.com/v2/products?limit=50&start=2'
    },
    data: [
        {
            id: 'a-test',
            name: 'A test',
            country_code: 'AA',
            country_name: 'Aruba',
            currency: 'XYZ',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'a-test',
            in_stock: true,
            packages: [
                {
                    "id": "a-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "a-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        }, {
            id: 'b-test',
            name: 'B test',
            country_code: 'BB',
            country_name: 'Barbados',
            currency: 'ABC',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'b-test',
            in_stock: true,
            packages: [
                {
                    "id": "b-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "b-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        },
    ]
}

export const expectedDataProductsAll_request2 = {
    meta: {
        include_test_products: 'false',
        _endpoint: '/products',
    },
    data: [
        {
            id: 'c-test',
            name: 'C test',
            country_code: 'CC',
            country_name: 'Cocos (Keeling) Islands',
            currency: 'XYZ',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'c-test',
            in_stock: true,
            packages: [
                {
                    "id": "c-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "c-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        }, {
            id: 'D-test',
            name: 'D test',
            country_code: 'DD',
            country_name: 'German Democratic Republic',
            currency: 'ABC',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'd-test',
            in_stock: true,
            packages: [
                {
                    "id": "d-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "d-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        },
    ]
}

export const expectedDataProductsAll = {
    meta: {
        include_test_products: 'false',
        _endpoint: '/products',
    },
    data: [
        {
            id: 'a-test',
            name: 'A test',
            country_code: 'AA',
            country_name: 'Aruba',
            currency: 'XYZ',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'a-test',
            in_stock: true,
            packages: [
                {
                    "id": "a-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "a-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        }, {
            id: 'b-test',
            name: 'B test',
            country_code: 'BB',
            country_name: 'Barbados',
            currency: 'ABC',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'b-test',
            in_stock: true,
            packages: [
                {
                    "id": "b-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "b-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        }, {
            id: 'c-test',
            name: 'C test',
            country_code: 'CC',
            country_name: 'Cocos (Keeling) Islands',
            currency: 'XYZ',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'c-test',
            in_stock: true,
            packages: [
                {
                    "id": "c-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "c-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        }, {
            id: 'D-test',
            name: 'D test',
            country_code: 'DD',
            country_name: 'German Democratic Republic',
            currency: 'ABC',
            categories: [
                "refill"
            ],
            created_time: '2009-01-03T18:15:05.000Z',
            recipient_type: 'phone_number',
            image: 'd-test',
            in_stock: true,
            packages: [
                {
                    "id": "d-test<&>1500",
                    "value": "1500",
                    "price": 3000,
                    "amount": 1500
                },
                {
                    "id": "d-test<&>3000",
                    "value": "3000",
                    "price": 6000,
                    "amount": 3000
                }
            ]
        },
    ]
}

export const expectedDataCreateInvoice = {
    "meta": {
        "products": [
            {
                "product_id": "a-test",
                "value": "10",
                "quantity": 1
            }
        ],
        "payment_method": "balance",
        "auto_pay": false,
        "_endpoint": "/invoices"
    },
    "data": {
        "id": "12345678-90ab-cdef-1234-567890abcdef",
        "created_time": "2023-10-17T08:12:59.090Z",
        "status": "not_delivered",
        "user": {
            "id": "1234567890abcdef12345678",
            "email": "my_personal_email@test.dev"
        },
        "payment": {
            "method": "balance",
            "currency": "BTC",
            "price": 33401,
            "status": "unpaid",
            "commission": 0
        },
        "orders": [
            {
                "id": "1234567890abcdef12345678",
                "status": "created",
                "product": {
                    "id": "a-test",
                    "name": "Test Gift Card Code",
                    "value": "10",
                    "currency": "USD",
                    "image": "this_is_a_test",
                    "_href": "https://api-bitrefill.com/v2/products/a-test"
                },
                "created_time": "2023-10-17T08:12:59.044Z",
                "delivered_time": null,
                "commission": 0
            }
        ]
    }
}

export const expectedDataGetInvoice = {
    "meta": {
        "id": "12345678-90ab-cdef-1234-567890abcdef",
        "_endpoint": "/invoices/12345678-90ab-cdef-1234-567890abcdef"
    },
    "data": expectedDataCreateInvoice.data
}

export const expectedDataPayInvoice = {
    "meta": {
        "id": "12345678-90ab-cdef-1234-567890abcdef",
        "_endpoint": "/invoices/12345678-90ab-cdef-1234-567890abcdef/pay"
    },
    "data": {
        "id": "12345678-90ab-cdef-1234-567890abcdef",
        "created_time": "2023-10-17T08:12:59.090Z",
        "status": "not_delivered",
        "user": {
            "id": "1234567890abcdef12345678",
            "email": "my_personal_email@test.dev"
        },
        "payment": {
            "method": "balance",
            "currency": "BTC",
            "price": 33436,
            "status": "payment_confirmed",
            "commission": 0
        },
        "orders": [
            {
                "id": "1234567890abcdef12345678",
                "status": "created",
                "product": {
                    "id": "a-test",
                    "name": "Test Gift Card Code",
                    "value": "10",
                    "currency": "USD",
                    "image": "this_is_a_test",
                    "_href": "https://api-bitrefill.com/v2/products/a-test"
                },
                "created_time": "2023-10-17T08:12:59.044Z",
                "delivered_time": null,
                "commission": 0
            }
        ]
    }
}

export const expectedDataGetOrder = {
    meta: {
      id: '1234567890abcdef12345678',
      _endpoint: '/orders/1234567890abcdef12345678'
    },
    data: {
      id: '1234567890abcdef12345678',
      status: 'created',
      product: {
        id: 'a-test',
        name: 'A test',
        value: '10',
        currency: 'USD',
        image: 'a-test',
        _href: 'https://api-bitrefill.com/v2/products/a-test'
      },
      created_time: '2023-10-17T11:23:38.239Z',
      delivered_time: null,
      commission: 0,
      user: { id: '1234567890abcdef12345678', email: 'my_personal_email@test.dev' },
      invoice: {
        id: '12345678-90ab-cdef-1234-567890abcdef',
        _href: 'https://api-bitrefill.com/v2/invoices/12345678-90ab-cdef-1234-567890abcdef'
      }
    }
  }