var isContactPage = true;
var fieldsContact = "[" +
                    "   {" +
                    "       \"type\":\"text\"," +
                    "       \"name\":\"TxtNome\"," +
                    "       \"title\":\"Informe o seu nome\"," +
                    "       \"placeholder\":\"Nome\"," +
                    "       \"size\":\"40\"," +
                    "       \"maxlength\":\"100\"," +
                    "       \"icon\":\"fa fa-user-o\"," +
                    "       \"valida\":\"simples\"" +
                    "   }," +
                    "   {" +
                    "       \"type\":\"text\"," +
                    "       \"name\":\"TxtEmail\"," +
                    "       \"title\":\"Informe o seu e-mail\"," +
                    "       \"placeholder\":\"E-mail\"," +
                    "       \"size\":\"40\"," +
                    "       \"maxlength\":\"255\"," +
                    "       \"icon\":\"fa fa-envelope-o\"," +
                    "       \"valida\":\"email\"" +
                    "   }," +
                    "   {" +
                    "       \"type\":\"text\"," +
                    "       \"name\":\"TxtFone\"," +
                    "       \"title\":\"Informe o seu telefone\"," +
                    "       \"placeholder\":\"Telefone\"," +
                    "       \"size\":\"40\"," +
                    "       \"maxlength\":\"20\"," +
                    "       \"icon\":\"fa fa-phone\"," +
                    "       \"valida\":\"fone\"" +
                    "   }," +
                    "   {" +
                    "       \"type\":\"textarea\"," +
                    "       \"name\":\"TxtMsg\"," +
                    "       \"title\":\"Envie sua mensagem\"," +
                    "       \"placeholder\":\"Mensagem\"," +
                    "       \"size\":\"4\"," +
                    "       \"maxlength\":\"0\"," +
                    "       \"icon\":\"fa fa-pencil\"," +
                    "       \"valida\":\"simples\"" +
                    "   }" +
                    "]";

$(document).ready(function () {
	try{
		if ($("#HdEtapaLoja").val() == "CONTATO") {
			isReady("objetos.InfosLojas", "FaleConosco()");
		}
	} catch (e) { console.log(e.message); }
});

