$(document).ready(function(){
	try{
		if ($("#HdEtapaLoja").val() == "HOME") {
			window.setTimeout("ProdutosDestaque()", 0);
		}
	} catch (e) { console.log(e.message); }
});

function ProdutosDestaque() {
	ApiWS.ListaProdutosDestaque("ProdutosDestaqueRetorno");
}
function ProdutosDestaqueRetorno() {
	try {
		
		var OBJETO = ApiWS.Json;
		var obj = jQuery.parseJSON(OBJETO);
		objetos.ProdutosDestaque = OBJETO;
		
		var template = $('#template-destaque').html();

		$("#destaque-list").html("");
		if (obj.totalitens && obj.totalitens > 0) {

			var li = "";

			for (a = 0; a < obj.totalitens; a++) {
				var bloco = BlocoProduto(obj.produtos[a], template);
				li += bloco;
			}

			$('#destaque-list')
			.append(li)
			.css({
				opacity: '1',
				visibility: 'visible'
			})
			.slick({
				infinite: true,
				autoplay: false,
				slidesToShow: 2,
				slidesToScroll: 2,
				autoplaySpeed: 3000,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			});

		}else{
			$('#prod-destaque').hide();
			empty('destaque');
		}

	} catch (e) { console.log('ProdutosDestaqueRetorno: ' + e.message); }
}