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
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('getAll')
  async getAllProduct() {
    return await this.productService.getProducts();
  }

  @Get('getProduct/:id')
  async getProductById(@Param('id', new ParseIntPipe()) id) {
    return await this.productService.getProductById(id);
  }

  @Post('create')
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Post('update')
  async updateProduct(@Body() dto: UpdateProductDto) {
    return await this.productService.updateProduct(dto);
  }

  @Post('delete/:id')
  @HttpCode(200)
  async deleteProduct(@Param('id', new ParseIntPipe()) id) {
    return await this.productService.deleteProduct(id);
  }
}
