export enum Message {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    LOGIN = 'login'
  }

export interface LoginMessage {
    name: string;
}
