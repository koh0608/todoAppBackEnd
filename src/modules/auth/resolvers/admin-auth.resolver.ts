import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/sequelize';
import { GqlJWTAuthGuard } from '@guards/auth.guard';
import { AdminDTO } from '../../admin/dto/admin.dto';
import { AdminEntity } from '../../admin/entities/admin.entity';
import { GqlAuthUser } from 'src/decorators/auth.decorator';
import * as DTO from '../dto/auth-gql.dto';
import { comparePassword } from 'src/services/bcrypt.service';

@UseGuards(GqlJWTAuthGuard)
@Resolver(() => AdminDTO)
export class AdminAuthResolver {
  constructor(@InjectModel(AdminEntity) private Admin: typeof AdminEntity) {}

  @Query(() => AdminDTO)
  adminGetMeInfo(@GqlAuthUser() user: AuthData) {
    return this.Admin.findByPk(user.id);
  }

  @Mutation(() => AdminDTO)
  async adminUpdateMeInfo(@Args('input') input: DTO.UpdateMeDTO, @GqlAuthUser() user: AuthData) {
    const me = await this.Admin.findOne({ where: { id: user.id } });
    if (!me) throw new Error('Account not found');
    await me.update(input);
    return this.Admin.findByPk(user.id);
  }

  @Mutation(() => AdminDTO)
  async adminChangeMyPassword(@Args('input') input: DTO.UpdatePasswordDTO, @GqlAuthUser() user: AuthData) {
    const me = await this.Admin.findOne({ where: { id: user.id } });
    if (!me) throw new Error('Account not found');

    if (input.confirmPassword !== input.newPassword) {
      throw new Error('New password and confirmation password does not match.');
    }

    const valid = await comparePassword(input.currentPassword, me.password);
    if (!valid) throw new Error('Incorrect old password.');

    await me.update({ password: input.newPassword });
    return this.Admin.findByPk(user.id);
  }
}
