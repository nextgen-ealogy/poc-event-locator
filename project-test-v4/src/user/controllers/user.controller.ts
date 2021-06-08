import { Controller, Get } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';

@Controller('user')
export class UserController {
  @Get()
  findAll(): UserDto[] {
    return [{ name: 'chat' }, { name: 'soeur' }];
  }
}
