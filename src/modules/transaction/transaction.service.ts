import { UserService } from './../user/user.service';
import { Transaction } from './transaction.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionDTO } from 'src/common/dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private userService: UserService,
  ) {}

  public async getById(id: string) {
    return await this.transactionRepository.findOne(id);
  }

  public async create(data: TransactionDTO) {
    const sender = await this.userService.getByEmail(data.senderEmail);
    const receiver = await this.userService.getByEmail(data.receiverEmail);

    const result = {
      senderId: sender.id,
      receiverId: receiver.id,
      amount: data.amount,
    };
    // TODO: validate
    this.transactionRepository.create(result);
    await this.transactionRepository.save(result);
  }

  public async delete(id: string) {
    await this.transactionRepository.delete(id);
  }
}
