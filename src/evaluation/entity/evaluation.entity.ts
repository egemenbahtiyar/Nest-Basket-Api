import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.evaluations)
  user: User;

  @ManyToOne(() => Product, (product) => product.evaluations)
  product: Product;
}
