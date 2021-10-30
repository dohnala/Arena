import { io, Socket } from 'socket.io-client';

class SocketService {
    private socket: Socket = {} as Socket;

    public init(): void {
        this.socket = io();
    }
}

export const socketService = new SocketService();
