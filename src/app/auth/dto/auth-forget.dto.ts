import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail } from 'class-validator';

export class AuthForgetDTO {
  @ApiProperty({
    description:
      'User Email, that will be used to send the reset link/token, if valid',
  })
  @IsEmail()
  email: string;
}
