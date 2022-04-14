import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard as TGuard, ThrottlerException } from '@nestjs/throttler';
import _ from 'lodash';

@Injectable()
export class ThrottlerGuard extends TGuard {
  getRequestResponse(context: ExecutionContext) {
    switch (context.getType() as GqlContextType) {
      case 'graphql':
        const { req } = GqlExecutionContext.create(context).getContext();
        return { req, res: req.res };
      default:
        return super.getRequestResponse(context);
    }
  }

  async handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const ip = _.get(client, 'conn.remoteAddress');
    const key = this.generateKey(context, ip);
    const ttls = await this.storageService.getRecord(key);

    if (ttls.length >= limit) {
      throw new ThrottlerException();
    }

    await this.storageService.addRecord(key, ttl);
    return true;
  }
}
