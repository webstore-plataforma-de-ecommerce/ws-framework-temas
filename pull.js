const fs = require('fs'), axios = require('axios');
require('colors');
const { exec } = require('child_process')

var objSysConfig = JSON.parse(fs.readFileSync('./sys/config/system_access.json').toString());
var objConfig = JSON.parse(fs.readFileSync('./sys/config/config.json').toString());

var TOKEN = objConfig.token

// console.log("Iniciando o backup do diretório atual");

function folderVerify(subdir, dir) {
    let dirToRead = dir ? __dirname + '/' + dir : __dirname

    dir && fs.existsSync(__dirname + '/layout') ? null : fs.rmSync(__dirname + '/layout', { recursive: true, force: true })

    subdir.forEach(dirToAppend => {
        fs.mkdirSync(dirToRead + '/' + dirToAppend)
    })

    return
}

// exec('node backup -d', function (error, stdout, stderr) {
//     if (!error) {
//         if (stdout && stdout != undefined && stdout != '') {
//             console.log(stdout)
//             exec('node preset -s', function (error, stdout, stderr) {
//                 if (!error) {
//                     if (stdout && stdout != undefined && stdout != '') {
//                         console.log(stdout)
//                         mainFunction()
//                     }
//                     return
//                 } else {
//                     console.log(error)
//                 }
//             })
//         }
//         return
//     } else {
//         console.log(error)
//     }
// })

async function mainFunction() {
    console.log(" ");
    console.log('Inciando o Download da Nuvem utilizando o token', TOKEN.bold)

    folderVerify(['layout']);
    folderVerify(['assets', 'config', 'include', 'include/add_tags', 'modulos_loja'], 'layout')

    try {

        let response = await axios({
            url: objSysConfig.endpoint + 'lojas/dados/dadoslayout/?TOKEN=' + TOKEN,
            method: 'get'
        })

        if (response.status != 200) throw 'Não foi possível baixar o layout, ' + response.status

        let objJ = response.data

        if (!objJ.preferencias) throw 'Não foi possível ler as preferências';

        fs.writeFileSync('./layout/include/barra.html', objJ.barra);
        fs.writeFileSync('./layout/include/complemento.html', objJ.complemento);
        fs.writeFileSync('./layout/include/topo.html', objJ.topo);
        fs.writeFileSync('./layout/include/rodape.html', objJ.rodape);
        fs.writeFileSync('./layout/include/direita.html', objJ.direita);
        fs.writeFileSync('./layout/include/esquerda.html', objJ.esquerda);

        fs.writeFileSync('./layout/include/add_tags/head.html', objJ.head);
        fs.writeFileSync('./layout/include/add_tags/body.html', objJ.body);

        fs.writeFileSync('./layout/assets/folha.css', objJ.folha);
        fs.writeFileSync('./public/css/cssBase.css', objJ.cssBase);
        fs.writeFileSync('./layout/assets/functions.js', objJ.js);

        fs.writeFileSync('./layout/estrutura_index.html', objJ.index);
        fs.writeFileSync('./layout/estrutura_listagem.html', objJ.listagem);
        fs.writeFileSync('./layout/estrutura_pagina_produto.html', objJ.produto_detalhe);
        fs.writeFileSync('./layout/estrutura_outras_paginas.html', objJ.sem_direita);

        let modulos_loja_min = [];

        if (objJ.preferencias.modulos_loja) {
            for (var i = 0; i < objJ.preferencias.modulos_loja.length; i++) {
                let moduloNome = objJ.preferencias.modulos_loja[i].nome,
                    moduloEtapa = objJ.preferencias.modulos_loja[i].etapa,
                    moduloHtml = objJ.preferencias.modulos_loja[i].moduloHtml,
                    moduloCss = objJ.preferencias.modulos_loja[i].moduloCss,
                    moduloJs = objJ.preferencias.modulos_loja[i].moduloJs;

                if (!fs.existsSync("./layout/modulos_loja/" + moduloNome)) fs.mkdirSync("./layout/modulos_loja/" + moduloNome);

                fs.writeFileSync("./layout/modulos_loja/" + moduloNome + "/" + moduloNome + ".js", moduloJs);
                fs.writeFileSync("./layout/modulos_loja/" + moduloNome + "/" + moduloNome + ".css", moduloCss);
                fs.writeFileSync("./layout/modulos_loja/" + moduloNome + "/" + moduloNome + ".html", moduloHtml);

                modulos_loja_min.push({ nome: moduloNome, etapa: moduloEtapa });
            }
        }

        objJ.preferencias.modulos_loja = modulos_loja_min;

        fs.writeFileSync('./layout/config/config.json', JSON.stringify(objJ.preferencias));

        let data = new Date();
        objConfig.ultimoPull = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + " " + data.getHours() + "h" + data.getMinutes() + "m" + data.getSeconds();
        fs.writeFileSync('./sys/config/config.json', JSON.stringify(objConfig));

        console.log("Download feito com sucesso. ".green.bold + "Execute " + '(node app)'.bold + " para iniciar o projeto agora.\n");

        process.exit(0);

    } catch (e) { console.log(e); }
}

mainFunction();