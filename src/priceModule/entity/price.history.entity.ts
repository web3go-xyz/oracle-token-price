import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['symbol'])
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'the coin id like : polkadot' })
  coin_id: string;

  @Column({ comment: 'the symbol name like : DOT' })
  symbol: string;

  @Column({ comment: 'the currencies name like : usd' })
  currencies: string;

  @Column({
    type: 'decimal',
    precision: 30,
    scale: 10,
  })
  price: number;

  @Column({
    comment: 'time of price',
    type: 'bigint',
  })
  price_time: Date;
}
