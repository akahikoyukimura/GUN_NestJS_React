import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string; // use ! to remove error of prop not initialized

  @IsNotEmpty()
  @MinLength(6)
  pass!: string;
}
