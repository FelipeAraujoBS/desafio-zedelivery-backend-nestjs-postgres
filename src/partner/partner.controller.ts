import { Controller, Body, Post } from '@nestjs/common';
import { CreatePartnerDto } from './dto/partner.dto';
import { PartnerService } from './partner.service';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async CreatePartner(@Body() createPartnerDto: CreatePartnerDto) {
    return await this.partnerService.createPartner(createPartnerDto);
  }
}
