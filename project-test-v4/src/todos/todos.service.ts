import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './intarfaces/todo.interace';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'todos app',
      description: 'Create NestJS todos app',
      done: false,
    },
    {
      id: 2,
      title: 'bread',
      description: 'buy bread',
      done: true,
    },

    {
      id: 3,
      title: 'wine',
      description: 'buy wine',
      done: true,
    },
  ];

  ////////////////////////////////////////////////
  //pour retrouver par id
  findOne(id: string) {
    return this.todos.find((todo) => todo.id === Number(id)); //il faut rajouter le Number car on revoie un string Donc il faut préciser que l'ont renvoie un nombre
  }

  ////////////////////////////////////////////////
  //méthode GET
  findAll(): Todo[] {
    return this.todos;
  }

  ////////////////////////////////////////////////
  // méthode sans dto

  // //méthode POST
  // create(todo: Todo) {
  //     this.todos = [...this.todos, todo];

  // }

  //méthode POST
  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
  }

  ////////////////////////////////////////////////
  // méthode PATCH (modifier)
  // http://localhost:3000/todos/1
  update(id: string, todo: Todo) {
    const todoToUpdate = this.todos.find((t) => t.id === +id);
    //le + sert de raccourci pour dire que c une number
    if (!todoToUpdate) {
      return new NotFoundException('todo not found !');
    }
    if (todo.hasOwnProperty('done')) {
      todoToUpdate.done = todo.done;
    }
    if (todo.title) {
      todoToUpdate.title = todo.title;
    }
    if (todo.description) {
      todoToUpdate.description = todo.description;
    }

    const updatedTodos = this.todos.map((t) =>
      t.id !== +id ? t : todoToUpdate,
    );
    this.todos = [...updatedTodos];
    return { updatedTodo: 1, todo: todoToUpdate };
  }

  ////////////////////////////////////////////////
  // méthode DELETE(Supprimer)
  // http://localhost:3000/todos/1
  delete(id: string) {
    const nbOfTodosBeforeDelete = this.todos.length;
    this.todos = [...this.todos.filter((t) => t.id !== +id)];
    if (this.todos.length < nbOfTodosBeforeDelete) {
      return { deletedTodos: 1, nbTodos: this.todos.length };
    }
  }
}
