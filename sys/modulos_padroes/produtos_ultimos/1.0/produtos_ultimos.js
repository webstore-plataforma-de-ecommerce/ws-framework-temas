$(document).ready(function(){
	try{
		isReady("cfg['estrutura']", "ListaProdutosUltimos()");
	} catch (e) { console.log(e.message); }
});

function ListaProdutosUltimos() {
	ApiWS.ListaProdutosUltimos("ListaProdutosUltimosRetorno");
}
function ListaProdutosUltimosRetorno() {
	if (cfg['ultimos_vistos']){
		try {
			var template = $('#template').html();

			var OBJETO = ApiWS.Json;
			objetos.ListaProdutosUltimos = OBJETO;

			var obj = jQuery.parseJSON(OBJETO);

			$("#ultimos-list").html("");
			if (obj != null && obj != undefined) {
				if (obj.length > 0) {

					for (a = 0; a < obj.length; a++) {
						var bloco = BlocoProduto(obj[a], template);
						$('#ultimos-list').append(bloco);
					}

					$('#ultimos-vistos').removeClass('hidden');

					$('#ultimos-list, #ultimos-vistos').css({
						opacity: '1',
						visibility: 'visible',
						height: 'auto'
					});

					// verifica se a quantidade de itens é maior do que o slider em sí
					$('#ultimos-list').on('init', function (event, slick, direction) {
					    if ($('#ultimos-list .list-item').length > 4){
					        // se não há scroll, remove as setas
					        $('#ultimos-list .arrow').hide();
					    }
					});

					$('#ultimos-list').slick({
						infinite: true,
						slidesToShow: 4,
						prevArrow: $('#ultimos-vistos .left-arrow'),
						nextArrow: $('#ultimos-vistos .right-arrow'),
						autoplay: false,
						responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3,
								infinite: true
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 375,
							settings: {
								slidesToShow: 1
							}
						}]
					});

					ListItemResize();
				}
			}
		} catch (e) { console.log('ListaProdutosUltimosRetorno: ' + e.message); }
	}
}