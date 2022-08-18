import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entitiy/category.entitiy';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  price: number;

  @Column()
  quantitiy: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
