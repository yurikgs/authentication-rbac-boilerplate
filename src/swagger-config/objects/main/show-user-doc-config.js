"use strict";
exports.__esModule = true;
exports.showUserDocConfig = void 0;
var nestjs_swagger_config_1 = require("nestjs-swagger-config");
var api_param_1 = require("../api-param");
exports.showUserDocConfig = {
    apiParam: api_param_1.ShowUserApiParamConfigObject,
    responses: {
        basicDefaults: { config: nestjs_swagger_config_1.statusConfigPatternsDict.standardGetById }
    }
};
