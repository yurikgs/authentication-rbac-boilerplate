import { Injectable } from '@nestjs/common';
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
    return this.dbService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updatePut(id: number, data: UpdatePutUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    return this.dbService.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async updatePatch(id: number, data: UpdatePatchUserDTO) {
    data.birthAt ? (data.birthAt = new Date(data.birthAt)) : null;
    return this.dbService.user.update({
      data: {
        name: data.name,
      },
      where: {
        id,
      },
    });
  }
  async destroy(id: number) {
    return this.dbService.user.delete({
      where: {
        id,
      },
    });
  }
}
