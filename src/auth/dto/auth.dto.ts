import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
}

export class VerifyDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 4)
  otp: string;
}
