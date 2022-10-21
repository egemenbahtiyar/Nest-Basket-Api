import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/addProductToCart.dto';
import { UpdateProductToCartDto } from './dto/updateProductToCart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Cart')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(public service: CartService) {}

  @Post('addProductToCart')
  async addProductToCart(
    @Body() dto: AddProductToCartDto,
    @CurrentUser() user,
  ) {
    return await this.service.addProductToCart(dto, user.id);
  }

  @Put('updateProductFromCart')
  async updateProductFromCart(
    @Body() dto: UpdateProductToCartDto,
    @CurrentUser() user,
  ) {
    return await this.service.UpdateProductFromCart(dto, user.id);
  }
}
