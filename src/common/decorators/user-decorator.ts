import {
  NotFoundException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user;
    console.log(user);

    // NOTA: Note como a sintaxe de array permite a consulta via string, o que não seria possível com a sintaxe de 'object.prop', a menos que se uma 'adaptação' com eval
    if (user) {
      let resp;
      filter ? (resp = user[filter]) : (resp = user);
      return resp;
    } else {
      throw new NotFoundException(
        'User not found in request data. Please make sure you are in a AuthGuard guarded route',
      );
    }
  },
);
