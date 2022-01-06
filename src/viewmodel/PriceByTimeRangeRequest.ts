import { ApiProperty } from '@nestjs/swagger';

export class PriceByTimeRangeRequest {
  @ApiProperty({
    description: 'the symbol name like :BTC, ETH, DOT ',
    default: 'DOT',
  })
  symbol: string;
  startTime: Date;
  endTime: Date;
}
