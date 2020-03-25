var bannerEmpty = false;
var produtoEmpty = false;
var destaqueEmpty = false;

var fotoVertical = null;

function empty(TIPO){	

	if (TIPO == 'banner') {
		bannerEmpty = true;
	}

	if (TIPO == 'produto') {
		produtoEmpty = true;
	}

	if (TIPO == 'destaque') {
		destaqueEmpty = true;
	}

	if (bannerEmpty == true && produtoEmpty == true && destaqueEmpty == true){
		console.log('empty');
		$('#div-conteudo').css('minHeight', '40rem');
		lojaVazia();
    }

}

var JsonProdsVazio = '{"totalitens":6,"produtos":[{"id":1742395,"codigo":"PLA2506552","nome":"Moletom","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":115.00,"preco_promocao":99.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#moletom"},"maisprodutos":null,"fotos":["https://imageswscdn.webstore.net.br/files/20270/PEQ_393721.jpg"],"integracoes":[]},{"id":1742394,"codigo":"PLA5008634","nome":"Cinto","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":50.00,"preco_promocao":42.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#cinto"},"maisprodutos":null,"fotos":["https://imageswscdn.webstore.net.br/files/20270/PEQ_272687.jpg"],"integracoes":[]},{"id":1742392,"codigo":"PLA6597883","nome":"Boné","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":25.00,"preco_promocao":12.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#bone"},"maisprodutos":null,"fotos":["https://imageswscdn.webstore.net.br/files/20270/PEQ_766268.jpg"],"integracoes":[]},{"id":1742393,"codigo":"PLA6365585","nome":"Camiseta","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":99.00,"preco_promocao":65.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#camiseta"},"maisprodutos":null,"fotos":["https://imageswscdn.webstore.net.br/files/20270/PEQ_137428.jpg"],"integracoes":[]},{"id":1742396,"codigo":"PLA6930909","nome":"Óculos de Sol","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":199.00,"preco_promocao":85.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#oculos-de-sol"},"maisprodutos":null,"fotos":["https://imageswscdn.webstore.net.br/files/20270/PEQ_905085.jpg"],"integracoes":[]},{"id":1742397,"codigo":"PLA1722033","nome":"Touca","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":45.00,"preco_promocao":40.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#touca"},"maisprodutos":null,"fotos":["https://imageswscdn.webstore.net.br/files/20270/PEQ_340803.jpg"],"integracoes":[]}],"infoadd":" / TEMPO SEARCH:0","paginacao":null,"tipo_exibicao":null,"ordem_atual":"","scripts":"","titulo_pagina":null,"migalha":null,"wssource":"ws-db-1"}';
var JsonBannersVazio = '{"banners":[{"id":17729,"titulo":"Topo 1","tipo":"topo","conteudo":"","imagem":"https://imageswscdn.webstore.net.br/files/20270/BANNER-MOLETOM.png","target":"_self","url":"","largura":0,"altura":0},{"id":17730,"titulo":"Topo 2","tipo":"topo","conteudo":"","imagem":"https://imageswscdn.webstore.net.br/files/20270/BANNER-ACESSORIOS.png","target":"_self","url":"","largura":0,"altura":0},{"id":17731,"titulo":"Topo 3","tipo":"topo","conteudo":"","imagem":"https://imageswscdn.webstore.net.br/files/20270/BANNER-TSHIRTS.png","target":"_self","url":"","largura":0,"altura":0},{"id":17732,"titulo":"Mini 1","tipo":"mini","conteudo":"","imagem":"https://imageswscdn.webstore.net.br/files/20270/mini-banner-acessorios.png","target":"_self","url":"","largura":0,"altura":0},{"id":17733,"titulo":"Mini 2","tipo":"mini","conteudo":"","imagem":"https://imageswscdn.webstore.net.br/files/20270/mini-banner-camisetas.png","target":"_self","url":"","largura":0,"altura":0},{"id":17734,"titulo":"Mini 3","tipo":"mini","conteudo":"","imagem":"https://imageswscdn.webstore.net.br/files/20270/mini-banner-moletom-ok.png","target":"_self","url":"","largura":0,"altura":0}],"wssource":"ws-db-1"}';

