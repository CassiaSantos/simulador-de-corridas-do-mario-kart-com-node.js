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
    }

    return result;
}

//Função para imprimir mensagens no console:
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} tem ${attribute} de ${block} e rolou um dado de ${diceResult}: ${attribute} + ${diceResult} = ${(diceResult+attribute)}`)   
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`)

        //Sorteador bloco:
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //Rolar os dados:
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //Teste de habilidade:
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );

            await logRollResult(
                character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );

        } if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME,
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                character2.NOME,
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        
        } if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`Confronto entre: ${character1.NOME} e ${character2.NOME}!`);

            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1,
                character1.PODER
            );

            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2,
                character2.PODER
            );

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} ganhou o confronto! ${character2.NOME} perdeu 1 ponto!`);
                character2.PONTOS--;
            } else if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                console.log(`${character2.NOME} ganhou o confronto! ${character1.NOME} perdeu 1 ponto!`);
                character1.PONTOS--;
            } else {
                console.log("Confronto empatado! Nenhum jogador perdeu ponto!");
            }
        }


        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou 1 ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou 1 ponto!`);
            character2.PONTOS++;
        }
        console.log("________________________________________________________");
    }
}

//Impressão do vencedor:
async function printWinner(character1, character2) {
    console.log(`Resultado final da corrida! 🏆`);

    console.log(`${character1.NOME}: ${character1.PONTOS} pontos`);
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos`);
    
    if (character1.PONTOS > character1.PONTOS) {
        console.log(`🏆 ${character1.NOME} venceu a corrida! 🏆`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`🏆 ${character2.NOME} venceu a corrida! 🏆`);
    } else {
        console.log(`${character1.NOME} e ${character2.NOME} têm a mesma quantidade de pontos e empataram a corrida! 🏆`);
    }
}

// Função Main autoinvocada:
(async function main () {
    console.log(`🚨🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

    //Function chains - chamada de função por dentro de outra: 
    await playRaceEngine(player1, player2);
    await printWinner(player1, player2);
})();