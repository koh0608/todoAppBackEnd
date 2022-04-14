import { Test, TestingModule } from '@nestjs/testing';
import { WebSocketGateway } from './websocket.gateway';

describe('EventsGateway', () => {
  let gateway: WebSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebSocketGateway]
    }).compile();

    gateway = module.get<WebSocketGateway>(WebSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
