import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const started = Date.now();
    const requestId = req.headers['x-request-id'];
    const handler = `${ctx.getClass().name}.${ctx.getHandler().name}`;

    return next.handle().pipe(
      tap({
        next: () => this.log(req, handler, requestId, started, 'ok'),
        error: (e: Error) =>
          this.log(req, handler, requestId, started, e.name),
      }),
    );
  }

  private log(
    req: Request,
    handler: string,
    requestId: string | string[] | undefined,
    started: number,
    outcome: string,
  ): void {
    const ms = Date.now() - started;
    this.logger.log(
      `${req.method} ${req.url} -> ${handler} ${outcome} ${ms}ms [${requestId}]`,
    );
  }
}