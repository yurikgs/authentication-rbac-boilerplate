import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UserModule } from 'src/app/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { forwardRef } from '@nestjs/common/utils';
import { ConfigModule } from '@nestjs/config';
import { env } from 'process';

@Module({
  imports: [
    JwtModule.register({ secret: env.JWT_SECRET }),
    forwardRef(() => UserModule),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
