// Classe para criação do coracao da vitória!
export class coracao extends Phaser.Physics.Arcade.Sprite {

    // Construtor da classe. Inicia um sprite de coracao na posição (640, 380) e que interage com a física do jogo
    constructor(cena) {
        super(cena, 640, 380, "coracao").setScale(2.5);
    }

    // Função para adicionar o coracao criado à cena especificada. Como é um sprite já existente, usa-se o add.existing
    adicionarcoracaoACena(cena) {
        cena.add.existing(this);
        cena.physics.add.existing(this, true);
        this.anims.play("coracao_idle", true); // Começa a animação padrão do coracao
    }
}

// Funções para carregamento de imagens do coracao. Estão fora da classe porque precisam ser executadas antes da criação de um coracao

// Carrega a spritesheet do coracao
export function carregarSpritecoracao(cena) {
    cena.load.spritesheet("coracao", "assets/Items/coracao.png", {
        frameWidth: 32,
        frameHeight: 32
    });
}

// Cria as animações do coracao
export function criarAnimacaocoracao(cena) {
    cena.anims.create({
        key: "coracao_idle",
        frames: cena.anims.generateFrameNumbers("coracao", {
            start: 0,
            end: 16
        }),
        frameRate: 25,
        repeat: -1
    });
}