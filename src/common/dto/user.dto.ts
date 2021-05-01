import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { User } from 'src/modules/user/user.entity';
import { Unique } from '../validator/unique.validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(Unique, [User])
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(Unique, [User])
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
