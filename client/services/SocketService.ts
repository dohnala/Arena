import { fromEvent, Observable, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../server/Messages';

class SocketService {
    private socket: Socket = {} as Socket;

    public init(): void {
        this.socket = io();
    }

    public send(message: Message, data: any): void {
        console.log('[sent][%s][%s]: %s', this.socket.id, message, JSON.stringify(data));
        this.socket.emit(message, data);
    }

    public onMessage<T>(message: Message): Observable<T> {
        return fromEvent(this.socket, message).pipe(tap(data => 
            console.log('[received][%s][%s]: %s', this.socket.id, message, JSON.stringify(data))));
      }
}

export const socketService = new SocketService();
