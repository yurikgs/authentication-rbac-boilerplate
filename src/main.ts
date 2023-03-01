import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { env } from 'process';
import { AppModule } from './app.module';
import { LogInterceptor } from './common/interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalInterceptors(new LogInterceptor());
  const docsConfig = new DocumentBuilder()
    .setTitle(`Basic User Directory API`)
    .setDescription(
      `Simple but full functional Users Base Directory API, providing all register, login/out, search, RBAC access control, object validation and brute-force attack prevent features. Stacks: Node / Nestjs, Mysql.`,
    )
    .setVersion('0.5')
    .addTag(
      'Auth',
      'Auhtentication Endpoints. To be used to create and manage access control resources.',
    )
    .addTag(
      'Users',
      'Users Management resources. Provides complete CRUD features to create and manage application users. Just can be accessed by Admin users.',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(env.PORT);
}
bootstrap();
