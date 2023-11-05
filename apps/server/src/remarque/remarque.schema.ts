import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RemarqueDocument = HydratedDocument<Remarque>;

@Schema()
export class Nodes {
  @Prop()
  title: string;
  @Prop()
  type: string;
  @Prop()
  content: string;
}

@Schema()
export class SubPage {
  @Prop()
  title: string;
  @Prop()
  nodes: Nodes[];
}

@Schema()
export class FrontPage {
  @Prop({ required: true })
  title: string;
}

@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  id: false,
})
export class Remarque {
  @Prop({ required: true })
  frontPage: FrontPage;

  @Prop()
  subPage: SubPage[];
}

export const RemarqueSchema = SchemaFactory.createForClass(Remarque);
