const app = require('./sys/config/express')();
const uglify = require("uglify-js");
const fs = require('fs'), request = require('request');
const colors = require('colors');
var rimraf = require("rimraf");
const { exec } = require('child_process')

console.log(" ");

var objSysConfig = JSON.parse(fs.readFileSync('./sys/config/system_access.json').toString());
var objConfig = JSON.parse(fs.readFileSync('./sys/config/config.json').toString());

var TOKEN = objConfig.token

console.log("Iniciando o backup do diretório atual");

function folderVerify(subdir, dir) {
    let dirToRead = dir ? __dirname + '/' + dir : __dirname

    dir && fs.existsSync(__dirname + '/layout') ? null : fs.rmdirSync(__dirname + '/layout', { recursive: true, force: true })

    subdir.forEach(dirToAppend => {
        fs.mkdirSync(dirToRead + '/' + dirToAppend)
    })

    return
}

exec('node backup -d', function (error, stdout, stderr) {
    if (!error) {
        if (stdout && stdout != undefined && stdout != '') {
            console.log(stdout)
            exec('node preset -s', function (error, stdout, stderr) {
                if (!error) {
                    if (stdout && stdout != undefined && stdout != '') {
                        console.log(stdout)
                        mainFunction()
                    }
                    return
                } else {
                    console.log(error)
                }
            })
        }
        return
    } else {
        console.log(error)
    }
})

const mainFunction = () => {

    console.log('Inciando o Download da Nuvem utilizando o token', TOKEN)

    folderVerify(['layout']);
    folderVerify(['assets', 'config', 'include', 'include/add_tags', 'modulos_loja'], 'layout')

    try {

        request.get(objSysConfig.endpoint + 'lojas/dados/dadoslayout/?TOKEN=' + TOKEN, function (error, response, body) {

            console.log("Resultado:" + response.statusCode);

            if (!error && response.statusCode == 200) {

                var retorno = body;

                objJ = JSON.parse(retorno);

                if (objJ.preferencias != null) {


                    fs.writeFile('./layout/include/barra.html', objJ.barra, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/include/complemento.html', objJ.complemento, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/include/topo.html', objJ.topo, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/include/rodape.html', objJ.rodape, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/include/direita.html', objJ.direita, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/include/esquerda.html', objJ.esquerda, (err) => { if (err) throw err; });

                    fs.writeFile('./layout/include/add_tags/head.html', objJ.head, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/include/add_tags/body.html', objJ.body, (err) => { if (err) throw err; });

                    fs.writeFile('./layout/assets/folha.css', objJ.folha, (err) => { if (err) throw err; });
                    fs.writeFile('./public/css/cssBase.css', objJ.cssBase, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/assets/functions.js', objJ.js, (err) => { if (err) throw err; });

                    fs.writeFile('./layout/estrutura_index.html', objJ.index, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/estrutura_listagem.html', objJ.listagem, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/estrutura_pagina_produto.html', objJ.produto_detalhe, (err) => { if (err) throw err; });
                    fs.writeFile('./layout/estrutura_outras_paginas.html', objJ.sem_direita, (err) => { if (err) throw err; });

                    var modulos_loja_min = [];

                    if (objJ.preferencias.modulos_loja) {
                        for (var i = 0; i < objJ.preferencias.modulos_loja.length; i++) {

                            var moduloNome = objJ.preferencias.modulos_loja[i].nome;
                            var moduloEtapa = objJ.preferencias.modulos_loja[i].etapa;
                            var moduloHtml = objJ.preferencias.modulos_loja[i].moduloHtml;
                            var moduloCss = objJ.preferencias.modulos_loja[i].moduloCss;
                            var moduloJs = objJ.preferencias.modulos_loja[i].moduloJs;

                            //rimraf("./layout/modulos_loja/" + moduloNome, function () { });

                            if (!fs.existsSync("./layout/modulos_loja/" + moduloNome)) {
                                fs.mkdirSync("./layout/modulos_loja/" + moduloNome);
                            }

                            fs.writeFile("./layout/modulos_loja/" + moduloNome + "/" + moduloNome + ".js", moduloJs, (err) => { if (err) throw err; });
                            fs.writeFile("./layout/modulos_loja/" + moduloNome + "/" + moduloNome + ".css", moduloCss, (err) => { if (err) throw err; });
                            fs.writeFile("./layout/modulos_loja/" + moduloNome + "/" + moduloNome + ".html", moduloHtml, (err) => { if (err) throw err; });

                            var moduloLoja = { nome: moduloNome, etapa: moduloEtapa }
                            modulos_loja_min.push(moduloLoja);

                        }
                    }

                    objJ.preferencias.modulos_loja = modulos_loja_min;

                    fs.writeFile('./layout/config/config.json', JSON.stringify(objJ.preferencias), (err) => { if (err) throw err; });


                    var data = new Date();
                    objConfig.ultimoPull = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + " " + data.getHours() + "h" + data.getMinutes() + "m" + data.getSeconds();
                    fs.writeFileSync('./sys/config/config.json', JSON.stringify(objConfig), (err) => {
                        if (err) throw err;
                    });


                    console.log("Download feito com sucesso".green.bold + ", execute o(node app) para iniciar o projeto agora.");

                    console.log(" ");

                } else {

                    console.log("Nao foi possivel ler as preferencias".red);
                    console.log(body);

                }

            } else {

                console.log("Falha ao baixar layout:" + response.statusCode);

            }

        });

    } catch (e) { console.log(e.message); }

    console.log(" ");

    //process.exit(0);

}