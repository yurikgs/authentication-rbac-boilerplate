"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserIdCheckMiddleware = void 0;
var common_1 = require("@nestjs/common");
var exceptions_1 = require("@nestjs/common/exceptions");
var exception_messages_dict_1 = require("../dicts/exception-messages.dict");
var UserIdCheckMiddleware = /** @class */ (function () {
    function UserIdCheckMiddleware() {
    }
    UserIdCheckMiddleware.prototype.use = function (req, res, next) {
        // note que o parametro só vem corretamente separado e nomeado como 'id' na req SE EU INFORMÁ-LO COMO PARÂMETRO (:id) nas configurações de path da chamada do Middleware (a chamada )
        // console.log('req: ', Object.keys(req), req.params);
        if (isNaN(Number(req.params.id)) || req.params.id <= 0)
            throw new exceptions_1.BadRequestException(exception_messages_dict_1.ExceptionMessagesDict.INVALID_ID);
        next();
    };
    UserIdCheckMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], UserIdCheckMiddleware);
    return UserIdCheckMiddleware;
}());
exports.UserIdCheckMiddleware = UserIdCheckMiddleware;
