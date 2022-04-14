import { Test, TestingModule } from '@nestjs/testing';
import { UsertodoController } from './usertodo.controller';

describe('UsertodoController', () => {
  let controller: UsertodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsertodoController],
    }).compile();

    controller = module.get<UsertodoController>(UsertodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
