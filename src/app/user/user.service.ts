import { Injectable } from '@nestjs/common';
import { isThere } from 'src/common/utils/isThere';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import * as bcrypt from 'bcrypt';
import { validateRole } from 'src/common/utils/validate-role';

@Injectable()
export class UserService {
  constructor(private readonly dbService: PrismaService) {}

  async store(data: CreateUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    data = validateRole(data);
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    if (await this.VerifyUniqueMail(data.email)) {
      const user = await this.dbService.user.create({
        data,
      });
      delete user.password;
      return user;
    } else {
      return isThere(false, 'UserService', true, `Invalid/ duplicated Email`, {
        statusCode: '400',
      });
    }
  }

  async list() {
    const users = await this.dbService.user.findMany();
    // criar um utilitário, type safe
    users.forEach((user) => {
      delete user.password;
      console.log('oi');
    });
    return users;
  }
  async show(id: number) {
    let user = await this.dbService.user.findUnique({
      where: {
        id,
      },
    });
    user = isThere(user, 'UserService');
    console.log(user);
    delete user.password;
    return user;
  }

  async updatePut(id: number, data: UpdatePutUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    if (await this.VerifyUser(id)) {
      const user = await this.dbService.user.update({
        data,
        where: {
          id,
        },
      });
      delete user.password;
      return user;
    } else {
      return isThere(false, 'UserService');
    }
  }
  async updatePatch(id: number, data: UpdatePatchUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    if (await this.VerifyUser(id)) {
      const user = await this.dbService.user.update({
        data,
        where: {
          id,
        },
      });
      delete user.password;
      return user;
    } else {
      return isThere(false, 'UserService');
    }
  }
  async destroy(id: number) {
    if (await this.VerifyUser(id)) {
      await this.dbService.user.delete({
        where: {
          id,
        },
      });
      return {
        message: `User ${id} deleted with success`,
      };
    } else {
      return isThere(false, 'UserService');
    }
  }

  //   aux
  async VerifyUser(id: number): Promise<number> {
    return await this.dbService.user.count({
      where: {
        id,
      },
    });
  }
  async VerifyUniqueMail(email: string): Promise<boolean> {
    const count = await this.dbService.user.count({
      where: {
        email,
      },
    });
    return count == 0;
  }
}
