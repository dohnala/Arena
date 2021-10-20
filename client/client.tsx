import 'phaser';
import GameScene from "./scenes/GameScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	title: "Arena Game",
    scale: {
        parent: 'root',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
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
