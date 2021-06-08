import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!  try : http://localhost:3000/todos/';
  }
}
