import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, Min } from "class-validator";
import { MeasurementUnit, ProductSubtype, ProductType, QualityStatus } from "src/common";
import { ToDate } from "src/common/decorators";

export class CreateProductPriceDto {
    @ApiProperty({
        description: 'The type of the product',
        enum: ProductType,
        example: ProductType.OTHER
    })
    @IsEnum(ProductType)
    productType: ProductType;

    @ApiPropertyOptional({
        description: 'The subtype of the product',
        enum: ProductSubtype,
        example: ProductSubtype.NOT_APPLICABLE
    })
    @IsEnum(ProductSubtype)
    productSubtype?: ProductSubtype;

    @ApiProperty({
        description: 'The price of the product',
        example: 19.99
    })
    @IsNumber({}, { message: 'price must be a valid number' })
    @Min(0, { message: 'price must be a non-negative number' })
    @Type(() => Number)
    price: number;

    @ApiProperty({
        description: 'The unit of measurement for the product',
        enum: MeasurementUnit,
        example: MeasurementUnit.KG
    })
    @IsEnum(MeasurementUnit)
    measurementUnit: MeasurementUnit;

    @ApiProperty({
        description: 'The quality status of the product',
        enum: QualityStatus,
        example: QualityStatus.GOOD
    })
    @IsEnum(QualityStatus)
    qualityStatus: QualityStatus;

    @ApiProperty({
        description: 'The date from which the price is effective',
        example: '2024-01-01'
    })
    @ToDate()
    @IsDate()
    effective_from: Date;
}
