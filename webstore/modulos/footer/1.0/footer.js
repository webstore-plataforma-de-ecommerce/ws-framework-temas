$(document).ready(function(){
	
	$('.links-rodape .titulo').click(function(){
		$(this).parents('.links-rodape').find('ul').toggleClass('open');
		$(this).parents('.links-rodape').find('p.expandir').toggleClass('open');
	});
	
		
});