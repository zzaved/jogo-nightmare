// Importações das cenas que fazem parte do jogo
import Nivel1 from "./cenas/nivel-1/nivel1.js";
import Menu from "./cenas/menu/menu.js"

// Configuração para inicialização do jogo
var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
        }
    },
    pixelArt: true,
    scene: [Menu, Nivel1]
};

// Inicialização do jogo
const game = new Phaser.Game(config);