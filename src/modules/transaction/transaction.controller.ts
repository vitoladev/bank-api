import { TransactionDTO } from 'src/common/dto/transaction.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get(':id')
  public async getByUser(@Param('id') { id }) {
    return await this.transactionService.getById(id);
  }

  @Post()
  public async create(@Body() data: TransactionDTO) {
    return await this.transactionService.create(data);
  }

  @Delete(':id')
  public async delete(@Param('id') { id }) {
    return await this.transactionService.delete(id);
  }
}
