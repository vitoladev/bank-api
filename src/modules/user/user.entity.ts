import { Transaction } from '../transaction/transaction.entity';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Unique } from 'src/common/validator/unique.validator';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  @Validate(Unique, [User])
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Validate(Unique, [User])
  cpf: string;

  @Column()
  @Exclude()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    nullable: false,
    default: () => 0,
  })
  balance: number;

  @OneToMany(() => Transaction, (transaction: Transaction) => transaction)
  @JoinColumn()
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
