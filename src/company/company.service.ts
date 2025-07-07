import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterCompanyDto } from './dto/company.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Role } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async registerCompany(dto: RegisterCompanyDto, user: any) {
    const { token, subdomain, name } = dto;

    try {
      try {
        await firstValueFrom(
          this.http.get(`https://${subdomain}.ox-sys.com/profile`, {
            headers: {
              Accept: 'application/json',
              Authorization: token,
            },
          }),
        );
      } catch (err) {
        throw new UnauthorizedException(
          'OX Token noto‘g‘ri yoki subdomain ishlamayapti',
        );
      }

      const existingCompany = await this.prisma.company.findFirst({
        where: {
          OR: [{ name }, { subdomain }],
        },
      });

      // Agar company mavjud bo‘lmasa => yaratamiz va user ADMIN bo‘ladi
      if (!existingCompany) {
        const newCompany = await this.prisma.company.create({
          data: {
            name,
            subdomain,
          },
        });

        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            companyId: newCompany.id,
            role: Role.ADMIN,
          },
        });

        return {
          message:
            'Kompaniya yaratildi. Foydalanuvchi ADMIN qilib biriktirildi',
        };
      }

      // Agar company mavjud bo‘lsa => user MANAGER qilib biriktiriladi
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          companyId: existingCompany.id,
          role: Role.MANAGER,
        },
      });

      return {
        message: 'Mavjud kompaniyaga MANAGER sifatida biriktirildi',
      };
    } catch (error) {
      console.error('registerCompany xatolik:', error);

      if (error instanceof UnauthorizedException) throw error;

      throw new InternalServerErrorException(
        'Kompaniya biriktirishda kutilmagan xatolik yuz berdi',
      );
    }
  }

  async deleteCompany(companyId: number, user: any) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!company) {
        throw new NotFoundException('Kompaniya topilmadi');
      }

      if (user.role !== 'ADMIN' || user.companyId !== company.id) {
        throw new ForbiddenException(
          'Faqat o‘z kompaniyangizni o‘chirishingiz mumkin',
        );
      }

      await this.prisma.company.delete({ where: { id: companyId } });

      return { message: 'Kompaniya muvaffaqiyatli o‘chirildi' };
    } catch (error) {
      console.error('deleteCompany xatolik:', error);
      throw error;
    }
  }
}
