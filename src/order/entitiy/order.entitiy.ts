import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './orderItem.entitiy';
import { User } from '../../user/entitiy/user.entitiy';

export enum OrderState {
  waiting = 0,
  canceled = 1,
  completed = 2,
  evaluated = 3,
}

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

  @Column({
    type: 'enum',
    enum: OrderState,
    default: OrderState.waiting,
  })
  orderState: OrderState;
}
