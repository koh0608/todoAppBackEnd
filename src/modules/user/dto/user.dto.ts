import { FilterableField, QueryOptions, IDField } from '@nestjs-query/query-graphql';
import { Relation, PagingStrategies } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, Int, registerEnumType } from '@nestjs/graphql';
import { AdminDTO } from '@modules/admin/dto/admin.dto';
import { UserType } from '@constants';
import { StaffDTO } from '@modules/staff/dto/staff.dto';
import { relationOption } from '@constants';

registerEnumType(UserType, { name: 'UserType' });

@ObjectType('User')
@QueryOptions({ enableTotalCount: true, pagingStrategy: PagingStrategies.OFFSET, maxResultsSize: -1 })
/* -------------------------------- Relations ------------------------------- */
@Relation('admin', () => AdminDTO, relationOption(true))
@Relation('staff', () => StaffDTO, relationOption(true))
export class UserDTO {
  @IDField(() => Int) id: number;
  @FilterableField(() => UserType) type: UserType;
  @FilterableField(() => GraphQLISODateTime) createdAt: Date;
}
