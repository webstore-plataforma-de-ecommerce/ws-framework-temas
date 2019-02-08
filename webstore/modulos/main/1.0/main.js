$(document).ready(function(){

	//CHAMADAS DA API
	try {
		ApiWS.ApiStart();
		InfosLojas();
	} catch (e) { console.log(e.message); }

	// INICIALIZA CAMPOS DE BUSCA
	try{
		BuscaInicializa('input-busca');
		BuscaInicializa('input-busca-2');
		BuscaInicializa('input-busca-3');
		$("#botao-busca").on('click', function () {
			FuncaoBuscaBotao('input-busca');
		});
		$("#botao-busca-2").on('click', function () {
			FuncaoBuscaBotao('input-busca-2');
		});
		$("#botao-busca-3").on('click', function () {
			FuncaoBuscaBotao('input-busca-3');
		});
	} catch (e) { console.log(e.message); }


	try{
		$('#burguer-menu').on('click',function(){
			$('#float-menu').toggleClass('active');
		});

		$(window).scroll(function () {
			handleScroll();
		});

	} catch (e) { console.log(e.message); }

});

var cfg = [],
	cliente,
	lateralDir = false,
	lateralEsq = false,
	modoLoja = "",
	objetos = {},
	objInstitucional = "",
	PAG = [],
	prodsLinha = "",
	valores = [];

