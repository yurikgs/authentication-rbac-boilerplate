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

  @MinLength(6)
  @MaxLength(32)
  @IsAlphanumeric()
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string | Date;
}

console.log(Object.keys(CreateUserDTO.prototype));
