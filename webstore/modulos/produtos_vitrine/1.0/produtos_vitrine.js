var modVitrineOn = true;
$(document).ready(function () {
	try{
		if ($("#HdEtapaLoja").val() == "HOME") {
			isReady("cfg['estrutura']", "ProdutosVitrine()");
		}
	} catch (e) { console.log(e.message); }
});


function ProdutosVitrine() {
	ApiWS.ListaProdutosHome("ProdutosVitrineRetorno");
}
function ProdutosVitrineRetorno() {
	try {
		var template = $('#template').html();

		var JSON = ApiWS.Json;
		objetos.ProdutosHome = JSON;
		var obj = jQuery.parseJSON(JSON);

		$("#prod-list").html("").css('display', 'none');;
		if (obj.totalitens != null && obj.totalitens != undefined) {
			if (obj.totalitens > 0 && cfg['produtos_pagina'] < obj.totalitens) {

				for (a = 0; a < cfg['produtos_pagina']; a++) {
					var bloco = BlocoProduto(obj.produtos[a], template);
					$('#prod-list').append(bloco);
				}

			}else if(obj.totalitens > 0){

				for (a = 0; a < obj.totalitens; a++) {
					var bloco = BlocoProduto(obj.produtos[a], template);
					$('#prod-list').append(bloco);
				}
				
			}else{
				empty('produto');
			}
			$('#prod-list').show('fast');
		}else{
			empty('produto');
		}

		if (typeof titVitrineProds !== 'undefined') {
		    $("#tit-vitrine-produtos").html(titVitrineProds);
		}

		$('#preloader').fadeOut();

		ConteudoResponsivo();
		//ListItemResize();
		nomeProd("#prod-list");
		blocoHeight('#prod-list');

		window.setTimeout("ConteudoResponsivo()", 1500);

		window.setTimeout("ConteudoResponsivo()", 3000);

		window.setTimeout("ConteudoResponsivo()", 5000);

        LazyLoadApply();

		if (typeof call_after_produtos_vitrine !== 'undefined') { try { eval(call_after_produtos_vitrine); } catch (e) { console.log("Falha call_after_produtos_vitrine" + e.message); } }

	} catch (e) { console.log('ProdutosHomeRetorno: ' + e.message); }
}