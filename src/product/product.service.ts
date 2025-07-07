// src/product/product.service.ts

import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private readonly http: HttpService) {}

  async getProducts(user: any, page: number, size: number) {
    if (size > 20) {
      throw new BadRequestException('Size cannot be greater than 20');
    }

    

    if (!user.companyId || !user.oxToken) {
      throw new UnauthorizedException(
        'User must be linked to a company with valid token  to access products',
      );
    }

    const url = `https://demo.ox-sys.com/variations?page=${page}&size=${size}`;

    const response = await firstValueFrom(
      this.http.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: user.token,
        },
      }),
    );

    return response.data;
  }
}
