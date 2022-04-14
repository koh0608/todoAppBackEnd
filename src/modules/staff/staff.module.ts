import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { StaffEntity } from './entities/staff.entity';
import { StaffDTO, UpdateStaffDTO } from './dto/staff.dto';
import { GqlJWTAuthGuard } from '@guards/auth.guard';
import { GqlRolesGuard } from '@guards/roles.guard';
import { Roles } from '@decorators/auth.decorator';
import { UserType } from '@constants';
import { StaffResolver } from './staff.resolver';
import { StaffService } from './staff.service';

const guards = [GqlJWTAuthGuard, GqlRolesGuard];

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQuerySequelizeModule.forFeature([StaffEntity])],
      resolvers: [
        {
          EntityClass: StaffEntity,
          DTOClass: StaffDTO,
          UpdateDTOClass: UpdateStaffDTO,
          read: {
            guards,
            decorators: [Roles(UserType.ADMIN, UserType.STAFF)],
            one: { name: 'staff' },
            many: { name: 'staffs' }
          },
          create: { disabled: true },
          update: { guards, decorators: [Roles(UserType.ADMIN)] },
          delete: { guards, decorators: [Roles(UserType.ADMIN)] }
        }
      ]
    })
  ],
  controllers: [],
  providers: [StaffResolver, StaffService]
})
export class StaffModule {}
