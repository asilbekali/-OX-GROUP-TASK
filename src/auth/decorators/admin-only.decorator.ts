import { Roles } from './roles.decorator';

export const AdminOnly = () => Roles('ADMIN');
