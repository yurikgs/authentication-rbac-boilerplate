import { Injectable, NestMiddleware } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
@Injectable()
export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    // note que o parametro sói vem corretamente separado e nomeado como 'id' na req SE EU INFORMÁ-LO COMO PARÂMETRO (:id) nas configurações de path da chamada do Middleware (a chamada )
    // console.log('req: ', Object.keys(req), req.params);
    if (isNaN(Number(req.params.id)) || req.params.id <= 0)
      throw new BadRequestException('Id Inválido!');
    next();
  }
}
