export function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
export function headersToObject(headers) {
    var headersObject = {};
    for (var _i = 0, _a = headers.entries(); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        headersObject[key] = value;
    }
    return headersObject;
}
