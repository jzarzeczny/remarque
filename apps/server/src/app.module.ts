import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remarque } from './remarque/remarque.entity';
import { RemarqueModule } from './remarque/remarque.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'remarque',
      logging: 'all',
      entities: [Remarque],
    }),
    RemarqueModule,
  ],
})
export class AppModule {}