function lojaVazia() {

    try {

        fotoVertical = true;

        BannersRetorno(JsonBannersVazio);

        //cfg['produtos_pagina'] = 0;
        cfg['produtos_linha'] = 3;
        prodsLinha = 3;
        ProdutosHomeRetorno(JsonProdsVazio);

        menuFake();

        InstitucionalFake();

        AtendimentoFake();

        CategoriasRodapeFake();

    } catch (e)
    {
        console.log("Fail Loja Vazia " + e.message);
    }

}

function lojaVaziaBK(){

	var institucional = "";

	var JSON = '{"produtos":[{"codigo":"COD0000","nome":"Nome do produto","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"datalimite":"/Date(1519786800000)/","fabricante":{"nome":"Fabricante","url":"#","logotipo":null},"precos":{"preco":0,"preco_promocao":0,"desconto_avista":0,"max_parcelas":0,"valor_min_parcelas":0,"juros_inicia":0,"juros":0},"links":{"botao_comprar":"#","ver_produto":"#"},"maisprodutos":{"nome":"Categoria","link":"#"},"fotos":["/imagens_cliente/678/PEQ_PROD_678682120171218090806.jpg"],"integracoes":[]}]}';

	var template = $('#template').html();
	var obj = jQuery.parseJSON(JSON);

	var qtdGrupos = 0;
	for (a = 0; a < 3; a++) {
		var content = "";
		var codigo = 1234 + qtdGrupos;
		qtdGrupos++;
		content += '<div class="div-grupo grupo-'+qtdGrupos+' col-xs-12 no-gutter" id="cod-grupo-' + codigo + '"><div class="titulo-grupo">';
		content += '<h3>Grupo exemplo</h3><span class="arrow">';
		content += '<i class="fa fa-angle-left left-arrow"></i>';
		content += '<i class="fa fa-angle-right right-arrow"></i>';
		content += '</span></div>';

		content += '<ul class="lista-grupo" id="lista-grupo-' + codigo + '">';

		for (a = 0; a < 8; a++) {
			obj.produtos[0].fotos[0] = 'https://cdn.webstore.net.br/wsfiles/estrutura/img/prod_placeholder/prod_placeholder_'+a+'.png';
			content += BlocoProdutoFake(obj.produtos[0], template);
		}

		content += '</ul></div>';
		$('#div-conteudo').append(content);
		$("#grupo-loader").fadeOut('fast');
		$('#lista-grupo-1234').slick({
			infinite: true,
			slidesToShow: 4,
			autoplay: false,
			prevArrow: $('#cod-grupo-1234 .left-arrow'),
			nextArrow: $('#cod-grupo-1234 .right-arrow'),
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
			}],
		});

	}

	var banner = '<li><img src="https://cdn.webstore.net.br/wsfiles/img/1200x400.png" class="img-responsive"></li>';
	$('#banner-topo').html(banner).removeClass('hidden');

	var miniBanner = '<li class="col-xs-6 col-sm-3"><img src="https://cdn.webstore.net.br/wsfiles/img/300x150.png" class="img-responsive"></li>';
	var miniBanner = miniBanner.repeat(4);
	$('#banner-mini').html(miniBanner).removeClass('hidden');

	console.log(institucional.length);
	if(objInstitucional.length < 1){

		var li = '';

		var JSON = '{"institucional":[{"id":293,"titulo":"Sobre n&oacute;s","tipo":"EXT","url":"#"},{"id":294,"titulo":"Pol&iacute;tica de entrega","tipo":"EXT","url":"#"},{"id":295,"titulo":"Pol&iacute;tica de trocas e devolu&ccedil;&atilde;o","tipo":"EXT","url":"#"},{"id":297,"titulo":"Formas de pagamento","tipo":"INT","url":"#"},{"id":298,"titulo":"Compre no atacado","tipo":"INT","url":"#"}]}';
		var obj = jQuery.parseJSON(JSON);
		obj = obj.institucional;
		console.log(obj.length);

		for (i = 0; i < obj.length; i++){
			PAG[obj[i].id] = [obj[i]];
			li += '<li><a href="'+obj[i].url+'" rel="'+obj[i].titulo+'">'+obj[i].titulo+'</a></li>';
		}

		$('#institucional-footer').append(li);
		li = '';

	}

	menuFake();

}

