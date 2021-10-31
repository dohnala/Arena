import { Socket } from "socket.io";
import { leaderBoardSize } from "./Constants";
import { Message, PlayerPositionChanged } from "./Messages";
import { Bounds, LeaderBoard, LeaderBoardItem, Player } from "./Types";

export class World {
    private bounds: Bounds;
    private players: {[id: string]: Player} = {};
    private sockets: {[id: string]: Socket} = {};

    constructor(bounds: Bounds) {
        this.bounds = bounds;
    }

    /**
     * Spawns a new player into the world
     * @param socket player's socket
     * @param name player's name
     */
    public spawnPlayer(socket: Socket, name: string): void {
        this.players[socket.id] = {
            id: socket.id,
            name: name,
            score: 0,
            x: 0,
            y: 0
        };     

        this.sockets[socket.id] = socket;

        const player = this.players[socket.id];
        const leaderBoardItems = this.getLeaderBoardItems();
              
        socket.emit(Message.LOGIN_SUCCESSFUL, {
            world: { bounds: this.bounds },
            player: player,
            enemies: this.getEnemies(socket.id),
            leaderBoard: {
                top: leaderBoardItems.slice(0, leaderBoardSize),
                player: leaderBoardItems.find((item: LeaderBoardItem) => item.id === socket.id)
            }
        });

        socket.broadcast.emit(Message.PLAYER_JOINED, {player: player});

        for (let socketId in this.sockets) {
            this.sockets[socketId].emit(Message.LEADER_BOARD_CHANGED, {
                top: leaderBoardItems.slice(0, leaderBoardSize),
                player: leaderBoardItems.find((item: LeaderBoardItem) => item.id === socketId)     
            });   
        }

        this.addMessageHandlers(socket);
    }

    addMessageHandlers(socket: Socket) {
        // Player position changed
        socket.on(Message.PLAYER_POSITION_CHANGED, (m: PlayerPositionChanged) => {
            this.updatePosition(socket.id, m.x, m.y);
            socket.broadcast.emit(Message.PLAYER_POSITION_CHANGED, m);
        });
  
        // Player disconnected
        socket.on(Message.DISCONNECT, () => {
            console.log('[received][%s][disconnect]', socket.id);

            this.removePlayer(socket.id);

            const leaderBoardItems = this.getLeaderBoardItems();

            for (let socketId in this.sockets) {
                this.sockets[socketId].emit(Message.PLAYER_LEFT, {id: socket.id});
                this.sockets[socketId].emit(Message.LEADER_BOARD_CHANGED, {
                    top: leaderBoardItems.slice(0, leaderBoardSize),
                    player: leaderBoardItems.find((item: LeaderBoardItem) => item.id === socketId)     
                });   
            }
        });
    }

    removePlayer(id: string): void {
        delete this.players[id];
    }

    updatePosition(id: string, x: number, y: number): void {
        this.players[id].x = x;
        this.players[id].y = y;
    }

    getEnemies(id: string): Player[] {
        let enemies: Player[] = [];

        for (let playerId of Object.keys(this.players)) {
            if (playerId !== id) {
                enemies.push(this.players[playerId]);
            }
        }

        return enemies;
    }

    getLeaderBoardItems(): LeaderBoardItem[] {
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
