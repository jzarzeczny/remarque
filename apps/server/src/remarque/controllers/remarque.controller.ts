import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewRemarque } from 'src/remarque/remarque.dto';
import { RemarqueService } from 'src/remarque/services/remarque.service';
import { Remarque } from '../remarque.entity';

@Controller('remarque')
export class RemarqueController {
  constructor(private remarqueService: RemarqueService) {}
  @Get()
  async getAll() {
    return this.remarqueService.getAllRemarques();
  }

  @Get(':id')
  async getOne(@Param() param: any) {
    return this.remarqueService.getOneRemarque(param.id);
  }

  @Post()
  async create(@Body() newRemarque: NewRemarque) {
    return this.remarqueService.createRemarque(newRemarque);
  }

  @Put()
  async update(@Body() remarque: Remarque) {
    return this.remarqueService.updateRemarque(remarque);
  }

  @Delete()
  async delete(@Body() id: string) {
    return this.remarqueService.deleteRemarque(id);
  }
}
