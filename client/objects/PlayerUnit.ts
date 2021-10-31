import { Position } from "../../server/Types";
import { unit } from "../Constants";
import { Unit } from "./Unit";

export class PlayerUnit extends Unit {
    body: Phaser.Physics.Arcade.Body;

    private rightKey: Phaser.Input.Keyboard.Key;
    private leftKey: Phaser.Input.Keyboard.Key;
    private topKey: Phaser.Input.Keyboard.Key;
    private downKey: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, id: string, name: string, position: Position) {
        super(scene, id, name, position, unit.playerColor, unit.playerLevelColor, false, false);

        this.scene.physics.world.enable(this);

        // collisions
        this.body.setCircle(unit.radius);
        this.body.setCollideWorldBounds(true);

        // physics
        this.body.setMaxVelocity(unit.maxVelocity);
        this.body.setDrag(unit.drag, unit.drag);

        // inputs
        this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.topKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(): void {
        super.update();
        
        if (this.rightKey.isDown) {
            this.body.setVelocityX(unit.maxVelocity);
        } else if (this.leftKey.isDown) {
            this.body.setVelocityX(-unit.maxVelocity);
        }

        if (this.topKey.isDown) {
            this.body.setVelocityY(-unit.maxVelocity);
        } else if (this.downKey.isDown) {
            this.body.setVelocityY(unit.maxVelocity);
        }
    }
}
