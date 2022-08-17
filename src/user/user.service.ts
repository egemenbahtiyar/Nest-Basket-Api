import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entitiy/user.entitiy';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async createUser(dto: CreateUserDto) {
    const newUser = this.userRepository.create({
      fullName: dto.fullname,
      isActive: dto.isActive,
      birthday: dto.birthday,
      email: dto.email,
      password: dto.password,
    });
    await this.userRepository.save(newUser);
  }
}
