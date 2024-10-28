import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  // @IsNotEmpty({ message: 'username is required' })
  username: string;
  // @IsNotEmpty({ message: 'password is required' })
  password: string;
}
