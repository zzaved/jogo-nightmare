// Classe para criação do personagem principal!
export default class Personagem extends Phaser.Physics.Arcade.Sprite {

    // Setinhas do teclado
    controles;
    // Tecla de espaço
    teclaInteracao;
    // Diz se o personagem está realizando um salto (true) ou não (false)
    pulando = false;
    // Velocidade horizontal padrão
    velocidade = 200;
    // Velocidade vertical (negativa pois o eixo Y é invertido na criação de jogos, então valores negativos vão para cima)
    velocidadePulo = -400;

    
    // Construtor da classe. Inicia um sprite de personagem na posição (100, 450) e adiciona seus respectivos controles
    constructor(cena) {
        super(cena, 100, 450, "personagem_idle").setScale(1.7);
        this.controles = cena.input.keyboard.createCursorKeys();
        this.teclaInteracao = cena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    // Função para adicionar o personagem criado à cena especificada. Como é um sprite já existente, usa-se o add.existing
    adicionarPersonagemACena(cena) {
        cena.add.existing(this);
        cena.physics.add.existing(this);
        this.setCollideWorldBounds(true); // Não deixa o personagem ultrapassar os limites da tela
        this.anims.play("personagem_idle", true); // Começa a animação padrão do personagem parado
    }


    // Usa-se essa função para configurar o que a tecla de espaço fará no jogo em determinada cena, ou seja, que função ela chamará
    configurarInteracao(cena, funcao) {
        this.teclaInteracao.on("down", funcao, cena)
    }


    // Movimenta o personagem de acordo com inputs do jogador
    movimentar() {

        // Se o corpo do personagem está no chão, ele não está pulando
        if (this.body.onFloor()) {
            this.pulando = false;
        }

        // Se a setinha para cima está sendo pressionada e o personagem não está pulando, pule
        if (this.controles.up.isDown && !this.pulando) {
            this.pular();
        }
    
        // Se a velocidade vertical do personagem é maior que 0 (está indo para baixo) e ele está no meio de um salto, caia
        if (this.body.velocity.y > 0 && this.pulando) {
           this.cair();
        }
    
        // Se a setinha para a direita está sendo pressionada, movimente-se para a direita e não siga para a próxima condição
        if(this.controles.right.isDown) {
            this.movimentarDireita();
            return; // Faz com que o código pare aqui, não seguindo para a próxima condição
        }
    
        // Se a setinha para a esquerda está sendo pressionada, movimente-se para a esquerda e não siga para a próxima condição
        if (this.controles.left.isDown) {
            this.movimentarEsquerda();
            return; // Faz com que o código pare aqui, não seguindo para a próxima condição
        }
    
        // Se o código não caiu nas condições anteriores (personagem não está se movendo horizontalmente) e o personagem não está
        // pulando, comece a animação do personagem parado
        if (!this.pulando) {
            this.anims.play('personagem_idle', true);
        }

        // Como o personagem está parado, sua velocidade horizontal é 0
        this.setVelocityX(0);
    }
    

    // Movimenta-se para a direita
    movimentarDireita() {
        this.setVelocityX(this.velocidade); // Acelera para a direita (velocidade positiva no eixo X)
        this.setFlipX(false); // Orientação original do sprite (personagem virado para a direita)

        // Se o personagem não estiver pulando, comece a animação de andar
        if (!this.pulando) {
            this.anims.play('personagem_andando', true);
        }
    }
    
    // Movimenta-se para a esquerda
    movimentarEsquerda() {
        this.setVelocityX(-this.velocidade); // Acelera para a esquerda (velocidade negativa no eixo X)
        this.setFlipX(true); // Orientação invertida do sprite (personagem virado para a esquerda)

        // Se o personagem não estiver pulando, comece a animação de andar
        if (!this.pulando) {
            this.anims.play('personagem_andando', true);
        }
    }
    

    // Pula!
    pular() {
        this.pulando = true; // Diz que está no meio de um salto
        this.setVelocityY(this.velocidadePulo); // Acelera para cima (velocidade negativa no eixo Y)
        this.anims.play('personagem_pulando', true); // Começa animação de pulo
    }
    

    // Cai!
    cair() {
        this.anims.play('personagem_caindo', true); // Começa animação de queda
    }
}


// Funções para carregamento de imagens do personagem. Estão fora da classe porque precisam ser executadas antes da criação
// de um personagem

// Carrega a spritesheet do personagem
export function carregarSpritesPersonagem(cena) {
    cena.load.spritesheet('personagem_idle', 'assets/Main Characters/Virtual Guy/Idle (32x32).png', {
        frameWidth: 32,
        frameHeight: 32
    });

    cena.load.spritesheet('personagem_andando', 'assets/Main Characters/Virtual Guy/Run (32x32).png', {
        frameWidth: 32,
        frameHeight: 32
    });

    cena.load.spritesheet('personagem_pulando', 'assets/Main Characters/Virtual Guy/Jump (32x32).png', {
        frameWidth: 32,
        frameHeight: 32
    });

    cena.load.spritesheet('personagem_caindo', 'assets/Main Characters/Virtual Guy/Fall (32x32).png', {
        frameWidth: 32,
        frameHeight: 32
    });
}

// Cria as animações do personagem
export function criarAnimacoesPersonagem(cena) {
    cena.anims.create({
        key: 'personagem_idle',
        frames: cena.anims.generateFrameNumbers('personagem_idle', {
            start: 0,
            end: 10 
        }),
        frameRate: 10,
        repeat: -1
    });

    cena.anims.create({
        key: 'personagem_andando',
        frames: cena.anims.generateFrameNumbers('personagem_andando', {
            start: 0,
            end: 11 
        }),
        frameRate: 10,
        repeat: -1
    });

    cena.anims.create({
        key: 'personagem_pulando',
        frames: cena.anims.generateFrameNumbers('personagem_pulando'),
        frameRate: 10,
        repeat: 0
    });

    cena.anims.create({
        key: 'personagem_caindo',
        frames: cena.anims.generateFrameNumbers('personagem_caindo'),
        frameRate: 10,
        repeat: 0
    });
}