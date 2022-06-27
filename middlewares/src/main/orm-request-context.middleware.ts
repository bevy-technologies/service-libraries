import { MikroORM, RequestContext } from '@mikro-orm/core';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ORMRequestContextMiddleware implements NestMiddleware {
    constructor(private readonly orm: MikroORM) {}

    use(req: any, res: any, next: () => void): void {
        RequestContext.create(this.orm.em, next);
    }
}
