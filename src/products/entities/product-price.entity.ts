import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ProductType, MeasurementUnit, QualityStatus, ProductSubtype } from 'src/common/enums/product.enum';
import { IsEnum } from 'class-validator';

@Entity('product_prices')
export class ProductPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ProductType })
  @IsEnum(ProductType)
  product: ProductType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: MeasurementUnit })
  unit: MeasurementUnit;

  @Column({type: 'enum', enum: QualityStatus})
  quality: QualityStatus;

  @Column({type: 'enum', enum: ProductSubtype, default: ProductSubtype.NOT_APPLICABLE})
  subtype: ProductSubtype;

  @Column({ type: 'date' })
  effective_from: Date;

  @Column({ type: 'date', nullable: true })
  effective_until: Date | null;

  @CreateDateColumn()
  created_at: Date;
}