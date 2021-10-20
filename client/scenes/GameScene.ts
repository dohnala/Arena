export default class GameScene extends Phaser.Scene {

	public static Name = "GameScene";

	public preload(): void {
		
	}

	public create(): void {
        console.log((new Date()).toISOString() + " : GameScene::create");
	}
}
