import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

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
}
