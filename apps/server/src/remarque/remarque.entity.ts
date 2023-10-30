import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class SubPageNode {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  type: string;

  @Column()
  content: string;
}

@Entity()
export class SubPage {
  @ObjectIdColumn()
  id: ObjectId;

  @Column(() => SubPageNode)
  nodes: SubPageNode[];
}

@Entity()
export class FrontPage {
  @Column()
  title: string;
}

@Entity()
export class Remarque {
  @ObjectIdColumn()
  id: string;

  @Column(() => FrontPage)
  frontPage: FrontPage;

  @Column(() => SubPage)
  subPage: SubPage[];
}
