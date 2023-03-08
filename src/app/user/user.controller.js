"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var set_access_roles_decorator_1 = require("../../../../../../../../../../src/common/decorators/set-access-roles.decorator");
var role_enum_1 = require("../../../../../../../../../../src/common/enums/role.enum");
var role_guard_1 = require("../../../../../../../../../../src/common/guards/role.guard");
var auth_guard_1 = require("../../../../../../../../../../src/common/guards/auth.guard");
var decorators_1 = require("@nestjs/swagger/dist/decorators");
var nestjs_swagger_config_1 = require("nestjs-swagger-config");
var status_config_patterns_dict_1 = require("nestjs-swagger-config/src/responses-generator/dicts/status-config-patterns-dict");
var operations_default_responses_1 = require("nestjs-swagger-config/src/responses-generator/decorators/operations-default-responses");
var list_user_doc_config_1 = require("../../../../../../../../../../src/swagger-config/objects/main/list-user-doc-config");
var show_user_doc_config_1 = require("../../../../../../../../../../src/swagger-config/objects/main/show-user-doc-config");
var create_user_doc_config_1 = require("../../../../../../../../../../src/swagger-config/objects/main/create-user-doc-config");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.list()];
            });
        });
    };
    UserController.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.show(id)];
            });
        });
    };
    UserController.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.store(data)];
            });
        });
    };
    UserController.prototype.updatePut = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.updatePut(id, data)];
            });
        });
    };
    UserController.prototype.updatePatch = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.updatePatch(id, data)];
            });
        });
    };
    UserController.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.destroy(id)];
            });
        });
    };
    __decorate([
        (0, nestjs_swagger_config_1.MethodDocConfig)(list_user_doc_config_1.listUserDocConfig),
        (0, common_1.Get)()
    ], UserController.prototype, "list");
    __decorate([
        (0, nestjs_swagger_config_1.MethodDocConfig)(show_user_doc_config_1.showUserDocConfig),
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe))
    ], UserController.prototype, "show");
    __decorate([
        (0, nestjs_swagger_config_1.MethodDocConfig)(create_user_doc_config_1.CreateUserDocConfig),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "create");
    __decorate([
        (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPut),
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "updatePut");
    __decorate([
        (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPatch),
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe))
    ], UserController.prototype, "updatePatch");
    __decorate([
        (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardDelete),
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe))
    ], UserController.prototype, "delete");
    UserController = __decorate([
        (0, decorators_1.ApiTags)('Users'),
        (0, decorators_1.ApiBearerAuth)()
        // @UseInterceptors(LogInterceptor)
        ,
        (0, set_access_roles_decorator_1.SetAccessRoles)(role_enum_1.Role.Admin),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
        (0, common_1.Controller)('users')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
