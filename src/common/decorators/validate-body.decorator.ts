/**
 * @deprecated
 * Decorator em desuso, essa aplicação está usando a featrure 'whitelist' do class-validator
 */

import {
  applyDecorators,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { ValidateBodyInterceptor } from '../interceptors/validate-body.interceptor';

// O Nestjs não fornee uma função nativa para criar decorators 'pre´route handlers', como os request mapping deorators. A saída para fazer uma validação de dados do body, acessando o contexto de execução, é um interceptor. Aqui apenas setamos a classe que será recuperada nos metadados pelo interceptor e deixamos também a sintaxe ded implementaçã mais 'enxuta'.

export const ValidateBody = (bodyDto: any) => {
  return applyDecorators(
    SetMetadata('dto-class-name', bodyDto),
    UseInterceptors(ValidateBodyInterceptor),
  );
};
