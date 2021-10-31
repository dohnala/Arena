import { Position } from "../../server/Types";
import { unit } from "../Constants";
import { Unit } from "./Unit";

export class EnemyPlayerUnit extends Unit {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, id: string, name: string, position: Position, group?: Phaser.Physics.Arcade.Group) {
        super(scene, id, name, position, unit.enemyPlayerColor, unit.enemyPlayerLevelColor, true, false);

        group.add(this);

        // collisions
        this.body.setCircle(unit.radius);
    }
}
