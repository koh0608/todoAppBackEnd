import { Module } from '@nestjs/common';
import { NestjsQuerySequelizeModule } from '@nestjs-query/query-sequelize';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoEntity } from './entities/todo.entity';

@Module({
  imports: [NestjsQuerySequelizeModule.forFeature([TodoEntity])],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
