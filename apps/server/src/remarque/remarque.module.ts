import { Module } from '@nestjs/common';
import { RemarqueController } from './controllers/remarque.controller';
import { RemarqueService } from './services/remarque.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remarque } from './remarque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remarque])],
  controllers: [RemarqueController],
  providers: [RemarqueService],
})
export class RemarqueModule {}
