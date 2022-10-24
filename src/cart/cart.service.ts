import { Injectable } from '@nestjs/common';
import { Cart } from './entitiy/cart.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Equal, Repository } from 'typeorm';
import { AddProductToCartDto } from './dto/addProductToCart.dto';
import { ProductService } from '../product/product.service';
import { CartItem } from './entitiy/cartItem.entitiy';
import { UserService } from '../user/user.service';
import { UpdateProductToCartDto } from './dto/updateProductToCart.dto';

@Injectable()
export class CartService {
  private readonly cartItemRepository: Repository<CartItem>;

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {
    this.cartItemRepository = this.dataSource.getRepository(CartItem);
    this.cartRepository = this.dataSource.getRepository(Cart);
  }

  async addProductToCart(dto: AddProductToCartDto, userId: number) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        cartItems: {
          product: true,
        },
      },
      where: {
        user: Equal(await this.userService.getUser(userId)),
      },
    });
    //If cart is null create new cart for user
    if (userCart == null) {
      const cart = this.cartRepository.create({
        user: await this.userService.getUser(userId),
      });
      await this.cartRepository.save(cart);
      const cartItem = this.cartItemRepository.create({
        product: await this.productService.getProductById(dto.productId),
        Quantity: dto.quantity,
        cart: cart,
      });
      await this.cartItemRepository.save(cartItem);
    }
    const product = await this.productService.getProductById(dto.productId);
    userCart.cartItems.forEach((x) => x.product.name);

    //If same product already exists in cart increment count.
    if (userCart.cartItems.some((x) => x.product.id == product.id)) {
      const cItem = userCart.cartItems.find((x) => x.product.id == product.id);
      cItem.Quantity += dto.quantity;
      return await this.cartItemRepository.save(cItem);
    }

    const cartItem = await this.cartItemRepository.create({
      product: product,
      Quantity: dto.quantity,
    });
    cartItem.cart = userCart;
    return await this.cartItemRepository.save(cartItem);
  }

  async UpdateProductFromCart(dto: UpdateProductToCartDto, userId: number) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        cartItems: {
          product: true,
        },
      },
      where: {
        user: Equal(await this.userService.getUser(userId)),
      },
    });
    const cartItem = await this.cartItemRepository.findOne({
      relations: {
        cart: true,
        product: true,
      },
      where: {
        product: Equal(await this.productService.getProductById(dto.productId)),
        cart: Equal(userCart),
      },
    });
    cartItem.Quantity = dto.quantity;
    //If quantity equals zero delete item from cart
    if (cartItem.Quantity == 0) {
      return await this.cartItemRepository.remove(cartItem);
    }
    return await this.cartItemRepository.save(cartItem);
  }
}
