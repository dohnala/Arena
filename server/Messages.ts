import { LeaderBoard, Player, World } from "./Types";

export enum Message {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    
    LOGIN = 'login',
    LOGIN_SUCCESSFUL = 'loginSuccessful',

    PLAYER_JOINED = "playerJoined",
    PLAYER_LEFT = "playerLeft",

    LEADER_BOARD_CHANGED = "leaderBoardChanged",
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
  