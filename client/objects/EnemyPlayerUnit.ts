import { Position } from "../../server/Types";
import { enemyPlayerUnitSettings } from "../Constants";
import { Unit, UnitInfo } from "./Unit";

export class EnemyPlayerUnit extends Unit {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, position: Position, info: UnitInfo, group?: Phaser.Physics.Arcade.Group) {
        super(scene, position, info, enemyPlayerUnitSettings);

        group.add(this);

        // collisions
        this.body.setCircle(this.settings.radius);
    }
}
