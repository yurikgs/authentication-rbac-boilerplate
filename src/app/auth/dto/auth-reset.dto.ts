import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsAlphanumeric, IsJWT, MaxLength, MinLength } from 'class-validator';

export class AuthResetDTO {
  @ApiProperty({
    description: 'New Password',
  })
  @MinLength(6)
  @MaxLength(32)
  @IsAlphanumeric()
  password: string;

  @ApiProperty({
    description: 'Reset Auth Token',
  })
  @IsJWT()
  token: string;
}
