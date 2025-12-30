

export class ProductPriceDto {
    id: string;
    product_type: string;
    product_subtype: string;
    price: number;
    unit: string;
    quality_status: string;
    effective_from: Date;
    effective_until: Date | null;
    created_at: Date;
}