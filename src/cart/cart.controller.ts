import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/addProductToCart.dto';
import { UpdateProductToCartDto } from './dto/updateProductToCart.dto';

@Controller('cart')
export class CartController {
  constructor(public service: CartService) {}

  @Post('addProductToCart')
  async addProductToCart(@Body() dto: AddProductToCartDto) {
    return await this.service.addProductToCart(dto);
  }

  @Post('updateProductFromCart')
  async updateProductFromCart(@Body() dto: UpdateProductToCartDto) {
    return await this.service.UpdateProductFromCart(dto);
  }
}
