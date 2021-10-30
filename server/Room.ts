import { Socket } from "socket.io";
import { LeaderBoardItem, Player } from "./Types";

export class Room {
    private players: {[id: string]: Player} = {};
    private _sockets: {[id: string]: Socket} = {};

    public get sockets(): {[id: string]: Socket} {
        return this._sockets;
    }

    public spawnPlayer(socket: Socket, name: string): Player {
        this.players[socket.id] = {
            id: socket.id,
            name: name,
            score: 0,
            x: 0,
            y: 0
        };     

        this._sockets[socket.id] = socket;

        return this.players[socket.id];
    }

    public removePlayer(id: string): void {
        delete this.players[id];
    }

    public getEnemies(id: string): Player[] {
        let enemies: Player[] = [];

        for (let playerId of Object.keys(this.players)) {
            if (playerId !== id) {
                enemies.push(this.players[playerId]);
            }
        }

        return enemies;
    }

    public getLeaderBoardItems(): LeaderBoardItem[] {
        return Object.values(this.players)
            .sort((p1, p2) => {
                let byScore = p1.score - p2.score;

                if (byScore === 0) {
                    return p1.name.localeCompare(p2.name);
                }

                return byScore;
            })
            .map((player, index) => {
                return {
                    id: player.id,
                    rank: index + 1,
                    name: player.name,
                    score: player.score
                }
            });
    }
}
