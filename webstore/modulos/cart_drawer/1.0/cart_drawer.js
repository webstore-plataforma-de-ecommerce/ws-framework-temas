var carrinhoAberto = false;
function openCart(){
	$('#cart-content').html("");
	var content = $('#LV_CARRINHO_ON_PAGE').html();
	$('#cart-content').html(content);
	$('#carrinho-drawer').css('right', '0');

	$('#main').css({
		left: '-30rem'
	});

	$('#overlay').css({
		width: '100%',
		height: '100%',
		opacity: '0.5'
	});

	carrinhoAberto = true;
}
function closeCart(){
	$('#carrinho-drawer').css({
		right: '-100%'
	});

	$('#main').css({
		left: '0'
	});
	$('#overlay').css({
		width: '0',
		height: '0',
		opacity: '0'
	});

	carrinhoAberto = false;
}