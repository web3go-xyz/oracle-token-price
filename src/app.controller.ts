import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PriceService } from './priceModule/price.service';
import { PriceByTimeRangeRequest } from './viewmodel/PriceByTimeRangeRequest';
import { PriceByTimeRangeResponse } from './viewmodel/PriceByTimeRangeResponse';
import { PriceRequest } from './viewmodel/PriceRequest';
import { PriceResponse } from './viewmodel/PriceResponse';

@ApiTags('price')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly priceService: PriceService,
  ) {
    this.priceService.startProcess();
  }

  @Post('/getPrice')
  @ApiOperation({ summary: 'getPrice' })
  async getPrice(@Body() request: PriceRequest): Promise<PriceResponse> {
    if (!request.symbol) {
      throw new BadRequestException('symbol invalid');
    }
    return this.priceService.getPrice(request);
  }
  @Post('/getPriceByTimeRange')
  @ApiOperation({ summary: 'getPriceByTimeRange' })
  async getPriceByTimeRange(
    @Body() request: PriceByTimeRangeRequest,
  ): Promise<PriceByTimeRangeResponse[]> {
    if (!request.symbol) {
      throw new BadRequestException('symbol invalid');
    }

    return this.priceService.getPriceByTimeRange(request);
  }
}
