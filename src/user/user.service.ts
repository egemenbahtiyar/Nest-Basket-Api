import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entitiy/user.entitiy';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const newUser = this.userRepository.create({
      fullName: dto.fullname,
      isActive: dto.isActive,
      birthday: dto.birthday,
      email: dto.email,
      password: dto.password,
    });
    return await this.userRepository.save(newUser);
  }
}
