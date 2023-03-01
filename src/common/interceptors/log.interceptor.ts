/**
 * @deprecated
 * Esse Interceptor foi apenas uma prova de conceito
 */

import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        console.log(`URL: ${request.url}`);
        console.log(`METHOD: ${request.method}`);
        console.log(`Execução em ${Date.now() - dt} milissegundos`);
      }),
    );
  }
}

/**
 * RxJS tap() operator is a utility operator that returns an observable output that is identical to the source observable but performs a side effect for every emission on the source observable.

In other words, you can say that the RxJS tap() operator is used to intercept each emission on the source observable and runs a function but returns an output that is identical to the source observable as long as it doesn't find any error.

This operator is generally used for debugging observables for the correct values or performing other side effects.
 * 
 */
