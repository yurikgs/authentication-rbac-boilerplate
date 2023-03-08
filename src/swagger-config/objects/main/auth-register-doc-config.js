"use strict";
exports.__esModule = true;
exports.authRegisterDocConfig = void 0;
var api_body_1 = require("../api-body");
var nestjs_swagger_config_1 = require("nestjs-swagger-config");
exports.authRegisterDocConfig = {
    apiBody: api_body_1.AuthRegisterApiBodyConfig,
    responses: {
        basicDefaults: { config: nestjs_swagger_config_1.statusConfigPatternsDict.standardPost }
    }
};
