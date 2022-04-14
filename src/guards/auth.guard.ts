import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthStrategy } from '@constants';

/* ----------------------------- API Auth Guards ---------------------------- */
@Injectable()
export class JWTAuthGuard extends AuthGuard(AuthStrategy.JWT_ACCESS) {}
@Injectable()
export class JWTRefreshGuard extends AuthGuard(AuthStrategy.JWT_REFRESH) {}

/* --------------------------- Graphql Auth Guards -------------------------- */
@Injectable()
export class GqlJWTAuthGuard extends AuthGuard(AuthStrategy.JWT_ACCESS) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
