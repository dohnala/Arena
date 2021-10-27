import { unit } from "../Constants";

export abstract class Unit extends Phaser.GameObjects.Container {
    body: Phaser.Physics.Arcade.Body;

    private unitName: string;
    private unitNameText: Phaser.GameObjects.Text;

    private level: number;
    private levelText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, name: string, x: number, y: number, color: number, levelColor: string, showName: boolean, showLevel: boolean) {        
        super(scene, x, y, [
            new Phaser.GameObjects.Ellipse(scene, unit.radius, unit.radius, unit.radius * 2, unit.radius * 2, unit.outlineColor),
            new Phaser.GameObjects.Ellipse(scene, unit.radius, unit.radius, unit.innerRadius * 2, unit.innerRadius * 2, color),   
        ]);

        this.unitName = name;
        this.level = 1;

        this.unitNameText = new Phaser.GameObjects.Text(scene, unit.radius, unit.nameOffsetY, this.unitName, {
            font: unit.nameFont,
            color: unit.nameColor,
        }).setOrigin(0.5);

        this.levelText = new Phaser.GameObjects.Text(scene, unit.radius, unit.radius, this.level.toString(), {
            font: unit.levelFont,
            color: levelColor,
        }).setOrigin(0.5);

        if (showName) {
            this.add(this.unitNameText);
        }
        
        if (showLevel) {
            this.add(this.levelText);
        }

        this.scene.add.existing(this);
    }

    public setLevel(level: number): void {
        this.level = level;
        this.levelText.setText(this.level.toString());
    }
}
