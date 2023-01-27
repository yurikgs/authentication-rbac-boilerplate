import { IsAlphanumeric, IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @IsAlphanumeric()
  password: string;
}
