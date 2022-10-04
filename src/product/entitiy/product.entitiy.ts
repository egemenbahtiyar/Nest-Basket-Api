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
import { CartItem } from '../../cart/entitiy/cartItem.entitiy';
import { Evaluation } from '../../evaluation/entity/evaluation.entity';

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

  @OneToOne(() => CartItem, (cartItem) => cartItem.product)
  cartItem: CartItem;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @OneToOne(() => Evaluation, (evaluation) => evaluation.product)
  evaluation: Evaluation;
}
