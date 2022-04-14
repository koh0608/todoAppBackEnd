import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WebSocketGateway } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [WebSocketGateway, WebSocketService],
  exports: [WebSocketService]
})
export class WebSocketModule {}
