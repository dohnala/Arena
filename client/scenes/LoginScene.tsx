import React from 'react'
import ReactDOM from "react-dom";
import { LoginForm } from '../components/LoginForm'
import { playerService } from '../services/PlayerService';
import GameScene from './GameScene';

export default class LoginScene extends Phaser.Scene {

	public static Name = "LoginScene";

	public create(): void {
        console.log((new Date()).toISOString() + " : LoginScene::create");

		this.createOverlay();
	}

	public createOverlay(): void {
		const overlay = (
			<div>
			  <LoginForm onLogin={(nick: string) => this.login(nick)}/>
			</div>
		  );

		ReactDOM.render(overlay, document.getElementById('overlay'));	
	}

	public login(nick: string): void {
		playerService.login(nick);

		this.scene.start(GameScene.Name);
	}
}
