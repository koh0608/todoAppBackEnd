import { AdminDTO, CreateAdminDTO, UpdateAdminDTO } from '@modules/admin/dto/admin.dto';
import { AdminEntity } from '@modules/admin/entities/admin.entity';
import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { GqlJWTAuthGuard } from '@guards/auth.guard';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

const entities = [AdminEntity];
const guards = [GqlJWTAuthGuard];

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQuerySequelizeModule.forFeature(entities)],
      resolvers: [
        {
          EntityClass: AdminEntity,
          DTOClass: AdminDTO,
          CreateDTOClass: CreateAdminDTO,
          UpdateDTOClass: UpdateAdminDTO,
          read: { guards },
          create: { disabled: true },
          update: { guards, many: { disabled: true } },
          delete: { guards }
        }
      ]
    })
  ],
  controllers: [],
  providers: [AdminResolver, AdminService]
})
export class AdminModule {}
