export interface Bounds {
    x: number;
    y: number;
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
    x: number;
    y: number;
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
