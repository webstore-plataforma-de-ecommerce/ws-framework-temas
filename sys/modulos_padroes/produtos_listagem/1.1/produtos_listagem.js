var viewmoreOption = false;
var firstpage = true;


$(document).ready(function () {
	try{
		if ($("#HdEtapaLoja").val() == "LISTAGEM"){
			isReady("cfg['estrutura']", "ProdutosListagem()");
		}
	} catch (e) { console.log(e.message); }
});

function ProdutosListagem() {
	modulos_to_complete++;
	ApiWS.ListaProdutosPags("ProdutosListagemRetorno");
}
function ProdutosListagemRetorno() {
	try {

		
		modulos_completed++;

		if (typeof viewmoreOption_over !== 'undefined') {
			viewmoreOption = viewmoreOption_over;
		}

		if($('#template').length){
			var template = $('#template').html();
		}else{
			var template = $('#prod-list').html();
		}

		if (firstpage) {
			$('#LV_COMBO_ORDEM').html('' +
				'<option value="5">Mais Relevantes</option>' +
				'<option value="1">A - Z</option>' +
				'<option value="2">Z - A</option>' +
				'<option value="3">Menor Pre&ccedil;o</option>' +
				'<option value="4">Maior Pre&ccedil;o</option>' +
				'');
		}

		var OBJETO = ApiWS.Json;
		objetos.ProdutosListagem = OBJETO;
		var obj = jQuery.parseJSON(OBJETO);

		if (firstpage) {
			$("#prod-list").html("").css('display', 'none');
		}

		if (obj.totalitens != null && obj.totalitens != undefined) {
			if (obj.totalitens > 0) {

				if (firstpage) {
					if (obj.ordem_atual.length == 0) {
						$('#LV_COMBO_ORDEM option[value="PROD.PROD_NOME"]').attr('selected', 'selected');
					} else {
						$('#LV_COMBO_ORDEM option[value="' + obj.ordem_atual + '"]').attr('selected', 'selected');
					}
				}

				if (obj.paginacao != null) {

					var qtdPaginas = obj.paginacao.qtd_paginas;
					var pgAtual = obj.paginacao.pagina_atual;

					if (!viewmoreOption) {

						$('.resultado-paginacao').html(obj.paginacao.total_itens + ' itens');

						if (pgAtual != 1) {
							if (typeof paginacaoSemSeta !== 'undefined') {
								$('.lista-paginacao').append('<li><a href="?pagina=1" title="Ir para a primeira p&aacute;gina">Primeira</a></li>');
								$('.lista-paginacao').append('<li class="hidden-xs"><a href="?pagina=' + (pgAtual - 1) + '" title="Ir para p&aacute;gina ' + (pgAtual - 1) + '">Anterior</a></li>');
							} else {
								$('.lista-paginacao').append('<li><a href="?pagina=1" title="Ir para a primeira p&aacute;gina"><span class="fa fa-angle-left" aria-hidden="true"></span><span class="fa fa-angle-left" aria-hidden="true"></span></a></li>');
								$('.lista-paginacao').append('<li class="hidden-xs"><a href="?pagina=' + (pgAtual - 1) + '" title="Ir para p&aacute;gina ' + (pgAtual - 1) + '"><span class="fa fa-angle-left" aria-hidden="true"></span></a></li>');
                            }
						}

						for (c = 0; c < qtdPaginas; c++) {
							var d = c + 1;
							if (
								d >= (pgAtual - 2) &&
								d <= (pgAtual + 2)
							) {
								if (d == pgAtual) {
									$('.lista-paginacao').append('<li class="active"><a href="?pagina=' + d + '" title="Ir para p&aacute;gina ' + d + '">' + d + '</a></li>');
								} else {
									if (
										d == (pgAtual - 2) &&
										(pgAtual - 2) > 1
									) {
										//$('.lista-paginacao').append('<li><a>...</a></li>');
									}
									$('.lista-paginacao').append('<li><a href="?pagina=' + d + '" title="Ir para p&aacute;gina ' + d + '">' + d + '</a></li>');
									if (
										d == (pgAtual + 2) &&
										(pgAtual + 2) < qtdPaginas
									) {
										//$('.lista-paginacao').append('<li><a>...</a></li>');
									}
								}
							}
						}
						if (pgAtual != qtdPaginas) {

							if (typeof paginacaoSemSeta !== 'undefined') {
								$('.lista-paginacao').append('<li class="hidden-xs"><a href="?pagina=' + (pgAtual + 1) + '" title="Ir para p&aacute;gina ' + (pgAtual + 1) + '">Pr&oacute;xima</a></li>');
								$('.lista-paginacao').append('<li><a href="?pagina=' + qtdPaginas + '" title="Ir para a &uacute;ltima p&aacute;gina">&Uacute;ltima</a></li>');
							} else {
								$('.lista-paginacao').append('<li class="hidden-xs"><a href="?pagina=' + (pgAtual + 1) + '" title="Ir para p&aacute;gina ' + (pgAtual + 1) + '"><span class="fa fa-angle-right" aria-hidden="true"></span></a></li>');
								$('.lista-paginacao').append('<li><a href="?pagina=' + qtdPaginas + '" title="Ir para a &uacute;ltima p&aacute;gina"><span class="fa fa-angle-right" aria-hidden="true"></span><span class="fa fa-angle-right" aria-hidden="true"></span></a></li>');
                            }

						}

					} else {

						/*VER MAIS OPÇÃO*/
						if (qtdPaginas > pgAtual) {

							if (firstpage) {
								if (typeof viewmoreOptionInfinity !== 'undefined') {
									$(window).scroll(function () {
										funcListInfinity();
									});
								}
							}

							$('.paginacao-bottom').show();
							window.setTimeout("funcSetInfinityFree()", 3000);
							$('.paginacao-bottom').addClass("paginacaoviewmoreOption");
							if (firstpage) {
								$('.lista-paginacao').append('<li><a href="#pagina=' + (pgAtual + 1) + '" onclick="funcChangePage(' + (pgAtual + 1) + ')" id="linkLoadInfinity" title="Carregar mais produtos">Carregar mais produtos</a></li>');
							} else {
								$('.lista-paginacao').html('<li><a href="#pagina=' + (pgAtual + 1) + '" onclick="funcChangePage(' + (pgAtual + 1) + ')" id="linkLoadInfinity" title="Carregar mais produtos">Carregar mais produtos</a></li>');
							}

						} else {
							$('.lista-paginacao').hide();
						}						

					}

				}else{
					if (obj.totalitens == 1) {
						$('.resultado-paginacao').html(obj.totalitens + ' item');
					}else{
						$('.resultado-paginacao').html(obj.totalitens + ' itens');
					}
				}

				if (firstpage) {
					if (obj.migalha != null && obj.migalha != undefined) {
						var qtd = 0;
						for (b = 0; b < obj.migalha.length; b++) {
							qtd++;
							if (obj.migalha[b].nome == "P&aacute;gina inicial") {
								obj.migalha[b].nome = '<i class="fa fa-home"></i>';
							}

							if (obj.migalha[b].atual == true) {
								$('#lista-migalha').append('<li><a href="' + obj.migalha[b].url + '" class="active">' + obj.migalha[b].nome + '</a></li>');
							} else {
								$('#lista-migalha').append('<li><a href="' + obj.migalha[b].url + '">' + obj.migalha[b].nome + '</a></li>');
							}

							if (qtd != obj.migalha.length) {
								$('#lista-migalha').append('<li class="separador">/</li>');
							}
						}
					} else {
						$('#lista-migalha').hide();
					}
				}

				var lista = "";
				for (a = 0; a < obj.totalitens; a++) {
					var bloco = BlocoProduto(obj.produtos[a], template);
					lista += bloco;
				}
				$('#prod-list').append(lista);
				blocoHeight('#prod-list');

				if(obj.tipo_exibicao != null && obj.tipo_exibicao != undefined){
					FuncaoMudarTipoLista(obj.tipo_exibicao);
				}else{
					FuncaoMudarTipoLista("G");
				}

				$('#preloader').fadeOut('fast', function() {
					$('#prod-list').show('fast');
				});
			}else{
				var retorno = SemProdutos();
				$('#preloader').fadeOut('fast', function() {
					$("#prod-list").append(retorno).show('fast');
					blocoHeight('#prod-list');
				});
			}
		}

		if(cfg['menu_lateral'] == true){
			lateralEsq = true;
		}

		firstpage = false;

		FrameworkResponsivo();
        ConteudoResponsivo();
        window.setTimeout("blocoHeightAjusta()", 2000);
        nomeProd("#prod-list");
		LazyLoadApply();

		WsModifiersCall("produtos_listagem_1_1");
		
	} catch (e) { console.log('ProdutosListagemRetorno: '+e.message); }
}

