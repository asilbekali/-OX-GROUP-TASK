import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail()
  email: string;
}

export class VerifyDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'OTP yuborilgan email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234',
    description: '4 xonali raqamli OTP kodi',
    minLength: 4,
    maxLength: 4,
  })
  @IsString()
  @Length(4, 4)
  otp: string;
}
