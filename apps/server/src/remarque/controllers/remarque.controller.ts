import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { NewRemarque } from 'src/remarque/remarque.dto';
import { RemarqueService } from 'src/remarque/services/remarque.service';
import { Remarque } from '../../../../shared/interfaces';

@Controller('remarque')
export class RemarqueController {
  constructor(private remarqueService: RemarqueService) {}
  @Get()
  async getAll() {
    return this.remarqueService.getAllRemarques();
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
  async delete() {
    return 'Delete remarque';
  }
}
