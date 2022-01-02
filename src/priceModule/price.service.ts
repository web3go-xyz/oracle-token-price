import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entity/price.entity';
import { Logger } from '@nestjs/common';
import { PriceHistory } from './entity/price.history.entity';
import { PriceResponse } from 'src/viewmodel/PriceResponse';
import { PriceRequest } from 'src/viewmodel/PriceRequest';

@Injectable()
export class PriceService {
  runFlag: boolean = true;
  interval: number = 1 * 60 * 1000;

  async startProcess() {
    Logger.verbose('startProcess ' + this.runFlag);
    while (this.runFlag) {
      try {
        let coinRecords = await this.priceRepository.find({});

        if (coinRecords && coinRecords.length > 0) {
          Logger.verbose('start to process ' + coinRecords.length + ' coins');

          await this.getPirce(coinRecords);
        } else {
          Logger.verbose('no coin records to process ');
        }
      } catch (error) {
        Logger.error('process  coin records with error:' + error);
      } finally {
        Logger.verbose('sleep for ' + this.interval);
        await FunctionExt.sleep(this.interval);
      }
    }
  }
  async getPirce(coinRecords: Price[]) {
    if (!coinRecords) return;

    for (const coin of coinRecords) {
      //TODO
    }
  }

  getPrice(request: PriceRequest): PriceResponse {
    throw new Error('Method not implemented.');
    //TODO
  }

  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepository: Repository<PriceHistory>,
  ) {}
}
export class FunctionExt {
  constructor(parameters) {}

  public static async sleep(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(1);
        } catch (e) {
          reject(0);
        }
      }, delay);
    });
  }
}
