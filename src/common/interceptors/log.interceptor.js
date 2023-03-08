"use strict";
/**
 * @deprecated
 * Esse Interceptor foi apenas uma prova de conceito
 */
exports.__esModule = true;
exports.LogInterceptor = void 0;
var rxjs_1 = require("rxjs");
var LogInterceptor = /** @class */ (function () {
    function LogInterceptor() {
    }
    LogInterceptor.prototype.intercept = function (context, next) {
        var dt = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(function () {
            var request = context.switchToHttp().getRequest();
            console.log("URL: ".concat(request.url));
            console.log("METHOD: ".concat(request.method));
            console.log("Execu\u00E7\u00E3o em ".concat(Date.now() - dt, " milissegundos"));
        }));
    };
    return LogInterceptor;
}());
exports.LogInterceptor = LogInterceptor;
/**
 * RxJS tap() operator is a utility operator that returns an observable output that is identical to the source observable but performs a side effect for every emission on the source observable.

In other words, you can say that the RxJS tap() operator is used to intercept each emission on the source observable and runs a function but returns an output that is identical to the source observable as long as it doesn't find any error.

This operator is generally used for debugging observables for the correct values or performing other side effects.
 *
 */
