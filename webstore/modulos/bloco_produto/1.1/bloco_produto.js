var blocoBotaoComprar = false,
    blocoFabricante = false,
    blocoMais = false,
    blocoPreco = false,
    blocoVariaPreco = false,
    trustvox = false,
    blocofretegratis = false,
    blocodisponibilidade = false;

var produtosInfosKeep = [];
var blocoProdsIdAtual = "";
var blocoProdsTemplateAtual = "";
var varshowfreeshipping = true;
var varshowdisponibilidade = false;
var useLazyLoadBloco = false;

function BlocoProduto(OBJ, TEMPLATE) {
    try {

        if (typeof LazyLoadOver !== 'undefined') {
            useLazyLoadBloco = LazyLoadOver;
        }

        var classLazyLoad = "lazyload";
        var addCodeLazyLoad = "data-obj-img-load src='https://fileswscdn.wslojas.com.br/wsfiles/images/LoadBeforeShowImg.jpg' data-";
        if (!useLazyLoadBloco) { addCodeLazyLoad = ""; classLazyLoad = ""; }

        //console.log("useLazyLoad:" + useLazyLoadBloco);

        var templateOver = "";
        templateOver = $("#template-bloco-over").html();

        if (templateOver) {
            TEMPLATE = templateOver;
            //console.log("template bloco over on");
        }

        if (typeof WSshowfreeshipping !== 'undefined') {
            varshowfreeshipping = WSshowfreeshipping;
        }

        if (typeof WSshowdisponibilidade !== 'undefined') {
            varshowdisponibilidade = WSshowdisponibilidade;
        }

	    //console.log("Bloco Produto");
		var ADD = '<div class="add">',
		CLASS = '',
		COMPRAR = '',
		DESCONTO = '',
		FAB = '',
		FOTO = '',
		LINK = OBJ.links.ver_produto,
		MAIS = '',
		MIN_PARCELA = '',
		PARCELA = '',
		PORCENTAGEM = '',
		PRECO = '',
		PROMOCAO = '',
		STARS = '',
		TITLE = OBJ.nome,
		TITLE = TITLE.replace(/['"]+/g, ''),
        UMA = '',
        FRETE = '',
        DISPONIBILIDADE = '',
		VEZES = '';
		
		//console.log("produto " + OBJ.nome + " id " + OBJ.id);
		produtosInfosKeep[OBJ.id] = OBJ;

		FOTO += '<a href="' + LINK + '" title="' + TITLE + '">';

        if (typeof fotoVertical !== 'undefined') {
            CLASS += " foto-vertical ";
        }

		if (OBJ.fotos != null && OBJ.fotos != undefined) {
			//a variÃ¡vel fotoVertical faz parte de um conjunto de variÃ¡veis que tem como objetivo setar
			//configuraÃ§Ãµes hard-coded que podem ser facilmente ativadas/desativadas sem a necessidade do painel de controle.
			if (typeof fotoVertical !== 'undefined') {
				//CLASS += " foto-vertical ";
				for (i = 0; i < OBJ.fotos.length; i++) {
					var foto = OBJ.fotos[i];
					foto = foto.replace("PEQ_", "MED_");
					OBJ.fotos[i] = foto;
				}
			}
			if (cfg['troca_fotos'] && OBJ.fotos.length > 1) {
                FOTO += '<img ' + addCodeLazyLoad + 'src="' + OBJ.fotos[0] + '" alt="' + TITLE + '" class="img-responsive img-1 ' + classLazyLoad + '">';
                FOTO += '<img ' + addCodeLazyLoad + 'src="' + OBJ.fotos[1] + '" alt="' + TITLE + '" class="img-responsive img-2 ' + classLazyLoad + '">';
			} else {
                FOTO += '<img ' + addCodeLazyLoad + 'src="' + OBJ.fotos[0] + '" alt="' + TITLE + '" class="img-responsive ' + classLazyLoad + '">';
			}
		} else {
            FOTO += '<img src="/lojas/img/fotoindisponivel.jpg" alt="' + TITLE + '" class="img-responsive ' + classLazyLoad + '">';
		}
		FOTO += '</a>';
		if (OBJ.lancamento == true) {
            ADD += '<span class="prod-lancamento tags-listagem-produto">Lan&ccedil;amento</span>';
		}
		var DESTAQUE = '<span class="prod-detalhes"><a href="' + LINK + '" title="' + TITLE + '">Ver detalhes</a></span>';
		var NOME = '<p class="prod-nome"><a href="' + LINK + '" title="' + TITLE + '">' + OBJ.nome + '</a></p>';
		if (OBJ.disponivel == true) {
			if (OBJ.precos != null && OBJ.precos != undefined && (cfg['preco_apos_login'] == false || cliente)) {
				if (OBJ.precos.preco != 0) {

				    blocoPreco = true;

				    var PRECO = Number(OBJ.precos.preco),
					PROMOCAO = Number(OBJ.precos.preco_promocao),
					VEZES = Number(OBJ.precos.max_parcelas),
					DESCONTO = PRECO / 100 * Number(OBJ.precos.desconto_avista),
					MIN_PARCELA = Number(OBJ.precos.valor_min_parcelas),
					INICIA = Number(OBJ.precos.juros_inicia),
					JUROS = Number(OBJ.precos.juros);

				    if (MIN_PARCELA < 3) { MIN_PARCELA = 3; }

					if (INICIA > 1) {
						var semJuros = INICIA - 1;
					} else {
						var semJuros = 0;
					}

					if (PROMOCAO != 0) {

					    PORCENTAGEM = ((PRECO - PROMOCAO) / PRECO * 100).toFixed(0);

					    var tipoDesconto = "1";

					    if (typeof tipoDescontoSet !== 'undefined') {
					        tipoDesconto = tipoDescontoSet;
					    }

					    if (tipoDesconto == "1") {
                            ADD += '<span class="prod-desconto tags-listagem-produto">' + PORCENTAGEM + '% desconto</span>';
					    }
					    else if (tipoDesconto == "2") {
                            ADD += '<span class="prod-desconto tags-listagem-produto">-' + PORCENTAGEM + '%</span>';
					    }

						PRECODE = PRECO;
						PRECO = PROMOCAO;
						DESCONTO = PRECO / 100 * Number(OBJ.precos.desconto_avista);

					}

					UMA = PRECO - DESCONTO;
					UMA = AjustaMoney(UMA);
					if (OBJ.precos.desconto_avista != null && OBJ.precos.desconto_avista != undefined && OBJ.precos.desconto_avista != 0) {
						blocoVariaPreco = true;
						UMA = '<p class="prod-preco-uma"><a href="' + LINK + '" title="' + TITLE + '">R$ ' + UMA + ' &agrave; vista</a></p>';
					} else {
						UMA = '<p class="prod-preco-uma"></p>';
					}

					if ((PRECO / VEZES) < MIN_PARCELA) {
						VEZES = Math.floor(PRECO / MIN_PARCELA);
					}

					var cf = ValorJurosComposto(JUROS, VEZES, INICIA, PRECO);

					if (semJuros > VEZES) {
						semJuros = VEZES
					}

					if (semJuros > 1) {
						PARCELA = PRECO / semJuros;
					} else if (VEZES > 1) {
					    PARCELA = PRECO / VEZES;
					} else {
					    PARCELA = PRECO;
					}

					if (VEZES > 1) {

					    var ExibeSemJuros = "";
					    var qtdParc = VEZES;
					    var ValorExibe = PARCELA;

					    if (semJuros > 1) {
					        ExibeSemJuros = " sem juros";
					        qtdParc = semJuros;
					    }
					    else { ValorExibe = cf; }

					    ValorExibe = AjustaMoney(ValorExibe);

						VEZES = '<p class="prod-preco-parc"><a href="' + LINK + '" title="' + TITLE + '">' + qtdParc + 'x de R$ ' + ValorExibe + ' ' + ExibeSemJuros + '</a></p>';
						blocoVariaPreco = true;

					} else {
						VEZES = 1;
						PARCELA = "";
						VEZES = '<p class="prod-preco-parc"></p>';
					}

					if (PROMOCAO != 0) {
						PRECO = "R$ " + AjustaMoney(PRECODE);
						PROMOCAO = "R$ " + AjustaMoney(PROMOCAO);
						PRECO = '<a href="' + LINK + '" title="' + TITLE + '"><strike id="preco-de">' + PRECO + '</strike>' + PROMOCAO + '</a>';
					} else {
						PROMOCAO = "";
						PRECO = AjustaMoney(PRECO);
						PRECO = '<a href="' + LINK + '" title="' + TITLE + '">R$ ' + PRECO + '</a>';
					}

					if (OBJ.links.botao_comprar != null && OBJ.links.botao_comprar != undefined) {

					    var txtBtComprar = "Comprar";
					    if (typeof textBotaoCompra !== 'undefined') {
					        txtBtComprar = textBotaoCompra;
					    }

					    COMPRAR = '<span class="prod-no-qty"><a href="' + OBJ.links.botao_comprar + '"><i class="fa fa-shopping-cart"></i> ' + txtBtComprar + '</a></span>';
					    blocoBotaoComprar = true;

						var CampoQtd = "";
						if (typeof QtdProdListagem !== 'undefined') {
						    var Qtdmin = OBJ.qtdminima;
						    if (Qtdmin == 0) { Qtdmin = 1; }
						    CampoQtd = "<span class='prod-qtd'><input type='number' id='HD_QTD_PROD_" + OBJ.id + "' value='" + Qtdmin + "' QtdMinima='" + Qtdmin + "' size='2' maxlength='2' /></span>";
						    COMPRAR = COMPRAR.replace("prod-no-qty", "");
						}

						COMPRAR = CampoQtd + COMPRAR;

					}

				} else {
					// PRODUTO COM PREÇO ZERO
					UMA = '<p class="prod-preco-uma"></p>';
					VEZES = '<p class="prod-preco-parc"></p>';
					PROMOCAO = "";
				}
			}
		} else if (OBJ.modo != "3") {
			CLASS += 'produto-indisponivel ';
			PRECO += '<span class="produto-indisponivel"><a href="' + LINK + '" title="' + TITLE + '" class="tarja-indisponivel">Produto indispon&iacute;vel</a></span>';
			CLASS += "preco-null";
		}

        if (OBJ.fretegratis == true) {
            FRETE = '<span class="produto-fretegratis tags-listagem-produto">frete gr&aacute;tis</span>';
            blocofretegratis = true;
        }
        if ((OBJ.disponibilidade || OBJ.disponibilidade == 0) && varshowdisponibilidade == true) {
            if (OBJ.disponibilidade > 0) {
                DISPONIBILIDADE = '<span class="produto-disponibilidade tags-listagem-produto">Dispon&iacute;vel em ' + OBJ.disponibilidade + ' dia(s)</span>';
            } else {
                DISPONIBILIDADE = '<span class="produto-disponibilidade tags-listagem-produto">Disponibilidade imediata</span>';
            }
            blocodisponibilidade = true;
        }
		if (OBJ.fabricante != null && OBJ.fabricante != undefined) {
			FAB = ' <a href="' + OBJ.fabricante.url + '" title="' + OBJ.fabricante.nome + '">' + OBJ.fabricante.nome + '</a>';
			blocoFabricante = true;
		}
		if (OBJ.maisprodutos != null && OBJ.maisprodutos != undefined) {
			MAIS = ' <a href="' + OBJ.maisprodutos.link + '" title="' + OBJ.maisprodutos.nome + '">' + OBJ.maisprodutos.nome + '</a>';
			blocoMais = true;
		}
		if (OBJ.integracoes) {
			var i = "";
			for (i = 0; i < OBJ.integracoes.length; i++) {
				var integracao = OBJ.integracoes[i];
				if (integracao.tipo == 'trustvox_list') {
					trustvox = true;
					STARS = integracao.conteudo;
				}
			}
		}
		
		if (typeof showSobConsultaList !== 'undefined') {
		    if (showSobConsultaList == true) {
		        if (OBJ.modo == "3") {
		            COMPRAR = '<span class="prod-no-qty prod-sob-consulta"><a href="' + OBJ.links.ver_produto + '">Sob consulta</a></span>';
		            blocoBotaoComprar = true;
		        }
		    }
		}

		ADD += '</div>';
        var find = ["<!--##ITEM_REG##-->", "<!--##CLASS##-->", "<!--##FOTO##-->", "<!--##DESTAQUE##-->", "<!--##ADD##-->", "<!--##NOME##-->", "<!--##PRECO##-->", "<!--##VEZES##-->", "<!--##UMA##-->", "<!--##COMPRAR##-->", "<!--##FAB##-->", "<!--##STARS##-->", "<!--##MAIS##-->", "<!--##LINK##-->", "<!--##FRETE##-->", "<!--##DISPONIBILIDADE##-->"];
        var replace = [OBJ.id, CLASS, FOTO, DESTAQUE, ADD, NOME, PRECO, VEZES, UMA, COMPRAR, FAB, STARS, MAIS, LINK, FRETE, DISPONIBILIDADE];
		TEMPLATE = replaceStr(TEMPLATE, find, replace);

	    //console.log(COMPRAR);
        
		if (typeof call_after_bloco_produto !== 'undefined') {
		    try
		    {
		        blocoProdsIdAtual = OBJ.id;
		        blocoProdsTemplateAtual = TEMPLATE;
		        var retorno = eval(call_after_bloco_produto);
		        if (retorno) {
		            TEMPLATE = retorno;
		        }

		    } catch (e) { console.log("Falha call_after_bloco_produto" + e.message); }
		}

		return TEMPLATE;

	} catch (e) { console.log(e.message); }
}

function blocoHeight(elemento) {
	if(blocoBotaoComprar){
		$(elemento).addClass('blc-comprar')
    }
    if (blocofretegratis) {
        $(elemento).addClass('blc-fretegratis')
    }
	if(blocoFabricante && typeof semFabricante == 'undefined'){
		$(elemento).addClass('blc-fabricante')
	}
	if(blocoMais){
		$(elemento).addClass('blc-mais')
	}
	if(blocoPreco){
		$(elemento).addClass('blc-preco')
	}
	if(blocoVariaPreco && typeof semVariacao == 'undefined'){
		$(elemento).addClass('blc-varia')
	}
	if(trustvox){
		$(elemento).addClass('blc-avalia')
	}
}

var MaxHPrecos = 0; 
function blocoHeightAjusta(){

    $("[data-preco-prod]").each(
        function () {
            var H = $(this).height();
            if (H > MaxHPrecos) { MaxHPrecos = H; };
            //console.log("H:" + H);
            //console.log("MaxHPrecos:" + MaxHPrecos);
        }
    );

    $("[data-preco-prod]").each(
        function () {
            if (MaxHPrecos > 0) {
                $(this).css("min-height", MaxHPrecos)
            }
        }
    );

    MaxHPrecos = 0;
    $("[data-preco-varia]").each(
        function () {
            var H = $(this).height();
            if (H > MaxHPrecos) { MaxHPrecos = H; };
            //console.log("H:" + H);
            //console.log("MaxHPrecos:" + MaxHPrecos);
        }
    );

    $("[data-preco-varia]").each(
        function () {
            if (MaxHPrecos > 0) {
                $(this).css("min-height", MaxHPrecos)
            }
        }
    );

}