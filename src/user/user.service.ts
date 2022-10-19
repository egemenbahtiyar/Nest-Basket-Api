import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entitiy/user.entitiy';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Equals } from 'class-validator';

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

  public async validateCredentials(user: User, password: string) {
    return await compare(password, user.password);
  }
}
