import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItem } from './cartItem.entitiy';
import { User } from '../../user/entitiy/user.entitiy';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
  /*
  @Column()
  totalPrice: number = getSum(this);*/
}

/*
function getSum(cart: Cart) {
  console.log(cart.cartItems);
  if (cart.cartItems == null) {
    return 51;
  }
  let sum = 0;
  cart.cartItems.forEach((a) => (sum += a.product.price));
  return sum;
}
*/
