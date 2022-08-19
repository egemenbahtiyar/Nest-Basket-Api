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
    const category = await this.categoryService.getCategoryById(dto.categoryId);
    const product = await this.productRepository.create({
      name: dto.name,
      price: dto.price,
      category: category,
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

  async updateProduct(dto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({
      id: dto.productId,
    });
    const newCategory = await this.categoryService.getCategoryById(
      dto.categoryId,
    );
    product.name = dto.name;
    product.stockNumber = dto.stockNumber;
    product.price = dto.price;
    product.category = newCategory;
    return await this.productRepository.save(product);
  }
}
