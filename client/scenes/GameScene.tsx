import React from 'react'
import ReactDOM from "react-dom";
import { Subscription } from 'rxjs';
import { Message, PlayerJoined, PlayerLeft, PlayerPositionChanged } from '../../server/Messages';
import { LeaderBoard, Player, Position, World } from '../../server/Types';
import { Keybindings } from '../components/Keybindings';
import { LeaderBoardTable } from '../components/LeaderBoardTable';
import { fonts, grid } from '../Constants';
import { EnemyPlayerUnit } from '../objects/EnemyPlayerUnit';
import { PlayerUnit } from '../objects/PlayerUnit';
import { socketService } from '../services/SocketService';

export interface GameData {
    world: World;
    player: Player;
    enemies: Player[];
    leaderBoard: LeaderBoard
}

export default class GameScene extends Phaser.Scene {

	public static Name = "GameScene";
    
    private player: PlayerUnit;
    private enemyPlayers: Phaser.Physics.Arcade.Group;

    private playerJoinedSubscription: Subscription;
    private playerLeftSubscription: Subscription;
    private playerPositionChangedSubscription: Subscription;

    preload(): void {
        this.load.pack('preload', './assets/pack.json', 'preload');

        //@ts-ignore
        this.load.rexWebFont({
            google: {
                families: [fonts.base]
            },
        });
    }

	create(data: GameData): void {
        this.createWorld(data.world);

        this.spawnPlayer(data.player);
        this.spawnEnemies(data.enemies);
        
        this.physics.add.collider(this.player, this.enemyPlayers);

        this.createOverlay(data.leaderBoard);

        this.playerJoinedSubscription = socketService.onMessage<PlayerJoined>(Message.PLAYER_JOINED)
            .subscribe(m => this.spawnEnemy(m.player));

        this.playerLeftSubscription = socketService.onMessage<PlayerLeft>(Message.PLAYER_LEFT)
            .subscribe(m => this.removeEnemy(m.id));

        this.playerPositionChangedSubscription = socketService.onMessage<PlayerPositionChanged>(Message.PLAYER_POSITION_CHANGED)
            .subscribe(m => this.updateEnemyPosition(m.id, m.position));

        this.events.on('shutdown', this.shutdown, this)
	}

    shutdown(): void {
        this.playerJoinedSubscription.unsubscribe();
        this.playerLeftSubscription.unsubscribe();
        this.playerPositionChangedSubscription.unsubscribe();
    }

    createWorld(world: World): void {
        this.add.grid(0, 0, 2 * world.bounds.width, 2 * world.bounds.height, grid.cellSize, grid.cellSize, grid.color);

        this.cameras.main.setBounds(
            world.bounds.position.x, 
            world.bounds.position.y, 
            world.bounds.width, 
            world.bounds.height); 

        this.physics.world.setBounds(
            world.bounds.position.x, 
            world.bounds.position.y,
            world.bounds.width, 
            world.bounds.height);

        this.cameras.main.setRoundPixels(true);
    }

    spawnPlayer(player: Player): void {
        this.player = new PlayerUnit(this, player.id, player.name, player.position);     

        this.player.positionObservable.subscribe(position => 
            socketService.send(Message.PLAYER_POSITION_CHANGED, {
                id: player.id,
                position: position
            }));

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05); 
    }

    spawnEnemies(enemies: Player[]): void {
        this.enemyPlayers = this.physics.add.group();

        enemies.forEach(enemy => this.spawnEnemy(enemy));
    }

    spawnEnemy(enemy: Player): void {
        new EnemyPlayerUnit(this, enemy.id, enemy.name, enemy.position, this.enemyPlayers);    
    }

    updateEnemyPosition(enemyId: string, position: Position): void {
        (this.enemyPlayers.getChildren() as EnemyPlayerUnit[]).forEach(enemy => {
            if (enemy.id === enemyId) {
                enemy.setPosition(position.x, position.y);
            }
        });    
    }

    removeEnemy(enemyId: string): void {
        (this.enemyPlayers.getChildren() as EnemyPlayerUnit[]).forEach(enemy => {
            if (enemy.id === enemyId) {
                enemy.destroy();
            }
        });
    }

    update(): void {
        this.player.update();
    }

	createOverlay(leaderBoard: LeaderBoard): void {
		const overlay = (
			<div>
                <Keybindings/>
			    <LeaderBoardTable 
                    leaderBoard={leaderBoard} 
                    leaderboardObservable={socketService.onMessage<LeaderBoard>(Message.LEADER_BOARD_CHANGED)}/>
			</div>
		  );

		ReactDOM.render(overlay, document.getElementById('overlay'));	
	}
}
