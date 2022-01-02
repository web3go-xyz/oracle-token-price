import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PriceService } from './priceModule/price.service';
import { PriceRequest } from './viewmodel/PriceRequest';
import { PriceResponse } from './viewmodel/PriceResponse';

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
  getPrice(@Body() request: PriceRequest): PriceResponse {
    if (!request.symbol) {
      return [];
    }
    return this.priceService.getPrice(request);
  }
}
