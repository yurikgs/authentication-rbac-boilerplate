"use strict";
exports.__esModule = true;
exports.User = void 0;
var common_1 = require("@nestjs/common");
var exception_messages_dict_1 = require("../dicts/exception-messages.dict");
exports.User = (0, common_1.createParamDecorator)(function (filter, context) {
    var user = context.switchToHttp().getRequest().user;
    // NOTA: Note como a sintaxe de array permite a consulta via string, o que não seria possível com a sintaxe de 'object.prop', a menos que se uma 'adaptação' com eval
    if (user) {
        var resp = void 0;
        filter ? (resp = user[filter]) : (resp = user);
        return resp;
    }
    else {
        throw new common_1.NotFoundException(exception_messages_dict_1.ExceptionMessagesDict.NOT_FOUND_USER_IN_METADATA);
    }
});
