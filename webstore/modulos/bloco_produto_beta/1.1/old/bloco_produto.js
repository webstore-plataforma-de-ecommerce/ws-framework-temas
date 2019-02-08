var trustvox = false;

function BlocoProduto(OBJ, TEMPLATE){
	try{
	    var ADD = '<div class="add">',
			CLASS = '',
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
            COMPRAR = '',
			VEZES = '';

		FOTO += '<a href="'+LINK+'" title="'+TITLE+'">';
		if (OBJ.fotos != null && OBJ.fotos != undefined){

			//a variável fotoVertical faz parte de um conjunto de variáveis que tem como objetivo setar
			//configurações hard-coded que podem ser facilmente ativadas/desativadas sem a necessidade do painel de controle.
			if (typeof fotoVertical !== 'undefined'){

				CLASS += " foto-vertical ";

				for(i = 0; i < OBJ.fotos.length; i++){
					var foto = OBJ.fotos[i];
					foto = foto.replace("PEQ_","MED_");
					OBJ.fotos[i] = foto;
				}

			}

			if (cfg['troca_fotos'] && OBJ.fotos.length > 1){

				FOTO += '<img src="'+OBJ.fotos[0]+'" alt="'+TITLE+'" class="img-responsive img-1">';
				FOTO += '<img src="'+OBJ.fotos[1]+'" alt="'+TITLE+'" class="img-responsive img-2">';

			}else{

				FOTO += '<img src="'+OBJ.fotos[0]+'" alt="'+TITLE+'" class="img-responsive">';

			}
		}else{
			FOTO += '<img src="/lojas/img/fotoindisponivel.jpg" alt="'+TITLE+'" class="img-responsive">';
		}
		FOTO += '</a>';

		if (OBJ.lancamento == true) {
			ADD += '<span class="prod-lancamento">Lan&ccedil;amento</span>';
		}

		var DESTAQUE = '<span class="prod-detalhes"><a href="'+LINK+'" title="'+TITLE+'">Ver detalhes</a></span>';
		var NOME = '<p class="prod-nome"><a href="'+LINK+'" title="'+TITLE+'">'+OBJ.nome+'</a></p>';

		if(OBJ.disponivel == true){

			if (OBJ.precos != null && OBJ.precos != undefined && cfg['preco_apos_login'] == false){
				if(OBJ.precos.preco != 0){

					var PRECO = Number(OBJ.precos.preco),
						PROMOCAO = Number(OBJ.precos.preco_promocao),
						VEZES = Number(OBJ.precos.max_parcelas),
						DESCONTO = PRECO / 100 * Number(OBJ.precos.desconto_avista),
						MIN_PARCELA = Number(OBJ.precos.valor_min_parcelas),
						INICIA = Number(OBJ.precos.juros_inicia),
						JUROS = Number(OBJ.precos.juros);

					if(INICIA > 1){
						var semJuros = INICIA - 1;
					}else{
						var semJuros = 0;
					}

					if (PROMOCAO != 0){

						PORCENTAGEM = ((PRECO - PROMOCAO) / PRECO * 100).toFixed(0);
						ADD += '<span class="prod-desconto">'+PORCENTAGEM+'% desconto</span>';
						PRECODE = PRECO;
						PRECO = PROMOCAO;
						DESCONTO = PRECO / 100 * Number(OBJ.precos.desconto_avista);

					}

					UMA = PRECO - DESCONTO;
					UMA = AjustaMoney(UMA);
					if(OBJ.precos.desconto_avista != null && OBJ.precos.desconto_avista != undefined && OBJ.precos.desconto_avista != 0){
						UMA = '<p class="prod-preco-uma"><a href="'+LINK+'" title="'+TITLE+'">R$'+UMA+' &agrave; vista</a></p>';
					}else{
						UMA = '<p class="prod-preco-uma"></p>';
					}

					var cf = ValorJurosComposto(JUROS, VEZES, INICIA, PRECO);

					if ((PRECO / VEZES) < MIN_PARCELA) {
						VEZES = Math.floor(PRECO / MIN_PARCELA);
					}

					if (semJuros > VEZES){
						semJuros = VEZES
					}

					if (semJuros != 0) {
						PARCELA = PRECO / semJuros;
					}else{
						PARCELA = PRECO
					}

					if (VEZES > 1 && semJuros != 0) {
						PARCELA = AjustaMoney(PARCELA);
						VEZES = '<p class="prod-preco-parc"><a href="'+LINK+'" title="'+TITLE+'">'+semJuros+'x de R$'+PARCELA+' sem juros</a></p>';				
					}else{
						VEZES = 1;
						PARCELA = "";
						VEZES = '<p class="prod-preco-parc"></p>';
					}


					if (PROMOCAO != 0){

						PRECO = "R$" + AjustaMoney(PRECODE);
						PROMOCAO = "R$" + AjustaMoney(PROMOCAO);
						PRECO = '<p class="prod-preco"><a href="'+LINK+'" title="'+TITLE+'"><strike id="preco-de">'+PRECO+'</strike>'+PROMOCAO+'</a></p>';

					}else{

						PROMOCAO = "";
						PRECO = AjustaMoney(PRECO);
						PRECO = '<p class="prod-preco"><a href="'+LINK+'" title="'+TITLE+'">R$'+PRECO+'</a></p>';

					}

					if(OBJ.links.botao_comprar != null && OBJ.links.botao_comprar != undefined){
						COMPRAR = '<div class="prod-botao-comprar">';
						COMPRAR += '<span><a href="'+OBJ.links.botao_comprar+'"><i class="fa fa-shopping-cart"></i> Comprar</a></span>';
						COMPRAR += '</div>';
					}

				}else{
					// PRODUTO COM PREÇO ZERO
					UMA = '<p class="prod-preco-uma"></p>';
					VEZES = '<p class="prod-preco-parc"></p>';
					PROMOCAO = "";
					PRECO = '<p class="prod-preco"></p>';
					COMPRAR = '<div class="prod-botao-comprar"></div>';
				}

			}

		}else{

			CLASS += 'produto-indisponivel ';
			PRECO += '<p class="produto-indisponivel"><a href="'+LINK+'" title="'+TITLE+'" class="tarja-indisponivel">Produto indispon&iacute;vel</a></p>';
			CLASS += "preco-null";

		}

		if (OBJ.fabricante != null && OBJ.fabricante != undefined) {
			FAB = ' <a href="'+OBJ.fabricante.url+'" title="'+OBJ.fabricante.nome+'">'+OBJ.fabricante.nome+'</a>';
		}
		if (OBJ.maisprodutos != null && OBJ.maisprodutos != undefined) {
			MAIS = ' <a href="'+OBJ.maisprodutos.link+'" title="'+OBJ.maisprodutos.nome+'">'+OBJ.maisprodutos.nome+'</a>';
		}
		if (OBJ.integracoes) {
			var i = "";
			for(i=0;i<OBJ.integracoes.length;i++){
				var integracao = OBJ.integracoes[i];
				if(integracao.tipo == 'trustvox_list'){
					trustvox = true;
					STARS = integracao.conteudo;
				}
			}
		}

		ADD += '</div>';

		var find = ["<!--##CLASS##-->","<!--##FOTO##-->","<!--##DESTAQUE##-->","<!--##ADD##-->","<!--##NOME##-->","<!--##PRECO##-->","<!--##VEZES##-->","<!--##UMA##-->","<!--##COMPRAR##-->","<!--##FAB##-->","<!--##STARS##-->","<!--##MAIS##-->","<!--##LINK##-->"];
		var replace = [CLASS,FOTO,DESTAQUE,ADD,NOME,PRECO,VEZES,UMA,COMPRAR,FAB,STARS,MAIS,LINK];

		TEMPLATE = replaceStr(TEMPLATE, find, replace);                            
		return TEMPLATE;

	} catch (e) { console.log(e.message); }
}