function menuFake(){
	if(categoria.length == 0){

		var JSON = '{"Categorias":[{"id":38118,"atual":false,"nome":"Exemplo 1","url":"#","subcategorias":[{"id":38122,"atual":false,"nome":"Exemplo 1-1","url":"#","subcategorias":[{"id":38128,"atual":false,"nome":"Exemplo 1-1-1","url":"#","subcategorias":[]}]},{"id":38119,"atual":false,"nome":"Exemplo 1-2","url":"#","subcategorias":[]},{"id":38120,"atual":false,"nome":"Exemplo 1-3","url":"#","subcategorias":[]},{"id":38121,"atual":false,"nome":"Exemplo 1-4","url":"#","subcategorias":[]},{"id":38124,"atual":false,"nome":"Exemplo 1-5","url":"#","subcategorias":[]},{"id":38123,"atual":false,"nome":"Exemplo 1-6","url":"#","subcategorias":[]},{"id":38125,"atual":false,"nome":"Exemplo 1-7","url":"#","subcategorias":[]}]},{"id":38093,"atual":false,"nome":"Exemplo 2","url":"#","subcategorias":[]},{"id":38088,"atual":false,"nome":"Exemplo 3","url":"#","subcategorias":[{"id":38089,"atual":false,"nome":"Exemplo 3-1","url":"#","subcategorias":[]},{"id":38091,"atual":false,"nome":"Exemplo 3-2","url":"#","subcategorias":[]},{"id":38092,"atual":false,"nome":"Exemplo 3-3","url":"#","subcategorias":[]},{"id":38090,"atual":false,"nome":"Exemplo 3-4","url":"#","subcategorias":[]}]},{"id":38111,"atual":false,"nome":"Exemplo 4","url":"#","subcategorias":[]},{"id":38126,"atual":false,"nome":"Exemplo 5","url":"#","subcategorias":[]}]}';
		var obj = jQuery.parseJSON(JSON);
		
		var LOG = [];
		var menu = "";
		var filtro = "";
		var categorias = Departamentos(obj.Categorias, 0, LOG);

		$('.departamentos-nav').append(categorias);
		ajustaSubMenu();
		ajustaNav();
	}
}

function BlocoProdutoFake(OBJ, TEMPLATE){
	var ADD = '<div class="add">',
		FOTO = '',
		PROMOCAO = '',
		PARCELA = '',
		DESCONTO = '',
		MIN_PARCELA = '',
		PORCENTAGEM = '',
		COMPRAR = '',
		PRECO = '',
		VEZES = '',
		UMA = '',
		FAB = '',
		CLASS = 'prod-fake ',
		MAIS = '',
		LINK = OBJ.links.ver_produto;

	FOTO += '<a href="'+LINK+'" title="'+OBJ.nome+'">';
	if (OBJ.fotos != null && OBJ.fotos != undefined){
		FOTO += '<img src="'+OBJ.fotos[0]+'" alt="'+OBJ.nome+'" class="img-responsive">';
	}
	FOTO += '</a>';

	if (OBJ.lancamento == true) {
		ADD += '<span class="prod-lancamento">Lan&ccedil;amento</span>';
	}

	var DESTAQUE = '<span class="prod-detalhes"><a href="'+LINK+'" title="'+OBJ.nome+'">Demonstra&ccedil;&atilde;o</a></span>';
	var NOME = '<p class="prod-nome"><a href="'+LINK+'" title="'+OBJ.nome+'">'+OBJ.nome+'</a></p>';

	var PRECO = Number(OBJ.precos.preco);
	var PROMOCAO = Number(OBJ.precos.preco_promocao);
	var VEZES = Number(OBJ.precos.max_parcelas);
	var DESCONTO = PRECO / 100 * Number(OBJ.precos.desconto_avista);
	var MIN_PARCELA = Number(OBJ.precos.valor_min_parcelas);
	var INICIA = Number(OBJ.precos.juros_inicia);
	var JUROS = Number(OBJ.precos.juros);

	UMA = '<p class="prod-preco-uma"><a href="'+LINK+'" title="'+OBJ.nome+'">R$ $$$ &agrave; vista</a></p>';
	VEZES = '<p class="prod-preco-parc"><a href="'+LINK+'" title="'+OBJ.nome+'">10x de R$ $$$</a></p>';				
	PRECO = '<p class="prod-preco"><a href="'+LINK+'" title="'+OBJ.nome+'">R$ $$$$</a></p>';

	if(OBJ.links.botao_comprar != null && OBJ.links.botao_comprar != undefined){
		COMPRAR = '<div class="prod-botao-comprar">';
		COMPRAR += '<span><a href="'+OBJ.links.botao_comprar+'"><i class="fa fa-shopping-cart"></i> Comprar</a></span>';
		COMPRAR += '</div>';
	}

	if (OBJ.fabricante != null && OBJ.fabricante != undefined) {
		FAB = ' <a href="'+OBJ.fabricante.url+'" title="'+OBJ.fabricante.nome+'">'+OBJ.fabricante.nome+'</a>';
	}

	if (OBJ.maisprodutos != null && OBJ.maisprodutos != undefined) {
		MAIS = ' <a href="'+OBJ.maisprodutos.link+'" title="'+OBJ.maisprodutos.nome+'">'+OBJ.maisprodutos.nome+'</a>';
	}

	ADD += '</div>';

	var find = ["<!--##CLASS##-->","<!--##FOTO##-->","<!--##DESTAQUE##-->","<!--##ADD##-->","<!--##NOME##-->","<!--##PRECO##-->","<!--##VEZES##-->","<!--##UMA##-->","<!--##COMPRAR##-->","<!--##FAB##-->","<!--##MAIS##-->","<!--##LINK##-->"];
	var replace = [CLASS,FOTO,DESTAQUE,ADD,NOME,PRECO,VEZES,UMA,COMPRAR,FAB,MAIS,LINK];

	TEMPLATE = replaceStr(TEMPLATE, find, replace);                            
	return TEMPLATE;
}

