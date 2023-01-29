import {
  createParamDecorator,
  ExecutionContext,
  ParseIntPipe,
} from '@nestjs/common';

export const ParamId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    // o _data é vazio e unknow porque nós não vamos recebêlo, nesse caso, queremos pegá-lo direto do conteto de execução

    // Descobrir como fazer a conversão usando ParseIntPipe(Vantagem - mensagem persoinalizadas).
    return Number(context.switchToHttp().getRequest().params.id);
  },
);
