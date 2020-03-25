function ProdutosHome() {
	ApiWS.ListaProdutosHome("ProdutosHomeRetorno");
}
function ProdutosHomeRetorno(getJson) {
    try {

        var template = $('#template').html();
        var conteudo = '<ul id="prod-list" class="produtos-home">';

        var JSON = "";

        //console.log("Produto getJson:" + getJson);

        if (getJson) {
            JSON = getJson;
        } else {
            JSON = ApiWS.Json;
        }

        objetos.ProdutosHome = JSON;
        var obj = jQuery.parseJSON(JSON);
        var qtdProdutos = 0;

        //console.log("TotalProds:" + obj.totalitens);

        //console.log("produtos_pagina:" + cfg['produtos_pagina']);

        $("#produtos-grupos").html("").css('display', 'none');
        if (obj.totalitens != null && obj.totalitens != undefined) {
            if (obj.totalitens > 0 && cfg['produtos_pagina'] < obj.totalitens) {

                for (a = 0; a < cfg['produtos_pagina']; a++) {
                    qtdProdutos++;
                    var bloco = BlocoProduto(obj.produtos[a], template);
                    conteudo += bloco;
                }

            } else if (obj.totalitens > 0) {

                for (a = 0; a < obj.totalitens; a++) {
                    qtdProdutos++;
                    var bloco = BlocoProduto(obj.produtos[a], template);
                    conteudo += bloco;
                }

            } else {
                empty('produto');
            }
        } else {
            empty('produto');
        }

        conteudo += '</ul>';

        //console.log("ConteudoProds:" + conteudo);

        if ($('#produtos-grupos').length) {
            $('#preloader').fadeOut('fast', function () {

                $('#produtos-grupos').after(conteudo).remove();
                $('#prod-list').show('fast');
                blocoHeight('#prod-list');

            });
        } else {

            $('#div-conteudo').prepend(conteudo);
            $('#prod-list').show('fast');
            blocoHeight('#prod-list');

        }

        ConteudoResponsivo();
        nomeProd("#produtos-grupos");

        window.setTimeout("ConteudoResponsivo()", 1500);

        window.setTimeout("ConteudoResponsivo()", 3000);

        window.setTimeout("ConteudoResponsivo()", 5000);

        window.setTimeout("blocoHeightAjusta()", 2000);

        LazyLoadApply();

    } catch (e) { console.log('ProdutosHomeRetorno: ' + e.message); }

}