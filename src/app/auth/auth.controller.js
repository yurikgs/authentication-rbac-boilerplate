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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var decorators_1 = require("@nestjs/common/decorators");
var user_decorator_1 = require("../../common/decorators/user-decorator");
var auth_guard_1 = require("../../common/guards/auth.guard");
var throttler_guard_1 = require("@nestjs/throttler/dist/throttler.guard");
var throttler_decorator_1 = require("@nestjs/throttler/dist/throttler.decorator");
var constants_1 = require("../../../../../../../../../../src/common/constants");
var decorators_2 = require("@nestjs/swagger/dist/decorators");
var method_doc_config_1 = require("nestjs-swagger-config/src/method-main-generator/decorators/method-doc-config");
var status_config_patterns_dict_1 = require("nestjs-swagger-config/src/responses-generator/dicts/status-config-patterns-dict");
var operations_default_responses_1 = require("nestjs-swagger-config/src/responses-generator/decorators/operations-default-responses");
var auth_register_doc_config_1 = require("../../../../../../../../../../src/swagger-config/objects/main/auth-register-doc-config");
var platform_express_1 = require("@nestjs/platform-express");
var AuthController = /** @class */ (function () {
    function AuthController(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    AuthController.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.store(user)];
            });
        });
    };
    AuthController.prototype.login = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.authService.login(email, password)];
            });
        });
    };
    AuthController.prototype.forget = function (_a) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.authService.forget(email)];
            });
        });
    };
    AuthController.prototype.reset = function (_a) {
        var password = _a.password, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.authService.reset(password, token)];
            });
        });
    };
    // TODO: Ignore this method?? (Test only method. AuthGuard uses directly the Auth Service counterpart)
    AuthController.prototype.checkToken = function (authorization, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        user: user,
                        token: this.authService.checkToken(authorization ? authorization.split(' ')[1] : '')
                    }];
            });
        });
    };
    AuthController.prototype.uploadProfilePic = function (user, photo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.authService.uploadProfilePic(user, photo)];
            });
        });
    };
    __decorate([
        (0, method_doc_config_1.MethodDocConfig)(auth_register_doc_config_1.authRegisterDocConfig),
        (0, common_1.Post)('register'),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "register");
    __decorate([
        (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPost),
        (0, common_1.Post)('login'),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "login");
    __decorate([
        (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPost),
        (0, common_1.Post)('forget'),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "forget");
    __decorate([
        (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPost),
        (0, common_1.Post)('reset'),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "reset");
    __decorate([
        (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPost),
        (0, decorators_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Post)('check-token'),
        __param(0, (0, common_1.Headers)('authorization')),
        __param(1, (0, user_decorator_1.User)('id'))
    ], AuthController.prototype, "checkToken");
    __decorate([
        (0, operations_default_responses_1.OperationsDefaultResponses)(status_config_patterns_dict_1.statusConfigPatternsDict.standardPost),
        (0, decorators_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, decorators_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo')),
        (0, common_1.Post)('photo'),
        __param(0, (0, user_decorator_1.User)()),
        __param(1, (0, decorators_1.UploadedFile)(new common_1.ParseFilePipe({
            validators: [
                new common_1.FileTypeValidator({ fileType: /^image\/(png|jpe?g)$/i }),
                new common_1.MaxFileSizeValidator({ maxSize: 50 * 1024 }),
            ]
        })))
    ], AuthController.prototype, "uploadProfilePic");
    AuthController = __decorate([
        (0, decorators_2.ApiTags)('Auth'),
        (0, decorators_1.UseGuards)(throttler_guard_1.ThrottlerGuard),
        (0, throttler_decorator_1.Throttle)(constants_1.THROTTLE_AUTH_LIMIT, constants_1.THROTTLE_AUTH_TTL),
        (0, common_1.Controller)('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
