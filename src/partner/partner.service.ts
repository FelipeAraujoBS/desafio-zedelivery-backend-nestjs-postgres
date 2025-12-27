import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartnerDto } from './dto/partner.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PartnerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPartner(createPartnerDto: CreatePartnerDto) {
    const id = randomUUID();

    const result = await this.prismaService.$queryRaw<
      Array<{
        id: string;
        trading_name: string;
        owner_name: string;
        document: string;
        coverage_area: string;
        address: string;
        created_at: Date;
      }>
    >`
      INSERT INTO partners (
        id, 
        trading_name,
        owner_name,
        document,
        coverage_area,
        address
      ) VALUES (
        ${id}::uuid,
        ${createPartnerDto.tradingName},
        ${createPartnerDto.ownerName},
        ${createPartnerDto.document},
        ST_SetSRID(
          ST_GeomFromGeoJSON(${JSON.stringify(createPartnerDto.coverageArea)}),
          4326
        ),
        ST_SetSRID(
          ST_GeomFromGeoJSON(${JSON.stringify(createPartnerDto.address)}),
          4326
        )
      )
      RETURNING 
        id,
        trading_name,
        owner_name,
        document,
        ST_AsGeoJSON(coverage_area) as coverage_area,
        ST_AsGeoJSON(address) as address,
        created_at
    `;

    return result[0];
  }
}
