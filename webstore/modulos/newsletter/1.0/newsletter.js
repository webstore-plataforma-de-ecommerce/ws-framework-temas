$(document).ready(function(){

	//ADICIONA LISTENER NO BOTÃO DE NEWSLETTER
	try{

		$("#nome-news, #email-news").on('keyup', function (event) {
			if (event.keyCode == '13') {
				$("#botao-news").click();
			}
		});
		
		$("#botao-news").on('click', function () {
			var nome = $('#nome-news').val();
			var validaNome = validaNews('nome', 'nome-news');

			var email = $('#email-news').val();
			var validaEmail = validaNews('email', 'email-news');

			if(validaNome && validaEmail){
				CadastraNews(nome, email);
			}
		});

		$("#botao-news2").on('click', function () {
			var nome = $('#nome-news2').val();
			var validaNome = validaNews('nome', 'nome-news2');

			var email = $('#email-news2').val();
			var validaEmail = validaNews('email', 'email-news2');

			if(validaNome && validaEmail){
				CadastraNews(nome, email);
			}
		});

		$("#botao-news3").on('click', function () {
			var nome = $('#nome-news3').val();
			var validaNome = validaNews('nome', 'nome-news3');

			var email = $('#email-news3').val();
			var validaEmail = validaNews('email', 'email-news3');

			if(validaNome && validaEmail){
				CadastraNews(nome, email);
			}
		});
		
	} catch (e) { console.log(e.message); }

});

function CadastraNews(NOME, EMAIL) {
	ApiWS.CadastraNews(NOME, EMAIL, "CadastraNewsRetorno");
}
function CadastraNewsRetorno() {
	try {

		var OBJETO = ApiWS.Json;
		objetos.CadastraNews = OBJETO;
		
		var obj = jQuery.parseJSON(OBJETO);
		var e = $('#news-tooltip, #news-tooltip2, #news-tooltip3'); 

		e.dequeue();
		e.html(obj.mensagem);
		e.fadeIn(); 
		e.queue(function(){ 
		  setTimeout(function(){ 
		    e.dequeue(); 
		  }, 3000 ); 
		}); 
		e.fadeOut('fast');

	} catch (e) { console.log(e.message); }
}

function validaNews(type, id){
	var x = $('#'+id).val();
	var e = $('#'+id+'-tooltip');

	if (type == 'nome') {
		if (x == "" || x.length <= 3) {
            $('#'+id).addClass('form-erro').removeClass('form-sucesso');
            e.html('Preencha corretamente o campo nome');
            e.fadeIn(); 
            e.queue(function(){ 
              setTimeout(function(){ 
                e.dequeue(); 
              }, 4000 ); 
            }); 
            e.fadeOut('fast');
            return false;
        }
		if(x.length > 3){
        	$('#'+id).addClass('form-sucesso').removeClass('form-erro');
            return true;
		}
	}

	if (type == 'email') {

		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (x == "" || regex.test(x) == false) {
        	$('#'+id).addClass('form-erro').removeClass('form-sucesso');
            e.html('Preencha corretamente o campo e-mail');
            e.fadeIn(); 
            e.queue(function(){ 
              setTimeout(function(){ 
                e.dequeue(); 
              }, 4000 ); 
            }); 
            e.fadeOut('fast');

            return false;
        }
		if(x.length > 3 && regex.test(x)){
        	$('#'+id).addClass('form-sucesso').removeClass('form-erro');
            return true;
		}
	}
}
