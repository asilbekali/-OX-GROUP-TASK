import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, VerifyDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login (OTP yuborish)' })
  @ApiResponse({
    status: 201,
    description: 'OTP muvaffaqiyatli yuborildi',
    schema: {
      example: {
        message: 'OTP sent successfully',
        email: 'user@example.com',
        otp: '1234',
      },
    },
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email);
  }

  @Post('verify')
  @ApiOperation({ summary: 'OTP ni tasdiqlash va JWT token olish' })
  @ApiResponse({
    status: 201,
    description: 'Access token qaytariladi',
    schema: {
      example: {
        accessToken: 'your.jwt.token.here',
      },
    },
  })
  verify(@Body() body: VerifyDto, @Req() req) {
    return this.authService.verifyOtp(body);
  }
}
