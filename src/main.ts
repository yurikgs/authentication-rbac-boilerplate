import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import { LogInterceptor } from './common/interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(env.PORT);
}
bootstrap();
