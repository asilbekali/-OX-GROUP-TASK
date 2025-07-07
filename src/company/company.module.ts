import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, HttpModule, JwtModule.register({})],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
