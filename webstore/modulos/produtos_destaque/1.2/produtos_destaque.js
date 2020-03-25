$(document).ready(function () {
	try{
		if ($("#HdEtapaLoja").val() == "HOME") {
			//window.setTimeout("ProdutosDestaque()", 0);
			isReady("banners_finished", "ProdutosDestaqueStart()");
		}
	} catch (e) { console.log(e.message); }
});

function ProdutosDestaqueStart() {
	isReady("cfg['estrutura']", "ProdutosDestaque()");
}

function ProdutosDestaque() {
	ApiWS.ListaProdutosDestaque("ProdutosDestaqueRetorno");
}
function ProdutosDestaqueRetorno() {
	try {
		
        var OBJETO = ApiWS.Json;

        if (typeof over_produtos_destaque !== 'undefined') { try { eval(over_produtos_destaque); return; } catch (e) { console.log(e.message); } }

		var obj = jQuery.parseJSON(OBJETO);
		objetos.ProdutosDestaque = OBJETO;
		
		var QtdPage = 2;
		if (typeof destaqueQtdPage !== 'undefined') {
		    QtdPage = destaqueQtdPage;
		}
		
		var arrowsOn = false;
		if (typeof destaqueArrowsOn !== 'undefined') {
		    arrowsOn = destaqueArrowsOn;
		}

        var templateDestaque = $('#template-destaque').html();
        var template = $('#template').html();

        if (templateDestaque) {
            template = templateDestaque;
        }

		$("#destaque-list").addClass("destaque-qtd-" + QtdPage);

		$("#destaque-list").html("");
		if (obj.totalitens && obj.totalitens > 0) {

			var li = "";
			var IndiceListProds = "";

			for (a = 0; a < obj.totalitens; a++) {

			    var bloco = BlocoProduto(obj.produtos[a], template);
				li += bloco;

				IndiceListProds += BlocoProduto(obj.produtos[a], template);

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
				slidesToShow: QtdPage,
				slidesToScroll: QtdPage,
				autoplaySpeed: 3000,
				arrows: arrowsOn,
				dots: true,
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			});
		    blocoHeight('#destaque-list');

			if (typeof destaqueIndiceListProds !== 'undefined') {
			    $("#destaque-indice-list").html(IndiceListProds);
			    $("#prod-destaque").addClass("destaque-indice-prods");
			    $(".slick-dots").addClass("hidden");
			    IndiceDestaqueListAjusta();
			} else {
			    $("#destaque-indice-list").remove();
			}

			if (typeof tituloDestaque !== 'undefined') {
			    $("#tit-destaque-produtos h3").html(tituloDestaque);
			} else {
			    $("#tit-destaque-produtos").remove();
			}

		}else{
			$('#prod-destaque').hide();
			empty('destaque');
        }

        LazyLoadApply();

		if (typeof call_after_destaque !== 'undefined') { try { eval(call_after_destaque); } catch (e) { console.log("Falha call_after_destaque" + e.message); } }

	} catch (e) { console.log('ProdutosDestaqueRetorno: ' + e.message); }
}


function IndiceDestaqueListAjusta() {

    var ContIndice = 0;
    $("#destaque-indice-list li").each(
        function () {

            $(this).find("a").each(function () { $(this).attr("href", "javascript:void(linkIndiceList(" + ContIndice + "))"); })
            ContIndice++;

        }
    );

}

function linkIndiceList(indice) {

    try {

        var contIndiceVerif = 0;
        $(".slick-dots li").each(
            function () {
                if (contIndiceVerif == indice) {
                    $(this).find("button").click();
                }
                contIndiceVerif++;
            }
        )

    } catch (e) {
        console.log("linkIndiceList:" + e.message);
    }

}