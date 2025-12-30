import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationQueryDto {
    @ApiPropertyOptional({ default: 1 })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(1)
    page: number = 1;

    @ApiPropertyOptional({ default: 10 })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(1)
    limit: number = 10;

    get offset(): number {
        return (this.page - 1) * this.limit;
    }
}