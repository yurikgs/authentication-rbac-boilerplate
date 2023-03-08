"use strict";
/**
 * Verifies the existence of something.
 * Primarily, verifies if a generic entity exists, returning an id-based mnessage. But it can be set to verify any existence with proper custom messages.
 */
exports.__esModule = true;
exports.isThere = void 0;
var common_1 = require("@nestjs/common");
var exception_messages_dict_1 = require("../dicts/exception-messages.dict");
function isThere(entity, context, isReturnMethod, message, error) {
    if (context === void 0) { context = null; }
    if (isReturnMethod === void 0) { isReturnMethod = true; }
    if (!message) {
        message = exception_messages_dict_1.ExceptionMessagesDict.INVALID_ID_404;
    }
    if (entity) {
        return entity;
    }
    else {
        if (isReturnMethod) {
            context ? common_1.Logger.warn(message, context) : common_1.Logger.warn(message);
            if (error)
                common_1.Logger.error(error);
            throw new common_1.HttpException(message, error && !isNaN(Number(error.statusCode))
                ? Number(error.statusCode)
                : 404);
        }
        else {
            return false;
        }
    }
}
exports.isThere = isThere;
