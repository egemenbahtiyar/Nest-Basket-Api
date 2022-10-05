import { Injectable } from '@nestjs/common';
import { Cart } from './entitiy/cart.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataSource, Repository } from 'typeorm';
import { AddProductToCartDto } from './dto/addProductToCart.dto';
import { ProductService } from '../product/product.service';
import { CartItem } from './entitiy/cartItem.entitiy';
import { UserService } from '../user/user.service';

@Injectable()
export class CartService extends TypeOrmCrudService<Cart> {
  private readonly cartItemRepository: Repository<CartItem>;
  private readonly cartRepository: Repository<Cart>;

  constructor(
    @InjectRepository(Cart) repo,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {
    super(repo);
    this.cartItemRepository = this.dataSource.getRepository(CartItem);
    this.cartRepository = this.dataSource.getRepository(Cart);
  }

  async addOrUpdateProduct(dto: AddProductToCartDto) {
    const userCart = await this.cartRepository.findOneBy({
      id: 1,
    });
    userCart.user = await this.userService.getUser(5);
    const product = await this.productService.getProductById(dto.productId);

    const cartItem = await this.cartItemRepository.create({
      product: product,
    });
    userCart.cartItems = [];
    userCart.cartItems.push(cartItem);
    return await this.repo.save(userCart);
  }
}
