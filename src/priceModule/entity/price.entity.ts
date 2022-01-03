import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['symbol'])
export class Price {
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
    comment: 'last update time',
    nullable: true,
  })
  last_update_time: Date;
}
