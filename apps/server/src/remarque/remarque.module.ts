import { Module } from '@nestjs/common';
import { RemarqueController } from './controllers/remarque.controller';
import { RemarqueService } from './services/remarque.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RemarqueSchema } from './remarque.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'remarque', schema: RemarqueSchema }]),
  ],
  controllers: [RemarqueController],
  providers: [RemarqueService],
})
export class RemarqueModule {}
