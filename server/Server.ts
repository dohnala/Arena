import express from "express";
import socketIo from 'socket.io';
import http from "http";
import fs from 'fs'
import path from 'path'
import { LoginMessage, Message } from "./Messages";

class Server {
    public static readonly PORT: number = 3000;

    private port: string | number;

    private _app: express.Application;
    private server: http.Server;
    private io: socketIo.Server;

    constructor () {
        this.port = process.env.PORT || Server.PORT;

        this._app = express();
        this.initApp();

        this.server = http.createServer(this._app);
        this.io = new socketIo.Server(this.server);
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

        this.io.on(Message.CONNECT, (socket: any) => {
            console.log('Connected client on port %s.', this.port);
      
            socket.on(Message.LOGIN, (m: LoginMessage) => {
              console.log('[server](login): %s', JSON.stringify(m));
              //this.io.emit('message', m);
            });
      
            socket.on(Message.DISCONNECT, () => {
              console.log('Client disconnected');
            });
        });
    }

    get app (): express.Application {
        return this._app;
    }
}

let app = new Server().app;

export { app };
