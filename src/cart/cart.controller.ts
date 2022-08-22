import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cart } from './entitiy/cart.entitiy';
import { CartService } from './cart.service';

@Crud({
  model: {
    type: Cart,
  },
})
@Controller('cart')
export class CartController implements CrudController<Cart> {
  constructor(public service: CartService) {}
}
