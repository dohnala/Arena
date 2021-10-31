import { unit } from "../Constants";
import { Unit } from "./Unit";

export class EnemyPlayerUnit extends Unit {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, id: string, name: string, x: number, y: number, group?: Phaser.Physics.Arcade.Group) {
        super(scene, id, name, x, y, unit.enemyPlayerColor, unit.enemyPlayerLevelColor, true, false);

        group.add(this);

        // collisions
        this.body.setCircle(unit.radius);
    }
}
