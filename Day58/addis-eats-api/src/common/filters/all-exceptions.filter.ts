import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const { status, message } = this.translate(exception);

    if (status >= 500) this.logger.error(exception);

    res.status(status).json({
      statusCode: status,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] ?? null,
    });
  }

  private translate(e: unknown): { status: number; message: unknown } {
    // 1 - Nest's own exceptions already carry a status
    if (e instanceof HttpException) {
      const body = e.getResponse();
      return {
        status: e.getStatus(),
        message:
          typeof body === 'object' && body !== null && 'message' in body
            ? (body as { message: unknown }).message
            : e.message,
      };
    }

    // 2 - anything else is ours: log it, tell the client nothing
    return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
  }
}