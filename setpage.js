var app = require('./sys/config/express')();
var uglify = require("uglify-js");
var fs = require('fs');
var request = require('request');
const readline = require("readline");
const colors = require('colors');
const { exec } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var configLoja = JSON.parse(fs.readFileSync('./sys/config/config.json').toString());


console.log("Configurando qual pagina sera editada da loja. \n".bold);
console.log("Informe a url da loja que sera personalizada. \n");
console.log("Atencao".yellow.bold);
console.log("Nao envie o dominio, apenas o conteudo que vier apos ele. \n");
console.log("EX:");
console.log("Caso a URL da pagina seja " + "www.minhaloja.com.br/produto-xyz \n".bold);
console.log("Nesse caso informe apenas " + "/produto-xyz \n".bold);
console.log("Caso deseje editar a HOME, deixe em branco e aperte " +  "ENTER \n \n".red);


var objConfig;

const quest = () => {
    rl.question("Informe a pagina desejada:", function (GetToken) {
    
        configLoja.editar_pagina = GetToken;
        
        mainFunction()
    
    });
}

const mainFunction = () => {
    var config = JSON.stringify(configLoja);

    fs.writeFileSync('./sys/config/config.json', config, (err) => {
        if (err) throw err;

        exec('node preset -s', function (error, stdout, stderr) {
            if (!error) {
              if (stdout && stdout != undefined && stdout != '') {
                console.log(stdout)

                process.exit()
              }
              return
            } else {
                console.log(error)
            }
        })
    });

    console.log("\nPagina configurada com sucesso".green.bold);    
}

if (process.argv[2] != '' && process.argv[2] && process.argv[2].startsWith('/')) {
    configLoja.editar_pagina = process.argv[2];
    mainFunction()
} else {
    quest()
}
