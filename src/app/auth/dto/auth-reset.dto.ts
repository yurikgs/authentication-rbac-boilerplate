import { IsAlphanumeric, IsJWT, MaxLength, MinLength } from 'class-validator';

export class AuthResetDTO {
  @MinLength(6)
  @MaxLength(32)
  @IsAlphanumeric()
  password: string;

  @IsJWT()
  token: string;
}
