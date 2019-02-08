var app = require('./config/express')();
var uglify = require("uglify-js");
var fs = require('fs');
var LOJA = fs.readFileSync('./LOJA.txt').toString();

var request = require('request');

try {

    request.get('https://adminloja.webstore.net.br/lojas/dados/dadoslayout/?LV_ID=' + LOJA, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            var retorno = body;

            objJ = JSON.parse(retorno);

            if (objJ.preferencias != null) {

                fs.writeFile('./webstore/layout/config.json', JSON.stringify(objJ.preferencias), (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/barra.html', objJ.barra, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/complemento.html', objJ.complemento, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/conteudo.html', objJ.conteudo, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/DetalhesProduto.html', objJ.detalhesproduto, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/direita.html', objJ.direita, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/esquerda.html', objJ.esquerda, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/folha.css', objJ.folha, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/index.html', objJ.index, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/listagem.html', objJ.listagem, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/produto_detalhes.html', objJ.produto_detalhe, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/rodape.html', objJ.rodape, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/sem_direita.html', objJ.sem_direita, (err) => { if (err) throw err; });
                fs.writeFile('./webstore/layout/topo.html', objJ.topo, (err) => { if (err) throw err; });

                console.log("Download feito com sucesso, execute o node app.js para iniciar o projeto agora.");

            } else {

                console.log("Não foi possível ler as preferências");

            }

        } else {

            console.log("Falha ao baixar layout:" + response.statusCode);

        }

    });

} catch (e) { console.log(e.message); }

