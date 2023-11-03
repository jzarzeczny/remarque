import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewRemarque } from 'src/remarque/remarque.dto';
import { Remarque, RemarqueDocument } from '../remarque.schema';

@Injectable()
export class RemarqueService {
  constructor(
    @InjectModel('remarque') private remarqueModel: Model<Remarque>,
  ) {}

  getAllRemarques() {
    return this.remarqueModel.find();
  }

  async getOneRemarque(id: string) {
    return this.remarqueModel.findById(id);
  }

  createRemarque(newRemarque: NewRemarque) {
    return this.remarqueModel.create(newRemarque);
  }
  updateRemarque(remarque: RemarqueDocument): any {
    return this.remarqueModel.findOneAndReplace({ id: remarque.id }, remarque);
  }

  deleteRemarque(remarque: RemarqueDocument): any {
    return this.remarqueModel.findByIdAndDelete(remarque);
  }
}
