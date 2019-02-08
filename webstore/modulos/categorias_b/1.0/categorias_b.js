$(document).ready(function(){
	try{
		isReady("PAG", "CategoriasLista()");
	} catch (e) { console.log(e.message); }

	try{
		
		$(window).resize(function() {
		    ajustaNav();
		});
		$(window).on('orientationchange', function() {
		    ajustaNav();
		});

	} catch (e) { console.log(e.message); }
});

var categoria = "";
function CategoriasLista() {
	ApiWS.ListaCategorias("CategoriasListaRetorno");
}
function CategoriasListaRetorno() {

	var OBJETO = ApiWS.Json;
	objetos.CategoriasLista = OBJETO;
	var obj = jQuery.parseJSON(OBJETO);

	var categorias = Departamentos(obj.Categorias, 1, LOG),
		filtro = "",
		LOG = [],
		menu = "";

	categoria = obj.Categorias;

	// if(obj.MenuPersonalizado) {

	// 	var item = obj.MenuPersonalizado;

	// 	for (a = 0; a < item.length; a++){
	// 		try{
	// 			var registro = PAG[item[a].registro];
	// 			if(item[a].tipo == 'dpt' && item[a].registro == 0){
	// 				menu += '<li class="dpt-nivel-0" id="departamento-'+item[a].id+'">';
	// 				menu += '<a class="com-sub">'+item[a].nome+'</a><ul>';
	// 				menu += categorias;
	// 				menu += '</ul>';
	// 			}else if(item[a].tipo == 'dpt' && item[a].registro != 0){

	// 				if(LOG[item[a].registro] != null && LOG[item[a].registro] != undefined){
	// 					menu += '<li class="dpt-nivel-0" id="departamento-'+item[a].id+'">';
	// 					menu += MenuPersonal(LOG[item[a].registro], 0, item[a].nome);
	// 					menu += '</li>';
	// 				}else{
	// 					menu += '<li class="dpt-nivel-0" id="departamento-'+item[a].id+'">';
	// 					menu += '<a href="">'+item[a].nome+'</a>';
	// 					menu += '</li>';
	// 				}

	// 			}else if(item[a].tipo == 'inst'){

	// 				if(registro != null && registro != undefined){
	// 					menu += '<li class="dpt-nivel-0" id="departamento-'+item[a].id+'">';
	// 					menu += '<a href="'+registro[0].url+'">'+item[a].nome+'</a>';
	// 					menu += '</li>';
	// 				}

	// 			}else if(item[a].tipo == 'sistema'){
	// 				menu += '<li class="dpt-nivel-0" id="departamento-'+item[a].id+'">';
	// 				menu += '<a href="'+item[a].url+'">'+item[a].nome+'</a>';
	// 				menu += '</li>';
	// 			}

	// 		} catch (e) { console.log('Item do menu: '+e.message); }

	// 	}
	// 	$('.departamentos-nav').append(menu);
	// 	dropDownMenu();
	// 	$('#categoria-footer').append(categorias);

	// }else if(obj.Categorias) {
	// 	$('.departamentos-nav').append(categorias);
	// 	dropDownMenu();
	// 	$('#categoria-footer').append(categorias);
	// }

	var etapa = $("#HdEtapaLoja").val();
	if (etapa == "LISTAGEM") {
		if (cfg['menu_lateral'] == true) {
			$('#menu-lateral').append(categorias);
		}else{
			$('#menu-lateral').remove();
		}
		var filtroAtivo = [];
		if(obj.Filtros != null && obj.Filtros != undefined){
			if (obj.Filtros.length > 0) {

				var filtroLigado = false;

				var item = obj.Filtros;
				for(a = 0; a < obj.Filtros.length; a++){
					if(item[a].opcoes.length > 0){
						filtroLigado = true;

						filtro += '<li class="filtro-'+item[a].tipo+'">';					
						filtro += '<span class="titulo-filtro">'+item[a].titulo+'</span>';

						if(item[a].opcoes != null && item[a].opcoes != undefined && item[a].opcoes.length > 0){
							filtro += '<ul class="filtro-opcoes">';
							var opcao = item[a].opcoes;
							for(b = 0; b < opcao.length; b++){
								if(b >= 5){
									filtro += '<li class="filtro-opcao shrink">';
									filtro += '<a href="'+opcao[b].link+'">'+opcao[b].nome+'</a>';
									filtro += '</li>';
								}else{
									filtro += '<li class="filtro-opcao">';
									filtro += '<a href="'+opcao[b].link+'">'+opcao[b].nome+'</a>';
									filtro += '</li>';
								}

								if (opcao[b].selecionada == true){
									var objFiltro = {'nome':opcao[b].nome, 'link':opcao[b].link};
									filtroAtivo.push(objFiltro);
								}

								if(b == (opcao.length - 1) && opcao.length > 5){
									filtro += '<li class="filtro-opcao ver-mais">(+) Ver mais</li>';									
								}

							}
							filtro += '</ul>';

						}
						filtro += '</li>';
						
					}
				}

				if(filtroAtivo != null && filtroAtivo != undefined && filtroAtivo.length > 0){
					var span = ""
					for(i = 0; i < filtroAtivo.length; i++){
						span += '<span class="filtro-ativo">'+filtroAtivo[i].nome+'<a href="'+filtroAtivo[i].link+'">&times;</a></span>';
					}
					$('#div-barra-esquerda').prepend(span);
				}

				if(filtroLigado){
					$('#filtros-lateral').append(filtro);
					$('#filtros-lateral').removeClass('hidden');
				}

				var filtroAberto = false;
				$('#filtros-lateral .ver-mais').on('click', function(){
					if (!filtroAberto){
						$(this).siblings('.shrink').toggleClass('unshrink');
						$(this).html("(-) Ver menos");
						filtroAberto = true;
					}else{
						$(this).siblings('.shrink').toggleClass('unshrink');
						$(this).html("(-) Ver mais");
						filtroAberto = false;
					}
				})

			}

		}

	}

	$('#menu-lateral .dpt-nivel-1 > .com-sub').on('click', function(){
		event.preventDefault();
		$(this).toggleClass('hover');
		var ul = $(this).siblings('ul');
		var span = $(this).siblings('span');
		span.toggleClass('fa-angle-down fa-angle-up');
		ul.toggleClass("open");
	});

	$('.menu-toggle').on('click', function(){
		var ul = $(this).siblings('ul');
		$(this).toggleClass('fa-angle-down fa-angle-up');
		ul.toggleClass("open");
	})

	ajustaNav();
}

