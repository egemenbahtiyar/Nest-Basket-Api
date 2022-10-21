import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Get('getAll')
  async getAllUsers() {
    return await this.userService.getUsers();
  }

  @Get('getUserById/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  async getUserById(@Param('id', new ParseIntPipe()) id) {
    return await this.userService.getUser(id);
  }

  @Post('deleteUser/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @HttpCode(200)
  async deleteUser(@Param('id', new ParseIntPipe()) id) {
    return await this.userService.deleteUser(id);
  }
}
