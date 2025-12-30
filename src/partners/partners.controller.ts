import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerFilterDto } from './dto/filter-partner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @HttpCode(201)
  async create(@Query() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.createPartner(createPartnerDto);
  }

  @Get()
  async findAll(@Query() filterPartnerDto: PartnerFilterDto) {
    return this.partnersService.findAllPartners(filterPartnerDto);
  }

  @Get(':id')
  async  findOne(@Param('id') id: string) {
    return this.partnersService.findPartnerById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Query() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.updatePartner(id, updatePartnerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.partnersService.deletePartner(id);
  }
}
