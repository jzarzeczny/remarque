import { Test, TestingModule } from '@nestjs/testing';
import { RemarqueController } from './remarque.controller';

describe('RemarqueController', () => {
  let controller: RemarqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemarqueController],
    }).compile();

    controller = module.get<RemarqueController>(RemarqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
