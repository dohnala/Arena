import React from 'react'
import ReactDOM from "react-dom";
import { Keybindings } from '../components/Keybindings';
import { LeaderBoard } from '../components/LeaderBoard';
import { colors, fonts } from '../Constants';
import { EnemyPlayerUnit } from '../objects/EnemyPlayerUnit';
import { PlayerUnit } from '../objects/PlayerUnit';
import { leaderBoardService } from '../services/LeaderBoardService';

export default class GameScene extends Phaser.Scene {

	public static Name = "GameScene";
    
    private player: PlayerUnit;
    private enemyPlayers: Phaser.Physics.Arcade.Group;

    preload(): void {
        this.load.pack('preload', './assets/pack.json', 'preload');

        //@ts-ignore
        this.load.rexWebFont({
            google: {
                families: [fonts.base]
            },
        });
    }

	create(): void {
        this.add.grid(0, 0, 4096, 4096, 64, 64, colors.gray);

        this.cameras.main.setBounds(-1024, -1024, 2048, 2048); 
        this.physics.world.setBounds(-1024, -1024, 2048, 2048);

        this.enemyPlayers = this.physics.add.group();

        this.spawnPlayer("Angmar", 300, 300);
        this.spawnEnemy("Nullpointer", 600, 600);

        this.physics.add.collider(this.player, this.enemyPlayers);

        this.cameras.main.setRoundPixels(true);

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        this.createOverlay();
	}

    spawnPlayer(name: string, x: number, y: number): void {
        this.player = new PlayerUnit(this, name, x, y);     
    }

    spawnEnemy(name: string, x: number, y: number): void {
        new EnemyPlayerUnit(this, name, x, y, this.enemyPlayers);
    }

    update(): void {
        this.player.update();
    }

	createOverlay(): void {
		const overlay = (
			<div>
                <Keybindings/>
			    <LeaderBoard leaderboardObservable={leaderBoardService.getLeaderBoard()}/>
			</div>
		  );

		ReactDOM.render(overlay, document.getElementById('overlay'));	
	}
}