function InfosLojas() {
	console.log('InfosLojas');
	ApiWS.InfosLojas("InfosLojasRetorno");
}
function InfosLojasRetorno() {
    var OBJETO = ApiWS.Json;
    var obj = jQuery.parseJSON(OBJETO);
    objetos.InfosLojas = OBJETO;

    var social = obj.redes_sociais,
        links = obj.links,
        contato = obj.dadoscontato,
        estrutura = obj.estrutura,
        institucional = obj.menuinstitucional,
        li = '';

    cliente = obj.cliente;
    objInstitucional = obj.menuinstitucional;
    modoLoja = estrutura.modo;

    cfg['estrutura'] = estrutura;
    cfg['produtos_pagina'] = estrutura.produtos_pagina;
    cfg['produtos_linha'] = estrutura.produtos_linha;
    cfg['menu_lateral_home'] = estrutura.menu_lateral_home;
    cfg['troca_fotos'] = estrutura.troca_fotos;
    cfg['menu_lateral'] = estrutura.menu_lateral;
    cfg['ultimos_vistos'] = estrutura.ultimos_vistos;
    cfg['tipo_zoom'] = estrutura.tipo_zoom;
    cfg['preco_apos_login'] = estrutura.preco_apos_login;

    var Etapa = $("#HdEtapaLoja").val();

    $('.input-busca').attr('placeholder', estrutura.placeholder_busca);

    if (modoLoja == 4 || modoLoja == 5) {
        $('.carrinho-texto').html("Meu or&ccedil;amento");
        $('.cart-total').css('visibility', 'hidden');
    } else {
        $('.carrinho-texto').html(estrutura.carrinho_compras_texto);
    }

    if (modoLoja == 2 || modoLoja == 3) {
        estrutura.carrinho_compras = false;
        $('.input-qtd').hide();
        $('#calcula-frete').hide();
    }

    if (
        estrutura.carrinho_compras == false
    ) {
        $('header .div-carrinho').addClass('hidden');
        $('header fieldset').addClass('sem-carrinho');
        $('#barra-flutuante fieldset').addClass('sem-carrinho');
        $('#barra-flutuante .div-carrinho').addClass('hidden');
    }


    if (cfg['preco_apos_login'] == true || modoLoja == 3 || modoLoja == 5) {
        semVariacao = true;
    }

    if (cfg['produtos_linha'] != 0) {
        prodsLinha = cfg['produtos_linha'];
    }

    if (estrutura.bandeiras_pagamento != null && estrutura.bandeiras_pagamento != undefined && estrutura.bandeiras_pagamento.length > 0) {
        var str = estrutura.bandeiras_pagamento;
        var res = str.split("|");
        for (i = 0; i < res.length; i++) {
            if (res[i] != "") {
                li += '<li class="bandeira' + res[i] + '"></li>';
            }
        }
        $('#footer-pagamento').append(li);
        li = '';
    }

    if (links) {
        if (links.cadastro != null && links.cadastro != undefined) {
            $('#link-cadastro').attr('href', links.cadastro);
        }
        if (links.login != null && links.login != undefined) {
            $('#link-login, #link-login-2, #link-entrar, .link-login').attr('href', links.login);
        }
        if (links.carrinho != null && links.carrinho != undefined) {
            $('#link-carrinho, .link-carrinho').attr('href', links.carrinho);
        }
        if (links.meus_pedidos != null && links.meus_pedidos != undefined) {
            $('#link-meus-pedidos').attr('href', links.meus_pedidos);
            $('#link-pedidos').attr('href', links.meus_pedidos);
            $('.link-meus-pedidos').attr('href', links.meus_pedidos);
            $('.link-pedidos').attr('href', links.meus_pedidos);
        }
        if (links.pagina_inicial != null && links.pagina_inicial != undefined) {
            $('#link-pagina-inicial, .link-pagina-inicial').attr('href', links.pagina_inicial);
        }
        if (links.faleconosco != null && links.faleconosco != undefined) {
            $('.fale-conosco').append('<a href="' + links.faleconosco + '" id="link-faleconosco"><i class="fa fa-fw fa-address-book-o"></i>Fale Conosco</a>');
        }
    }

    if (institucional != null && institucional != undefined && institucional.length > 0) {
        for (i = 0; i < institucional.length; i++) {
            PAG[institucional[i].id] = [institucional[i]];
            if (institucional[i].tipo == "EXT") {
                li += '<li><a href="' + institucional[i].url + '" target="_blank" rel="noopener" title="' + institucional[i].titulo + '">' + institucional[i].titulo + '</a></li>';
            } else {
                li += '<li><a href="' + institucional[i].url + '" title="' + institucional[i].titulo + '">' + institucional[i].titulo + '</a></li>';
            }
        }

        if (Etapa == "PAGINAS_INST") {
            var ul = '<ul id="institucional-lateral"><h3>Institucional</h3>';
            ul += li;
            ul += '</ul>';

            $('#div-barra-esquerda').prepend(ul);

            ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 3);
            ColunasResponsivo('#div-conteudo', 12, 12, 9);
        }

        $('#institucional-footer').append(li);
        li = '';
    }

    // window.setTimeout("CategoriasLista()", 1);

    if (social != null && social != undefined) {
        if (social.facebook != null && social.facebook != undefined) {
            li += '<li><a href="https://www.facebook.com/' + social.facebook + '" target="_blank" rel="noopener">';
            li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span>';
            li += '</a></li>';
        }
        if (social.twitter != null && social.twitter != undefined) {
            li += '<li><a href="https://www.twitter.com/' + social.twitter + '" target="_blank" rel="noopener">';
            li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span>';
            li += '</a></li>';
        }
        if (social.linkedin != null && social.linkedin != undefined) {
            li += '<li><a href="https://www.linkedin.com/' + social.linkedin + '" target="_blank" rel="noopener">';
            li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span>';
            li += '</a></li>';
        }
        if (social.instagram != null && social.instagram != undefined) {
            li += '<li><a href="https://www.instagram.com/' + social.instagram + '" target="_blank" rel="noopener">';
            li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-instagram fa-stack-1x fa-inverse"></i></span>';
            li += '</a></li>';
        }
        if (social.youtube != null && social.youtube != undefined) {
            li += '<li><a href="https://www.youtube.com/' + social.youtube + '" target="_blank" rel="noopener">';
            li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-youtube fa-stack-1x fa-inverse"></i></span>';
            li += '</a></li>';
        }
        if (social.pinterest != null && social.pinterest != undefined) {
            li += '<li><a href="https://www.pinterest.com/' + social.pinterest + '" target="_blank" rel="noopener">';
            li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-pinterest fa-stack-1x fa-inverse"></i></span>';
            li += '</a></li>';
        }
        if (social.google != null && social.google != undefined) {
            li += '<li><a href="https://plus.google.com/' + social.google + '" target="_blank" rel="noopener">';
            li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span>';
            li += '</a></li>';
        }
        $('#social-footer').append(li);
        $('.append-social').append(li);
        $('[data-wbstr-social]').after(li).remove();
        li = '';
    }

    if (contato != null && contato != undefined) {

        if (contato.horario != null && contato.horario != undefined && contato.horario.length > 0) {
            li += '<li><i class="fa fa-fw fa-clock-o"></i>' + contato.horario + '</li>';
        }
        if (contato.fone_1 != null && contato.fone_1 != undefined && contato.fone_1.length > 0) {
            var fone1 = clearNum(contato.fone_1);
            $('.telefone-topo').append('<a href="tel:+55' + fone1 + '"><i class="fa fa-phone"></i>' + contato.fone_1 + '</a>');
            li += '<li><a href="tel:+55' + fone1 + '"><i class="fa fa-fw fa-phone"></i>' + contato.fone_1 + '</a></li>';
        }
        if (contato.fone_2 != null && contato.fone_2 != undefined && contato.fone_2.length > 0) {
            var fone2 = clearNum(contato.fone_2);
            li += '<li><a href="tel:+55' + fone2 + '"><i class="fa fa-fw fa-phone"></i>' + contato.fone_2 + '</a></li>';
        }
        if (contato.fone_3 != null && contato.fone_3 != undefined && contato.fone_3.length > 0) {
            var fone3 = clearNum(contato.fone_3);
            $('.telefone-topo').html('<a href="http://api.whatsapp.com/send?1=pt_BR&phone=55' + fone3 + '" target="_blank" rel="noopener"><i class="fa fa-whatsapp"></i>' + contato.fone_3 + '</a>');
            li += '<li><a href="http://api.whatsapp.com/send?1=pt_BR&phone=55' + fone3 + '" target="_blank" rel="noopener"><i class="fa fa-fw fa-whatsapp"></i>' + contato.fone_3 + '</a></li>';
        }
        if (contato.email_1 != null && contato.email_1 != undefined && contato.email_1.length > 0) {
            li += '<li><a href="mailto:' + contato.email_1 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_1 + '</a></li>';
        }
        if (contato.email_2 != null && contato.email_2 != undefined && contato.email_2.length > 0) {
            li += '<li><a href="mailto:' + contato.email_2 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_2 + '</a></li>';
        }
        if (contato.email_3 != null && contato.email_3 != undefined && contato.email_3.length > 0) {
            li += '<li><a href="mailto:' + contato.email_3 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_3 + '</a></li>';
        }
        contato.endereco = null;
        if (contato.endereco != null && contato.endereco != undefined && contato.endereco.length > 0) {
            li += '<li><p><i class="fa fa-fw fa-map-marker"></i>' + contato.endereco;
            if (contato.numero != null && contato.numero != undefined && contato.numero.length > 0) {
                li += ', ' + contato.numero;
            }
            if (contato.complemento != null && contato.complemento != undefined && contato.complemento.length > 0) {
                li += ', ' + contato.complemento;
            }
            if (contato.bairro != null && contato.bairro != undefined && contato.bairro.length > 0) {
                li += ', ' + contato.bairro;
            }
            if (contato.cidade != null && contato.cidade != undefined && contato.cidade.length > 0) {
                li += ' - ' + contato.cidade;
            }
            if (contato.uf != null && contato.uf != undefined && contato.uf.length > 0) {
                li += ' - ' + contato.uf;
            }
            if (contato.cep != null && contato.cep != undefined && contato.cep.length > 0) {
                li += '<br />CEP: ' + contato.cep;
            }
            li += '</p></li>';
        }
        if (links.faleconosco != null && links.faleconosco != undefined) {
            li += '<li><a href="' + links.faleconosco + '" id="link-faleconosco"><i class="fa fa-fw fa-address-book-o"></i>Fale Conosco</a></li>';
        }

        $('#contato-footer').append(li);

        if (contato.razao != null && contato.razao != undefined && contato.razao.length > 0 && contato.cnpj != null && contato.cnpj != undefined && contato.cnpj.length > 0) {
            $('#cnpj-footer').html('<span>' + contato.razao + ' - ' + contato.cnpj + '</span>');
        }
    }
}

