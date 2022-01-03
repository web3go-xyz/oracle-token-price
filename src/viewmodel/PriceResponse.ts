import { ApiProperty } from '@nestjs/swagger';
import { Price } from 'src/priceModule/entity/price.entity';

export class PriceResponse extends Price {}