function dropDownMenu(){

	$('.departamentos-nav li').off();
	$('.departamentos-nav li').hover(function() {
	    $(this).closest('li').find('>ul').css({
	        'opacity':0,
	        'margin-top':15
	    })
	    .show().animate({
	        'margin-top':0,
	        'opacity':1
	    },50);
	},function(){
	    $(this)
	    .closest('li')
	    .find('>ul')
	    .fadeOut(200,function(){
	         $(this).hide();   
	    });
	});
}

function ajustaNav(){

	var container = $('.departamentos-nav').width();
	var itens = 0;
	var nav2 = false;
	$('.menu-topo .departamentos-nav > li').each(function(index, el) {
		$(this).removeClass('hidden');

		var itemWidth = $(this).width();

		if(itens + itemWidth <= container){
		 	itens += itemWidth;
		}else{
			nav2 = true;
			$(this).addClass('hidden');
		}
	});
	
	if(nav2 == true){
		if($('.menu-topo .departamentos-nav .todos-departamentos').length){
			ajustaNav2();
		}else{
			$('.menu-topo .departamentos-nav > li').removeClass('hidden');
			var todosItens = $('.menu-topo .departamentos-nav').html();
			$('.menu-topo .departamentos-nav').prepend('<li class="dpt-nivel-0 todos-departamentos"><a><i class="fa fa-bars"></i> Categorias</a><ul>'+todosItens+'</ul></li>');
			ajustaNav2();
		}
	}

	dropDownMenu();
}

function ajustaNav2(){

	var container = $('.departamentos-nav').width();
	var itens = 0;

	$('.menu-topo .departamentos-nav > li').each(function(index, el) {
		$(this).removeClass('hidden');

		var itemWidth = $(this).width();

		if(itens + itemWidth <= container){
		 	itens += itemWidth;
		}else{
			$(this).addClass('hidden');
		}
	});
}

function Departamentos(OBJ, NIVEL, LOG){
	try{
		var a = 0;
		var li = "";
		for (a = 0; a < OBJ.length; a++){

			if(LOG != null){
				LOG[OBJ[a].id] = [OBJ[a]];
			}

			li += '<li class="dpt-nivel-'+NIVEL+'" id="departamento-'+OBJ[a].id+'">';
			if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0) {
				li += '<a href="'+OBJ[a].url+'" class="com-sub">'+OBJ[a].nome+'</a>';
				if (NIVEL == 1) {
					li += '<span class="fa fa-angle-down menu-toggle" aria-hidden="true"></span>';
				}
			}else{
				li += '<a href="'+OBJ[a].url+'">'+OBJ[a].nome+'</a>';
			}

			if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0) {
				li += '<ul>';
				var subcat = OBJ[a].subcategorias;
				var nivel = NIVEL + 1;
				li += '<li class="dpt-nivel-'+nivel+' todo-departamento">';
				li += '<a href="'+OBJ[a].url+'">Todo o departamento</a>';
				li += '</li>';
				li += Departamentos(subcat, nivel, LOG);
				li += '</ul>';
			}

			li += '</li>';

		}
		return(li);

	} catch (e) { console.log('Departamentos: '+e.message); }
}

function MenuPersonal(OBJ, NIVEL, NOME){
	try{
		var a = 0;
		var li = "";

		for (a = 0; a < OBJ.length; a++){

			if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0) {
				li += '<a href="'+OBJ[a].url+'" class="com-sub">'+NOME+'</a>';
			}else{
				li += '<a href="'+OBJ[a].url+'">'+NOME+'</a>';
			}

			if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0) {
				var nivel = NIVEL + 1;
				var subcat = OBJ[a].subcategorias;

				li += '<ul>';
				li += '<li class="dpt-nivel-'+nivel+' todo-departamento">';
				li += '<a href="'+OBJ[a].url+'">Todo o departamento</a>';
				li += '</li>';

				li += Departamentos(subcat, nivel, null);
				li += '</ul>';
			}

		}

		return(li);

	} catch (e) { console.log('MenuPersonal: '+e.message); }
}
