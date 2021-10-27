import CircularProgress from 'phaser3-rex-plugins/plugins/circularprogress'
import { colors, unit } from "../Constants";

export abstract class Unit extends Phaser.GameObjects.Container {
    body: Phaser.Physics.Arcade.Body;

    private unitName: string;
    private unitNameText: Phaser.GameObjects.Text;

    private level: number;
    private levelText: Phaser.GameObjects.Text;

    private health: number;
    private maxHealth: number;
    private healthBar: CircularProgress;

    constructor(scene: Phaser.Scene, name: string, x: number, y: number, color: number, levelColor: string, showName: boolean, showLevel: boolean) {        
        super(scene, x, y, []);

        this.unitName = name;
        this.level = 1;
        this.health = 10;
        this.maxHealth = 10;

        this.createShape(color, levelColor);

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

    public takeDamage(damage: number): void {
        this.health = Math.max(0, this.health - damage);
        this.healthBar.setValue(this.health / this.maxHealth);
    }

    private createShape(color: number, levelColor: string): void {
        // background
        this.add(new Phaser.GameObjects.Ellipse(this.scene, unit.radius, unit.radius, unit.radius * 2, unit.radius * 2, unit.outlineColor));  

        // healthbar
        this.createHealthBar();

        // inner color
        this.add(new Phaser.GameObjects.Ellipse(this.scene, unit.radius, unit.radius, unit.innerRadius * 2, unit.innerRadius * 2, color));

        // level 
        this.createLevelText(levelColor);

        // name
        this.createNameText();
    }

    private createNameText(): void {
        this.unitNameText = new Phaser.GameObjects.Text(this.scene, unit.radius, unit.nameOffsetY, this.unitName, {
            font: unit.nameFontStyle,
            color: unit.nameColor,
        }).setOrigin(0.5);
    }

    private createLevelText(levelColor: string): void {
        this.levelText = new Phaser.GameObjects.Text(this.scene, unit.radius, unit.radius, this.level.toString(), {
            font: unit.levelFontStyle,
            color: levelColor,
        }).setOrigin(0.5);
    }

    private createHealthBar(): void {
        this.healthBar = new CircularProgress(this.scene, unit.radius, unit.radius, unit.healthBarRadius, colors.lightGreen, this.health / this.maxHealth)
            .setStartAngle(Phaser.Math.DegToRad(90))
            .setThickness(unit.healthBarThickness);

        this.add(this.healthBar);
    }
}
