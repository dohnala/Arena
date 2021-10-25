import 'phaser';
import 'bootstrap';
import './scss/main.scss';

import LoginScene from "./scenes/LoginScene";
import GameScene from "./scenes/GameScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	title: "Arena Game",
    parent: 'root',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#5b5b5b',
};

export default class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);

		this.scene.add(LoginScene.Name, LoginScene);
		this.scene.add(GameScene.Name, GameScene);
		this.scene.start(LoginScene.Name);
	}
}

window.onload = (): void => {
	const game = new Game(gameConfig);
};
