import Phaser from 'phaser';
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin'

export const colors = {
    white: "#eee",
    gray: 0x5b5b5b,
    grayLight: 0x747474,
    grayDark: 0x414141,
    blue: 0x0d6efd,
    lightBlue: "#408cfd",
    red: 0xdc3545,
    lightRed: "#e4606d",
    green: 0x3a813d,
    lightGreen: 0x429345,
} as const;

export const fonts = {
    base: "Roboto Mono",
} as const;

export const grid = {
    color: colors.gray,
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
    nameFontStyle: "14px " + fonts.base,
    levelFontStyle: "bold 32px " + fonts.base,
    healthBarRadius: 28,
    healthBarThickness: 0.14,
    // physics
    maxVelocity: 300,
    drag: 300,
} as const;

export const depth = {
    default: 0,
    ui: 5,
} as const;

export const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.CANVAS,
	title: "Arena Game",
    parent: 'root',
    backgroundColor: "#747474",
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
    plugins: {
        global: [{
            key: 'rexWebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        },
        ]
    }
};
