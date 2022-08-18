import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entitiy/category.entitiy';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = await this.categoryRepository.create({
      name: dto.name,
    });
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(catId: number) {
    const catToDelete = await this.categoryRepository.findOneBy({ id: catId });
    return await this.categoryRepository.delete(catToDelete);
  }

  async getCategories() {
    return await this.categoryRepository.find();
  }
}
