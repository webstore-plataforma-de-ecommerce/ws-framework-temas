var app = require('./sys/config/express')();
var uglify = require("uglify-js");
var fs = require('fs');
var request = require('request');
const readline = require("readline");
const colors = require('colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var objSysConfig = JSON.parse(fs.readFileSync('./sys/config/system_access.json').toString());
var configLoja = JSON.parse(fs.readFileSync('./sys/config/config.json').toString());


console.log("Configurando qual pagina sera editada da loja.".bold);
console.log("");
console.log("Informe a url da loja que sera personalizada.");
console.log("");
console.log("Atencao".yellow.bold);
console.log("Nao envie o dominio, apenas o conteudo que vier apos ele.");
console.log("EX:");
console.log("Caso a URL da pagina seja " + "www.minhaloja.com.br/produto-xyz".bold);
console.log("");
console.log("Nesse caso informe apenas " + "/produto-xyz".bold);
console.log("");
console.log("Caso deseje editar a HOME, deixe em branco e aperte ENTER");
console.log("");
console.log("");


var objConfig;


rl.question("Informe a pagina desejada:", function (GetToken) {

    configLoja.editar_pagina = GetToken;
    rl.close();

});


rl.on("close", function () {

    
    var config = JSON.stringify(configLoja);

    fs.writeFileSync('./sys/config/config.json', config, (err) => {
        if (err) throw err;
    });

    console.log("");
    console.log("Pagina configurada com sucesso".green.bold);


});