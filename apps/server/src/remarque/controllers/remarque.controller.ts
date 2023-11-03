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
import { RemarqueDocument } from '../remarque.schema';

@Controller('remarque')
export class RemarqueController {
  constructor(private remarqueService: RemarqueService) {}
  @Get()
  async getAll() {
    const data = await this.remarqueService.getAllRemarques();
    return data;
  }

  @Get(':id')
  async getOne(@Param() param: { id: string }) {
    return await this.remarqueService.getOneRemarque(param.id);
  }

  @Post()
  async create(@Body() newRemarque: NewRemarque) {
    return this.remarqueService.createRemarque(newRemarque);
  }

  @Put()
  async update(@Body() remarque: RemarqueDocument) {
    return this.remarqueService.updateRemarque(remarque);
  }

  @Delete()
  async delete(@Body() remarque: RemarqueDocument) {
    return this.remarqueService.deleteRemarque(remarque);
  }
}
