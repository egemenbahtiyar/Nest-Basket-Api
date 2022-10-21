import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { Public } from '../auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get('getAll')
  async getAllProduct() {
    return await this.productService.getProducts();
  }

  @Get('getProduct/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  async getProductById(@Param('id', new ParseIntPipe()) id) {
    return await this.productService.getProductById(id);
  }

  @Post('create')
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Put()
  async updateProduct(@Body() dto: UpdateProductDto) {
    return await this.productService.updateProduct(dto);
  }

  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @HttpCode(200)
  async deleteProduct(@Param('id', new ParseIntPipe()) id) {
    return await this.productService.deleteProduct(id);
  }
}
