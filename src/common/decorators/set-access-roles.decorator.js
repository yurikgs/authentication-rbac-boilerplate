"use strict";
exports.__esModule = true;
exports.SetAccessRoles = void 0;
var common_1 = require("@nestjs/common");
var SetAccessRoles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)('roles', roles);
};
exports.SetAccessRoles = SetAccessRoles;
