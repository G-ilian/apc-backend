import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { cooperative, partner_role } from "src/common/enums/partner.enum";

export class CreatePartnerDto {
    @ApiProperty({
        description: 'The full name of the partner',
        example: 'John Doe'
    })
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({
        description: 'The email address of the partner',
        example: 'fullname@example.com'
    })
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'The phone number of the partner',
        example: '3599999-9999'
    })
    @IsString()
    @Transform(({ value }) => value.replace(/\D/g, ''))
    phone?: string;

    @ApiProperty({
        description: 'The tax identification number of the partner',
        example: '123456789'
    })
    @IsString()
    @IsNotEmpty()
    taxId: string;

    @ApiPropertyOptional({
        description: 'The cooperative of the partner',
        enum: cooperative,
        example: cooperative.APRUCARE
    })
    @IsEnum(cooperative)
    cooperative?: cooperative;

    @ApiPropertyOptional({
        description: 'The role of the partner',
        enum: partner_role,
        example: partner_role.MEMBER
    })
    @IsEnum(partner_role)
    role?: partner_role;
}
