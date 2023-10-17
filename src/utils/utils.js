export function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export function getUrlParamsFromString(urlString) {
    const params = new URL(urlString).searchParams
    const paramsObject = {}
  
    params.forEach((value, key) => {
      paramsObject[key] = value
    })
  
    return paramsObject
  }

  export function headersToObject(headers) {
    const headersObject = {}
    for (const [key, value] of headers.entries()) {
        headersObject[key] = value
    }
    return headersObject
  }