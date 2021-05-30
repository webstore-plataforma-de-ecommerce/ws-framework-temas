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


console.log("Configurando modulo de edicao remota.");
console.log("Informe o Token de edicao remota obtido no painel da loja.");


var objConfig;


rl.question("Token:", function (GetToken) {

    objConfig = {
        token: GetToken,
        tipo: "",
        loja: "",
        temaNome: "",
        usuario: "",
        senha: "",
        temaBase: "",
        editar_pagina: "",
        ultimoPull: "",
        ultimoPush: ""
    };

    rl.close();

});


rl.on("close", function () {

    request.get(objSysConfig.endpoint + '/lojas/dados/dadosloja/?LV_ID=' + objConfig.token, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            JsonRetorno = JSON.parse(body);

            if (JsonRetorno.layout) {

                objConfig.temaBase = null;//JsonRetorno.layout;
                objConfig.tipo = JsonRetorno.tipo;
                objConfig.temaNome = JsonRetorno.layout_nome;
                objConfig.loja = JsonRetorno.loja_nome;

                var config = JSON.stringify(objConfig);

                fs.writeFileSync('./sys/config/config.json', config, (err) => {
                    if (err) throw err;
                });

                if (JsonRetorno.tipo == "Padrao") {

                    console.log(" ");
                    console.log("**************************".yellow);
                    console.log("!Atencao!".yellow.bold);
                    console.log("Voce esta personalizando um tema " + "padrao".bold +". Modificacoes em modulos nao sao replicaveis.");
                    console.log("Caso deseje criar modulos personalizados solicite a criacao de um tema personalizado seguindo as orientacoes de nosso manual.");
                    console.log("**************************".yellow);
                    console.log(" ");

                } else {

                    console.log(" ");
                    console.log("**************************".yellow);
                    console.log("!Atencao!".yellow.bold);
                    console.log("Voce esta editando um tema " + "personalizado".bold +".");
                    console.log("Esse tema nao utiliza o CSS default de nenhum tema inicialmente. ");
                    console.log("Voce pode copiar o CSS de alguma das estruturas padroes dentro da  pasta " + "sys / estruturas".bold + ".");
                    console.log("**************************".yellow);
                    console.log(" ");

                }

                console.log(" ");
                console.log("Tipo de tema: " + JsonRetorno.tipo);
                console.log("Loja: " + JsonRetorno.loja_nome);
                console.log("Dominio: " + JsonRetorno.dominio);
                console.log("Codigo do tema: " + JsonRetorno.layout);
                console.log("Nome do tema: " + JsonRetorno.layout_nome);
                console.log("_____________________________________");
                console.log(" ");

                console.log("Processo concluido com sucesso".green.bold + " Execute(node pull) para baixar os dados para edicao.");

                console.log(" ");
                console.log(" ");


            } else {

                console.log("Falha na configuracao!! Verifique se o token e valido." + body);

            }

            process.exit(0);

        } else {

            console.log("Falha ao iniciar projeto:" + response.statusCode);

        }
    });

});