import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJWTAuthGuard } from '@guards/auth.guard';
import { AdminDTO, CreateAdminDTO } from './dto/admin.dto';
import { GqlAuthUser, Roles } from '@decorators/auth.decorator';
import { AdminService } from './admin.service';
import { GqlRolesGuard } from '@guards/roles.guard';
import { UserType } from '@constants';

@UseGuards(GqlJWTAuthGuard)
@Resolver(() => AdminDTO)
export class AdminResolver {
  constructor(private readonly service: AdminService) {}

  @UseGuards(GqlJWTAuthGuard, GqlRolesGuard)
  @Roles(UserType.ADMIN)
  @Mutation(() => AdminDTO)
  async createOneAdmin(@Args('input') input: CreateAdminDTO, @GqlAuthUser() authData: AuthData): Promise<AdminDTO> {
    const result = await this.service.createOneAdmin(input, authData);
    return result;
  }
}
