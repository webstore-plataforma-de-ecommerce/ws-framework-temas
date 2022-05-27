const fs = require('fs');

require('colors');

var objConfig = JSON.parse(fs.readFileSync('./sys/config/config.json').toString());

console.log("\nInformacões sobre o projeto atual.\n".bold);

if (objConfig.editar_pagina == "") objConfig.editar_pagina = "HOME";

console.log("Loja: ".yellow.bold + objConfig.loja);
console.log("Tema: ".yellow.bold + objConfig.temaNome);
console.log("Tipo de tema: ".yellow.bold + objConfig.tipo);
console.log("Editando pagina: ".yellow.bold + objConfig.editar_pagina);
console.log("Token: ".yellow.bold + objConfig.token);
console.log("Último Pull: ".yellow.bold + objConfig.ultimoPull);
console.log("Último Push: ".yellow.bold + objConfig.ultimoPush);
console.log("");

process.exit(0);