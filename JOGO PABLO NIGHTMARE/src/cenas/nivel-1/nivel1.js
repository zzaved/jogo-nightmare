import Personagem from "../../personagem/personagem.js";
import {coracao, carregarSpritecoracao, criarAnimacaocoracao } from "../../coracao/coracao.js";

// Classe de cena do segundo nível
export default class Nivel2 extends Phaser.Scene {
    
    // Mapa da cena
    mapa;
    // Personagem principal
    personagem;
    // Chão do mapa
    chao;
    // coracao da vitória! (Coletável que gera a tela de vitória)
    coracao;

    // Construtor da classe. Avisa ao Phaser que, para se referir a essa cena, utiliza-se a chave "Nivel2"
    constructor() {
        super({ key: "Nivel1" });
    }


    preload() {
        // Carregamento dos recursos do nível 2
        this.load.image("terreno", "assets/Terrain/Terrain(16x16).png");
        this.load.image("fundo", "assets/Background/Yellow.png");
        this.load.tilemapTiledJSON("mapa2", "assets/mapa2.json");

        carregarSpritecoracao(this);
    }


    create() {
        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Configuração da câmera e criação do coracao, do personagem e do cenário
        criarAnimacaocoracao(this);

        this.criarMapa();

        this.criarPersonagem();

        this.configurarCamera();
        
        this.criarcoracao();
    }


    // Cria um personagem e o configura apropriadamente
    criarPersonagem() {
        this.personagem = new Personagem(this);
        this.personagem.adicionarPersonagemACena(this);

        // Adiciona a colisão entre o personagem e o chão do nível
        this.physics.add.collider(this.personagem, this.chao);
    }


    // Cria um coracao e o configura apropriadamente
    criarcoracao() {
        this.coracao = new coracao(this);
        this.coracao.adicionarcoracaoACena(this);
        
        // Adiciona detecção de sobreposição entre o personagem e o coracao (como uma colisão sem forças resultantes)
        this.physics.add.overlap(this.personagem, this.coracao, this.win, null, this);
    }


    // Cria o mapa a partir de um tilemap feito no software Tiled e exportado no formato ".json"
    criarMapa() {
        // Iniciando um tilemap vazio
        this.mapa = this.make.tilemap({ key: "mapa2" });

        // Adicionando imagens ao tilemap
        const tilesetTerreno = this.mapa.addTilesetImage("chao", "terreno");
        const tilesetCeu = this.mapa.addTilesetImage("ceu", "fundo");

        // Criando camadas do tilemap
        const ceu = this.mapa.createLayer("ceu", tilesetCeu, 0, 0);
        this.chao = this.mapa.createLayer("chao", tilesetTerreno, 0, 0);
        
        // Especificando que o chão é um objeto com que se pode colidir
        this.chao.setCollisionByProperty({ colisor: true });
    }


    // Configura os limites da câmera de acordo com o mapa, altera o zoom e manda ela seguir o personagem principal
    configurarCamera() {
        this.cameras.main.setBounds(0, 0, this.mapa.widthInPixels, this.mapa.heightInPixels, true, true, true, true);
        this.cameras.main.startFollow(this.personagem, true, 0.05, 0.05);
        this.cameras.main.setZoom(1.5);
    }


    update() {
        // Movimenta o personagem principal a cada frame
        this.personagem.movimentar();
    }


    win() {
        // Sumir com o coracao
        this.coracao.destroy();

        // Escreve "Parabéns!" na tela
        this.add.text(this.game.renderer.width / 2 - 110, this.game.renderer.height * 0.20, 'Você coletou todos os corações!',
         { fontFamily: 'Roboto', fontSize: '40px', fill: '#ffffff' });
         
    }

}