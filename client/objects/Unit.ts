import CircularProgress from 'phaser3-rex-plugins/plugins/circularprogress'
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { Position } from '../../server/Types';
import { colorToString, depth } from "../Constants";

export interface UnitInfo {
    id: string,
    name: string,

    health: number,
    maxHealth: number

    maxVelocity: number,
    drag: number,
}

export interface UnitSettings {
    // Total radius of the unit
    radius: number,
    // Inner radius of the circle
    innerRadius: number,
    // Color of the the inner circle
    color: number,
    // Background color of the unit
    backgroundColor: number,
    // Background alpha of the unit
    backgroundAlpha: number,
    // Outline thickness of the unit
    outlineThickness: number,
    // Outline alpha of the unit
    outlineAlpha: number,
   
    // Show unit name on top of the unit
    showName: boolean,
    // Y offset of the name position 
    nameOffsetY: number,
    // Name color
    nameColor: number,
    // Name font style
    nameFontStyle: string,

    // Show unit health bar
    showHealthBar: boolean,
    // Radius of the health bar
    healthBarRadius: number,
    // Color of the health bar
    healthBarColor: number,
    // Thickness of the health bar
    healthBarThickness: number,
}

export abstract class Unit extends Phaser.GameObjects.Container {

    protected info: UnitInfo;
    protected settings: UnitSettings;

    private unitNameText: Phaser.GameObjects.Text;

    private healthBar: CircularProgress;

    private positionSubject: BehaviorSubject<Position>;

    constructor(scene: Phaser.Scene, position: Position, info: UnitInfo, settings: UnitSettings) {        
        super(scene, position.x, position.y, []);

        this.info = info;
        this.settings = settings;
        this.positionSubject = new BehaviorSubject<Position>(position);

        this.createShape();

        this.scene.add.existing(this);
    }

    get id(): string {
        return this.info.id;
    }

    get positionObservable(): Observable<Position> {
        return this.positionSubject.pipe(distinctUntilChanged((prev, curr) => prev.x === curr.x && prev.y === curr.y));
    }

    update(): void {
        this.positionSubject.next({x: this.x, y: this.y});
    }

    public takeDamage(damage: number): void {
        this.info.health = Math.max(0, this.info.health - damage);
        this.healthBar.setValue(this.info.health / this.info.maxHealth);
    }

    private createShape(): void {
        // outline
        this.add(new Phaser.GameObjects.Ellipse(this.scene, 
            0, 
            0, 
            (this.settings.radius + this.settings.outlineThickness) * 2, 
            (this.settings.radius + this.settings.outlineThickness) * 2, 
            this.settings.color,
            this.settings.outlineAlpha));

        // background
        this.add(new Phaser.GameObjects.Ellipse(this.scene, 
            0, 
            0, 
            this.settings.radius * 2, 
            this.settings.radius * 2, 
            this.settings.backgroundColor,
            this.settings.backgroundAlpha));  

        // healthbar
        this.createHealthBar();

        // inner color
        this.add(new Phaser.GameObjects.Ellipse(this.scene, 
            0, 
            0,
            this.settings.innerRadius * 2, 
            this.settings.innerRadius * 2, 
            this.settings.color));

        // name
        this.createNameText();
    }

    private createNameText(): void {
        this.unitNameText = new Phaser.GameObjects.Text(this.scene, 0, this.settings.nameOffsetY, this.info.name, {
            font: this.settings.nameFontStyle,
            color: colorToString(this.settings.nameColor),
        }).setOrigin(0.5).setDepth(depth.ui);

        if (this.settings.showName) {
            this.add(this.unitNameText);
        }
    }

    private createHealthBar(): void {
        this.healthBar = new CircularProgress(this.scene, 
            0, 
            0, 
            this.settings.healthBarRadius, 
            this.settings.healthBarColor, 
            this.info.health / this.info.maxHealth)
            .setStartAngle(Phaser.Math.DegToRad(90))
            .setThickness(this.settings.healthBarThickness);

        if (this.settings.showHealthBar) {
            this.add(this.healthBar);
        }
    }
}
