import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UserController } from './user/controllers/user.controller';
import { TemplateController } from './template/template.controller';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [TodosModule],
  controllers: [
    AppController,
    UserController,
    CatsController,
    TemplateController,
  ],
  providers: [AppService],
})
export class AppModule {}
