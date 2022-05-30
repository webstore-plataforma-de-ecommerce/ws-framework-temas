
const 
    fs = require('fs'), 
    axios = require('axios'),
    readline = require("readline")

require('colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var objSysConfig = JSON.parse(fs.readFileSync('./sys/config/system_access.json').toString());

console.log("Configurando módulo de edicão remota.\nInforme o Token de edicão remota obtido no painel da loja.");

let objConfig = {
    token: ''
};

async function mainFunction() {
    try {
        let response = await axios({
            url: objSysConfig.endpoint + '/lojas/dados/dadosloja/?LV_ID=' + objConfig.token,
            method: 'GET'
        })
        
        let jsonRetorno = response.data;

        if (!jsonRetorno.layout) throw 'Falha na configuração Verifique se seu token é válido ' + response.data 
        
        objConfig['temaBase'] = null;
        objConfig['tipo'] = jsonRetorno.tipo;
        objConfig['temaNome'] = jsonRetorno.layout_nome;
        objConfig['loja'] = jsonRetorno.loja_nome;
        objConfig['editar_pagina'] = '/';

        fs.writeFileSync('./sys/config/config.json', JSON.stringify(objConfig));

        if (jsonRetorno.tipo == "Padrao") {

            console.log("\n**************************".yellow);
            console.log("!Atenção!".yellow.bold);
            console.log("Você está personalizando um tema " + "padrão".bold +". Modificacões em módulos não são replicáveis.");
            console.log("Caso deseje criar módulos personalizados solicite a criação de um tema personalizado seguindo as orientações de nosso manual.");
            console.log("**************************\n".yellow);

        } else {

            console.log("\n**************************".yellow);
            console.log("!Atenção!".yellow.bold);
            console.log("Você está editando um tema " + "personalizado".bold +".");
            console.log("Esse tema não utiliza o CSS default de nenhum tema inicialmente. ");
            console.log("Você pode copiar o CSS de alguma das estruturas padrões dentro da pasta " + "/sys/estruturas".bold + ".");
            console.log("**************************\n".yellow);

        }

        console.log("Tipo de tema: " + jsonRetorno.tipo);
        console.log("Loja: " + jsonRetorno.loja_nome);
        console.log("Domínio: " + jsonRetorno.dominio);
        console.log("Código do tema: " + jsonRetorno.layout);
        console.log("Nome do tema: " + jsonRetorno.layout_nome);
        console.log("_____________________________________\n");

        console.log("Processo concluído com sucesso".green.bold + " Execute " + '(node pull)'.bold + " para baixar os dados para edicão.\n\n");

        process.exit();
    } catch (err) {
        console.log(err);
    }
}

function quest () {
    rl.question("Token:", function (GetToken) {

        objConfig['token'] = GetToken;

        mainFunction()

    });
}

if (process.argv[2] && process.argv[2] != '') {

    objConfig['token'] = process.argv[2]

    mainFunction()
} else {
    quest()
}