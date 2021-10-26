export const colors = {
    gray: "#5b5b5b",
    grayDark: 0x414141,
} as const;

export const grid = {
    color: colors.grayDark,
    cellSize: 64,
} as const;

export const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.CANVAS,
	title: "Arena Game",
    parent: 'root',
    backgroundColor: colors.gray,
    roundPixels: true,
    scale: {
        parent: 'root',
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
} as const;
