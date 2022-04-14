import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ActionResponse {
  @Field() message: string;
  @Field() success: boolean;
}

@ObjectType()
export class BooleanResponse {
  @Field() payload: boolean;
}
