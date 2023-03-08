"use strict";
/**
 * @deprecated
 * Esse Decorator foi apenas uma prova de conceito
 */
exports.__esModule = true;
exports.ParamId = void 0;
var common_1 = require("@nestjs/common");
exports.ParamId = (0, common_1.createParamDecorator)(function (_data, context) {
    // o _data é vazio e unknow porque nós não vamos recebêlo, nesse caso, queremos pegá-lo direto do conteto de execução
    // Descobrir como fazer a conversão usando ParseIntPipe(Vantagem - mensagem persoinalizadas).
    return Number(context.switchToHttp().getRequest().params.id);
});
