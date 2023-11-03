import { Test, TestingModule } from '@nestjs/testing';
import { RemarqueService } from './remarque.service';

describe('RemarqueService', () => {
  let service: RemarqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemarqueService],
    }).compile();

    service = module.get<RemarqueService>(RemarqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
