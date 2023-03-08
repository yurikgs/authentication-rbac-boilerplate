"use strict";
/**
 * @deprecated
 * Decorator em desuso, essa aplicação está usando a featrure 'whitelist' do class-validator
 */
exports.__esModule = true;
exports.ValidateBody = void 0;
var decorators_1 = require("@nestjs/common/decorators");
var validate_body_interceptor_1 = require("../interceptors/validate-body.interceptor");
// O Nestjs não fornee uma função nativa para criar decorators 'pre´route handlers', como os request mapping deorators. A saída para fazer uma validação de dados do body, acessando o contexto de execução, é um interceptor. Aqui apenas setamos a classe que será recuperada nos metadados pelo interceptor e deixamos também a sintaxe ded implementaçã mais 'enxuta'.
var ValidateBody = function (bodyDto) {
    return (0, decorators_1.applyDecorators)((0, decorators_1.SetMetadata)('dto-class-name', bodyDto), (0, decorators_1.UseInterceptors)(validate_body_interceptor_1.ValidateBodyInterceptor));
};
exports.ValidateBody = ValidateBody;
