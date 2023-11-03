import { Module } from '@nestjs/common';

import { RemarqueModule } from './remarque/remarque.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost'), RemarqueModule],
})
export class AppModule {}
