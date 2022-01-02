import { ApiProperty } from '@nestjs/swagger';

export class PriceRequest {
  @ApiProperty({
    description: 'the symbol name like :BTC, ETH, DOT ',
    default: 'DOT',
  })
  symbol: string;
}
