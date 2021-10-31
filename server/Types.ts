export interface Position {
    x: number;
    y: number;    
}

export interface Bounds {
    position: Position;
    width: number;
    height: number
}

export interface World {
    bounds: Bounds;
}

export interface Player {
    id: string;
    name: string;
    score: number;
    position: Position;
}

export interface LeaderBoardItem {
    id: string;
    rank: number;
    name: string;
    score: number;
}

export interface LeaderBoard {
    top: LeaderBoardItem[];
    player: LeaderBoardItem;        
}