function FuncaoMudarTipoLista(TIPO) {

    if (TIPO == "G") {

        $("#LV_LINK_TIPOLISTA_GRADE").css("color", "#666");
        $("#LV_LINK_TIPOLISTA_LISTA").css("color", "#ccc");

        $('.list-item').removeClass('item-tipo-lista');

    }

    if (TIPO == "L") {            

        $("#LV_LINK_TIPOLISTA_GRADE").css("color", "#ccc");
        $("#LV_LINK_TIPOLISTA_LISTA").css("color", "#666");

        $('.list-item').addClass('item-tipo-lista');

    }
}

function SemProdutos() {
	var content = '<div class="listagem-vazio col-xs-12"><h2>Nenhum produto encontrado</h2>';
	content += '<a href="javascript:void(window.history.back())" id="link-pagina-inicial" class="link-pagina-inicial">Voltar &agrave;s compras</a>';
	content += '</div>';

	$('.paginacao-ordem').hide();
	$('.paginacao-bottom').hide();
	$('#lista-migalha').hide();

	return content;
}

function funcChangePage(page) {

	try {

		$('.paginacao-bottom').fadeOut("fast");
		console.log("Carregando mais produtos, pagina(" + page + ")");
		ApiWS.ListaProdutosPags("ProdutosListagemRetorno", page);

	} catch (e) {
		console.log("Falha carregando mais produtos." + e.message);
	}

}

var CarregarGoInfinity = false;
function funcListInfinity() {
	if (CarregarGoInfinity) {
		var linkTop = getElementPositionPage('linkLoadInfinity', 'T');
		var windowH = $(window).height();
		var scrollTopP = $(window).scrollTop();
		//console.log("scrollTopP:" + scrollTopP + " >= (linkTop:" + linkTop + " - " + "WindowHeight:" + windowH);
		if (scrollTopP >= (linkTop - (windowH * 2))) {
			CarregarGoInfinity = false;
			console.log("Carregar mais.");
			$("#linkLoadInfinity").click();
		}
	}
}

function funcSetInfinityFree() {
	CarregarGoInfinity = true;
}