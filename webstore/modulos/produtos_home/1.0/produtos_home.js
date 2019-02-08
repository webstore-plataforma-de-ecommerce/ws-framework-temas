function ProdutosHome() {
	ApiWS.ListaProdutosHome("ProdutosHomeRetorno");
}
function ProdutosHomeRetorno() {
	try {
		var template = $('#template').html();
		var conteudo = '<ul id="prod-list">';

		var JSON = ApiWS.Json;
		objetos.ProdutosHome = JSON;
		var obj = jQuery.parseJSON(JSON);

		$("#produtos-grupos").html("").css('display', 'none');
		if (obj.totalitens != null && obj.totalitens != undefined) {
			if (obj.totalitens > 0 && cfg['produtos_pagina'] < obj.totalitens) {

				for (a = 0; a < cfg['produtos_pagina']; a++) {
					var bloco = BlocoProduto(obj.produtos[a], template);
					conteudo += bloco;
				}

			}else if(obj.totalitens > 0){

				for (a = 0; a < obj.totalitens; a++) {
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
		});

		ConteudoResponsivo();
		ListItemResize();
		nomeProd();

		window.setTimeout("ConteudoResponsivo()", 1500);

		window.setTimeout("ConteudoResponsivo()", 3000);

		window.setTimeout("ConteudoResponsivo()", 5000);

	} catch (e) { console.log('ProdutosHomeRetorno: ' + e.message); }
}