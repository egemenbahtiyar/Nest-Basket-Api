import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entitiy/category.entitiy';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
  constructor(@InjectRepository(Category) repo) {
    super(repo);
  }

  async getCategoriesByIds(catIds: number[]) {
    return await this.repo
      .createQueryBuilder('category')
      .whereInIds(catIds)
      .getMany();
  }
}
