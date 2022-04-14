import { FilterableField, QueryOptions, IDField, Relation } from '@nestjs-query/query-graphql';
import { PagingStrategies } from '@nestjs-query/query-graphql';
import { BeforeCreateOne, BeforeCreateMany, BeforeUpdateOne, BeforeUpdateMany } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Field, Int, InputType } from '@nestjs/graphql';
import * as Hooks from '@common/nest-gql.hook';

@ObjectType('Admin')
@QueryOptions({
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: -1
})
/* ---------------------------------- Hooks --------------------------------- */
@BeforeCreateOne(Hooks.CreatedByOneHook)
@BeforeCreateMany(Hooks.CreatedByManyHook)
@BeforeUpdateOne(Hooks.UpdatedByOneHook)
@BeforeUpdateMany(Hooks.UpdatedByManyHook)
/* -------------------------------- Relations ------------------------------- */
@Relation('creator', () => AdminDTO, { disableUpdate: true, disableRemove: true })
export class AdminDTO {
  @IDField(() => Int) id: number;
  @FilterableField() name: string;
  @FilterableField() email: string;
  @FilterableField({ nullable: true }) contactNo: string;

  /* ------------------------------- BY Recorder ------------------------------ */
  @Field(() => Number) createdBy: number;
  @Field(() => Number, { nullable: true }) updatedBy: number;
  @Field(() => Number, { nullable: true }) deletedBy: number;

  /* -------------------------------- Timestamp ------------------------------- */
  @FilterableField(() => GraphQLISODateTime) createdAt: Date;
  @FilterableField(() => GraphQLISODateTime, { nullable: true }) updatedAt: Date;
  @FilterableField(() => GraphQLISODateTime, { nullable: true }) deletedAt: Date;
}

@InputType()
export class CreateAdminDTO {
  @Field() name: string;
  @Field() email: string;
  @Field({ nullable: true }) contactNo: string;
  @Field() password: string;
}

@InputType()
export class UpdateAdminDTO {
  @Field({ nullable: true }) name: string;
  @Field({ nullable: true }) email: string;
  @Field({ nullable: true }) contactNo: string;
  @Field() password: string;
}
