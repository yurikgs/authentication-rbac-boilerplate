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
exports.AuthService = void 0;
var injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
var exceptions_1 = require("@nestjs/common/exceptions");
var bcrypt = require("bcrypt");
var exception_messages_dict_1 = require("../../../../../../../../../../src/common/dicts/exception-messages.dict");
var path_1 = require("path");
var mimetypes_to_extensions_1 = require("../../../../../../../../../../src/utils/mimetypes-to-extensions");
var AuthService = /** @class */ (function () {
    function AuthService(jwtService, dbService, userService, fileService, mailerService) {
        this.jwtService = jwtService;
        this.dbService = dbService;
        this.userService = userService;
        this.fileService = fileService;
        this.mailerService = mailerService;
    }
    AuthService.prototype.generateToken = function (user) {
        return {
            apiToken: this.jwtService.sign({
                sub: 'auth',
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: '7 days',
                issuer: 'login',
                audience: 'users'
            })
        };
    };
    AuthService.prototype.generateResetToken = function (user) {
        return {
            resetToken: this.jwtService.sign({
                sub: 'reset',
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: '1 day',
                issuer: 'authReset',
                audience: 'users'
            })
        };
    };
    AuthService.prototype.checkToken = function (token) {
        try {
            var data = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'login'
            });
            // return Boolean(data);
            return data;
        }
        catch (e) {
            throw new exceptions_1.BadRequestException('Token Inválido');
        }
    };
    AuthService.prototype.checkResetToken = function (token) {
        try {
            var data = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'authReset'
            });
            return data;
        }
        catch (e) {
            throw new exceptions_1.BadRequestException('Token Inválido');
        }
    };
    AuthService.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.store(data)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, this.generateToken(user)];
                }
            });
        });
    };
    AuthService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.user.findFirst({
                            where: {
                                email: email
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new exceptions_1.UnauthorizedException(exception_messages_dict_1.ExceptionMessagesDict.AUTHENTICATION_FAIL);
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new exceptions_1.UnauthorizedException(exception_messages_dict_1.ExceptionMessagesDict.AUTHENTICATION_FAIL);
                        }
                        return [2 /*return*/, this.generateToken(user)];
                }
            });
        });
    };
    AuthService.prototype.forget = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, link, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.user.findFirst({
                            where: {
                                email: email
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new exceptions_1.UnauthorizedException(exception_messages_dict_1.ExceptionMessagesDict.NOT_FOUND_MAIL);
                        }
                        token = this.generateResetToken(user).resetToken;
                        link = "http://somedomainname.com/auth-reset/".concat(token);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.mailerService.sendMail({
                                to: email,
                                subject: 'Password Recovery Request',
                                template: 'auth-forget',
                                context: {
                                    name: user.name,
                                    link: link
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        throw new exceptions_1.BadRequestException("Couldnt send mail. Error: ".concat(e_1));
                    case 5: return [2 /*return*/, {
                            warning: 'Test response version. Do not return token or any data, just send token by bemail and return a success confirm response',
                            resetToken: token
                        }];
                }
            });
        });
    };
    AuthService.prototype.reset = function (password, token) {
        return __awaiter(this, void 0, void 0, function () {
            var user, tokenPayload, id, salt, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        tokenPayload = this.checkResetToken(token);
                        id = tokenPayload.id;
                        if (isNaN(Number(id))) {
                            throw new exceptions_1.BadRequestException('Token Inválido');
                        }
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 2:
                        password = _a.sent();
                        return [4 /*yield*/, this.dbService.user.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    password: password
                                }
                            })];
                    case 3:
                        user = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        throw new exceptions_1.BadRequestException("Error: ".concat(e_2));
                    case 5: return [2 /*return*/, {
                            warning: 'Test response version. You just need to return access token in final version, never return user password like this bellow this',
                            user: user,
                            apiToken: this.generateToken(user)
                        }];
                }
            });
        });
    };
    AuthService.prototype.uploadProfilePic = function (user, photo) {
        return __awaiter(this, void 0, void 0, function () {
            var extension, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        extension = (0, mimetypes_to_extensions_1.imageMimeToExtension)(photo.mimetype);
                        return [4 /*yield*/, this.fileService.uploadFile((0, path_1.join)(__dirname, '..', '..', '..', '..', 'storage', 'photos', "profile-pic-".concat(user.id, ".").concat(extension)), photo)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { result: result }];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, injectable_decorator_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
