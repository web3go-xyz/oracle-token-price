import { Module } from '@nestjs/common';
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './priceModule/entity/price.entity';
import { PriceModule } from './priceModule/price.module';
import { PriceService } from './priceModule/price.service';
import { PriceHistory } from './priceModule/entity/price.history.entity';

@Module({
  imports: [
    StatusMonitorModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '106.52.138.224',
      port: 5432,
      username: 'postgres',
      password: 'Dev123!@#',
      database: 'dev-tokenprice',
      entities: [Price, PriceHistory],
      synchronize: false,
      logging: false,
    }),
    PriceModule,
  ],
  controllers: [AppController],
  providers: [AppService, PriceService],
  exports: [],
})
export class AppModule {}
