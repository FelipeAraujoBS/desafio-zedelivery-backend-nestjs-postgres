import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PartnerService } from 'src/partner/partner.service';

@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
