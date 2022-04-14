import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Title } from 'aws-sdk/clients/codecommit';
import { where } from 'ramda';
import { TodoDto } from './dto/todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(TodoEntity)
    private todoModel: typeof TodoEntity
  ) {}

  async createTodo(todoDto: TodoDto) {
    const todo = await this.todoModel.create(todoDto);
    return todo;
  }

  async getTodoById(id: number) {
    const foundTodo = await this.todoModel.findOne({ where: { id } });
    if (!foundTodo) {
      throw new NotFoundException();
    }
    return foundTodo;
  }

  async getAllTodo() {
    const todo = await this.todoModel.findAll();
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async editTodoTag(id: number, tag: string) {
    await this.todoModel.update(
      {
        tag
      },
      {
        where: {
          id
        }
      }
    );
    return tag;
  }

  async editTodoTitle(id: number, title: string) {
    await this.todoModel.update(
      {
        title
      },
      {
        where: {
          id
        }
      }
    );
    return title;
  }

  async editTodoLink(id: number, link: string) {
    await this.todoModel.update(
      {
        link
      },
      { where: { id } }
    );
  }

  //Date format YYYY/MM/DD
  async editTodoDueDate(id: number, dueDate: Date) {
    await this.todoModel.update(
      {
        dueDate
      },
      { where: { id } }
    );
  }

  async editTodoMultiData(id: number, title?: string, link?: string, tag?: string, dueDate?: Date) {
    if(!title){
      title = (await this.getTodoById(id)).title
    }else if(!link){
      link = (await this.getTodoById(id)).link
    }else if(!tag){
      tag = (await this.getTodoById(id)).tag
    }else if(!dueDate){
      dueDate = (await this.getTodoById(id)).dueDate
    }
    await this.todoModel.update(
      {
        title,
        link,
        tag,
        dueDate,
      },
      { where: { id } }
    );
  }

  async deleteTodoById(id: number) {
    this.todoModel.destroy({
      where: {
        id
      }
    });
    return 'deleted';
  }

  async deleteAllTodo(createdBy: number) {
    this.todoModel.destroy({
      where: {
        creator: createdBy
      }
    });
    return 'deleted all';
  }
}
