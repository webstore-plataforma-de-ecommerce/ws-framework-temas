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
var objConfig = JSON.parse(fs.readFileSync('./sys/config/config.json').toString());
var configJs = JSON.parse(fs.readFileSync('./layout/config/config.json'));

console.log("");

console.log("Informacoes sobre o projeto atual.".bold);

console.log("");

if (objConfig.editar_pagina == "") {
    objConfig.editar_pagina = "HOME";
}

console.log("Loja: ".yellow.bold + objConfig.loja);
console.log("Tema: ".yellow.bold + objConfig.temaNome);
console.log("Tipo de tema: ".yellow.bold + objConfig.tipo);
console.log("Editando pagina: ".yellow.bold + objConfig.editar_pagina);
console.log("Token: ".yellow.bold + objConfig.token);
console.log("Ultimo Pull: ".yellow.bold + objConfig.ultimoPull);
console.log("Ultimo Push: ".yellow.bold + objConfig.ultimoPush);

console.log("");

process.exit(0);