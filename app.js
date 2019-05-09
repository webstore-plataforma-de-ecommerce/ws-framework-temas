var app = require('./config/express')();
var uglify = require("uglify-js");
var LayInt;

var fs = require('fs');

var head = fs.readFileSync('./public/head.html').toString();
var bottom = fs.readFileSync('./public/bottom.html').toString();
var logo = fs.readFileSync('./public/logo.html').toString();

var index = fs.readFileSync('./webstore/layout/index.html').toString();

var topo = fs.readFileSync('./webstore/layout/topo.html').toString();

var LOJA = fs.readFileSync('./LOJA.txt').toString();

var layoutBase = fs.readFileSync('./config/layoutBase.txt').toString();
var QueryLayout = "";
if (layoutBase != "") { QueryLayout = "&layout=" + layoutBase; }


console.log("TOKEN:" + LOJA);

var configJs;
var result;
var objJ;

var request = require('request');
request.get('https://adminloja.webstore.net.br/lojas/dados/dadosloja/?LV_ID=' + LOJA + QueryLayout, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        var retorno = body;
        objJ = JSON.parse(retorno);

        LOJA = objJ.loja;

        console.log("LOJA:" + LOJA);

        logo = logo.replace("##CAMINHOLOGO##", "https://images.webstore.net.br/files/" + LOJA + "/" + objJ.logotipo);

        LayInt = Number(objJ.layout);
        if (layoutBase != "") { LayInt = Number(layoutBase); }

        //console.log(body);

        var find = ["<!--##CLEAR_CSS##-->", "<!--##H1_DIV##-->", "<!--##LOGOTIPO##-->", "<!--##VALOR_PRODUTOS_CARRINHO##-->"];
        var replace = ["", "h1", logo, "00"];
        topo = replaceStr(topo, find, replace);

        var barra = fs.readFileSync('./webstore/layout/barra.html').toString();
        var esquerda = fs.readFileSync('./webstore/layout/esquerda.html').toString();
        var rodape = fs.readFileSync('./webstore/layout/rodape.html').toString();
        var complemento = fs.readFileSync('./webstore/layout/complemento.html').toString();

        rodape = replaceStr(rodape, find, replace);
        complemento = replaceStr(complemento, find, replace);

        var find2 = ["<!--###TOPO###-->", "<!--###BARRA###-->", "<!--###BARRA_ESQUERDA###-->", "<!--###RODAPE###-->", "<!--###COMPLEMENTO###-->"];
        var replace = [topo, barra, esquerda, rodape, complemento];
        index = replaceStr(index, find2, replace);

        result = head + index + bottom;
        
        find = ["<!--###IMAGENS_CLIENTE###-->"];
        replace = ["https://images.webstore.net.br/files/" + LOJA + "/" + LayInt + "/"];
        result = replaceStr(result, find, replace);

        var TOKEN = fs.readFileSync('./TOKEN.txt').toString();

        result += "<input type='hidden' id='LOJA' value='" + LOJA + "'/>";
        result += "<input type='hidden' id='HdTokenLojaTemp' value='" + TOKEN + "'/>";

        configJs = JSON.parse(fs.readFileSync('./webstore/layout/config.json'));

        htmlModulos();

        app.listen(3000, function () {
            console.log("server runing on port 3000");
        });

    } else {
        console.log("Falha ao iniciar projeto:" + response.statusCode);
    }
});


function htmlModulos() {
    var css = "";
    var js = "";

    for (var i = 0; i < configJs.modulos.length; i++) {
        var tag = createTag(configJs.modulos[i]);
        var moduloHtml = getModuloHtml(configJs.modulos[i]);
        result = result.replace(tag, moduloHtml);

        var moduloCss = getModuloCss(configJs.modulos[i]);
        css += moduloCss;

        var moduloJs = getModuloJs(configJs.modulos[i]);
        js += moduloJs + '\n';

    }
    var compress = uglify.minify(js);
    js = compress.code;

    css += fs.readFileSync('./webstore/layout/folha.css').toString();

    if (LayInt < 1000) {
        css = fs.readFileSync('./webstore/estruturas/' + LayInt + '/folha.css').toString() + css;
    }

    var find = [];
    var replace = [];
    for (var i = 1; i <= 50; i++) {
        var tag = 'PREF_' + i;
        var value = configJs[tag];

        find.push("<!--###" + tag + "###-->");
        replace.push("#" + value)
    }

    css = replaceStr(css, find, replace);

    find = ["<!--###IMAGENS_CLIENTE###-->"];
    replace = ["https://images.webstore.net.br/files/" + LOJA + "/" + LayInt + "/"];
    css = replaceStr(css, find, replace);

    result = result.replace("value='4924'", "value='" + LOJA + "'");

    fs.writeFile('./public/index.html', result, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    });

    fs.writeFile('./public/css/css.css', css, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    });

    fs.writeFile('./public/js/script.js', js, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    });

}

function getModuloHtml(modulo){
	var caminho = './webstore/modulos/'+modulo.nome+'/'+modulo.versao+'/'+modulo.nome+'.html';
	try{
		var retorno = fs.readFileSync(caminho).toString();
		return retorno
	}catch(e){
		return ""
	}
}

function getModuloCss(modulo){
	var caminho = './webstore/modulos/'+modulo.nome+'/'+modulo.versao+'/'+modulo.nome+'.css';
	try{
		var retorno = fs.readFileSync(caminho).toString();
		return retorno
	}catch(e){
		return ""
	}
}

function getModuloJs(modulo){
	var caminho = './webstore/modulos/'+modulo.nome+'/'+modulo.versao+'/'+modulo.nome+'.js';
	try{
		var retorno = fs.readFileSync(caminho).toString();
		return retorno
	}catch(e){
		return ""
	}
}

function createTag(modulo){
	nome = modulo.nome.toUpperCase();
	return "<!--##" + nome + modulo.versao + "##-->";
}

function replaceStr(str, find, replace) {
	for (var i = 0; i < find.length; i++) {
		str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
	}
	return str;
}

