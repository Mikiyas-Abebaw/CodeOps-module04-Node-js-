import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { REQUIRE_API_KEY } from '../decorators/require-api-key.decorator';

type RequestWithUser = Request & { user?: { roles: string[] } };

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    // method first, then class: the same lookup order RolesGuard will use
    const required = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_API_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!required) return true; // route does not need a key

    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    const key = req.headers['x-api-key'];

    if (typeof key !== 'string' || key.length === 0) {
      throw new UnauthorizedException('x-api-key is required'); // 401
    }
    if (key !== this.config.getOrThrow<string>('API_KEY')) {
      throw new ForbiddenException('Invalid API key'); // 403
    }

    // temporary scaffolding until the week 12 JWT guard puts a real user here
    req.user = { roles: ['staff'] };
    return true;
  }
}