import { Position } from "../../server/Types";
import { playerUnitSettings } from "../Constants";
import { Unit, UnitInfo } from "./Unit";

export class PlayerUnit extends Unit {
    body: Phaser.Physics.Arcade.Body;

    private rightKey: Phaser.Input.Keyboard.Key;
    private leftKey: Phaser.Input.Keyboard.Key;
    private topKey: Phaser.Input.Keyboard.Key;
    private downKey: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, position: Position, info: UnitInfo) {
        super(scene, position, info, playerUnitSettings);

        this.scene.physics.world.enable(this);

        // collisions
        this.body.setCircle(this.settings.radius);
        this.body.setCollideWorldBounds(true);

        // physics
        this.body.setMaxVelocity(this.info.maxVelocity);
        this.body.setDrag(this.info.drag, this.info.drag);

        // inputs
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.topKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(): void {
        super.update();
        
        if (this.rightKey.isDown) {
            this.body.setVelocityX(this.info.maxVelocity);
        } else if (this.leftKey.isDown) {
            this.body.setVelocityX(-this.info.maxVelocity);
        }

        if (this.topKey.isDown) {
            this.body.setVelocityY(-this.info.maxVelocity);
        } else if (this.downKey.isDown) {
            this.body.setVelocityY(this.info.maxVelocity);
        }
    }
}
