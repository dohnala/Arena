export class PlayerShape extends Phaser.GameObjects.Ellipse {
    body: Phaser.Physics.Arcade.Body;

    private rightKey: Phaser.Input.Keyboard.Key;
    private leftKey: Phaser.Input.Keyboard.Key;
    private topKey: Phaser.Input.Keyboard.Key;
    private downKey: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y, 64, 64, 0xffffff);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.body.setCollideWorldBounds(true);

        // input
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.topKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(): void {
        this.body.setVelocity(0);

        if (this.rightKey.isDown) {
            this.body.setVelocityX(300);
        } else if (this.leftKey.isDown) {
            this.body.setVelocityX(-300);
        }

        if (this.topKey.isDown) {
            this.body.setVelocityY(-300);
        } else if (this.downKey.isDown) {
            this.body.setVelocityY(300);
        }
    }
}
