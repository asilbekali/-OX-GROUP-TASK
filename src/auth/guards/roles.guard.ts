import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly role: 'ADMIN' | 'MANAGER') {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException('No user or role found');
    }

    if (user.role !== this.role) {
      throw new ForbiddenException(`Only ${this.role}s are allowed`);
    }

    return true;
  }
}
