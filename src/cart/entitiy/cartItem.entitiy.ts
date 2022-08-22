import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entitiy/product.entitiy';
import { Cart } from './cart.entitiy';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  price: number;

  @Column()
  stockNumber: number;

  @OneToOne(() => Product, (product) => product.cartItem)
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;
}