function ListItemResize() {

    if (typeof semVariacao !== 'undefined') {
        $('.variacao-preco').addClass('hidden');
    }

    if (typeof semFabricante !== 'undefined') {
        $('.prod-fabricante').addClass('hidden');
    }

    if (typeof qtdLinhas !== 'undefined') {
        $('.div-item .prod-info .prod-nome').css('height', (Number(qtdLinhas) * 2) + 'rem');
        nomeProd();
    }

    if (trustvox) {
        $('.prod-avaliacao').css('display', 'block');
    }

    var keepNomeHeight = $('.prod-nome').css('height');
    $('.prod-nome').css('height', 'auto');
    $('.prod-info').css('minHeight', 'unset');
    $('.variacao-preco').hide();

    console.log("VARIAÇÃO HIDE");

    var blocoHeight = "",
		blocoMaxHeight = "",
		nomeHeight = "",
		nomeMaxHeight = "",
		precoParc = "",
		precoParcLength = 0,
		precoUma = "",
		precoUmaLength = 0;

    $('.div-grupo .list-item, #prod-list .list-item').each(function () {

        nomeHeight = $(this).find('.prod-nome').height();

        if (nomeMaxHeight < nomeHeight) {
            nomeMaxHeight = nomeHeight;
        }

        precoUma = $(this).find('.prod-preco-uma a');
        if (precoUma) {
            precoUmaLength += precoUma.length;
        }

        precoParc = $(this).find('.prod-preco-parc a');
        if (precoParc) {
            precoParcLength += precoParc.length;
        }

        blocoHeight = $(this).find('.prod-info').height();
        console.log('blocoHeight:');
        console.log(blocoHeight);
        console.log('blocoMaxHeight:');
        console.log(blocoMaxHeight);
        if (blocoMaxHeight < blocoHeight) {
            blocoMaxHeight = blocoHeight;
        }

    });

    $('.prod-nome').css({
        height: nomeMaxHeight,
        maxHeight: keepNomeHeight
    });

    $('.prod-info').css('minHeight', blocoMaxHeight);

    if (precoParcLength > 2 || precoUmaLength > 2) {
        $('.variacao-preco').show();
    }

}

