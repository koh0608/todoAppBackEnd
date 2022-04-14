import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiTags('Todo')
  @Post('createTodo')
  createTodo(@Body() todoDto: TodoDto) {
    return this.todoService.createTodo(todoDto);
  }

  // @Get('/:id')
  // findTodo(@Param('id') id:number){
  //     return this.todoService.findTodo(id);
  // }

  @ApiTags('Todo')
  @Get('getAllTodo')
  getAllTodo() {
    return this.todoService.getAllTodo();
  }

  @ApiTags('Todo')
  @Get('todoById/:id')
  getTodoById(@Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @ApiTags('Todo')
  @Patch('editTodoTag/:id')
  editTodoTag(@Param('id') id: number, @Body() body: any) {
    return this.todoService.editTodoTag(id, body.tag);
  }

  @ApiTags('Todo')
  @Patch('editTodoTitle/:id')
  editTodoTitle(@Param('id') id: number, @Body() body: any) {
    return this.todoService.editTodoTitle(id, body.title);
  }

  @ApiTags('Todo')
  @Patch('editTodoLink/:id')
  editTodoLink(@Param('id') id: number, @Body() body: any) {
    return this.todoService.editTodoLink(id, body.link);
  }

   //Date format YYYY/MM/DD
  @ApiTags('Todo')
  @Patch('editTodoDueDate/:id')
  editTodoDueDate(@Param('id') id: number, @Body() body: any) {
    return this.todoService.editTodoDueDate(id, body.dueDate);
  }

  //Date format YYYY/MM/DD
  @ApiTags('Todo')
  @Put('editTodo/:id')
  editTodo(@Param('id') id: number, @Body() body: any) {
    return this.todoService.editTodoMultiData(id, body.title, body.link, body.tag, body.dueDate);
  }


  @ApiTags('Todo')
  @Delete('deleteTodoById/:id')
  deleteTodoById(@Param('id') id: number) {
    return this.todoService.deleteTodoById(id);
  }

  @ApiTags('Todo')
  @Delete('deleteAllTodo/:createdBy')
  deleteAllTodo(@Param('createdBy') createdBy: number) {
    return this.todoService.deleteAllTodo(createdBy);
  }
}
