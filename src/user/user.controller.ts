import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Put,
  ParseIntPipe,
  UseInterceptors,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ParamId } from '../decorators/param-id.decorator';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';

// @UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.store(data);
  }
  @Get()
  async list() {
    return this.userService.list();
  }
  // @UseInterceptors(LogInterceptor)
  @Get(':id')
  async show(@ParamId() id: number) {
    return this.userService.show(id);
  }
  @Put(':id')
  async updatePut(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePutUserDTO,
  ) {
    return this.userService.updatePut(id, data);
  }
  @Patch(':id')
  async updatePatch(
    @Body() data: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePatch(id, data);
  }
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.userService.destroy(id);
  }
}
