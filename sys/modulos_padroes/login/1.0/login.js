$(document).ready(function(){
	isReady("cliente", "Login()");
});

function Login(){
    try {

        if (typeof over_login !== 'undefined') { try { eval(over_login); return; } catch (e) { console.log(e.message); } }

		var userNome = $('#HD_LVCLI_NOME').val();
		var lojaId = $('#HD_LV_ID').val();

		if (userNome != 'Visitante') {

		    $('#link-user').html('<span>N&atilde;o &eacute; voc&ecirc;? <a href="/logoff/' + lojaId + '/logoff" id="link-logoff">Clique aqui</a></span>');
			$('#user-nome').html(userNome);
			$('.link-sair').attr('href', '/logoff/'+lojaId+'/logoff');
			$('.pos-login').css('display', 'inline-block');;
			$("#link-entrar").html("<i class='fa fa-user' aria-hidden='true'></i>Sair");
			$("#link-entrar").attr("href", "/logoff/" + lojaId + "/logoff");

		} else {

			$('#user-nome').html("Visitante");
			$('.pre-login').css('display', 'inline-block');;

		}

		if (typeof call_after_login !== 'undefined') { try { eval(call_after_login); } catch (e) { console.log("Falha call_after_login" + e.message); } }

	} catch (e) { console.log(e.message); }
}