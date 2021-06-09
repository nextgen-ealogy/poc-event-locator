import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './intarfaces/todo.interace';
import { TodosModule } from './todos.module';
import { TodosService } from './todos.service';

// localhost:3000/todos
@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  ////////////////////////////////////////////////
  //localhost:3000/todos/id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
    // console.log('id',id);
  }

  ////////////////////////////////////////////////
  // http://localhost:3000/todos
  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  ////////////////////////////////////////////////
  // http://localhost:3000/todos
  @Post()
  createTodo(@Body() newTodo: CreateTodoDto) {
    // console.log('newTodo', newTodo);
    this.todoService.create(newTodo);
  }

  ////////////////////////////////////////////////
  // méthode PATCH (modifier)
  // http://localhost:3000/todos/1
  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto) {
    return this.todoService.update(id, todo);
  }

  ////////////////////////////////////////////////
  // méthode DELETE(Supprimer)
  // http://localhost:3000/todos/1
  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
