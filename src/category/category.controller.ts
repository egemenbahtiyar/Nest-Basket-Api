import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Category } from './entitiy/category.entitiy';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@ApiTags('Category')
@ApiBearerAuth()
@Crud({
  model: {
    type: Category,
  },
  dto: {
    create: CreateCategoryDto,
    update: UpdateCategoryDto,
    replace: UpdateCategoryDto,
  },
  query: {
    alwaysPaginate: true,
    limit: 5,
    maxLimit: 100,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'deleteOneBase',
      'updateOneBase',
      'createOneBase',
      'replaceOneBase',
    ],
  },
})
@Controller('category')
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}
}
