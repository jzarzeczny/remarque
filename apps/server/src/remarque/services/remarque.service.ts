import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewRemarque } from 'src/remarque/remarque.dto';
import { Repository } from 'typeorm';
import { Remarque } from 'src/remarque/remarque.entity';

@Injectable()
export class RemarqueService {
  constructor(
    @InjectRepository(Remarque)
    private remarqueRepository: Repository<Remarque>,
  ) {}

  getAllRemarques() {
    return this.remarqueRepository.find();
  }

  async getOneRemarque(id: string) {
    console.log(id);
    const data = await this.remarqueRepository.findOneBy({
      id,
    });

    console.log(data);

    return data;
  }

  createRemarque(newRemarque: NewRemarque) {
    return this.remarqueRepository.save(newRemarque);
  }
  updateRemarque(remarque: Remarque) {
    return this.remarqueRepository.update(remarque.id, remarque);
  }

  deleteRemarque(id: string) {
    return this.remarqueRepository.delete(id);
  }
}
