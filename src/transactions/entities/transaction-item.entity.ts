import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
import { ProductType, QualityStatus } from 'src/common';

@Entity('transactions_items')
export class TransactionItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Transaction, (t) => t.items)
    transaction: Transaction;

    @Column({ type: 'enum', enum: ProductType })
    product: ProductType;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unit_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price: number;

    @Column({ type: 'enum', enum: QualityStatus })
    quality: QualityStatus;

    @CreateDateColumn()
    created_at: Date;
}