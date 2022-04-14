import { Module } from '@nestjs/common';
import { UsertodoService } from './usertodo.service';
import { UsertodoController } from './usertodo.controller';
import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { UserTodoEntity } from './entities/usertodo.entity';

@Module({
  imports: [NestjsQuerySequelizeModule.forFeature([UserTodoEntity])],
  providers: [UsertodoService],
  controllers: [UsertodoController]
})
export class UsertodoModule {}
