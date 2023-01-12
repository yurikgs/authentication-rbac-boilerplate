import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(40)
  //   @IsAlphanumeric()
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string | Date;
}
