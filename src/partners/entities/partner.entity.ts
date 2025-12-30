import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from 'src/transactions/entities';

export enum Cooperative {
  VAV = 'VAV',
  APRUCARE = 'APRUCARE',
  OTHER = 'OTHER',
}

export enum PartnerRole {
  MEMBER = 'MEMBER',
  EXTERNAL = 'EXTERNAL',
}

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tax_id: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: PartnerRole, default: PartnerRole.MEMBER })
  role: PartnerRole;

  @Column({ type: 'enum', enum: Cooperative, nullable: true })
  member_of: Cooperative;

  @OneToMany(() => Transaction, (transaction) => transaction.partner)
  transactions: Transaction[];
}