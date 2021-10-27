import React from 'react'
import ReactDOM from "react-dom";
import { LoginForm } from '../components/LoginForm'
import { playerService } from '../services/PlayerService';
import GameScene from './GameScene';

export default class LoginScene extends Phaser.Scene {

	public static Name = "LoginScene";

	public create(): void {
		this.createOverlay();
	}

	public createOverlay(): void {
		const overlay = (
			<div>
			  <LoginForm onLogin={(name: string) => this.login(name)}/>
			</div>
		  );

		ReactDOM.render(overlay, document.getElementById('overlay'));	
	}

	public login(name: string): void {
		playerService.login(name);

		this.scene.start(GameScene.Name);
	}
}