function ColunasResponsivo(ELEMENTO, XS, SM, MD, LG) {
    // inserir o elemento a ser adicionado as classes, e a quantidade de colunas

    var CLASS = '';

    if (XS != null && XS != undefined) {
        if (XS == 'hidden') {
            CLASS += 'hidden-xs ';
        } else if (XS >= 1 && XS <= 12) {
            CLASS += 'col-xs-' + XS + ' ';
        }
    }
    if (SM != null && SM != undefined) {
        if (SM == 'hidden') {
            CLASS += 'hidden-sm ';
        } else if (SM >= 1 && SM <= 12) {
            CLASS += 'col-sm-' + SM + ' ';
        }
    }
    if (MD != null && MD != undefined) {
        if (MD == 'hidden') {
            CLASS += 'hidden-md ';
        } else if (MD >= 1 && MD <= 12) {
            CLASS += 'col-md-' + MD + ' ';
        }
    }
    if (LG != null && LG != undefined) {
        if (LG == 'hidden') {
            CLASS += 'hidden-lg ';
        } else if (LG >= 1 && LG <= 12) {
            CLASS += 'col-lg-' + LG + ' ';
        }
    }

    var remove = "hidden col-xs-12 col-xs-11 col-xs-10 col-xs-9 col-xs-8 col-xs-7 col-xs-6 col-xs-5 col-xs-4 col-xs-3 col-xs-2 col-xs-1 ";
    remove += "col-sm-12 col-sm-11 col-sm-10 col-sm-9 col-sm-8 col-sm-7 col-sm-6 col-sm-5 col-sm-4 col-sm-3 col-sm-2 col-sm-1 ";
    remove += "col-md-12 col-md-11 col-md-10 col-md-9 col-md-8 col-md-7 col-md-6 col-md-5 col-md-4 col-md-3 col-md-2 col-md-1 ";
    remove += "col-lg-12 col-lg-11 col-lg-10 col-lg-9 col-lg-8 col-lg-7 col-lg-6 col-lg-5 col-lg-4 col-lg-3 col-lg-2 col-lg-1 ";
    $(ELEMENTO).removeClass(remove);
    $(ELEMENTO).addClass(CLASS);
}

