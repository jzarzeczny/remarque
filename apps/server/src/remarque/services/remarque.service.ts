import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewRemarque } from 'src/remarque/remarque.dto';
import { Repository } from 'typeorm';
import { Remarque } from 'src/remarque/remarque.entity';
import { Remarque as RemarqueInterface } from '../../../../shared/interfaces';

@Injectable()
export class RemarqueService {
  constructor(
    @InjectRepository(Remarque)
    private remarqueRepository: Repository<Remarque>,
  ) {}

  getAllRemarques() {
    return this.remarqueRepository.find();
  }

  createRemarque(newRemarque: NewRemarque) {
    return this.remarqueRepository.save(newRemarque);
  }
  updateRemarque(remarque: RemarqueInterface) {
    return this.remarqueRepository.update(remarque.id, remarque);
  }
}
