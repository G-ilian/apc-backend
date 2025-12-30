import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto';
import { Cooperative, PartnerRole } from '../entities';

export class PartnerFilterDto extends PaginationQueryDto {

    @ApiProperty({
        description: 'Filter by partner cooperative',
        enum: Cooperative,
        example: Cooperative.APRUCARE,
        required: false
    })
    @IsOptional()
    @IsEnum(Cooperative)
    cooperative?: Cooperative;

    @ApiProperty({
        description: 'Filter by partner role',
        enum: PartnerRole,
        example: PartnerRole.MEMBER,
        required: false,
    })
    @IsOptional()
    @IsEnum(PartnerRole)
    role?: PartnerRole;

    @ApiProperty({
        description: 'Filter by partner name',
        example: "João Silva",
        required: false
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'Filter by partner phone',
        example: "+5511999999999",
        required: false
    })
    @IsOptional()
    @IsString()
    phone?: string;


    @ApiProperty({
        description: 'Filter by partner email',
        example: "joao.silva@example.com",
        required: false
    })
    @IsOptional()
    @IsString()
    email?: string;
}