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
  getAll() {
    return this.remarqueService.getAllRemarques();
  }

  @Get(':id')
  getOne(@Param() param: { id: string }) {
    return this.remarqueService.getOneRemarque(param.id);
  }

  @Post()
  create(@Body() newRemarque: NewRemarque) {
    return this.remarqueService.createRemarque(newRemarque);
  }

  @Put()
  update(@Body() remarque: RemarqueDocument) {
    return this.remarqueService.updateRemarque(remarque);
  }

  @Delete()
  delete(@Body() id: string) {
    return this.remarqueService.deleteRemarque(id);
  }
}
