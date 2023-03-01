import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';

export class UserModel {
  @ApiProperty({ description: 'id: Primary Key', minimum: 1 })
  id: number;
  @ApiProperty({
    description: 'User Name',
  })
  name: string;

  @ApiProperty({
    description: 'Email',
    uniqueItems: true,
  })
  email: string;

  @ApiProperty({
    description: 'Password -- Alphanumeric',
    minLength: 6,
    maxLength: 32,
  })
  password: string;

  @ApiProperty({
    description: 'Role',
    enum: Role,
    enumName: 'RolesEnum',
    default: 'User',
  })
  role: any;

  @ApiProperty({
    description: 'Birth Date -- aaaa-mm-dd',
    type: 'string',
    required: false,
  })
  birthAt: string | Date;
}
