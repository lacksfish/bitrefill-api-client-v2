var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { delay, headersToObject } from '../utils/utils.js';
import { handleAPIError } from './errorHandler.js';
import { URLSearchParams } from 'url';
var Client = /** @class */ (function () {
    function Client(apiId, apiSecretKey, url) {
        if (url === void 0) { url = 'https://api-bitrefill.com/v2'; }
        this.url = url;
        this.authorization = btoa(apiId + ':' + apiSecretKey);
    }
    Client.prototype._prepareHeaders = function () {
        var headers = {
            'accept': 'application/json',
            'Authorization': "Basic ".concat(this.authorization),
            'X-Requested-With': 'Bitrefill V2 API client'
        };
        return headers;
    };
    Client.prototype.request = function (method, endpoint, params) {
        if (params === void 0) { params = null; }
        return __awaiter(this, void 0, void 0, function () {
            var headers, response, responseHeaders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = this._prepareHeaders();
                        method = method.toUpperCase();
                        if (!(method == 'GET')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch("".concat(this.url, "/").concat(endpoint, "?") + new URLSearchParams(__assign({}, params)), {
                                method: method,
                                headers: headers
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(method == 'POST')) return [3 /*break*/, 4];
                        headers['Content-Type'] = 'application/json';
                        return [4 /*yield*/, fetch("".concat(this.url, "/").concat(endpoint), {
                                method: method,
                                headers: headers,
                                body: JSON.stringify(params)
                            })];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error("Unsupported method: ".concat(method, " (supported: GET and POST)"));
                    case 5:
                        responseHeaders = headersToObject(response.headers);
                        if (!(responseHeaders['ratelimit-remaining'] == 0)) return [3 /*break*/, 7];
                        console.log("Rate limit hit, waiting ".concat(responseHeaders['ratelimit-reset'], " seconds"));
                        return [4 /*yield*/, delay(responseHeaders['ratelimit-reset'] * 1000)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, handleAPIError(endpoint, response)];
                }
            });
        });
    };
    // --- API METHODS ---
    Client.prototype.ping = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('GET', 'ping')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Client.prototype.balance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('GET', 'accounts/balance')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Client.prototype.checkPhoneNumber = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('GET', 'check_phone_number')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Client.prototype.products = function (start, limit, include_test_products) {
        if (start === void 0) { start = 0; }
        if (limit === void 0) { limit = 50; }
        if (include_test_products === void 0) { include_test_products = false; }
        return __awaiter(this, void 0, void 0, function () {
            var options, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Support for options parameters
                        if (typeof start == 'object') {
                            options = start;
                            start = options.start || 0;
                            limit = options.limit || 50;
                            include_test_products = options.include_test_products || false;
                        }
                        return [4 /*yield*/, this.request('GET', 'products', {
                                start: start,
                                limit: limit,
                                'include_test_products': include_test_products
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Client.prototype.productsAll = function (include_test_products) {
        if (include_test_products === void 0) { include_test_products = false; }
        return __awaiter(this, void 0, void 0, function () {
            var products, increment, batchSize, count, doRequests, batch, batchRequests, responses, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        products = {
                            // TODO: Should provide synth meta data for batched request ?
                            "meta": { "_endpoint": "/products", "include_test_products": "".concat(include_test_products), },
                            "data": []
                        };
                        increment = 50 // Max limit per request
                        ;
                        batchSize = 10 // Good compromise value for now
                        ;
                        count = 0;
                        doRequests = true;
                        _a.label = 1;
                    case 1:
                        if (!doRequests) return [3 /*break*/, 6];
                        batch = __spreadArray([], Array(batchSize), true).map(function (_, i) {
                            return {
                                start: (i * increment) + (count * batchSize * increment),
                                limit: increment
                            };
                        });
                        batchRequests = batch.map(function (params) { return __awaiter(_this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.request('GET', 'products', __assign(__assign({}, params), { include_test_products: include_test_products }))];
                                    case 1:
                                        res = _a.sent();
                                        return [2 /*return*/, res];
                                }
                            });
                        }); });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, Promise.all(batchRequests)];
                    case 3:
                        responses = _a.sent();
                        responses.map(function (response, idx) {
                            // If last element in batch, check if more products are available
                            if (idx + 1 == batchSize && response.meta._next) {
                                doRequests = true;
                                count += 1;
                            }
                            else {
                                doRequests = false;
                            }
                            products.data = products.data.concat(response.data);
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error in batch requests:', error_1);
                        throw new Error(error_1);
                    case 5: return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, products];
                }
            });
        });
    };
    Client.prototype.createInvoice = function (product_id, value, quantity, auto_pay, payment_method, webhook_url) {
        if (auto_pay === void 0) { auto_pay = false; }
        if (payment_method === void 0) { payment_method = "balance"; }
        if (webhook_url === void 0) { webhook_url = null; }
        return __awaiter(this, void 0, void 0, function () {
            var options, body, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Support for options parameters
                        if (typeof product_id == 'object') {
                            options = product_id;
                            product_id = options.product_id;
                            value = options.value;
                            quantity = options.quantity;
                            auto_pay = options.auto_pay || false;
                            payment_method = options.payment_method || 'balance';
                            webhook_url = options.webhook_url || null;
                        }
                        body = {
                            "products": [
                                {
                                    "product_id": product_id,
                                    "value": value,
                                    "quantity": quantity
                                }
                            ],
                            "auto_pay": auto_pay,
                            "payment_method": payment_method // bitcoin
                        };
                        if (webhook_url)
                            body['webhook_url'] = webhook_url;
                        return [4 /*yield*/, this.request('POST', 'invoices', body)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Client.prototype.getInvoice = function (invoiceId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('GET', "invoices/".concat(invoiceId))];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Client.prototype.payInvoice = function (invoiceId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('POST', "invoices/".concat(invoiceId, "/pay"), {})];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // TODO: args - check docs
    Client.prototype.getOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('GET', "orders/".concat(orderId))];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Client.prototype.getOrders = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('GET', 'orders', params)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // A way to wait for payment completion without relying on the webhook service
    Client.prototype.waitForInvoicePayment = function (invoiceId, secondsBetweenChecks, maxAttempts) {
        if (secondsBetweenChecks === void 0) { secondsBetweenChecks = 10; }
        if (maxAttempts === void 0) { maxAttempts = null; }
        return __awaiter(this, void 0, void 0, function () {
            var invoiceData, attempts, statusWorthChecking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInvoice(invoiceId)];
                    case 1:
                        invoiceData = _a.sent();
                        attempts = 0;
                        statusWorthChecking = ['unpaid', 'processing', 'payment_confirmed'];
                        _a.label = 2;
                    case 2:
                        if (!statusWorthChecking.includes(invoiceData['data']['payment']['status'])) return [3 /*break*/, 5];
                        if (maxAttempts && maxAttempts > 0 && attempts >= maxAttempts) {
                            throw new Error("Waiting for payment processing not final after ".concat(maxAttempts, " attempts"));
                        }
                        attempts += 1;
                        console.log("Payment not processed yet, waiting ".concat(secondsBetweenChecks, " seconds. (attempt ").concat(attempts).concat(!!maxAttempts ? '/' + maxAttempts : '', ")"));
                        return [4 /*yield*/, delay(secondsBetweenChecks * 1000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getInvoice(invoiceId)];
                    case 4:
                        invoiceData = _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, invoiceData];
                }
            });
        });
    };
    return Client;
}());
export default Client;
