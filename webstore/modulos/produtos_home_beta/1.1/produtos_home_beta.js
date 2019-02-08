function ProdutosHome() {
	ApiWS.ListaProdutosHome("ProdutosHomeRetorno");
}
function ProdutosHomeRetorno() {
	try {
		var template = $('#template').html();
		var conteudo = '<ul id="prod-list" class="produtos-home">';

		var JSON = ApiWS.Json;
		objetos.ProdutosHome = JSON;
		var obj = jQuery.parseJSON(JSON);
		var qtdProdutos = 0;

		$("#produtos-grupos").html("").css('display', 'none');
		if (obj.totalitens != null && obj.totalitens != undefined) {
			if (obj.totalitens > 0 && cfg['produtos_pagina'] < obj.totalitens) {

				for (a = 0; a < cfg['produtos_pagina']; a++) {
					qtdProdutos++;
					var bloco = BlocoProduto(obj.produtos[a], template);
					conteudo += bloco;
				}

			}else if(obj.totalitens > 0){

				for (a = 0; a < obj.totalitens; a++) {
					qtdProdutos++;
					var bloco = BlocoProduto(obj.produtos[a], template);
					conteudo += bloco;
				}
				
			}else{
				empty('produto');
			}
		}else{
			empty('produto');
		}

		conteudo += '</ul>';

		$('#preloader').fadeOut('fast', function() {
			$('#produtos-grupos').after(conteudo).remove();
			$('#prod-list').show('fast');

			blocoHeight('#prod-list');
		});

		ConteudoResponsivo();
		nomeProd();

	} catch (e) { console.log('ProdutosHomeRetorno: ' + e.message); }
}