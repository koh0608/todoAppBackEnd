import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { GqlJWTAuthGuard } from '@guards/auth.guard';

const guards = [GqlJWTAuthGuard];
const entities = [UserEntity];

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQuerySequelizeModule.forFeature(entities)],
      resolvers: [
        {
          EntityClass: UserEntity,
          DTOClass: UserDTO,
          read: { guards },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true }
        }
      ]
    })
  ],
  controllers: [],
  providers: []
})
export class UserModule {}
