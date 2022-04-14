import { FilterableField, QueryOptions, IDField } from '@nestjs-query/query-graphql';
import { Relation, PagingStrategies } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Int, Field, InputType, PartialType } from '@nestjs/graphql';
import { BeforeCreateOne, BeforeCreateMany, BeforeUpdateOne, BeforeUpdateMany } from '@nestjs-query/query-graphql';
import { UserDTO } from '@modules/user/dto/user.dto';
import { relationOption } from '@constants';
import * as Hooks from '@common/nest-gql.hook';

@ObjectType('Staff')
@QueryOptions({ enableTotalCount: true, pagingStrategy: PagingStrategies.OFFSET, maxResultsSize: -1 })
/* ---------------------------------- Hooks --------------------------------- */
@BeforeCreateOne(Hooks.CreatedByOneHook)
@BeforeCreateMany(Hooks.CreatedByManyHook)
@BeforeUpdateOne(Hooks.UpdatedByOneHook)
@BeforeUpdateMany(Hooks.UpdatedByManyHook)
/* -------------------------------- Relations ------------------------------- */
@Relation('creator', () => UserDTO, relationOption(false))
export class StaffDTO {
  @IDField(() => Int) id: number;
  @FilterableField() name: string;
  @FilterableField() email: string;
  @FilterableField({ nullable: true }) contactNo: string;
  @FilterableField() fullAccess: boolean;
  @FilterableField() active: boolean;

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
export class CreateStaffDTO {
  @Field() name: string;
  @Field() email: string;
  @Field() password: string;
  @Field({ nullable: true }) contactNo: string;
  @Field({ nullable: true }) fullAccess: boolean;
  @Field({ nullable: true }) active: boolean;
}

@InputType()
export class UpdateStaffDTO extends PartialType(CreateStaffDTO) {}

@InputType()
export class UpdateOneStaffDTO {
  @Field(() => Int) id: number;
  @Field() update: UpdateStaffDTO;
}

@InputType()
export class StaffChangePasswordDTO {
  @Field() oldPassword: string;
  @Field() newPassword: string;
  @Field() confirmPassword: string;
}
