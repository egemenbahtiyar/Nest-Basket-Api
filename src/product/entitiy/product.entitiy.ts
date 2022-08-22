import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entitiy/category.entitiy';
import { OrderItem } from '../../order/entitiy/orderItem.entitiy';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  price: number;

  @Column()
  stockNumber: number;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
