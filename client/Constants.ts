export const colors = {
    white: "#eee",
    gray: "#5b5b5b",
    grayDark: 0x414141,
    blue: 0x0d6efd,
    lightBlue: "#408cfd",
    red: 0xdc3545,
    lightRed: "#e4606d",
    green: 0x3a813d,
    lightGreen: 0x429345,
} as const;

export const grid = {
    color: colors.grayDark,
    cellSize: 64,
} as const;

export const unit = {
    // appereance
    radius: 32,
    innerRadius: 20,  
    outlineColor: colors.grayDark,
    nameColor: colors.white,
    playerColor: colors.blue,
    playerLevelColor: colors.lightBlue,
    enemyPlayerColor: colors.red,
    enemyPlayerLevelColor: colors.lightRed,
    nameOffsetY: -14,
    nameFont: "14px Arial",
    levelFont: "bold 32px Arial",
    healthBarRadius: 28,
    healthBarThickness: 0.14,
    // physics
    maxVelocity: 300,
    drag: 300,
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
};
