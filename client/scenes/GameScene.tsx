import React from 'react'
import ReactDOM from "react-dom";
import { LeaderBoard } from '../components/LeaderBoard';
import { leaderBoardService } from '../services/LeaderBoardService';

export default class GameScene extends Phaser.Scene {

	public static Name = "GameScene";

	public create(): void {
        console.log((new Date()).toISOString() + " : GameScene::create");

		this.createOverlay();
	}

	public createOverlay(): void {
		const overlay = (
			<div>
			  <LeaderBoard leaderboardObservable={leaderBoardService.getLeaderBoard()}/>
			</div>
		  );

		ReactDOM.render(overlay, document.getElementById('overlay'));	
	}
}
