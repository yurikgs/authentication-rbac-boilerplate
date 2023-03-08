"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDTO = void 0;
var decorators_1 = require("@nestjs/swagger/dist/decorators");
var class_validator_1 = require("class-validator");
var role_enum_1 = require("../../../../../../../../../../../src/common/enums/role.enum");
var CreateUserDTO = /** @class */ (function () {
    function CreateUserDTO() {
    }
    __decorate([
        (0, decorators_1.ApiProperty)({
            description: 'User Name'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateUserDTO.prototype, "name");
    __decorate([
        (0, decorators_1.ApiProperty)({
            description: 'Email',
            uniqueItems: true
        }),
        (0, class_validator_1.IsEmail)()
    ], CreateUserDTO.prototype, "email");
    __decorate([
        (0, decorators_1.ApiProperty)({
            description: 'Password -- Alphanumeric',
            minLength: 6,
            maxLength: 32
        }),
        (0, class_validator_1.MinLength)(6),
        (0, class_validator_1.MaxLength)(32),
        (0, class_validator_1.IsAlphanumeric)()
    ], CreateUserDTO.prototype, "password");
    __decorate([
        (0, decorators_1.ApiProperty)({
            description: 'Role',
            "enum": role_enum_1.Role,
            enumName: 'RolesEnum',
            "default": 'User'
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(role_enum_1.Role)
    ], CreateUserDTO.prototype, "role");
    __decorate([
        (0, decorators_1.ApiProperty)({
            description: 'Birth Date -- aaaa-mm-dd',
            type: 'string',
            required: false
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsDateString)()
    ], CreateUserDTO.prototype, "birthAt");
    return CreateUserDTO;
}());
exports.CreateUserDTO = CreateUserDTO;
