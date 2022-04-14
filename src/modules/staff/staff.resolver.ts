import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJWTAuthGuard } from '@guards/auth.guard';
import { StaffDTO, CreateStaffDTO, StaffChangePasswordDTO, UpdateStaffDTO } from './dto/staff.dto';
import { GqlAuthUser, Roles } from '@decorators/auth.decorator';
import { StaffService } from './staff.service';
import { GqlRolesGuard } from '@guards/roles.guard';
import { UserType } from '@constants';
import { StaffEntity } from './entities/staff.entity';

@Resolver(() => StaffDTO)
export class StaffResolver {
  constructor(private readonly service: StaffService) {}

  @UseGuards(GqlJWTAuthGuard, GqlRolesGuard)
  @Roles(UserType.ADMIN)
  @Mutation(() => StaffDTO)
  async createOneStaff(@Args('input') input: CreateStaffDTO, @GqlAuthUser() authData: AuthData): Promise<StaffDTO> {
    const result = await this.service.createOneStaff(input, authData);
    return result;
  }

  @UseGuards(GqlJWTAuthGuard, GqlRolesGuard)
  @Roles(UserType.STAFF)
  @Query(() => StaffDTO)
  async staffGetMeInfo(@GqlAuthUser() authData: AuthData): Promise<StaffDTO> {
    return StaffEntity.findByPk(authData.id);
  }

  @UseGuards(GqlJWTAuthGuard, GqlRolesGuard)
  @Roles(UserType.STAFF)
  @Mutation(() => StaffDTO)
  async staffUpdateMeInfo(@Args('input') input: UpdateStaffDTO, @GqlAuthUser() user: AuthData) {
    return this.service.staffUpdateMeInfo(input, user);
  }

  @UseGuards(GqlJWTAuthGuard, GqlRolesGuard)
  @Roles(UserType.STAFF)
  @Mutation(() => StaffDTO)
  async staffChangePassword(@Args('input') input: StaffChangePasswordDTO, @GqlAuthUser() user: AuthData) {
    return this.service.staffChangePassword(input, user);
  }
}
