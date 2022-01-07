import { ApiProperty } from '@nestjs/swagger';

export class PriceByTimeRangeRequest {
  @ApiProperty({
    description: 'the symbol name like :BTC, ETH, DOT ',
    default: 'DOT',
  })
  symbol: string;
  @ApiProperty({
    description: '开始时间',
    default: '2020/1/5',
  })
  startTime: Date;
  @ApiProperty({
    description: '结束时间',
    default: '2020/1/6',
  })
  endTime: Date;
}
