import dotenv from 'dotenv'
import Client from '../dist/index.js'

dotenv.config()

const checkForPayment = async (client, pay_invoice_data) => {
    let order_data = await client.getOrder(pay_invoice_data['data']['orders'][0]['id'])

    if (pay_invoice_data.data.payment.status == 'payment_confirmed') {
        // Wait for processing to complete
        await client.waitForInvoicePayment(pay_invoice_data['data']['id'], 5)
        let order_data = await client.getOrder(pay_invoice_data['data']['orders'][0]['id'])
        if (order_data.data.status == 'delivered') {
            console.log(`(!) Code: ${order_data['data']['redemption_info']['code']}`)
        } else if (order_data.data.status == 'permanent_failure') {
            console.log('The order/payment failed to execute.')
        } else {
            console.log('Something went wrong or status unknown, please try again.')
        }
    } else {
        throw new Error("Payment has not been initialized yet")
    }
}

let c = new Client(process.env.API_USER_ID, process.env.API_SECRET_KEY)

// Request all products, then filter all test products
let allProducts = await c.productsAll(true)

// Need to filter out false-positive with id: "test-kitchen-phillipines"
const testProducts = allProducts.data.filter((product) => product.id.startsWith("test-gift-card") || product.id.startsWith("test-phone-refill"))

// List the name of all test products
testProducts.map((testProduct) => {
    console.log(testProduct.name)
})

// Buying gift card
let productToBuy = testProducts.filter((testProduct) => testProduct.id == 'test-gift-card-code')[0]
console.log(`(!) Buying ${productToBuy.name} - Value: ${productToBuy['packages'][0]['value']} ${productToBuy['currency']}`)

let invoice = await c.createInvoice(productToBuy['id'], productToBuy['packages'][0]['value'], 1)
let pay_invoice_data = await c.payInvoice(invoice['data']['id'])
await checkForPayment(c, pay_invoice_data)

// Failing to buy gift card
productToBuy = testProducts.filter((testProduct) => testProduct.id == 'test-gift-card-code-fail')[0]
console.log(`(!) Buying ${productToBuy.name} - Value: ${productToBuy['packages'][0]['value']} ${productToBuy['currency']}`)

invoice = await c.createInvoice(productToBuy['id'], productToBuy['packages'][0]['value'], 1)
pay_invoice_data = await c.payInvoice(invoice['data']['id'])
await checkForPayment(c, pay_invoice_data)



// --- Helpful functions for dev as to not bother the API too much :) ---

// // Extract all products to json file
// import fs from 'fs'
// let products = await c.productsAll(true) //4250, 50, true)
// const prettifiedJSON = JSON.stringify(products, null, 2)
// fs.writeFile('products_all.json', prettifiedJSON, 'utf8', (err) => {
//   if (err) {
//     console.error('Error writing to file:', err)
//   } else {
//     console.log('JSON data has been written to file')
//   }
// })

// // Get all products from json file
// import fs from 'fs'
// let allProducts = JSON.parse(fs.readFileSync('./products_all.json').toString())