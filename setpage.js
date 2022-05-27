
const fs = require('fs');
const readline = require("readline");

const { exec } = require('child_process');

require('colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var configLoja = JSON.parse(fs.readFileSync('./sys/config/config.json').toString());


console.log("Configurando qual página será editada da loja. \n".bold);
console.log("Informe a URL da loja que será personalizada. \n");
console.log("Atencão".yellow.bold);
console.log("Não envie o dominio, apenas o conteudo que vier após ele. \n");
console.log("EX:");
console.log("Caso a URL da pagina seja " + "www.minhaloja.com.br/produto-xyz \n".bold);
console.log("Nesse caso informe apenas " + "/produto-xyz \n".bold);
console.log("Caso deseje editar a HOME, deixe em branco e aperte " +  "ENTER \n \n".red);

function quest() {
    rl.question("Informe a pagina desejada:", function (GetToken) {
        configLoja.editar_pagina = GetToken;
        
        mainFunction()
    })
}

function mainFunction() {
    var config = JSON.stringify(configLoja);

    fs.writeFileSync('./sys/config/config.json', config);

    console.log("\nPágina configurada com sucesso".green.bold);    
}

if (process.argv[2] != '' && process.argv[2] && process.argv[2].startsWith('/')) {
    configLoja.editar_pagina = process.argv[2];
    mainFunction()
} else {
    quest()
}
