import { Position } from "../../server/Types";

export interface CollectibleInfo {
    id: string,
}

export interface CollectibleSettings {
    radius: number,
    color: number,
    glowDuration: number,
    glowIntensityFrom: number,
    glowIntensityTo: number,
}

export class Collectible extends Phaser.GameObjects.Container {
    body: Phaser.Physics.Arcade.Body;
    
    protected info: CollectibleInfo;
    protected settings: CollectibleSettings;

    constructor(scene: Phaser.Scene, position: Position, info: CollectibleInfo, settings: CollectibleSettings, group?: Phaser.Physics.Arcade.Group) {        
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
        const circle = new Phaser.GameObjects.Ellipse(this.scene, 
            0, 
            0, 
            this.settings.radius * 2, 
            this.settings.radius * 2, 
            this.settings.color);

        this.add(circle);  

        //@ts-ignore
        const pipeline = this.scene.plugins.get('rexGlowFilterPipeline').add(circle);

        this.scene.tweens.add({
            targets: pipeline,
            intensity: { 
                from: this.settings.glowIntensityFrom, 
                to: this.settings.glowIntensityTo 
            },
            ease: 'Linear',
            duration: this.settings.glowDuration,
            repeat: -1,
            yoyo: true
        });
    }
}
