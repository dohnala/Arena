import { Position } from "../../server/Types";

export interface CollectibleObjectInfo {
    id: string;
    points: number;
}

export interface CollectibleObjectSettings {
    radius: number;
    color: number;
    outlineThickness: number;
    outlineAlpha: number;
}

export class CollectibleObject extends Phaser.GameObjects.Container {
    body: Phaser.Physics.Arcade.Body;
    
    protected info: CollectibleObjectInfo;
    protected settings: CollectibleObjectSettings;

    constructor(
        scene: Phaser.Scene, 
        position: Position, 
        info: CollectibleObjectInfo, 
        settings: CollectibleObjectSettings, 
        group?: Phaser.Physics.Arcade.Group) { 

        super(scene, position.x, position.y, []);

        this.info = info;
        this.settings = settings;

        this.createShape();

        this.scene.add.existing(this);
        
        group.add(this);

        // collisions
        this.body.setCircle(this.settings.radius, -this.settings.radius, -this.settings.radius);
    }

    get id(): string {
        return this.info.id;
    }

    private createShape(): void {
        this.add(new Phaser.GameObjects.Ellipse(this.scene, 
            0, 
            0, 
            (this.settings.radius + this.settings.outlineThickness) * 2, 
            (this.settings.radius + this.settings.outlineThickness) * 2, 
            this.settings.color,
            this.settings.outlineAlpha));

        this.add(new Phaser.GameObjects.Ellipse(this.scene, 
            0, 
            0, 
            this.settings.radius * 2, 
            this.settings.radius * 2, 
            this.settings.color)); 
    }
}
