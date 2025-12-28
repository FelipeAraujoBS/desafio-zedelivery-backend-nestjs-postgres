import { Controller, Body, Post, Get, Param, Query } from '@nestjs/common';
import { CreatePartnerDto } from './dto/partner.dto';
import { SearchPartnerDto } from './dto/search.dto';
import { PartnerService } from './partner.service';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async CreatePartner(@Body() createPartnerDto: CreatePartnerDto) {
    return await this.partnerService.createPartner(createPartnerDto);
  }

  @Get('search')
  async SearchPartner(@Query() searchPartnerDto: SearchPartnerDto) {
    return this.partnerService.searchNearestPartner(searchPartnerDto);
  }

  @Get(':id')
  async getPartnerById(@Param('id') id: string) {
    return await this.partnerService.getPartnerById(id);
  }
}
