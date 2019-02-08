$(document).ready(function(){
	try{

		$('#overlay').click(function(event) {
			if(menuAberto == true || carrinhoAberto == true){
				event.preventDefault();
				closeNav();
				closeCart();
			}
		});

		$('#menu-drawer').click(function(event){
		    event.stopPropagation();
		});

		AjustaTopoMobile();

	} catch (e) { console.log(e.message); }
});

var menuAberto = false;
function openNav() {
	$('#menu-drawer').css({
		visibility: 'visible',
		opacity: '1',
		overflow: 'scroll',
		left: '0'
	});
	$('#main').css({
		left: '40rem'
	});
	$('#overlay').css({
		width: '100%',
		height: '100%',
		opacity: '0.5'
	});
	menuAberto = true;
}
function closeNav() {
	$('#menu-drawer').css({
		visibility: 'hidden',
		opacity: '0',
		overflow: 'hidden',
		left: '-40rem'
	});
	$('#main').css({
		left: '0'
	});
	$('#overlay').css({
		width: '0',
		height: '0',
		opacity: '0'
	});

	$('.subcategoria').fadeOut('fast', function() {
		$('.subcategoria').remove();		
	});

	menuAberto = false;
}

function ajustaSubMenu(){
	$('#menu-drawer a.com-sub').each(function(index, el) {
		var id = $(this).parent('li').attr('id');
		$(this).attr('href', 'javascript:void(abreSubMenu("'+id+'"))');			
	});
}

function abreSubMenu(ID){
	var ul = $('#'+ID+' > ul').html();
	var nome = $('#'+ID+' > a').html();
	$('#'+ID+' ul').hide();
	$('#menu-drawer .container .row > div').append('<div class="subcategoria '+ID+'"><div class="categoria-header"><a href=""><i class="fa fa-angle-left"></i>'+nome+'</a></div><div class="categoria-body"><ul class="departamentos-nav">'+ul+'</ul></div></div>');
	$('.subcategoria.'+ID+' .categoria-header a').attr('href', 'javascript:void(fechaSubMenu("'+ID+'"))');
	$('.subcategoria.'+ID).fadeIn('fast');
	$('.subcategoria.'+ID).css({
		visibility: 'visible',
		left: '0'
	})
	ajustaSubMenu();
}

function fechaSubMenu(ID){
	$('.subcategoria.'+ID).fadeOut('fast', function() {
		$('.subcategoria.'+ID).remove();		
	});	
}
