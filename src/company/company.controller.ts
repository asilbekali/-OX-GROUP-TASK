import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/company.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { AdminOnly } from '../auth/decorators/admin-only.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Company')
@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('register-company')
  @ApiOperation({ summary: 'Kompaniya yaratish yoki mavjudiga biriktirish' })
  @ApiResponse({
    status: 201,
    description: 'Kompaniya yaratildi yoki mavjudiga biriktirildi',
    schema: {
      example: {
        message: 'Kompaniya yaratildi. Foydalanuvchi ADMIN qilib biriktirildi',
      },
    },
  })
  async registerCompany(@Body() dto: RegisterCompanyDto, @Req() req: Request) {
    const user = req.user as any;
    return this.companyService.registerCompany(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @AdminOnly()
  @Delete('company/:id')
  @ApiOperation({ summary: 'Kompaniyani o‘chirish (faqat ADMIN)' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Kompaniya ID raqami',
  })
  @ApiResponse({
    status: 200,
    description: 'Kompaniya muvaffaqiyatli o‘chirildi',
    schema: {
      example: {
        message: 'Kompaniya muvaffaqiyatli o‘chirildi',
      },
    },
  })
  async deleteCompany(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.companyService.deleteCompany(id, user);
  }
}
