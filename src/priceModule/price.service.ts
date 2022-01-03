import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entity/price.entity';
import { Logger } from '@nestjs/common';
import { PriceHistory } from './entity/price.history.entity';
import { PriceResponse } from 'src/viewmodel/PriceResponse';
import { PriceRequest } from 'src/viewmodel/PriceRequest';
const axios = require('axios');

@Injectable()
export class PriceService {
  runFlag: boolean = true;
  interval: number = 1 * 60 * 1000;
  remote_api: string = 'https://api.coingecko.com/api/v3/simple/price'; //'https://api.coingecko.com/api/v3/simple/price?ids=polkadot&vs_currencies=usd'

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
        Logger.error('process coin records with error:' + error);
      } finally {
        Logger.verbose('sleep for ' + this.interval);
        await FunctionExt.sleep(this.interval);
      }
    }
  }
  async getPirce(coinRecords: Price[]) {
    if (!coinRecords) return;

    for (const coin of coinRecords) {
      try {
        let request_url =
          this.remote_api +
          `?ids=${coin.coin_id}&vs_currencies=${coin.currencies}`;

        Logger.debug(`getPirce ${request_url}`);

        let response = await axios({
          method: 'get',
          url: request_url,
        });
        Logger.verbose(response);

        if (response && response[coin.coin_id]) {
          let d = response[coin.coin_id];
          if (d[coin.currencies]) {
            let price = Number(d[coin.currencies]);

            //update latest price
            coin.price = price;
            coin.last_update_time = new Date();
            await this.priceRepository.save(coin);
            //new price history
            let historyRecord: PriceHistory = {
              id: 0,
              coin_id: coin.coin_id,
              symbol: coin.symbol,
              currencies: coin.currencies,
              price: coin.price,
              price_time: coin.last_update_time,
            };
            await this.priceHistoryRepository.save(historyRecord);
          }
        }
      } catch (error) {
        Logger.error(error);
      }
    }
  }

  async getPrice(request: PriceRequest): Promise<PriceResponse> {
    let record = await this.priceRepository.findOne({
      where: {
        symbol: request.symbol.toUpperCase(),
      },
    });
    if (record) {
      return {
        ...record,
      };
    } else {
      return null;
    }
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
