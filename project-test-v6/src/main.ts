import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // http://localhost:3000/api/#/    pour tester avec swagger

  // configuration avec un chemin
  // exemple http://localhost:3000/api/v1/user
  // app.setGlobalPrefix('/api/v1')

  await app.listen(3000);
}
bootstrap();
