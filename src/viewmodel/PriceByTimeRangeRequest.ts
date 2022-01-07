import { ApiProperty } from '@nestjs/swagger';

export class PriceByTimeRangeRequest {
  @ApiProperty({
    description: 'the symbol name like :BTC, ETH, DOT ',
    default: 'DOT',
  })
  symbol: string;
  @ApiProperty({
    description: '开始时间',
    default: '2020/01/05',
  })
  startTime: String;
  @ApiProperty({
    description: '结束时间',
    default: '2020/01/06',
  })
  endTime: String;
}
