"use strict";
exports.__esModule = true;
exports.CreateUserDocConfig = void 0;
var api_body_1 = require("../api-body");
var nestjs_swagger_config_1 = require("nestjs-swagger-config");
exports.CreateUserDocConfig = {
    apiOperation: api_body_1.CreateUserApiBodyConfig,
    apiBody: api_body_1.CreateUserApiBodyConfig,
    responses: {
        basicDefaults: { config: nestjs_swagger_config_1.statusConfigPatternsDict.standardPost }
    }
};
