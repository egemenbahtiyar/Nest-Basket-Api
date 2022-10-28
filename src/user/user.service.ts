import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entitiy/user.entitiy';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const newUser = this.userRepository.create({
      fullName: dto.fullName,
      isActive: dto.isActive,
      birthday: dto.birthday,
      email: dto.email,
      password: await hash(dto.password, 10),
    });
    return await this.userRepository.save(newUser);
  }

  async getUser(userId: number) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return await this.userRepository.remove(user);
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async findForEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const newEntity = Object.assign({ id: id }, dto);
    console.log(newEntity);
    return await this.userRepository.save(newEntity);
  }

  public async validateCredentials(user: User, password: string) {
    return await compare(password, user.password);
  }
}
