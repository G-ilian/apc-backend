import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PaginatedResponse } from 'src/common/interfaces';
import { PartnerDto } from './dto/partner.dto';
import { Partner } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerFilterDto } from './dto/filter-partner.dto';
import { PARTNER_TRANSLATIONS } from './translate';

@Injectable()
export class PartnersService {
  private readonly logger = new Logger(PartnersService.name);
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) { }

  async createPartner(createPartnerDto: CreatePartnerDto) {
    try {
      this.logger.log(`Creating partner with data: ${JSON.stringify(createPartnerDto)}`);
      const partner = this.partnerRepository.create({
        full_name: createPartnerDto.fullname,
        tax_id: createPartnerDto.taxId,
        member_of: createPartnerDto.cooperative as any,
        role: createPartnerDto.role as any,
        email: createPartnerDto.email,
        phone: createPartnerDto.phone
      } as Partner);

      const savedPartner = await this.partnerRepository.save(partner);
      this.logger.log(`Partner created with ID: ${savedPartner.id}`);
      return {
        message: 'Partner created successfully',
        data: savedPartner
      };

    } catch (error) {
      throw error;
    }
  }

  async findAllPartners(filterPartnerDto: PartnerFilterDto): Promise<PaginatedResponse<PartnerDto>> {
    this.logger.log('Fetching all partners');

    const queryBuilder = this.partnerRepository.createQueryBuilder('partner');

    if (filterPartnerDto.cooperative) {
      queryBuilder.andWhere('partner.member_of = :cooperative', { cooperative: filterPartnerDto.cooperative });
    }

    if (filterPartnerDto.role) {
      queryBuilder.andWhere('partner.role = :role', { role: filterPartnerDto.role });
    }

    if (filterPartnerDto.name) {
      queryBuilder.andWhere('partner.full_name ILIKE :name', { name: `%${filterPartnerDto.name}%` });
    }

    if (filterPartnerDto.phone) {
      queryBuilder.andWhere('partner.phone ILIKE :phone', { phone: `%${filterPartnerDto.phone}%` });
    }

    if (filterPartnerDto.email) {
      queryBuilder.andWhere('partner.email ILIKE :email', { email: `%${filterPartnerDto.email}%` });
    }

    queryBuilder
      .skip(filterPartnerDto.offset)
      .take(filterPartnerDto.limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    if (!data || data.length === 0) {
      return {
        data: [],
        meta: {
          total: 0,
          page: 1,
          lastPage: 1
        }
      }
    }

    this.logger.log(`Found ${data.length} partners`);
    const partnerDtos = data.map(partner => {
      return this.translatePartner(partner);
    });

    return {
      data: partnerDtos,
      meta: {
        total: total,
        page: 1,
        lastPage: 1
      }
    }
  }

  async findPartnerById(id: string): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });

    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    return partner;
  }

  async updatePartner(id: string, updatePartnerDto: UpdatePartnerDto) {
    this.logger.log(`Updating partner with ID: ${id}`);
    const partner = await this.findPartnerById(id);

    try {
      this.logger.log(`Updating partner with data: ${JSON.stringify(updatePartnerDto)}`);
      if (updatePartnerDto.fullname) partner.full_name = updatePartnerDto.fullname;
      if (updatePartnerDto.taxId) partner.tax_id = updatePartnerDto.taxId;
      if (updatePartnerDto.cooperative) partner.member_of = updatePartnerDto.cooperative as any;
      if (updatePartnerDto.role) partner.role = updatePartnerDto.role as any;
      if (updatePartnerDto.email) partner.email = updatePartnerDto.email;
      if (updatePartnerDto.phone) partner.phone = updatePartnerDto.phone;
      return this.partnerRepository.save(partner);
    } catch (error) {
      throw new Error('Error updating partner');
    }
  }

  async deletePartner(id: string) {
    await this.findPartnerById(id);
    try {
      await this.partnerRepository.delete(id);
    } catch (error) {
      throw new Error('Error deleting partner');
    }
  }

  private translatePartner(partner: Partner): PartnerDto {
    return {
      id: partner.id,
      fullname: partner.full_name,
      email: partner.email,
      phone: partner.phone,
      taxId: partner.tax_id,
      cooperative: partner.member_of,
      role: PARTNER_TRANSLATIONS.roles[partner.role] || partner.role,
    };
  }
}
