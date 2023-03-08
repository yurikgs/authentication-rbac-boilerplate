"use strict";
exports.__esModule = true;
exports.listUserDocConfig = void 0;
var swagger_user_model_1 = require("../../../../../../../../../../../src/swagger-config/models/response-models/swagger-user.model");
var nestjs_swagger_config_1 = require("nestjs-swagger-config");
exports.listUserDocConfig = {
    responses: {
        basicDefaults: {
            config: nestjs_swagger_config_1.statusConfigPatternsDict.standardGet,
            mode: nestjs_swagger_config_1.ObjGenModes.RemoveValues,
            statusCodes: [200, 401, 403]
        },
        detailedDefaults: [
            {
                status: 200,
                description: 'Ok',
                model: swagger_user_model_1.UserModel,
                modelConfig: 'array'
            },
            {
                status: 400,
                description: 'Bad Request'
            },
            {
                status: 401
            },
        ]
    }
};
