import { Roles } from './roles.decorator';

export const ManagerOnly = () => Roles('MANAGER');
