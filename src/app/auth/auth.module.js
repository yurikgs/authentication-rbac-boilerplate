"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var prisma_module_1 = require("../../../../../../../../../../src/database/prisma/prisma.module");
var user_module_1 = require("../../../../../../../../../../src/app/user/user.module");
var auth_controller_1 = require("./auth.controller");
var auth_service_1 = require("./auth.service");
var utils_1 = require("@nestjs/common/utils");
var config_1 = require("@nestjs/config");
var process_1 = require("process");
var file_module_1 = require("../../../../../../../../../../src/file/file.module");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                jwt_1.JwtModule.register({ secret: process_1.env.JWT_SECRET }),
                (0, utils_1.forwardRef)(function () { return user_module_1.UserModule; }),
                prisma_module_1.PrismaModule,
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                file_module_1.FileModule,
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
