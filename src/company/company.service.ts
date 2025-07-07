// src/company/company.service.ts

import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterCompanyDto } from './dto/company.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async registerCompany(dto: RegisterCompanyDto, user: any) {
    const { token, subdomain } = dto;

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
      throw new UnauthorizedException('Invalid OX Token');
    }

    const existing = await this.prisma.company.findUnique({
      where: { subdomain },
    });

    if (!existing) {
      const company = await this.prisma.company.create({
        data: {
          subdomain,
          name: `${subdomain} company`,
        },
      });

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          companyId: company.id,
          role: 'ADMIN',
        },
      });

      return { message: 'Company created and user set as ADMIN' };
    } else {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          companyId: existing.id,
          role: 'MANAGER',
        },
      });

      return { message: 'User assigned as MANAGER to existing company' };
    }
  }

  async deleteCompany(companyId: number, user: any) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    console.log(user.role);
    console.log(user);
    
    console.log(company.id);
    
    

    if (user.role !== 'ADMIN' || user.companyId !== company.id) {
      throw new ForbiddenException('You can only delete your own company');
    }

    await this.prisma.company.delete({
      where: { id: companyId },
    });

    return { message: 'Company deleted successfully' };
  }
}
