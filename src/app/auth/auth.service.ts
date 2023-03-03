import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserService } from 'src/app/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { ExceptionMessagesDict } from 'src/common/dicts/exception-messages.dict';
import { join } from 'path';
import { imageMimeToExtension } from 'src/utils/mimetypes-to-extensions';
import { FileService } from 'src/file/file.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dbService: PrismaService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  generateToken(user: User) {
    return {
      apiToken: this.jwtService.sign(
        {
          sub: 'auth',
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      // return Boolean(data);
      return data;
    } catch (e) {
      throw new BadRequestException('Token Inválido');
    }
  }
  async register(data: AuthRegisterDTO) {
    const user = await this.userService.store(data);

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.dbService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        ExceptionMessagesDict.AUTHENTICATION_FAIL,
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        ExceptionMessagesDict.AUTHENTICATION_FAIL,
      );
    }

    return this.generateToken(user);
  }

  async forget(email) {
    const user = await this.dbService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(ExceptionMessagesDict.NOT_FOUND_MAIL);
    }

    // TO DO: Enviar o email

    return user;
  }

  async reset(password: string, token: string) {
    // TO DO: Validar o Token

    // mock de extração de id proveniente do token:
    const id = 8;
    const user = await this.dbService.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.generateToken(user);
  }

  async uploadProfilePic(user, photo: Express.Multer.File) {
    // write util to detect and veirfy image mimetypes returning corresponding extensions
    const extension = imageMimeToExtension(photo.mimetype);
    const result = await this.fileService.uploadFile(
      join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'storage',
        'photos',
        `profile-pic-${user.id}.${extension}`,
      ),
      photo,
    );

    return { result };
  }
}
