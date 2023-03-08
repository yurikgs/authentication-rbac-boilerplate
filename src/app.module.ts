import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { THROTTLE_LIMIT, THROTTLE_TTL } from './common/constants';
import { FileModule } from './file/file.module';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as nodemailer from 'nodemailer';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: THROTTLE_TTL,
      limit: THROTTLE_LIMIT,
    }),
    FileModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'chester.mcglynn@ethereal.email',
            pass: 'dsFHpQ88vAATBhEAZS',
          },
        },
        defaults: {
          from: '"Chester Mglynn" <chester.mcglynn@ethereal.email>',
        },
        template: {
          dir: __dirname + '/common/templates/mail',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
