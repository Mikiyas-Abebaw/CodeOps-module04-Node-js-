import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { Role } from '../decorators/roles.decorator';

type RequestWithUser = Request & { user?: { roles: string[] } };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // method first, then class: a method-level @Roles overrides the controller's
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required?.length) return true; // no @Roles on this route = open

    const user = ctx.switchToHttp().getRequest<RequestWithUser>().user;
    return required.some((role) => user?.roles.includes(role) ?? false);
  }
}