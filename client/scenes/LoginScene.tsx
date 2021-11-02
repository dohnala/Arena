import React from 'react'
import ReactDOM from "react-dom";
import { LoginSuccessful, Message } from '../../server/Messages';
import { LoginForm } from '../components/LoginForm'
import { socketService } from '../services/SocketService';
import GameScene from './GameScene';

export default class LoginScene extends Phaser.Scene {

	public static Name = "LoginScene";

	public create(): void {
		const subscription = socketService.onMessage<LoginSuccessful>(Message.LOGIN_SUCCESSFUL).subscribe(m => {
			subscription.unsubscribe();
			this.scene.start(GameScene.Name, m.world);	
		});

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
		socketService.send(Message.LOGIN, {name: name ? name : "Unnamed"});
	}
}
