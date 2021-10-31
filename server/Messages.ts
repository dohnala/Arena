import { LeaderBoard, Player, Position, World } from "./Types";

export enum Message {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    
    LOGIN = 'login',
    LOGIN_SUCCESSFUL = 'loginSuccessful',

    PLAYER_JOINED = "playerJoined",
    PLAYER_LEFT = "playerLeft",

    LEADER_BOARD_CHANGED = "leaderBoardChanged",

    PLAYER_POSITION_CHANGED = "playerPositionChanged",
}
  
export interface Login {
    name: string;
}
  
export interface LoginSuccessful {
    world: World;
    player: Player;
    enemies: Player[];
    leaderBoard: LeaderBoard;
}

export interface PlayerJoined {
    player: Player;
}

export interface PlayerLeft {
    id: string;
}

export interface PlayerPositionChanged {
    id: string;
    position: Position;
}
  