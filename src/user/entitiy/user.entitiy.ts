import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from '../../order/entitiy/order.entitiy';
import { Cart } from '../../cart/entitiy/cart.entitiy';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  fullName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100, select: false })
  @Exclude()
  password: string;

  @Column('date')
  birthday: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
