import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPrice } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPrice])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
