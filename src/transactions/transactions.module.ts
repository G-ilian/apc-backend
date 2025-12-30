import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction,TransactionItem  } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction,TransactionItem])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
