$(document).ready(function(){
	try{
		if ($("#HdEtapaLoja").val() == "LISTAGEM"){
			isReady("cfg['estrutura']", "ProdutosListagem()");
		}
	} catch (e) { console.log(e.message); }
});

function ProdutosListagem() {
	ApiWS.ListaProdutosPags("ProdutosListagemRetorno");
}
function ProdutosListagemRetorno() {
	try {

		if($('#template').length){
			var template = $('#template').html();
		}else{
			var template = $('#prod-list').html();
		}

		var OBJETO = ApiWS.Json;
		objetos.ProdutosListagem = OBJETO;
		var obj = jQuery.parseJSON(OBJETO);

		$("#prod-list").html("").css('display', 'none');
		if (obj.totalitens != null && obj.totalitens != undefined) {
			if (obj.totalitens > 0) {

				if(obj.ordem_atual.length == 0){
					$('#LV_COMBO_ORDEM option[value="PROD.PROD_NOME"]').attr('selected', 'selected');
				}else{
					$('#LV_COMBO_ORDEM option[value="' + obj.ordem_atual + '"]').attr('selected', 'selected');
				}

				if (obj.paginacao != null) {
					var qtdPaginas = obj.paginacao.qtd_paginas;
					var pgAtual = obj.paginacao.pagina_atual;

					$('.resultado-paginacao').html(obj.paginacao.total_itens + ' itens');
					
					if (pgAtual != 1){
						$('.lista-paginacao').append('<li><a href="?pagina=1"><span class="fa fa-angle-left" aria-hidden="true"></span><span class="fa fa-angle-left" aria-hidden="true"></span></a></li>');
						// $('.lista-paginacao').append('<li><a href="?pagina=' + (pgAtual - 1) + '"><span class="fa fa-angle-left" aria-hidden="true"></span></a></li>');
					}
					for (c = 0; c < qtdPaginas; c++){
						var d = c + 1;
						if(
							d >= (pgAtual - 2) &&
							d <= (pgAtual + 2)
						){
							if (d == pgAtual) {
								$('.lista-paginacao').append('<li class="active"><a href="?pagina=' + d + '">' + d + '</a></li>');
							}else{
								if(
									d == (pgAtual - 2) &&
									(pgAtual - 2) > 1
								){
									$('.lista-paginacao').append('<li><a>...</a></li>');
								}
								$('.lista-paginacao').append('<li><a href="?pagina=' + d + '">' + d + '</a></li>');
								if(
									d == (pgAtual + 2) &&
									(pgAtual + 2) < qtdPaginas
								){
									$('.lista-paginacao').append('<li><a>...</a></li>');
								}
							}
						}
					}
					if (pgAtual != qtdPaginas) {
						// $('.lista-paginacao').append('<li><a href="?pagina=' + (pgAtual + 1) + '"><span class="fa fa-angle-right" aria-hidden="true"></span></a></li>');
						$('.lista-paginacao').append('<li><a href="?pagina=' + qtdPaginas + '"><span class="fa fa-angle-right" aria-hidden="true"></span><span class="fa fa-angle-right" aria-hidden="true"></span></a></li>');
					}
				}else{
					if (obj.totalitens == 1) {
						$('.resultado-paginacao').html(obj.totalitens + ' item');
					}else{
						$('.resultado-paginacao').html(obj.totalitens + ' itens');
					}
				}

				if(obj.migalha != null && obj.migalha != undefined){
					var qtd = 0;
					for (b = 0; b < obj.migalha.length; b++){
						qtd++;
						if (obj.migalha[b].nome == "Página inicial") {
							obj.migalha[b].nome = '<i class="fa fa-home"></i>';
						}

						if (obj.migalha[b].atual == true){
							$('#lista-migalha').append('<li><a href="' + obj.migalha[b].url + '" class="active">' + obj.migalha[b].nome + '</a></li>');
						}else{
							$('#lista-migalha').append('<li><a href="' + obj.migalha[b].url + '">' + obj.migalha[b].nome + '</a></li>');
						}

						if(qtd != obj.migalha.length){
							$('#lista-migalha').append('<li class="separador">/</li>');					
						}
					}
				}else{
					$('#lista-migalha').hide();
				}

				var lista = "";
				for (a = 0; a < obj.totalitens; a++) {
					var bloco = BlocoProduto(obj.produtos[a], template);
					lista += bloco;
				}
				$('#prod-list').append(lista);

				if(obj.tipo_exibicao != null && obj.tipo_exibicao != undefined){
					FuncaoMudarTipoLista(obj.tipo_exibicao);
				}else{
					FuncaoMudarTipoLista("G");
				}

				$('#preloader').fadeOut('fast', function() {
					$('#prod-list').show('fast');
				});

				ListItemResize();
				nomeProd();
			}else{
				var retorno = SemProdutos();
				$('#preloader').fadeOut('fast', function() {
					$("#prod-list").append(retorno).show('fast');
				});
			}
		}

		if(cfg['menu_lateral'] == true){
			lateralEsq = true;
		}

		FrameworkResponsivo();
		ConteudoResponsivo();
		ListItemResize();
		nomeProd();
		
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