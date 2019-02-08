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
		ajustaSubMenu();

	} catch (e) { console.log(e.message); }
});

var categoria = "";
var categorias = "";
var LOG = [];
function CategoriasLista() {
	ApiWS.ListaCategorias("CategoriasListaRetorno");
}
function CategoriasListaRetorno() {

	var OBJETO = ApiWS.Json;
	objetos.CategoriasLista = OBJETO;
	var obj = jQuery.parseJSON(OBJETO);

	var filtro = "",
		menu = "";
	categoria = obj.Categorias;

	categorias = Departamentos(obj.Categorias, 1, LOG);

	if(obj.MenuPersonalizado) {
		// menu = MenuPersonalizado(obj.MenuPersonalizado);

		for (a = 0; a < obj.MenuPersonalizado.length; a++){
			var item = obj.MenuPersonalizado[a];
			var registro = PAG[item.registro];

			if (a == 0) {

			    var IdLiFirst = "menu-hidden";
			    if (typeof firtDptVisible !== 'undefined') {
			        IdLiFirst = "menu-visible";
			    }

			    menu += '<li class="dpt-nivel-0" id="' + IdLiFirst + '">';
				menu += '<a class="com-sub">Categorias</a><ul>';
				menu += categorias;
				menu += '</ul></li>';
			}

			if(item.tipo == 'dpt' && item.registro == 0){
				menu += '<li class="dpt-nivel-0" id="departamento-'+item.id+'">';
				menu += '<a class="com-sub">'+item.nome+'</a><ul>';
				menu += categorias;
				menu += '</ul>';
			}else if(item.tipo == 'dpt' && item.registro != 0){

				if(LOG[item.registro] != null && LOG[item.registro] != undefined){
					menu += '<li class="dpt-nivel-0" id="departamento-'+item.id+'">';
					menu += MenuPersonal(LOG[item.registro], 0, item.nome);
					menu += '</li>';
				}else{
					menu += '<li class="dpt-nivel-0" id="departamento-'+item.id+'">';
					menu += '<a href="">'+item.nome+'</a>';
					menu += '</li>';
				}

			}else if(item.tipo == 'inst'){

				if(registro){
					menu += '<li class="dpt-nivel-0" id="departamento-'+item.id+'">';
					menu += '<a href="'+registro[0].url+'">'+item.nome+'</a>';
					menu += '</li>';
				}

			}else if(item.tipo == 'sistema'){
				menu += '<li class="dpt-nivel-0" id="departamento-'+item.id+'">';
				menu += '<a href="'+item.url+'">'+item.nome+'</a>';
				menu += '</li>';
			}

		}

	}
	

	$('#menu-personalizado').append(menu);
	$('.departamentos-nav').append(categorias);
	$('#categoria-footer').append(categorias);
	$('#departamentos-lateral').append(categorias);
	dropDownMenu();

	var etapa = $("#HdEtapaLoja").val();
	if (etapa == "HOME") {
		if (cfg['menu_lateral_home'] == true) {
			$('#menu-lateral').append(categorias);
		}else{
			$('#menu-lateral').remove();
		}
	}
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

	ajustaSubMenu();
	ajustaNav();
}

function MenuPersonalizado(OBJ, LOG){
	try{

		var menu = "";

		

		return menu;

	} catch (e) { console.log('MenuPersonalizado: '+e.message); }

}

function dropDownMenu(){

	$('#menu-personalizado li').off();
	$('#menu-personalizado li').hover(function() {
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

	var container = $('#menu-personalizado').width();
	var itens = 0;
	var over = false;
	$('#menu-personalizado > li').each(function(index, el) {
		$(this).removeClass('hidden');

		var itemWidth = $(this).width();

		if(itens + itemWidth <= container){
		 	itens += itemWidth;
		}else{
			over = true;
			$(this).addClass('hidden');
		}
	});
	
	if(over){
		$('#menu-hidden').show();
		ajustaNav2();

		if($('#menu-personalizado .todos-departamentos').length){
			ajustaNav2();
		}else{
			$('#menu-personalizado > li').removeClass('hidden');
			var todosItens = $('#menu-personalizado').html();
			$('#menu-personalizado').prepend('<li class="dpt-nivel-0 todos-departamentos"><a><i class="fa fa-bars"></i> Menu</a><ul>'+todosItens+'</ul></li>');
			ajustaNav2();
		}
	}

	ajustaDepartamentoLateral();
	dropDownMenu();
}

function ajustaNav2(){

	var container = $('#menu-personalizado').width();
	var itens = 0;

	$('#menu-personalizado > li').each(function(index, el) {
		$(this).removeClass('hidden');

		var itemWidth = $(this).width();

		if(itens + itemWidth <= container){
		 	itens += itemWidth;
		}else{
			$(this).addClass('hidden');
		}
	});
}

function ajustaDepartamentoLateral(){
	try{
		var itens = $('#departamentos-lateral > li').length;
		// var altura = $('#banner-topo').height();

		if(itens <= 4){
			itens = 4;
		}else if(itens >= 8){
			itens = 8;
		}

		// if (altura < 200){
		// 	altura = 400;
		// }

		var containerHeight = $('#departamentos-lateral').height();
		console.log(containerHeight);


		$('#departamentos-lateral').css({
			maxHeight: 'calc(515px - 7rem)'
		});
		$('#departamentos-lateral > li').css({
			height: 'calc('+containerHeight+'px / ' + itens + ')',
			lineHeight: 'calc('+containerHeight+'px / ' + itens + ')'
		});

	} catch (e){ console.log('ajustaDepartamentoLateral: ' + e.message); }
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

				li += '<ul>';
				var subcat = OBJ[a].subcategorias;
				var nivel = NIVEL + 1;
				li += '<li class="dpt-nivel-'+nivel+' todo-departamento">';
				li += '<a href="'+OBJ[a].url+'">Todo o departamento</a>';
				li += '</li>';
				li += Departamentos(subcat, nivel, LOG);
				li += '</ul>';
			}else{
				li += '<a href="'+OBJ[a].url+'">'+OBJ[a].nome+'</a>';
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
