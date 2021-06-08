import { Controller, Get } from '@nestjs/common';

@Controller('template')
export class TemplateController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
