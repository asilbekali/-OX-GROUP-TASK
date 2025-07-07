import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  subdomain: string;
}
