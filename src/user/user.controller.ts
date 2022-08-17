import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/create')
  async createUser(dto: CreateUserDto) {
    await this.userService.createUser(dto);
  }
}
