import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string; // use ! to remove error of prop not initialized

  @IsNotEmpty()
  @MinLength(6)
  pass!: string;
}
