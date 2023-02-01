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
  UseGuards,
} from '@nestjs/common';
import { ParamId } from '../../common/decorators/param-id.decorator';
import { LogInterceptor } from 'src/common/interceptors/log.interceptor';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { ValidateBody } from 'src/common/decorators/validate-body.decorator';
import { ValidateBodyInterceptor } from 'src/common/interceptors/validate-body.interceptor';
import { SetAccessRoles } from 'src/common/decorators/set-access-roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RoleGuard } from 'src/common/guards/role.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { validateRole } from '../../common/utils/validate-role';

// @UseInterceptors(LogInterceptor)
@SetAccessRoles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  // Trying to find a way to validate
  // @ValidateBody(CreateUserDTO)
  // @UseInterceptors(ValidateBodyInterceptor)
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
