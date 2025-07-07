import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/company.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { AdminOnly } from '../auth/decorators/admin-only.decorator';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register-company')
  async registerCompany(@Body() dto: RegisterCompanyDto, @Req() req: Request) {
    const user = req.user as any;
    return this.companyService.registerCompany(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @AdminOnly()
  @Delete('company/:id')
  async deleteCompany(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.companyService.deleteCompany(id, user);
  }
}
