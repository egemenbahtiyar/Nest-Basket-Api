import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Evaluation } from './entity/evaluation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class EvaluationService extends TypeOrmCrudService<Evaluation> {
  constructor(
    @InjectRepository(Evaluation) repo,
    private productService: ProductService,
  ) {
    super(repo);
  }

  async create(obj) {
    const product = await this.productService.getProductById(obj.productId);
    const newObj = {
      rating: obj.rating,
      comment: obj.comment,
      product: product,
      user: obj.user,
    };
    return await this.repo.save(newObj);
  }
}