function FaleConosco() {

    try {

        if (typeof overObjSetForm !== 'undefined') { if (overObjSetForm != "") { ObjSetForm = overObjSetForm; } }
        if (typeof overIsContatPage !== 'undefined') { isContactPage = overIsContatPage; }

        importContato();

        var OBJ = objetos.InfosLojas;
        var obj = jQuery.parseJSON(OBJ),
            contato = obj.dadoscontato,
            estrutura = obj.estrutura,
            institucional = obj.menuinstitucional,
            item = "",
            li = "",
            links = obj.links,
            social = obj.redes_sociais;

        if (contato) {
            if (
                contato.email_1.length > 0 ||
                contato.fone_1.length > 0 ||
                contato.fone_3.length > 0
            ) {
                item += "<ul class='direita-info'><h3>Informa&ccedil;&otilde;es de contato</h3>";

                if (contato.horario) {
                    li += '<li><i class="fa fa-fw fa-clock-o"></i>' + contato.horario + '</li>';
                }
                if (contato.fone_1) {
                    var fone1 = clearNum(contato.fone_1);
                    li += '<li><a href="tel:+55' + fone1 + '"><i class="fa fa-fw fa-phone"></i>' + contato.fone_1 + '</a></li>';
                }
                if (contato.fone_2) {
                    var fone2 = clearNum(contato.fone_2);
                    li += '<li><a href="tel:+55' + fone2 + '"><i class="fa fa-fw fa-phone"></i>' + contato.fone_2 + '</a></li>';
                }
                if (contato.fone_3) {
                    var fone3 = clearNum(contato.fone_3);
                    li += '<li><a href="http://api.whatsapp.com/send?1=pt_BR&phone=55' + fone3 + '" target="_blank" rel="noopener"><i class="fa fa-fw fa-whatsapp"></i>' + contato.fone_3 + '</a></li>';
                }
                if (contato.email_1) {
                    li += '<li><a href="mailto:' + contato.email_1 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_1 + '</a></li>';
                }
                if (contato.email_2) {
                    li += '<li><a href="mailto:' + contato.email_2 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_2 + '</a></li>';
                }
                if (contato.email_3) {
                    li += '<li><a href="mailto:' + contato.email_3 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_3 + '</a></li>';
                }

                item += li;
                item += "</ul>";

                li = '';
            }

            if (contato.endereco) {

                item += "<ul class='direita-endereco'><h3>Nosso endere&ccedil;o</h3>";

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

                item += li;
                item += "</ul>";

                li = '';

            }

            if (contato.razao && contato.cnpj) {

                item += "<ul class='direita-dados'><h3>Dados da empresa</h3>";

                item += '<li>' + contato.razao + '</li>';
                item += '<li>' + contato.cnpj + '</li>';

                item += "</ul>";

            }

        }
        if (social) {
            if (
                social.facebook ||
                social.twitter ||
                social.linkedin ||
                social.instagram ||
                social.youtube ||
                social.pinterest ||
                social.google
            ) {

                item += "<ul class='direita-social'><h3>Redes sociais</h3>";

                if (social.facebook) {
                    li += '<li><a href="https://www.facebook.com/' + social.facebook + '" target="_blank" rel="noopener">';
                    li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span>';
                    li += '</a></li>';
                }
                if (social.twitter) {
                    li += '<li><a href="https://www.twitter.com/' + social.twitter + '" target="_blank" rel="noopener">';
                    li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span>';
                    li += '</a></li>';
                }
                if (social.linkedin) {
                    li += '<li><a href="https://www.linkedin.com/' + social.linkedin + '" target="_blank" rel="noopener">';
                    li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span>';
                    li += '</a></li>';
                }
                if (social.instagram) {
                    li += '<li><a href="https://www.instagram.com/' + social.instagram + '" target="_blank" rel="noopener">';
                    li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-instagram fa-stack-1x fa-inverse"></i></span>';
                    li += '</a></li>';
                }
                if (social.youtube) {
                    li += '<li><a href="https://www.youtube.com/' + social.youtube + '" target="_blank" rel="noopener">';
                    li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-youtube fa-stack-1x fa-inverse"></i></span>';
                    li += '</a></li>';
                }
                if (social.pinterest) {
                    li += '<li><a href="https://www.pinterest.com/' + social.pinterest + '" target="_blank" rel="noopener">';
                    li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-pinterest fa-stack-1x fa-inverse"></i></span>';
                    li += '</a></li>';
                }
                if (social.google) {
                    li += '<li><a href="https://plus.google.com/' + social.google + '" target="_blank" rel="noopener">';
                    li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span>';
                    li += '</a></li>';
                }

                item += li;
                item += "</ul>";
                li = '';
            }

        }

        $('#div-barra-direita').removeClass('hidden').append(item).addClass('col-sm-4 col-xs-12');

        if (isContactPage) { $('#div-conteudo').addClass('col-sm-8 col-xs-12'); }

        if (
            !contato.email_1 &&
            !contato.fone_1 &&
            !contato.fone_3 &&
            !contato.razao &&
            !contato.endereco &&
            !social.facebook &&
            !social.twitter &&
            !social.linkedin &&
            !social.instagram &&
            !social.youtube &&
            !social.pinterest &&
            !social.google
        ) {
            $('#div-barra-direita').addClass('hidden');
            $('#div-conteudo').removeClass('col-sm-8');
        }

    } catch (e) {
        console.log("Erro FaleConosco:" + e.message);
    }
}

function importContato(){
	ApiWS.ImportFile("estrutura/html/faleconosco2.html", "retornoContato");
}

function retornoContato() {

    try {

        var retorno = ApiWS.FileReturn;

        var ObjSetForm = ".DivMioloConteudo2";

        if (typeof overObjSetForm !== 'undefined') { if (overObjSetForm != "") { ObjSetForm = overObjSetForm; } }
        if (typeof pagesfieldsContact !== 'undefined') { if (pagesfieldsContact != "") { fieldsContact = pagesfieldsContact; } }
        if (typeof overfieldsContact !== 'undefined') { if (overfieldsContact != "") { fieldsContact = overfieldsContact; } }

        $(ObjSetForm).html(retorno);

        if (fieldsContact != "") {
            funcAddFieldsContact();
        }

        FuncShowMsgContact("","");

    } catch (e) {
        console.log("Erro retornoContato:" + e.message);
    }

}

