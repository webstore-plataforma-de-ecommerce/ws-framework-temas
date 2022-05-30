const fs = require('fs'), readline = require('readline');

require('colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(" ");

var objSysConfig = JSON.parse(fs.readFileSync('./sys/config/system_access.json').toString());
var objConfig = JSON.parse(fs.readFileSync('./sys/config/config.json').toString());

var configJsLoja = JSON.parse(fs.readFileSync('./layout/config/config.json'));

var TOKEN = objConfig.token


console.log("Assistente de criacao de modulos Webstore".green.bold);
console.log(" ");

console.log("Informe o nome de identificacao do modulo que deseja criar com no maximo 20 caracteres.");

var NomeModulo = "";
var EtapasModulo = "";

try {

    rl.question("Nome: (ex: nova pagina produto )", function (getNome) {

        NomeModulo = getNome;

        console.log(" ");
        console.log("Informe separando por virgula as etapas que o modulo sera valido.");
        console.log(" ");

        console.log('1 - Todas as paginas da loja');
        console.log('2 - Pagina inicial da loja');
        console.log('3 - Pagina de categorias e resultados de busca');
        console.log('4 - Pagina de visualizacao dos produtos');
        console.log('5 - Pagina do carrinho de compras da loja');
        console.log('6 - Pagina "Fale conosco"');
        console.log('7 - Pagina do checkout');
        console.log('8 - Pagina de finalizacao do pedido');
        console.log('9 - Pagina onde o usuario faz login ou inicia cadastro');
        console.log('10 - Pagina do menu do cliente, onde sao vistos os pedidos, dados cadastrais, etc...');
        console.log('11 - Paginas institucionais da loja(paginas adicionais)');

        console.log(" ");
        console.log(" ");

        rl.question("Etapas: (Ex:2,3,5,6) ou (Ex: 1)", function (getEtapas) {

            EtapasModulo = getEtapas;

            rl.close();

        });


    });


    rl.on("close", function () {

        FuncCriaModulo();

    });


} catch (e) { console.log(e.message); }

console.log(" ");


function FuncCriaModulo() {

    try {

        if (NomeModulo.length > 20) {
            console.log("Nome do modulo possui " + NomeModulo.length + " caracteres. O limite sao 10.");
            return;
        }

        if (NomeModulo == "") {
            console.log("Nome do modulo precisa ser informado.");
            return;
        }

        if (EtapasModulo == "") {
            console.log("Informe no minimo uma etapa para o modulo.");
            return;
        }

        NomeModulo = corrigeNomes(NomeModulo);

        NomeModulo = "modloja_" + NomeModulo;

        var Etapas = EtapasModulo.split(',');
        var EtapasOk = "";
        for (e = 0; e < Etapas.length; e++) {

            if (Number(Etapas[e]) > 0 && Number(Etapas[e]) < 12) {

                EtapasOk += "|" + Etapas[e].trim() + "|";

            } else {

                console.log("Etapa " + Etapas[e] + " nao prevista.");
                return;

            }

        }

        EtapasOk = EtapasOk
            .replace("|1|", "|*|")
            .replace("|2|", "|HOME|")
            .replace("|3|", "|LISTAGEM|")
            .replace("|4|", "|PRODUTO|")
            .replace("|5|", "|CARRINHO|")
            .replace("|6|", "|CONTATO|")
            .replace("|7|", "|FORMAS_PAGAMENTO|")
            .replace("|8|", "|FinalPagamento|")
            .replace("|9|", "|login|")
            .replace("|10|", "|menu-cliente|")
            .replace("|11|", "|PAGINAS_INST|")
            ;

        while (EtapasOk.indexOf("||") >= 0) {
            EtapasOk = EtapasOk.replace("||", ",");
        }

        while (EtapasOk.indexOf("|") >= 0) {
            EtapasOk = EtapasOk.replace("|", "");
        }

        if (!fs.existsSync("./layout/modulos_loja/")) {
            fs.mkdirSync("./layout/modulos_loja/");
        }

        if (!fs.existsSync("./layout/modulos_loja/" + NomeModulo)) {
            fs.mkdirSync("./layout/modulos_loja/" + NomeModulo);
        }

        var scriptInit = "$(document).ready(function () {isReady('allModulosOk', '" + NomeModulo + "()');});\r\n\r\n" +
            "function " + NomeModulo + "(){" +
            "\r\n\r\n" +
            "\r\n\r\n" +
            "\r\n\r\n" +
            "}" +
            "";

        var cssInit = "." + NomeModulo + "{ " +
            "\r\n\r\n" +
            "\r\n\r\n" +
            "\r\n\r\n" +
            "}";

        var htmlInit = "<div class='" + NomeModulo + "'></div>";

        var ajudaInit = "O js e css do modulo " + NomeModulo + " serao importados automaticamente para dentro do arquivo css e js da loja nas etapas que voce configurou." +
            "\r\n\r\n" +
            "Caso deseje usar tambem alguma estrutura html, crie dentro do arquivo html do modulo." +
            "\r\n\r\n" +
            "Para usar o HTML em algum local da loja, utilize a tag abaixo dentro dos arquivos do layout." +
            "\r\n\r\n" +
            "<!--##[LOJA]" + NomeModulo.toUpperCase() + "##-- >" +
            "\r\n\r\n" +
            "EX: Caso seu modulo seja um novo metodo de exibicao de carrinho de compra no topo da loja," +
            "voce pode utilizar a tag do modulo dentro do arquivo layout/include/topo.html e o valor contido no arquivo sera substituido pela tag" +
            "\r\n\r\n" +
            "";

        var moduloLoja = { nome: NomeModulo, etapa: EtapasOk }

        fs.writeFile("./layout/modulos_loja/" + NomeModulo + "/saiba_como_usar_" + NomeModulo + ".txt", ajudaInit, (err) => { if (err) throw err; });
        fs.writeFile("./layout/modulos_loja/" + NomeModulo + "/" + NomeModulo + ".js", scriptInit, (err) => { if (err) throw err; });
        fs.writeFile("./layout/modulos_loja/" + NomeModulo + "/" + NomeModulo + ".css", cssInit, (err) => { if (err) throw err; });
        fs.writeFile("./layout/modulos_loja/" + NomeModulo + "/" + NomeModulo + ".html", htmlInit, (err) => { if (err) throw err; });

        configJsLoja.modulos_loja.push(moduloLoja);

        fs.writeFile('./layout/config/config.json', JSON.stringify(configJsLoja), (err) => { if (err) throw err; });

        //configJsLoja

        console.log("");
        console.log("");
        console.log("Sucesso".green.bold);
        console.log("Modulo criado com sucesso.");
        console.log("Acesse a pasta " + ("layout/modulos_loja/" + NomeModulo).yellow.bold + "e verifique o arquivo txt de ajuda para saber mais sobre como usar o modulo.");
        console.log("");
        console.log("");

    } catch (e) {
        console.log(("Falha:" + e.message).red.bold);
    }

}


function corrigeNomes(nome) {

    nome = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/([^\w]+|\s+)/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/(^-+|-+$)/, '');

    while (nome.indexOf(" ") >= 0) {
        nome = nome.replace(" ", "_");
    }

    while (nome.indexOf("-") >= 0) {
        nome = nome.replace("-", "_");
    }

    nome = nome.toLowerCase();

    return nome;

}
