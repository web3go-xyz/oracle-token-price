import { ApiProperty } from '@nestjs/swagger';
import { PriceHistory } from 'src/priceModule/entity/price.history.entity';

export class PriceByTimeRangeResponse extends PriceHistory {}
