"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../enums/role.enum");
class UserModel {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'id: Primary Key', minimum: 1 }),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User Name',
    }),
    __metadata("design:type", String)
], UserModel.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email',
        uniqueItems: true,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password -- Alphanumeric',
        minLength: 6,
        maxLength: 32,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role',
        enum: role_enum_1.Role,
        enumName: 'RolesEnum',
        default: 'User',
    }),
    __metadata("design:type", Object)
], UserModel.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Birth Date -- aaaa-mm-dd',
        type: 'string',
        required: false,
    }),
    __metadata("design:type", Object)
], UserModel.prototype, "birthAt", void 0);
exports.UserModel = UserModel;
//# sourceMappingURL=swagger-user.model.js.map