function InstitucionalFake() {

    console.log("institucional:" + objInstitucional.length);

    if (objInstitucional.length < 1) {

        var li = '';

        var JSON = '{"institucional":[{"id":293,"titulo":"Sobre n&oacute;s","tipo":"EXT","url":"#"},{"id":294,"titulo":"Pol&iacute;tica de entrega","tipo":"EXT","url":"#"},{"id":295,"titulo":"Pol&iacute;tica de trocas e devolu&ccedil;&atilde;o","tipo":"EXT","url":"#"},{"id":297,"titulo":"Formas de pagamento","tipo":"INT","url":"#"},{"id":298,"titulo":"Compre no atacado","tipo":"INT","url":"#"}]}';
        var obj = jQuery.parseJSON(JSON);
        obj = obj.institucional;
        console.log(obj.length);

        for (i = 0; i < obj.length; i++) {
            PAG[obj[i].id] = [obj[i]];
            li += '<li><a href="' + obj[i].url + '" rel="' + obj[i].titulo + '">' + obj[i].titulo + '</a></li>';
        }

        $('#institucional-footer').append(li);
        li = '';

    }

}

function AtendimentoFake() {

    if ($('#contato-footer li').length <= 1) {

        $('#contato-footer').prepend('' +
            '<li><i class="fa fa-fw fa-clock-o" aria-hidden="true"></i>seg a sex das 0h às 0h</li> ' +
            '<li class="footer-fones"><a href="tel:+551100000000"><i class="fa fa-fw fa-phone" aria-hidden="true"></i>00 0000-0000</a></li> ' +
            '<li class="footer-fones"><a href="http://api.whatsapp.com/send?1=pt_BR&amp;phone=551100000000" target="_blank" rel="noopener"><i class="fa fa-fw fa-whatsapp" aria-hidden="true"></i>00 0000-0000</a></li> ' +
            '<li class="footer-mails"><a href="mailto:contato@seudominio.com.br?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o" aria-hidden="true"></i>contato@seudominio.com.br</a></li> ' +
            //'<li class="footer-contact-link"><a href="/contato/678/contato" id="link-faleconosco"><i class="fa fa-fw fa-address-book-o" aria-hidden="true"></i>Fale Conosco</a></li>' +
            '');

    }

}

function CategoriasRodapeFake() {

    if ($('#categoria-footer li').length <= 0) {

        var li = '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 1</a></li>' +
            '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 2</a></li>' +
            '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 3</a></li>' +
            '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 4</a></li>' +
            '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 5</a></li>';

        $("#categoria-footer").html(li);

    }

}