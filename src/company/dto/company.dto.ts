import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterCompanyDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  subdomain: string;
}
