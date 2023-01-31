import { Injectable } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CreateUserDTO } from 'src/app/user/dto/create-user.dto';

@Injectable()
export class ValidateBodyInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('intrerceptor');
    const bodyDto = this.reflector.get('dto-class-name', context.getHandler());
    const bodyDtoObject = new bodyDto();
    const body = context.switchToHttp().getRequest().body;
    Object.keys(body).forEach((key: string) => {
      if (!bodyDtoObject[key]) {
        throw new BadRequestException(
          `Invalid Param! Ref.: ${bodyDtoObject[key]}`,
        );
      }
    });

    return next.handle();
  }
}
