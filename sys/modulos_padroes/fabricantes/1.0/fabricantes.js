var useLazyLoadFabr = false;

$(document).ready(function () {
	
	if ($("#HdEtapaLoja").val() == "HOME") {
		window.setTimeout("Fabricantes()", 0);
	}

});

function Fabricantes() {
	ApiWS.ListaFabricantes("FabricantesRetorno");
}
function FabricantesRetorno() {

	try {

        if (typeof LazyLoadOver !== 'undefined') {
            useLazyLoadFabr = LazyLoadOver;
        }

        var classLazyLoad = "lazyload";
        var addCodeLazyLoad = "data-obj-img-load src='https://fileswscdn.wslojas.com.br/wsfiles/images/LoadBeforeShowImg.jpg' data-";
        if (!useLazyLoadFabr) { addCodeLazyLoad = ""; classLazyLoad = ""; }

		var OBJETO = ApiWS.Json;
		objetos.Fabricantes = OBJETO;

		if (typeof over_fabricantes !== 'undefined') { try { eval(over_fabricantes); return; } catch (e) { console.log(e.message); } }

		var obj = jQuery.parseJSON(OBJETO);
		var li = "";

		if (obj.fabricantes != null && obj.fabricantes != undefined && typeof semBlocoFabricantes == 'undefined') {
			if (obj.fabricantes.length > 0) {
				for(a = 0; a < obj.fabricantes.length; a++){
					var fabricante = obj.fabricantes[a];
					li += '<li id="fabricante-'+fabricante.id+'"><a href="'+fabricante.url+'">';

					if(fabricante.logotipo != null && fabricante.logotipo != undefined){
                        li += '<img ' + addCodeLazyLoad + 'src="' + fabricante.logotipo + '" class="' + classLazyLoad + '" alt="' + fabricante.nome + '" title="' + fabricante.nome + '">';
					}else{
						li += fabricante.nome;
					}
					li += '</a></li>';
				}
				$('#fabricantes').append(li);
				$('#fabricante-holder').removeClass('hidden');
				$('#fabricantes').slick({
					infinite: true,
					slidesToShow: 6,
					slidesToScroll: 1,
					autoplaySpeed: 2000,
				  	prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
					nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
					autoplay: true,
					responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 5,
							infinite: true
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 3
						}
					}],
				});
			}
		}

		if (typeof call_after_fabricantes !== 'undefined') { try { eval(call_after_fabricantes); } catch (e) { console.log("Falha call_after_fabricantes" + e.message); } }
		WsModifiersCall("fabricantes_1_0");

	} catch (e) { console.log(e.message); }
}