export function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export function headersToObject(headers) {
    const headersObject = {}
    for (const [key, value] of headers.entries()) {
      headersObject[key] = value
    }
    return headersObject
}