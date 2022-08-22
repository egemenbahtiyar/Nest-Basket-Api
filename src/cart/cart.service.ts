import { Injectable } from '@nestjs/common';
import { Cart } from './entitiy/cart.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class CartService extends TypeOrmCrudService<Cart> {
  constructor(@InjectRepository(Cart) repo) {
    super(repo);
  }
}
