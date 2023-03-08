"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var mailer_1 = require("@nestjs-modules/mailer");
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var throttler_1 = require("@nestjs/throttler");
var throttler_guard_1 = require("@nestjs/throttler/dist/throttler.guard");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./app/auth/auth.module");
var user_module_1 = require("./app/user/user.module");
var constants_1 = require("./common/constants");
var file_module_1 = require("./file/file.module");
var pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                user_module_1.UserModule,
                auth_module_1.AuthModule,
                throttler_1.ThrottlerModule.forRoot({
                    ttl: constants_1.THROTTLE_TTL,
                    limit: constants_1.THROTTLE_LIMIT
                }),
                file_module_1.FileModule,
                mailer_1.MailerModule.forRootAsync({
                    useFactory: function () { return ({
                        transport: {
                            host: 'smtp.ethereal.email',
                            port: 587,
                            auth: {
                                user: 'chester.mcglynn@ethereal.email',
                                pass: 'dsFHpQ88vAATBhEAZS'
                            }
                        },
                        defaults: {
                            from: '"Chester Mglynn" <chester.mcglynn@ethereal.email>'
                        },
                        template: {
                            dir: __dirname + '/common/templates/mail',
                            adapter: new pug_adapter_1.PugAdapter(),
                            options: {
                                strict: true
                            }
                        }
                    }); }
                }),
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                {
                    provide: core_1.APP_GUARD,
                    useClass: throttler_guard_1.ThrottlerGuard
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
