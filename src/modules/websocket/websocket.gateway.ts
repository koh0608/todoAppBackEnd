import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway as Gateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket, Server } from 'socket.io';
import { WebSocketService } from './websocket.service';
import { WsGuard } from 'src/guards/websocket.guard';
import Cookies from 'universal-cookie';
import { CookieName, JwtConfig } from '@configs/auth.config';

@Gateway({ transports: ['websocket'] })
export class WebSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private socketService: WebSocketService, private jwt: JwtService) {}

  private verify(client: Socket): AuthData | null {
    const cookies = new Cookies(client.handshake.headers.cookie);
    const cookie = cookies.get(CookieName.access);
    try {
      const decoded = this.jwt.verify(cookie, { secret: JwtConfig.access.secret });
      return decoded as AuthData;
    } catch (e) {
      return null;
    }
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected (${Object.keys(this.server.sockets.sockets).length}): ${client.id}`);
  }

  handleConnection(client: Socket) {
    try {
      const authData = this.verify(client);
      if (!authData) client.disconnect();
      this.logger.log(`Client connected (${Object.keys(this.server.sockets.sockets).length}): ${client.id}`);
    } catch (e) {
      client.disconnect();
      this.logger.log(`Client disconnected (${Object.keys(this.server.sockets.sockets).length}): ${client.id}`);
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('join-room')
  joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.join(room);
    this.logger.log(`Client ${client.id} join to room (${room})`);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('leave-room')
  leaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} leave room (${room})`);
    client.leave(room);
  }
}
