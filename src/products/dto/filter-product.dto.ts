import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ProductType, QualityStatus, ProductSubtype } from 'src/common';
import { PaginationQueryDto } from 'src/common/dto';

export class ProductPriceFilterDto extends PaginationQueryDto {

    @ApiProperty({
        description: 'Filter by product type',
        enum: ProductType,
        example: ProductType.OTHER,
        required: false
    })
    @IsOptional()
    @IsEnum(ProductType)
    productType?: ProductType;

    @ApiProperty({
        description: 'Filter by product subtype',
        enum: ProductSubtype,
        required: false,
        example: ProductSubtype.NOT_APPLICABLE
    })
    @IsOptional()
    @IsEnum(ProductSubtype)
    productSubtype?: ProductSubtype;

    @ApiProperty({
        description: 'Filter by quality status',
        enum: QualityStatus,
        example: QualityStatus.GOOD,
        required: false
    })
    @IsOptional()
    @IsEnum(QualityStatus)
    qualityStatus?: QualityStatus;


    @ApiProperty({
        example: '2023-01-01',
        description: 'Start date and time for filtering alerts (YYYY-MM-DD)',
        required: false,
    })
    @IsString()
    @IsOptional()
    start_date: string;

    @ApiProperty({
        example: '2025-12-31',
        description: 'End date and time for filtering alerts (YYYY-MM-DD)',
        required: false,
    })
    @IsString()
    @IsOptional()
    end_date: string;
}