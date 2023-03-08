"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ValidateBodyInterceptor = void 0;
var decorators_1 = require("@nestjs/common/decorators");
var exceptions_1 = require("@nestjs/common/exceptions");
var ValidateBodyInterceptor = /** @class */ (function () {
    function ValidateBodyInterceptor(reflector) {
        this.reflector = reflector;
    }
    ValidateBodyInterceptor.prototype.intercept = function (context, next) {
        var bodyDto = this.reflector.get('dto-class-name', context.getHandler());
        var bodyDtoObject = new bodyDto();
        var body = context.switchToHttp().getRequest().body;
        Object.keys(body).forEach(function (key) {
            if (!bodyDtoObject[key]) {
                throw new exceptions_1.BadRequestException("Invalid Param! Ref.: ".concat(bodyDtoObject[key]));
            }
        });
        return next.handle();
    };
    ValidateBodyInterceptor = __decorate([
        (0, decorators_1.Injectable)()
    ], ValidateBodyInterceptor);
    return ValidateBodyInterceptor;
}());
exports.ValidateBodyInterceptor = ValidateBodyInterceptor;
