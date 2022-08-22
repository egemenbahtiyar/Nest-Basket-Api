import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entitiy';
import { Product } from '../../product/entitiy/product.entitiy';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantitiy: number;

  @Column()
  price: number;

  @OneToOne(() => Product, (product) => product.orderItem)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Order, (order) => order.OrderItems)
  order: Order;
}
