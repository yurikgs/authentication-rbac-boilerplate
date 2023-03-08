"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var isThere_1 = require("../../../../../../../../../../src/common/utils/isThere");
var bcrypt = require("bcrypt");
var validate_role_1 = require("../../../../../../../../../../src/common/utils/validate-role");
var exception_messages_dict_1 = require("../../../../../../../../../../src/common/dicts/exception-messages.dict");
var constants_1 = require("../../../../../../../../../../src/common/constants");
var UserService = /** @class */ (function () {
    function UserService(dbService) {
        this.dbService = dbService;
    }
    UserService.prototype.store = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
                        data = (0, validate_role_1.validateRole)(data);
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _b.sent();
                        _a = data;
                        return [4 /*yield*/, bcrypt.hash(data.password, salt)];
                    case 2:
                        _a.password = _b.sent();
                        return [4 /*yield*/, this.VerifyUniqueMail(data.email)];
                    case 3:
                        if (!_b.sent()) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.dbService.user.create({
                                data: data
                            })];
                    case 4:
                        user = _b.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                    case 5: return [2 /*return*/, (0, isThere_1.isThere)(false, constants_1.LOGGER_CONTEXT_USER_SERVICE, true, exception_messages_dict_1.ExceptionMessagesDict.DUPLICATED_EMAIL, {
                            statusCode: '400'
                        })];
                }
            });
        });
    };
    UserService.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.user.findMany()];
                    case 1:
                        users = _a.sent();
                        // criar um utilitário, type safe
                        users.forEach(function (user) {
                            delete user.password;
                        });
                        return [2 /*return*/, users];
                }
            });
        });
    };
    UserService.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.user.findUnique({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        user = (0, isThere_1.isThere)(user, constants_1.LOGGER_CONTEXT_USER_SERVICE);
                        delete user.password;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updatePut = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
                        data = (0, validate_role_1.validateRole)(data);
                        return [4 /*yield*/, this.VerifyUser(id)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dbService.user.update({
                                data: data,
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                    case 3: return [2 /*return*/, (0, isThere_1.isThere)(false, constants_1.LOGGER_CONTEXT_USER_SERVICE)];
                }
            });
        });
    };
    UserService.prototype.updatePatch = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
                        data = (0, validate_role_1.validateRole)(data);
                        return [4 /*yield*/, this.VerifyUser(id)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dbService.user.update({
                                data: data,
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                    case 3: return [2 /*return*/, (0, isThere_1.isThere)(false, constants_1.LOGGER_CONTEXT_USER_SERVICE)];
                }
            });
        });
    };
    UserService.prototype.destroy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.VerifyUser(id)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dbService.user["delete"]({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                message: "User ".concat(id, " deleted with success")
                            }];
                    case 3: return [2 /*return*/, (0, isThere_1.isThere)(false, constants_1.LOGGER_CONTEXT_USER_SERVICE)];
                }
            });
        });
    };
    //   aux
    UserService.prototype.VerifyUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.user.count({
                            where: {
                                id: id
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.VerifyUniqueMail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.user.count({
                            where: {
                                email: email
                            }
                        })];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count == 0];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
