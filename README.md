# Bitrefill API Client v2

Bitrefill API Client is a TypeScript client library for Bitrefill's B2B API. This project serves as a proof-of-concept and is a work in progress. It enables developers to interact with Bitrefill's API, making it easier to integrate Bitrefill's services into your applications.

Documentation can be found [here](https://api-bitrefill.com/api-docs/)

## Features

- **TypeScript**: Written in TypeScript to provide type safety and code clarity.
- **Work in Progress**: This project is actively being developed, and contributions are welcome.
- **B2B API**: Designed to interact with Bitrefill's B2B API, allowing you to access a variety of features for businesses.
- **Easy Integration**: Simplifies the process of incorporating Bitrefill's services into your applications.

## Getting Started

To get started with the Bitrefill API Client, follow these steps:

**Install via NPM**:

   ```bash
npm install --save https://github.com/lacksfish/bitrefill-api-client-v2/tarball/master
   ```

**Example Usage**:

   ```javascript
const client = new Client(process.env.API_USER_ID, process.env.API_SECRET_KEY)
const ping = await client.ping()
   ```

   Example code on how to use the library can be found in `example\example.js`
   Make sure to create a `.env` file (see `.env.example`) with your API credentials

## Contributing

We welcome contributions to improve this project. If you'd like to contribute, please follow these guidelines:

* Fork the repository
* Create a new branch for your feature or bug fix
* Make your changes and ensure that the existing tests pass
* Add new tests as necessary
* Submit a pull request