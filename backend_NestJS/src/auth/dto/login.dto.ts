import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string; // use ! to remove error of prop not initialized

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
    message:
      'Password must contain at least one letter, one number, and one special character',
  })
  password!: string;
}
