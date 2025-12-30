import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductPriceDto } from './dto/create-product.dto';
import { ProductPrice } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ProductSubtype, ProductType } from 'src/common';
import { ProductPriceFilterDto } from './dto/filter-product.dto';
import { PaginatedResponse } from 'src/common/interfaces';
import { UpdateProductPriceDto } from './dto/update-product.dto';
import { PRODUCT_TRANSLATIONS } from 'src/common/translate';
import { ProductPriceDto } from './dto/product-price.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(ProductPrice)
    private readonly productPriceRepository: Repository<ProductPrice>,
  ) { }

  async registerProductPrice(dto: CreateProductPriceDto) {
    this.logger.log(`Registering product price: ${JSON.stringify(dto)}`);
    const subtype = dto.productType === ProductType.WOOL
      ? dto.productSubtype
      : ProductSubtype.NOT_APPLICABLE;


    const currentPrice = await this.productPriceRepository.findOne({
      where: {
        product: dto.productType,
        effective_until: IsNull(),
        quality: dto.qualityStatus,
        subtype: subtype
      },
    });

    if (currentPrice) {
      const endDate = new Date(dto.effective_from.getTime());
      endDate.setDate(endDate.getDate() - 1);

      currentPrice.effective_until = endDate;
      await this.productPriceRepository.save(currentPrice);
    }

    const newPrice = this.productPriceRepository.create({
      product: dto.productType,
      price: dto.price,
      effective_from: dto.effective_from,
      unit: dto.measurementUnit,
      quality: dto.qualityStatus,
      subtype: subtype,
      effective_until: null,
    });

    const savedPrice = await this.productPriceRepository.save(newPrice);

    return {
      message: 'Product price registered and previous price closed',
      data: savedPrice
    };
  }

  async findAllProductPrices(
    filters: ProductPriceFilterDto
  ): Promise<PaginatedResponse<ProductPriceDto>> {

    this.logger.log(`Finding product prices with filters: ${JSON.stringify(filters)}`);

    const queryBuilder = this.productPriceRepository.createQueryBuilder('price');

    if (filters.productType) {
      queryBuilder.andWhere('price.product = :type', { type: filters.productType });
    }

    if (filters.productSubtype) {
      queryBuilder.andWhere('price.subtype = :subtype', { subtype: filters.productSubtype });
    }

    if (filters.qualityStatus) {
      queryBuilder.andWhere('price.quality = :quality', { quality: filters.qualityStatus });
    }

    if (filters.start_date) {
      queryBuilder.andWhere('price.effective_from >= :startDate', {
        startDate: filters.start_date.split('T')[0]
      });
    }

    if (filters.end_date) {
      queryBuilder.andWhere('price.effective_from <= :endDate', {
        endDate: filters.end_date.split('T')[0]
      });
    }

    queryBuilder
      .orderBy('price.effective_from', 'DESC')
      .skip(filters.offset)
      .take(filters.limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    if (data.length === 0 || !data) {
      return {
        data: [],
        meta: {
          total: 0,
          page: filters.page,
          lastPage: 0,
        },
      }
    }

    const translatedData = data.map(price => this.translateProductPrice(price));
    this.logger.log(JSON.stringify(translatedData));

    return {
      data: translatedData,
      meta: {
        total,
        page: filters.page,
        lastPage: Math.ceil(total / filters.limit),
      },
    };
  }

  async findProductPriceById(id: string): Promise<ProductPrice> {
    const productPrice = await this.productPriceRepository.findOne({ where: { id } });

    if (!productPrice) {
      throw new NotFoundException(`Product price with ID ${id} not found`);
    }

    return productPrice;
  }

  async updateProductPrice(id: string, productData: UpdateProductPriceDto): Promise<ProductPrice> {
    this.logger.log(`Updating product price with ID: ${id}`);
    const productPrice = await this.findProductPriceById(id);

    try {
      this.logger.log(`Updating product price with data: ${JSON.stringify(productData)}`);
      if (productData.productType) productPrice.product = productData.productType;
      if (productData.productSubtype) productPrice.subtype = productData.productSubtype;
      if (productData.price !== undefined) productPrice.price = productData.price;
      if (productData.measurementUnit) productPrice.unit = productData.measurementUnit;
      if (productData.qualityStatus) productPrice.quality = productData.qualityStatus;
      if (productData.effective_from) productPrice.effective_from = productData.effective_from;

      return this.productPriceRepository.save(productPrice);
    } catch (error) {
      throw new Error('Error updating product price');
    }

  }

  async deleteProductPrice(id: string): Promise<void> {
    await this.findProductPriceById(id);
    try {
      await this.productPriceRepository.delete(id);
    } catch (error) {
      throw new Error('Error deleting product price');
    }
  }

  private translateProductPrice(price: ProductPrice): ProductPriceDto {
    return {
      ...price,
      product_type: PRODUCT_TRANSLATIONS.types[price.product] || price.product,
      product_subtype: PRODUCT_TRANSLATIONS.subtypes[price.subtype] || price.subtype,
      unit: PRODUCT_TRANSLATIONS.units[price.unit] || price.unit,
      quality_status: PRODUCT_TRANSLATIONS.quality[price.quality] || price.quality,
    };
  }

}

