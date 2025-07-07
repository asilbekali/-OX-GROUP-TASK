import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { VerifyDto } from './dto/auth.dto';
import { Role } from '@prisma/client';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly defaultOxToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTE3ODM5MjMsImV4cCI6MTc1MjgyMDcyMywicm9sZXMiOlt7fV0sImlkIjoxMjY0MDJ9.MR_DnZP8dpLSVt_frkmCfq6GFiLRIFsUF9xn7PxQxOxCzrJL_mn2oSTh2GMmocXdQk_HpCnOK3nhBj38GP3Xg4ZAJmdGCsMD2OCiJAPgeXSp8mxYpUHFXNoc-9TB9jhNZQNafsHR3EyZlTGDhrvdV-wY60PQZDPIRxGXtwUx3V3rPexNbiqAeSHdmBRo9aJ9tjkKa0vaI-qXSpyafemCUcauo9T3bswdKU_lw8vbrfPaeKhKOAUG-sZLnQ0lMusxT4v5c-oTKuJx7VwQuaFvaXbMDprxf2QtPloHYc2A1IEhF6EUmeydvFbwM2vzD9uZTfQwG8cCrwTqJlALeYgIdRcX92O8_s3o1QDW7aOfLupMGoRXZ2ktBiqdAMCmqtizSns-W_XOqiCvd_evaJrOtKodM2JOchArFl5A6vPFRi01zYBOutq8fzQIBn8e5yjkmZgJfrxtx-K56YhQZCHk7Kw1YEYFpPZLmZbmBLloB2ke1qxuOofMJr84Td4_f41UjsSAh9yZW1ZcnIywsHeF5lYsRyNQHguUMjUxqtNGajtE8j9TGBlxRA8dZuC-LgaxjrrijDxEQrwqV5nd5l8IsK-qIG3KQEZT2krHFl4_gxjdHG3IyuNqVsF-FYTxLDve1JwNidQjDYbCZN5XLrSTWf-O-9FxkyRgE-npMqi2lz8';

  async login(email: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          role: Role.MANAGER,
          oxToken: this.defaultOxToken,
        },
      });
    }

    const otp = randomInt(1000, 9999).toString();

    await this.prisma.user.update({
      where: { id: user.id },
      data: { otp },
    });

    return { message: 'OTP sent successfully', email, otp };
  }

  async verifyOtp(dto: VerifyDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || user.otp !== dto.otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    await this.prisma.session.create({
      data: {
        userId: user.id,
        viewerIp: '127.0.0.1',
      },
    });

    if (!user.oxToken) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { oxToken: this.defaultOxToken },
      });
    }

    const updatedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        role: true,
        oxToken: true,
        companyId: true,
      },
    });

    if (!updatedUser) {
      throw new UnauthorizedException('User not found after update');
    }

    const token = this.jwtService.sign(
      {
        sub: updatedUser.id,
        role: updatedUser.role,
        companyId: updatedUser.companyId,
        email: updatedUser.email,
        oxToken: updatedUser.oxToken,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    return { accessToken: token };
  }
}
