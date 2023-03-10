import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsAlphanumeric,
  validate,
  IsEnum,
  IsNumberString,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email',
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password -- Alphanumeric',
    minLength: 6,
    maxLength: 32,
  })
  @MinLength(6)
  @MaxLength(32)
  @IsAlphanumeric()
  password: string;

  @ApiProperty({
    description: 'Role',
    enum: Role,
    enumName: 'RolesEnum',
    default: 'User',
  })
  @IsOptional()
  @IsEnum(Role)
  role: any;

  @ApiProperty({
    description: 'Birth Date -- aaaa-mm-dd',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  birthAt: string | Date;
}
