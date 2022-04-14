import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateMeDTO {
  @Field({ nullable: true }) email: string;
  @Field({ nullable: true }) name: string;
  @Field({ nullable: true }) phone: string;
}

@InputType()
export class UpdatePasswordDTO {
  @Field({ nullable: true }) currentPassword: string;
  @Field({ nullable: true }) newPassword: string;
  @Field({ nullable: true }) confirmPassword: string;
}
