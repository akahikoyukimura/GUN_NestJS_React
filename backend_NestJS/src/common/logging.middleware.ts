import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('========== REQUEST ==========');
    // console.log('Method:', req.method);
    // console.log('URL:', req.url);
    // console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('=============================');

    next();
  }
}