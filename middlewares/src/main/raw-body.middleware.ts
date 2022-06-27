import { Injectable, NestMiddleware, RawBodyRequest } from '@nestjs/common';
import { raw } from 'body-parser';
import { NextFunction } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  public use(req: RawBodyRequest<any>, res: any, next: NextFunction): void {
    raw({ type: '*/*' })(req, res, next);
  }
}

