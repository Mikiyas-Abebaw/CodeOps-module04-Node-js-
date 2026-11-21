import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // honour an id the caller already sent, otherwise make one
    const incoming = req.headers['x-request-id'];
    const id =
      typeof incoming === 'string' && incoming.length > 0
        ? incoming
        : randomUUID();

    req.headers['x-request-id'] = id; // so the filter and later logger can read it
    res.setHeader('x-request-id', id); // so the client can quote it

    next(); // never forget this: without it the request hangs
  }
}