import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserService } from 'src/app/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { ExceptionMessagesDict } from 'src/common/dicts/exception-messages.dict';
import { join } from 'path';
import { imageMimeToExtension } from 'src/utils/mimetypes-to-extensions';
import { FileService } from 'src/file/file.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly dbService: PrismaService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly mailerService: MailerService,
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

  generateResetToken(user: User) {
    return {
      resetToken: this.jwtService.sign(
        {
          sub: 'reset',
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '1 day',
          issuer: 'authReset',
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

  checkResetToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'authReset',
      });
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
    const token = this.generateResetToken(user).resetToken;
    const link = `http://somedomainname.com/auth-reset/${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Recovery Request',
        template: 'auth-forget',
        context: {
          name: user.name,
          link,
        },
      });
    } catch (e) {
      throw new BadRequestException(`Couldnt send mail. Error: ${e}`);
    }

    return {
      warning:
        'Test response version. Do not return token or any data, just send token by bemail and return a success confirm response',
      resetToken: token,
    };
  }

  async reset(password: string, token: string) {
    let user;
    try {
      const tokenPayload = this.checkResetToken(token);
      const id = tokenPayload.id;
      if (isNaN(Number(id))) {
        throw new BadRequestException('Token Inválido');
      }
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      user = await this.dbService.user.update({
        where: {
          id,
        },
        data: {
          password,
        },
      });
    } catch (e) {
      throw new BadRequestException(`Error: ${e}`);
    }

    return {
      warning:
        'Test response version. You just need to return access token in final version, never return user password like this bellow this',
      user,
      apiToken: this.generateToken(user),
    };
  }

  async uploadProfilePic(user, photo: Express.Multer.File) {
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
