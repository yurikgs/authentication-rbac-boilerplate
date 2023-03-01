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
  UseGuards,
} from '@nestjs/common';
import { ParamId } from '../../common/decorators/param-id.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { SetAccessRoles } from 'src/common/decorators/set-access-roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RoleGuard } from 'src/common/guards/role.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import { MethodDocConfig } from 'nestjs-swagger-config';
import { statusConfigPatternsDict } from 'nestjs-swagger-config/src/responses-generator/dicts/status-config-patterns-dict';
import { OperationsDefaultResponses } from 'nestjs-swagger-config/src/responses-generator/decorators/operations-default-responses';
import { listUserDocConfig } from 'src/swagger-config/objects/main/list-user-doc-config';
import { showUserDocConfig } from 'src/swagger-config/objects/main/show-user-doc-config';
import { CreateUserDocConfig } from 'src/swagger-config/objects/main/create-user-doc-config';

@ApiTags('Users')
@ApiBearerAuth()
// @UseInterceptors(LogInterceptor)
@SetAccessRoles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MethodDocConfig(listUserDocConfig)
  @Get()
  async list() {
    return this.userService.list();
  }

  @MethodDocConfig(showUserDocConfig)
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @MethodDocConfig(CreateUserDocConfig)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.store(data);
  }

  @OperationsDefaultResponses(statusConfigPatternsDict.standardPut)
  @Put(':id')
  async updatePut(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePutUserDTO,
  ) {
    return this.userService.updatePut(id, data);
  }

  @OperationsDefaultResponses(statusConfigPatternsDict.standardPatch)
  @Patch(':id')
  async updatePatch(
    @Body() data: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePatch(id, data);
  }

  @OperationsDefaultResponses(statusConfigPatternsDict.standardDelete)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.userService.destroy(id);
  }
}
