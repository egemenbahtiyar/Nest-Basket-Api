import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('createCategory')
  @HttpCode(200)
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

  @Post('deleteCategory/:id')
  @HttpCode(200)
  async deleteCategory(@Param('id', new ParseIntPipe()) id) {
    return await this.categoryService.deleteCategory(id);
  }

  @Get('getCategories')
  @HttpCode(200)
  async getCategories() {
    return await this.categoryService.getCategories();
  }
}
