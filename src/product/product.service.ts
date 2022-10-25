import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entitiy/product.entitiy';
import { CreateProductDto } from './dto/createProduct.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const cats = await this.categoryService.getCategoriesByIds(dto.categoryIds);
    const product = await this.productRepository.create({
      name: dto.name,
      price: dto.price,
      categories: cats,
      stockNumber: dto.stockNumber,
    });
    return await this.productRepository.save(product);
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async getProductById(id: number) {
    return await this.productRepository.findOneBy({ id: id });
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOneBy({ id: id });
    return await this.productRepository.remove(product);
  }

  async updateProduct(productId: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      relations: {
        categories: true,
      },
      where: {
        id: productId,
      },
    });

    if (dto.categoryIds) {
      const newCategories = await this.categoryService.getCategoriesByIds(
        dto.categoryIds,
      );
      const newProduct = Object.assign(product, dto, {
        categories: newCategories,
      });
      return await this.productRepository.save(newProduct);
    } else {
      const newProduct = Object.assign(product, dto, {
        categories: product.categories,
      });
      return await this.productRepository.save(newProduct);
    }
  }
}