function funcAddFieldsContact() {

    try {

        if (typeof overTituloContato !== 'undefined') {
            if (overTituloContato != "") {
                $("#titulo-contato").html(overTituloContato);
            }
        }

        var obj = jQuery.parseJSON(fieldsContact);
        var html = "";

        for (a = 0; a < obj.length; a++) {

            html += '<div data-fields-contact title="' + obj[a].title + '">' +
                    '    <label for="' + obj[a].name + '">';

            if (obj[a].icon != null) {
                html += '<i class="' + obj[a].icon + '"></i>';
            }

            html += '    </label>';

            if (obj[a].type == "textarea") {
                html += '<textarea id="' + obj[a].name + '" rows="' + obj[a].size + '" placeholder="' + obj[a].placeholder + '"></textarea>';
            }
            else {
                html += '<input type="text" id="' + obj[a].name + '" placeholder="' + obj[a].placeholder + '" size="' + obj[a].size + '" maxlength="' + obj[a].maxlength + '">';
            }

		    html += '</div>';

        }

        $("[data-fields-contact]").each(function () { $(this).remove() });

        $("[data-insert-fields]").after(html)

        $("[data-insert-fields]").remove();

    } catch (e) {
        console.log("Erro funcAddFieldsContact:" + e.message);
    }

}

function funcEnviarContactForm() {

    try {

        var obj = jQuery.parseJSON(fieldsContact);
        
        for (a = 0; a < obj.length; a++) {
            var Valor = $("#" + obj[a].name).val();
            if (obj[a].valida != null && obj[a].valida != undefined) {

                if (Valor == "") {
                    FuncShowMsgContact("Preencha o campo " + obj[a].placeholder + ".", "Alert");
                    return false;
                }

                if (Valor.indexOf("@") < 0 && obj[a].valida == "email") {
                    FuncShowMsgContact("Preencha o campo " + obj[a].placeholder + " corretamente.", "Alert");
                    return false;
                }

                if (Valor.length < 10 && obj[a].valida == "fone") {
                    FuncShowMsgContact("Preencha o campo " + obj[a].placeholder + " corretamente.", "Alert");
                    return false;
                }

            }
        }

        var Json = "";
        for (a = 0; a < obj.length; a++) {

            var Valor = $("#" + obj[a].name).val();
            var Nome = obj[a].placeholder;

            if (Json != "") { Json += ","; }

            Json += "{" +
                    "\"Nome\":\"" + Nome + "\"," +
                    "\"Valor\":\"" + Valor + "\"" +
                    "}";

        }

        var LV_NOME = $("#HD_LV_NOME").val();
        var LV_ID = $("#HD_LV_ID").val();
        var VAR_PROD_ID = $("#LV_HD_PROD_ID").val();

        var ASSUNTO = "";

        if (typeof overAssuntoMensagem !== 'undefined') { if (overAssuntoMensagem != "") { ASSUNTO = overAssuntoMensagem; } }

        $.ajax({
            type: "POST",
            url: "/indiqueAJAX/contato.aspx",
            data: "tipo=enviar-json&LV_ID=" + LV_ID + "&ASSUNTO=" + ASSUNTO + "&PROD_ID=" + VAR_PROD_ID + "&Json=" + Json,
            beforeSend: function () {
                FuncShowMsgContact("Aguarde... verificando os dados.", "");
            },
            error: function () {
                FuncShowMsgContact("Não foi possível enviar o e-mail, tente novamente mais tarde.", "Error");
            },
            success: function (retorno) {

                if (retorno == "1") {

                    FuncShowMsgContact("Seu e-mail foi enviado com sucesso.", "Sucess");
                    
                    for (a = 0; a < obj.length; a++) {
                        $("#" + obj[a].name).val("");
                    }

                }
                else {
                    FuncShowMsgContact(retorno, "");
                }

            }
        });

    } catch (e) { }


}

function FuncShowMsgContact(msg, tipo) {

    $("#LV_CADASTRO_MENSAGEM").html(msg);

    $("#LV_CADASTRO_MENSAGEM").attr("class", "ResultMsg_"+tipo);

    if (msg == "") {
        $("#LV_CADASTRO_MENSAGEM").hide();
    } else {
        $("#LV_CADASTRO_MENSAGEM").fadeIn("fast");
    }

}
