import { Test, TestingModule } from '@nestjs/testing';
import { UsertodoService } from './usertodo.service';

describe('UsertodoService', () => {
  let service: UsertodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsertodoService],
    }).compile();

    service = module.get<UsertodoService>(UsertodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
