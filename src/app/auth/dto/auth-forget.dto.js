"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthForgetDTO = void 0;
var dist_1 = require("@nestjs/swagger/dist");
var class_validator_1 = require("class-validator");
var AuthForgetDTO = /** @class */ (function () {
    function AuthForgetDTO() {
    }
    __decorate([
        (0, dist_1.ApiProperty)({
            description: 'User Email, that will be used to send the reset link/token, if valid'
        }),
        (0, class_validator_1.IsEmail)()
    ], AuthForgetDTO.prototype, "email");
    return AuthForgetDTO;
}());
exports.AuthForgetDTO = AuthForgetDTO;
