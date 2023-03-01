import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsAlphanumeric, IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({
    description: 'User Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password',
  })
  @MinLength(6)
  @MaxLength(32)
  @IsAlphanumeric()
  password: string;
}
