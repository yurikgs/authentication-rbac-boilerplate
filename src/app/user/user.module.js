"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var enums_1 = require("@nestjs/common/enums");
var user_id_check_middleware_1 = require("../../../../../../../../../../src/common/middlewares/user-id-check-middleware");
var prisma_module_1 = require("../../../../../../../../../../src/database/prisma/prisma.module");
var auth_module_1 = require("../auth/auth.module");
var user_controller_1 = require("./user.controller");
var user_service_1 = require("./user.service");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule.prototype.configure = function (consumer) {
        consumer.apply(user_id_check_middleware_1.UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: enums_1.RequestMethod.ALL
        });
    };
    UserModule = __decorate([
        (0, common_1.Module)({
            controllers: [user_controller_1.UserController],
            providers: [user_service_1.UserService],
            imports: [prisma_module_1.PrismaModule, (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; })],
            exports: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
