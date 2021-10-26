import { NONE } from 'phaser';
import React from 'react'
import ReactDOM from "react-dom";
import { LeaderBoard } from '../components/LeaderBoard';
import { colors, grid } from '../Constants';
import { PlayerImage } from '../objects/PlayerImage';
import { PlayerShape } from '../objects/PlayerShape';
import { leaderBoardService } from '../services/LeaderBoardService';

export default class GameScene extends Phaser.Scene {

	public static Name = "GameScene";
    
    private player: PlayerShape;

    preload(): void {
        this.load.pack('preload', './assets/pack.json', 'preload');
    }

	create(): void {
        console.log((new Date()).toISOString() + " : GameScene::create");

        //this.createGrid();
        this.createOverlay();

        this.player = new PlayerShape(this, 300, 300);

        this.cameras.main.setRoundPixels(true);

        //this.cameras.main.setBounds(0, 0, 2*1024, 2*1024); 
        //this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        //this.cameras.main.setZoom(1);

        //this.physics.world.fixedStep = false;

	}

    update(): void {
        this.player.update();
    }

    createGrid(): void {
        const size = this.sys.game.scale.gameSize

        console.log(size);

        this.add.grid(0, 0, 4 * size.width, 4 * size.height, 64, 64, colors.grayDark);
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
