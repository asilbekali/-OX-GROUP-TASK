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

  async login(email: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: { email, role: Role.MANAGER },
      });
    }

    const otp = randomInt(1000, 9999).toString();
    await this.prisma.user.update({ where: { id: user.id }, data: { otp } });

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

    const token = this.jwtService.sign(
      {
        sub: user.id,
        role: user.role,
        companyId: user.companyId,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    return { accessToken: token };
  }
}
