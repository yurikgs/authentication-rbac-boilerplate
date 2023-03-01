import { CreateUserDTO } from './create-user.dto';
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {}
