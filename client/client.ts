import 'phaser';
import 'bootstrap';
import './scss/main.scss';

import GameScene from "./scenes/GameScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	title: "Arena Game",
    parent: 'root',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#282828',
};

export default class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);

		this.scene.add(GameScene.Name, GameScene);
		this.scene.start(GameScene.Name);
	}
}

window.onload = (): void => {
	const game = new Game(gameConfig);
};
