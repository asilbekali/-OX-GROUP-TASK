import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ManagerOnly } from '../auth/decorators/ manager-only.decorator';
import { Request } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @ManagerOnly()
  @Get()
  async getProducts(
    @Query('page') page: string,
    @Query('size') size: string,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.productService.getProducts(user, Number(page), Number(size));
  }
}
