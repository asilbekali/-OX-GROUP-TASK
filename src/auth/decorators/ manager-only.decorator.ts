import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

export function ManagerOnly() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, new RoleGuard('MANAGER')),
  );
}
