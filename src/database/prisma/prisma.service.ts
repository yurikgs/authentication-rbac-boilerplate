import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async enableShutDownHooks(app: INestApplication) {
    this.$on('beforeExit', () => {
      app.close();
      Logger.warn('SAINDO DO PRISMA SERVICE', 'TESTE PRISMA PROVIDER');
    });
  }
}
