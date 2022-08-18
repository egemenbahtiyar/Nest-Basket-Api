import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('getAll')
  async getAllProduct() {
    return await this.productService.getProducts();
  }

  @Get('getProductById/:id')
  async getProductById(@Param('id', new ParseIntPipe()) id) {
    return await this.productService.getProductById(id);
  }

  @Post('create')
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Post('deleteProduct/:id')
  @HttpCode(200)
  async deleteProduct(@Param('id', new ParseIntPipe()) id) {
    return await this.productService.deleteProduct(id);
  }
}
