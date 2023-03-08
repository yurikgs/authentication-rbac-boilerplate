"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModel = void 0;
var swagger_1 = require("@nestjs/swagger");
var role_enum_1 = require("../../enums/role.enum");
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'id: Primary Key', minimum: 1 })
    ], UserModel.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'User Name'
        })
    ], UserModel.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Email',
            uniqueItems: true
        })
    ], UserModel.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Password -- Alphanumeric',
            minLength: 6,
            maxLength: 32
        })
    ], UserModel.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Role',
            "enum": role_enum_1.Role,
            enumName: 'RolesEnum',
            "default": 'User'
        })
    ], UserModel.prototype, "role");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Birth Date -- aaaa-mm-dd',
            type: 'string',
            required: false
        })
    ], UserModel.prototype, "birthAt");
    return UserModel;
}());
exports.UserModel = UserModel;
