import { unit } from "../Constants";
import { Unit } from "./Unit";

export class EnemyPlayerUnit extends Unit {
    constructor(scene: Phaser.Scene, name: string, x: number, y: number, group?: Phaser.Physics.Arcade.Group) {
        super(scene, name, x, y, unit.enemyPlayerColor, unit.enemyPlayerLevelColor, true, false);

        group.add(this);

        // collisions
        this.body.setCircle(unit.radius);
    }
}
