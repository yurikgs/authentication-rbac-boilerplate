import { Injectable } from '@nestjs/common';
import { isThere } from 'src/common/helpers/isThere';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbService: PrismaService) {}

  async store(data: CreateUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    return this.dbService.user.create({
      data,
    });
  }

  async list() {
    return this.dbService.user.findMany();
  }
  async show(id: number) {
    const user = await this.dbService.user.findUnique({
      where: {
        id,
      },
    });
    return isThere(user, 'UserService');
  }

  async updatePut(id: number, data: UpdatePutUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    if (await this.VerifyUser(id)) {
      return this.dbService.user.update({
        data,
        where: {
          id,
        },
      });
    } else {
      return isThere(false, 'UserService');
    }
  }
  async updatePatch(id: number, data: UpdatePatchUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    if (await this.VerifyUser(id)) {
      return this.dbService.user.update({
        data,
        where: {
          id,
        },
      });
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
}
