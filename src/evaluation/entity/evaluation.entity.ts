import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entitiy/user.entitiy';
import { Product } from '../../product/entitiy/product.entitiy';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @OneToOne(() => User, (user) => user.evaluation)
  @JoinColumn()
  user: User;

  @OneToOne(() => Product, (product) => product.evaluation)
  @JoinColumn()
  product: Product;
}
