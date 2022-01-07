import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Price } from './priceModule/entity/price.entity';
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
  @Post('/addToken')
  @ApiOperation({ summary: 'add token' })
  async addToken(
    @Body() request: Price,
  ): Promise<boolean> {
    if (!request.symbol) {
      throw new BadRequestException('symbol invalid');
    }

    return this.priceService.addToken(request);

  }

  @Post('/updateToken')
  @ApiOperation({ summary: 'update token' })
  async updateToken(
    @Body() request: Price,
  ): Promise<boolean> {
    if (!request.symbol) {
      throw new BadRequestException('symbol invalid');
    }

    return this.priceService.updateToken(request);

  }
  @Delete('/removeToken/:id')
  @ApiOperation({ summary: 'remove token' })
  async removeToken(
    @Param('id') id: number
  ): Promise<boolean> {

    return this.priceService.removeToken(id);

  }
}
