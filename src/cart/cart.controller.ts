import { Body, Controller, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cart } from './entitiy/cart.entitiy';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/addProductToCart.dto';

@Crud({
  model: {
    type: Cart,
  },
})
@Controller('cart')
export class CartController implements CrudController<Cart> {
  constructor(public service: CartService) {}

  @Post('addProductToCart')
  async createProduct(@Body() dto: AddProductToCartDto) {
    return await this.service.addOrUpdateProduct(dto);
  }
}
