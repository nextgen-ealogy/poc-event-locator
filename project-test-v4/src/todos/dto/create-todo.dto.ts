/* eslint-disable prettier/prettier */
export class CreateTodoDto {
  readonly id: number;
  readonly title: string;
  readonly done: boolean;
  readonly description?: string;
}

//le DTO nous permet de préciser ce que l'ont souhaite obtenir comme type
// le ? précise qu'il n'est pas obligé d'utiliser la variable
