export function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
export function headersToObject(headers) {
    return Object.fromEntries(headers.entries());
}
