import socketIo, { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { leaderBoardSize } from "./Constants";
import { CollectiblePickedUp, Message, PlayerPositionChanged } from "./Messages";
import { Bounds, Collectible, LeaderBoardItem, Player, Position } from "./Types";

export interface WorldSettings {
    bounds: Bounds;
    collectibleCount: number;
    collectiblePoints: number;
    collectibleSpawnOffset: number;
    leaderBoardSize: number;
}

export class World {
    private io: socketIo.Server;

    private settings: WorldSettings;

    private sockets: {[id: string]: Socket} = {};
    private players: {[id: string]: Player} = {};
    private collectibles: {[id: string]: Collectible} = {};

    constructor(io: socketIo.Server, settings: WorldSettings) {
        this.io = io;
        this.settings = settings;

        // Spawn collectibles
        Array.from(Array(this.settings.collectibleCount).keys()).forEach(_ => this.spawnCollectible());
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
            position: this.randomPosition(),
            score: 0,
            health: 10,
            maxHealth: 10,
            maxVelocity: 300,
            drag: 300, 
        };     

        this.sockets[socket.id] = socket;

        const player = this.players[socket.id];
        const leaderBoardItems = this.getLeaderBoardItems();
              
        socket.emit(Message.LOGIN_SUCCESSFUL, {
            world: { 
                bounds: this.settings.bounds,
                player: player,
                enemies: this.getEnemies(socket.id),
                collectibles: Object.values(this.collectibles),
                leaderBoard: {
                    top: leaderBoardItems.slice(0, leaderBoardSize),
                    player: leaderBoardItems.find((item: LeaderBoardItem) => item.id === socket.id)
                }
            },
        });

        socket.broadcast.emit(Message.PLAYER_JOINED, {player: player});

        this.updateLeaderBoard();

        this.addMessageHandlers(socket);
    }

    public removePlayer(id: string): void {
        delete this.players[id];
        delete this.sockets[id];

        this.io.emit(Message.PLAYER_LEFT, {id: id});

        this.updateLeaderBoard();
    }

    spawnCollectible(broadcastMessage: boolean = false): void {
        const id = uuidv4();    

        this.collectibles[id] = {
            id: id,
            position: this.randomPosition(this.settings.collectibleSpawnOffset),
            points: this.settings.collectiblePoints
        }

        if (broadcastMessage) {
            this.io.emit(Message.COLLECTIBLE_SPAWNED, {collectible: this.collectibles[id]});    
        }
    }

    addMessageHandlers(socket: Socket) {
        // Player position changed
        socket.on(Message.PLAYER_POSITION_CHANGED, (m: PlayerPositionChanged) => {
            this.players[socket.id].position = m.position;
            socket.broadcast.emit(Message.PLAYER_POSITION_CHANGED, m);
        });

        // Collectible picked up
        socket.on(Message.COLLECTIBLE_PICKED_UP, (m: CollectiblePickedUp) => {
            const collectible = this.collectibles[m.collectibleId];

            if (collectible) {
                this.addPoints(m.playerId, collectible.points);

                delete this.collectibles[m.collectibleId];
                socket.broadcast.emit(Message.COLLECTIBLE_PICKED_UP, m);

                // Spawn new collectible
                this.spawnCollectible(true);
            }
        });
    }

    addPoints(playerId: string, points: number): void {
        this.players[playerId].score += points;

        this.updateLeaderBoard();
    }

    updateLeaderBoard(): void {
        const leaderBoardItems = this.getLeaderBoardItems();

        for (let socketId in this.sockets) {
            this.sockets[socketId].emit(Message.LEADER_BOARD_CHANGED, {
                top: leaderBoardItems.slice(0, leaderBoardSize),
                player: leaderBoardItems.find((item: LeaderBoardItem) => item.id === socketId)     
            });   
        }
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
                let byScore = p2.score - p1.score;

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

    randomPosition(offset: number = 0): Position {
        return {
            x: this.settings.bounds.position.x + offset + Math.floor(Math.random() * (this.settings.bounds.width - 2 * offset)),
            y: this.settings.bounds.position.y + offset + Math.floor(Math.random() * (this.settings.bounds.height - 2 * offset))
        };
    }
}
