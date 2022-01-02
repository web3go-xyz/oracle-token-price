import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entity/price.entity';
import { PriceHistory } from './entity/price.history.entity';

import { PriceService } from './price.service';

@Module({
  imports: [TypeOrmModule.forFeature([Price, PriceHistory])],
  providers: [PriceService],
  controllers: [],
  exports: [TypeOrmModule, PriceService],
})
export class PriceModule {}
