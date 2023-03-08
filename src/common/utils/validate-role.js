"use strict";
exports.__esModule = true;
exports.validateRole = void 0;
/**
 * Validate if a Data Transfer Object user Role is valid based on that type and Role enum compatibility
 */
var bad_request_exception_1 = require("@nestjs/common/exceptions/bad-request.exception");
var common_1 = require("@nestjs/common");
var role_enum_1 = require("../../../../../../../../../../src/common/enums/role.enum");
var exception_messages_dict_1 = require("../dicts/exception-messages.dict");
function validateRole(dto) {
    var isValidRole = false;
    if (dto.role) {
        for (var role in role_enum_1.Role) {
            if (!isValidRole && typeof role == 'string' && role == dto.role) {
                isValidRole = true;
                dto.role = role_enum_1.Role[role];
            }
        }
        if (!isValidRole) {
            common_1.Logger.error(exception_messages_dict_1.ExceptionMessagesDict.INVALID_ROLE);
            throw new bad_request_exception_1.BadRequestException(exception_messages_dict_1.ExceptionMessagesDict.INVALID_ROLE);
        }
    }
    return dto;
}
exports.validateRole = validateRole;
