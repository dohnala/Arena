import express from "express";
import socketIo, { Socket } from 'socket.io';
import http from "http";
import fs from 'fs'
import path from 'path'
import { Login, Message } from "./Messages";
import { Room } from "./Room";
import { LeaderBoardItem } from "./Types";

class Server {
    public static readonly PORT: number = 3000;
    public static readonly LEADER_BOARD_SIZE: number = 5;

    private port: string | number;

    private _app: express.Application;
    private server: http.Server;
    private io: socketIo.Server;

    private room: Room;

    constructor () {
        this.port = process.env.PORT || Server.PORT;

        this._app = express();
        this.initApp();

        this.server = http.createServer(this._app);
        this.io = new socketIo.Server(this.server);
        
        this.room = new Room();

        this.listen();
    }

    private initApp(): void {
        this._app.set('view engine', 'ejs')
        this._app.set('views', path.join(__dirname, 'views'))

        this._app.use('/', express.static(path.join(__dirname, 'static')))

        const manifest = fs.readFileSync(
            path.join(__dirname, 'static/manifest.json'),
            'utf-8'
        )
        const assets = JSON.parse(manifest)

        this._app.get('/', (req, res) => {
            res.render('index', { assets })
        })
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`)
        });

        this.io.on(Message.CONNECT, (socket: Socket) => {
            console.log('[received][%s][connect]', socket.id);

            socket.on(Message.LOGIN, (m: Login) => {
                console.log('[received][%s][login]: %s', socket.id, JSON.stringify(m));
              
                const player = this.room.spawnPlayer(socket, m.name);
                const leaderBoardItems = this.room.getLeaderBoardItems();
              
                if (player) {
                    socket.emit(Message.LOGIN_SUCCESSFUL, {
                        world: {
                            bounds: {x: -1024, y: -1024, width: 2048, height: 2048},
                        },
                        player: player,
                        enemies: this.room.getEnemies(player.id),
                        leaderBoard: {
                            top: leaderBoardItems.slice(0, Server.LEADER_BOARD_SIZE),
                            player: leaderBoardItems.find((item: LeaderBoardItem) => item.id === player.id)
                        }
                    });
                    socket.broadcast.emit(Message.PLAYER_JOINED, {player: player});

                    for (let socketId in this.room.sockets) {
                        this.room.sockets[socketId].emit(Message.LEADER_BOARD_CHANGED, {
                            top: leaderBoardItems.slice(0, Server.LEADER_BOARD_SIZE),
                            player: leaderBoardItems.find((item: LeaderBoardItem) => item.id === socketId)     
                        });   
                    }
                }
            });
      
            socket.on(Message.DISCONNECT, () => {
                console.log('[received][%s][disconnect]', socket.id);

                this.room.removePlayer(socket.id);
                const leaderBoardItems = this.room.getLeaderBoardItems();

                this.io.emit(Message.PLAYER_LEFT, {id: socket.id});

                for (let socketId in this.room.sockets) {
                    this.room.sockets[socketId].emit(Message.LEADER_BOARD_CHANGED, {
                        top: leaderBoardItems.slice(0, Server.LEADER_BOARD_SIZE),
                        player: leaderBoardItems.find((item: LeaderBoardItem) => item.id === socketId)     
                    });   
                }
            });
        });
    }

    get app(): express.Application {
        return this._app;
    }
}

let app = new Server().app;

export { app };
