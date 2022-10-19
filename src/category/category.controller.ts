import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Category } from './entitiy/category.entitiy';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: CreateCategoryDto,
  },
})
@ApiTags('Category')
@Controller('category')
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}
}
