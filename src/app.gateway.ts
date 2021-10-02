import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer() server: Server;

  candidates: Record<string, number>;

  constructor() {
    this.candidates = {
      yorme: 0,
      pacman: 0,
      ping: 0,
    };
  }

  @SubscribeMessage('vote')
  handleVote(@MessageBody() data: { name: string; count: number }) {
    this.candidates[data.name] = this.candidates[data.name] + data.count;

    this.server.emit('events', this.candidates);
  }
}
