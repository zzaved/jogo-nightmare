// Importação de funções para carregamento das imagens do personagem. Carregamos elas no menu para utilizarmos depois em qualquer
// cena seguinte
import { carregarSpritesPersonagem, criarAnimacoesPersonagem } from "../../personagem/personagem.js";

// Classe de cena do Menu principal!
export default class Menu extends Phaser.Scene {

    // Botão de jogar
    botaoJogar;

    // Construtor da classe. Avisa ao Phaser que, para se referir a essa cena, utiliza-se a chave "Menu"
    constructor() {
        super({ key: "Menu" });
    };

    
    preload() {
        // Carregamento das imagens do menu
        this.load.image("fundo", "assets/Menu/menu.png");
        this.load.image("jogar", "assets/Menu/Buttons/Play.png");

        // Carregamento das imagens do personagem
        carregarSpritesPersonagem(this);
    }


    create() {
        // Criação das animações do personagem
        criarAnimacoesPersonagem(this);

        // Criando o background do menu
        this.add.image(0,0, "fundo")
        .setOrigin(0)


        // Criando o botão de jogar
       this.botaoJogar = this.add.image(500, 840, "jogar")
       .setScale(5);

        // Dizendo para o Phaser que os botões não são apenas imagens, mas sim objetos com que se pode interagir
        this.botaoJogar.setInteractive();

        // Configurar o que o botão de jogar deve fazer ao ser clicado
        this.botaoJogar.on("pointerup", this.apertouBotaoJogar, this);

    }

    // O que fazer quando o botão de jogar é apertado
    apertouBotaoJogar() {
        // Iniciar o Nivel1 como próxima cena
        this.comecarProximaCena("Nivel1");
    }

    // Começa a próxima cena
    comecarProximaCena(cena) {
        this.scene.start(cena);
    }
}