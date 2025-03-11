// Criando 2 personagens:
const player1 = {
    NOME: "Mário",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

// Função para simular a rolagem de um dado de 6 faces:
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
    //Math.floor = função de arredondar dados
    //Math.random = função que gera números de aleatórios de 0 a 1 (por isso que será multiplicado por 6 e depois somado com 1);
}

//Função para sorteador um bloco:
async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;

        case random < 0.66:
            result = "CURVA"
            break;
    
        default:
            result = "CONFRONTO"
            break;
    }

    return result;
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`)

        //Sorteador bloco:
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);
    }
}

// Função Main autoinvocada:
(async function main () {
    console.log(`🚨🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

    //Function chains - chamada de função por dentro de outra: 
    await playRaceEngine(player1, player2);
})();