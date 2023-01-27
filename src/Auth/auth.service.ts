import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dbService: PrismaService,
  ) {}

  generateToken(payload: string) {
    this.jwtService.sign(payload);
  }

  checkToken(token: string) {
    this.jwtService.verify(token);
  }

  async login(email: string, password: string) {
    const user = await this.dbService.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`O email ou a senha estão incorretos`);
    }

    return user;
  }

  async forget(email) {
    const user = await this.dbService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`O email está incorreto`);
    }

    // TO DO: Enviar o email

    return user;
  }

  async reset(password: string, token: string) {
    // TO DO: Validar o Token

    // mock de extração de id proveniente do token:
    const id = 8;
    await this.dbService.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return `Senha atualizada com sucesso`;
  }
}
