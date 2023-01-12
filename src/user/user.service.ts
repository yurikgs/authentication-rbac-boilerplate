import { Injectable } from '@nestjs/common';
import { isThere } from 'src/functions/isThere';
import { PrismaService } from 'src/prisma/prisma.service';
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
    const user = await this.findById(id);
    return isThere(user, 'UserService');
  }

  async updatePut(id: number, data: UpdatePutUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    const user = await this.findById(id);
    if (user) {
      return this.dbService.user.update({
        data,
        where: {
          id,
        },
      });
    } else {
      return isThere(user, 'UserService');
    }
  }
  async updatePatch(id: number, data: UpdatePatchUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    const user = await this.findById(id);
    if (user) {
      return this.dbService.user.update({
        data,
        where: {
          id,
        },
      });
    } else {
      return isThere(user, 'UserService');
    }
  }
  async destroy(id: number) {
    const user = await this.findById(id);
    if (user) {
      await this.dbService.user.delete({
        where: {
          id,
        },
      });
      return {
        message: `User ${id} deleted with success`,
      };
    } else {
      return isThere(user, 'UserService');
    }
  }

  //   aux
  async findById(id: number) {
    return await this.dbService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
