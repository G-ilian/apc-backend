import { Partner } from 'src/partners/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { TransactionItem } from './transaction-item.entity';

export enum TransactionDirection {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Partner, (partner) => partner.transactions)
  partner: Partner;

  @Column({ type: 'enum', enum: TransactionDirection })
  direction: TransactionDirection;

  @Column({ type: 'date' })
  transaction_date: Date;

  items: TransactionItem[];

  @CreateDateColumn()
  created_at: Date;
}