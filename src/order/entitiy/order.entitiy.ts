import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './orderItem.entitiy';
import { User } from '../../user/entitiy/user.entitiy';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  OrderItems: OrderItem[];
}
