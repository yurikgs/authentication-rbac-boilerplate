import { Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const allowedRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log({ allowedRoles });

    if (!allowedRoles) return true;

    const user = context.switchToHttp().getRequest().user ?? '';
    let userRole;
    user ? (userRole = user.role) : (userRole = '');
    // console.log({ userRole });

    if (!userRole) {
      return false;
    } else if (!allowedRoles.includes(userRole)) {
      return false;
    } else {
      return true;
    }
    // const canActivate = false;

    return true;
  }
}
