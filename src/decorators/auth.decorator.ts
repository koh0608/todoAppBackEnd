import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SetMetadata } from '@nestjs/common';

export const GqlAuthUser = createParamDecorator((_data, context: ExecutionContext): AuthData => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  return req.user;
});

export const AuthData = createParamDecorator((_data: unknown, ctx: ExecutionContext): AuthData => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
