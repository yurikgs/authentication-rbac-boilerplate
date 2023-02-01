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
  @IsNumberString()
  // @IsEnum(Role)
  // NÃO ESTÁ CRIANDO
  role: number;

  @IsOptional()
  @IsDateString()
  birthAt: string | Date;
}

console.log(Object.keys(CreateUserDTO.prototype));

// tryied to use class validators validate
// but it failed :_(
// const bodyTest = {
//   name: 'juan',
//   email: 'juan@juan.com',
//   password: 'password10',
//   birthAt: '1992-08-06',
//   script: 'invalid/malicious',
// };
// const dto = new CreateUserDTO();
// Object.keys(bodyTest).forEach((key) => {
//   dto[key] = bodyTest[key];
// });
// validate(dto, { forbidUnknownValues: false }).then((errors) => {
//   if (errors.length > 0) {
//     console.log('validation failed. errors: ', errors);
//   } else {
//     console.log('validation succeed');
//   }
// });
