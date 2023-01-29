import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';
import { UserIdCheckMiddleware } from 'src/common/middlewares/user-id-check-middleware';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