function FrameworkResponsivo() {
    var etapa = $("#HdEtapaLoja").val();
    esq = lateralEsq;
    dir = lateralDir;

    if (etapa == "HOME") {

        if (esq == true && dir == true) {
            ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 2);
            ColunasResponsivo('#div-conteudo', 12, 12, 8, 8);
            ColunasResponsivo('#div-barra-direita', 'hidden', 'hidden', 2);
        } else if (esq == true) {
            ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 3);
            ColunasResponsivo('#div-conteudo', 12, 12, 9);
        } else if (dir == true) {
            ColunasResponsivo('#div-barra-direita', 'hidden', 'hidden', 3);
            ColunasResponsivo('#div-conteudo', 12, 12, 9);
        }
    }

    if (etapa == "LISTAGEM") {

        if (esq == true && dir == true) {
            ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 3);
            ColunasResponsivo('#div-conteudo', 12, 12, 9);
        } else if (esq == true) {
            ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 3);
            ColunasResponsivo('#div-conteudo', 12, 12, 9);
        } else if (dir == true) {
            ColunasResponsivo('#div-conteudo', 12);
        }
    }

    ConteudoResponsivo();
}

function ConteudoResponsivo() {

    if (prodsLinha == 0) {
        if (lateralEsq == true || lateralDir == true) {
            prodsLinha = 3;
        }
    }

    if (prodsLinha != null && prodsLinha != undefined) {
        if (prodsLinha == 4) {
            ColunasResponsivo('.list-item', 6, 6, 4, 3);
        } else if (prodsLinha == 3) {
            ColunasResponsivo('.list-item', 6, 6, 4);
        } else if (prodsLinha == 2) {
            ColunasResponsivo('.list-item', 12, 12, 6);
        } else if (prodsLinha == 0) {
            ColunasResponsivo('.list-item', 6, 6, 4, 3);
        }
    }
}

function replaceStr(str, find, replace) {
	for (var i = 0; i < find.length; i++) {
		str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
	}
	return str;
}

function handleScroll() {
    var T = getScrollTop();

    if (T >= 100) {
    	$('#barra-flutuante').addClass('active');
    	$('#header-mobile').addClass('header-fixed');
    } else {
    	$('#barra-flutuante').removeClass('active');
    	$('#header-mobile').removeClass('header-fixed');
    }
}

function getScrollTop() {
    if (typeof pageYOffset != 'undefined') {
        return pageYOffset;
    } else {
        var B = document.body;
        var D = document.documentElement;
        D = (D.clientHeight) ? D : B;
        return D.scrollTop;
    }
}

function AjustaMoney(VALOR) {
	return VALOR.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").replace(",", "|").replace(".", ",").replace("|", ".");
}

function clearNum(NUM){
	return (NUM.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ''));
}

function AjustaTopoMobile(){
	var headerHeight = $('#header-mobile').outerHeight(true);
	$('#mobile-placeholder').css('height', headerHeight);
}

ConteudoResponsivo();

if ($("#HdEtapaLoja").val() != "PRODUTO") {
	ListItemResize();
	nomeProd();
}

function nomeProd() {
    if (typeof qtdLinhas !== 'undefined') {

        if (typeof $clamp === "function") {
            $('.prod-nome a').each(function (index, el) {
                $clamp(el, { clamp: Number(qtdLinhas), useNativeClamp: true });
            });
        }

    } else {

        if (typeof $clamp === "function") {
            $('.prod-nome a').each(function (index, el) {
                $clamp(el, { clamp: '3', useNativeClamp: true });
            });
        }
    }
}

function isReady(check, callback, counter) {
    if (!counter) { counter = 0 };
    var teste = eval('typeof ' + check);
    if (teste !== 'undefined' && teste != null) {
        eval(callback);
        return true;
    } else {
        counter++;
        console.log('counter: ' + counter);
        if (counter < 100) {
            window.setTimeout(function () {
                isReady(check, callback, counter);
            }, 100);
        } else {
            return false;
        }
    }
}

function ValorJurosComposto(Juros, NumParcela, ParcelaJurosInicia, Valor) {

    var ValorParcela = 0;

    try {
        if (Juros > 0 && NumParcela >= ParcelaJurosInicia && NumParcela > 1) {
            ValorParcela = (Valor * (Juros / 100)) / (1 - (1 / (Math.pow((1 + (Juros / 100)), ((NumParcela))))));
        }
        else {
            ValorParcela = (Valor / NumParcela);
        }
    } catch (e) { }

    return ValorParcela;

}