"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthResetDTO = void 0;
var decorators_1 = require("@nestjs/swagger/dist/decorators");
var class_validator_1 = require("class-validator");
var AuthResetDTO = /** @class */ (function () {
    function AuthResetDTO() {
    }
    __decorate([
        (0, decorators_1.ApiProperty)({
            description: 'New Password'
        }),
        (0, class_validator_1.MinLength)(6),
        (0, class_validator_1.MaxLength)(32),
        (0, class_validator_1.IsAlphanumeric)()
    ], AuthResetDTO.prototype, "password");
    __decorate([
        (0, decorators_1.ApiProperty)({
            description: 'Reset Auth Token'
        }),
        (0, class_validator_1.IsJWT)()
    ], AuthResetDTO.prototype, "token");
    return AuthResetDTO;
}());
exports.AuthResetDTO = AuthResetDTO;
