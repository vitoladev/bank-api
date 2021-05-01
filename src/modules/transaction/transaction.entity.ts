import { User } from '../user/user.entity';
import { IsNumber, IsPositive } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  transactionId: string;

  @Column()
  @ManyToOne(() => User, (user: User) => user.id)
  senderId: string;

  @Column()
  @ManyToOne(() => User, (user: User) => user.id)
  receiverId: string;

  @Column()
  @IsNumber()
  @IsPositive()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}
