import { Injectable } from '@nestjs/common';
import {
  BeforeCreateOneHook,
  CreateOneInputType,
  BeforeCreateManyHook,
  CreateManyInputType,
  UpdateOneInputType,
  BeforeUpdateOneHook,
  BeforeUpdateManyHook,
  UpdateManyInputType
} from '@nestjs-query/query-graphql';

interface CreatedBy {
  createdBy: number;
}

interface UpdatedBy {
  updatedBy: number;
}

@Injectable()
export class CreatedByOneHook<T extends CreatedBy> implements BeforeCreateOneHook<T, GqlContext> {
  async run(instance: CreateOneInputType<T>, context: GqlContext): Promise<CreateOneInputType<T>> {
    const createdBy = context.req.user.id;
    instance.input.createdBy = createdBy;
    return instance;
  }
}

@Injectable()
export class CreatedByManyHook<T extends CreatedBy> implements BeforeCreateManyHook<T, GqlContext> {
  async run(instance: CreateManyInputType<T>, context: GqlContext): Promise<CreateManyInputType<T>> {
    const createdBy = context.req.user.id;
    instance.input = instance.input.map((c) => ({ ...c, createdBy }));
    return instance;
  }
}

@Injectable()
export class UpdatedByOneHook<T extends UpdatedBy> implements BeforeUpdateOneHook<T, GqlContext> {
  async run(instance: UpdateOneInputType<T>, context: GqlContext): Promise<UpdateOneInputType<T>> {
    instance.update.updatedBy = context.req.user.id;
    return instance;
  }
}

@Injectable()
export class UpdatedByManyHook<T extends UpdatedBy> implements BeforeUpdateManyHook<T, any, GqlContext> {
  async run(instance: UpdateManyInputType<T, T>, context: GqlContext): Promise<UpdateManyInputType<T, T>> {
    instance.update.updatedBy = context.req.user.id;
    return instance;
  }
}
