import React from 'react'
import ReactDOM from "react-dom";
import { LeaderBoard } from '../components/LeaderBoard';
import { EnemyPlayerUnit } from '../objects/EnemyPlayerUnit';
import { PlayerUnit } from '../objects/PlayerUnit';
import { leaderBoardService } from '../services/LeaderBoardService';

export default class GameScene extends Phaser.Scene {

	public static Name = "GameScene";
    
    private player: PlayerUnit;
    private enemyPlayers: Phaser.Physics.Arcade.Group;

    preload(): void {
        this.load.pack('preload', './assets/pack.json', 'preload');
    }

	create(): void {
        this.enemyPlayers = this.physics.add.group();

        this.spawnPlayer("Angmar", 300, 300);
        this.spawnEnemy("Nullpointer", 600, 600);

        this.physics.add.collider(this.player, this.enemyPlayers);

        this.cameras.main.setRoundPixels(true);

        //this.cameras.main.setBounds(0, 0, 2*1024, 2*1024); 
        //this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        //this.cameras.main.setZoom(1);

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
			  <LeaderBoard leaderboardObservable={leaderBoardService.getLeaderBoard()}/>
			</div>
		  );

		ReactDOM.render(overlay, document.getElementById('overlay'));	
	}
}
