import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterCompanyDto {
  @ApiProperty({
    example: 'MyCompany',
    description: 'Yaratilayotgan kompaniya nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGci...',
    description: 'OX tizimidan olingan token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 'my-subdomain',
    description: 'OX subdomain nomi',
  })
  @IsString()
  @IsNotEmpty()
  subdomain: string;
}
