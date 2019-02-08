var LV_BANNER_ATUAL = 0;
var LV_CHANGE_BANNER = "";

var LV_LiberaChangeImgHome = "";

$(document).ready
(
    function () {
        //COMEÇO DO CODIGO


        FuncaoAcessos();
        FuncaoBusca();
        $("#LV_TXTbusca").attr('autocomplete', 'off');



        $("#form1").submit(
            function () {
                return false;
            }
        );




        //TROCA FOTO 1 POR 2 NA LISTAGEM
        //====================================================
        $("img[rel^='LV_Change_1_por_2']").mouseover(
            function () {

                if (LV_LiberaChangeImgHome == "") {
                    LV_LiberaChangeImgHome = "NO";
                    var IMG_2 = $(this).attr("FotoChange");
                    var IMG_2_KEEP = $(this).attr("src");
                    $(this).attr("src", IMG_2);
                    $(this).attr("FotoChange", IMG_2_KEEP);
                }

            }
        );
        $("img[rel^='LV_Change_1_por_2']").mouseout(
            function () {

                if (LV_LiberaChangeImgHome == "NO") {
                    LV_LiberaChangeImgHome = "";
                    var IMG_2 = $(this).attr("FotoChange");
                    var IMG_2_KEEP = $(this).attr("src");
                    $(this).attr("src", IMG_2);
                    $(this).attr("FotoChange", IMG_2_KEEP);
                }

            }
        );


        //PRODUTOS EM DESTAQUE
        //====================================================
        FuncaoProdutosDestaque();





        BuscaInicializa("LV_TXTbusca");




        //CADASTRO NEWSLETTER
        //====================================================       
        $("#LV_NOME_NEWSLETTER").val("Digite seu nome");
        $("#LV_EMAIL_NEWSLETTER").val("Digite seu email");
        $("#LV_MSG_NEWSLETTER").html("Receba nossas promoções por email");
        $("#LV_EMAIL_NEWSLETTER").focus
        (
            function () {
                if ($(this).val() == "Digite seu email") {
                    $(this).val("");
                }
            }
        )
        $("#LV_EMAIL_NEWSLETTER").blur
        (
            function () {
                if ($(this).val() == "") {
                    $(this).val("Digite seu email");
                }
            }
        )
        $("#LV_NOME_NEWSLETTER").focus
        (
            function () {
                if ($(this).val() == "Digite seu nome") {
                    $(this).val("");
                }
            }
        )
        $("#LV_NOME_NEWSLETTER").blur
        (
            function () {
                if ($(this).val() == "") {
                    $(this).val("Digite seu nome");
                }
            }
        )
        $("#LV_BOTAO_NEWSLETTER").click
        (
            function () {
                var NewsNome = $("#LV_NOME_NEWSLETTER").val();
                var NewsEmail = $("#LV_EMAIL_NEWSLETTER").val();
                var LV_ID = $("#HD_LV_ID").val();

                $("#LV_MSG_NEWSLETTER").html("");

                if (NewsNome == "Digite seu nome" || NewsNome == "") {
                    $("#LV_MSG_NEWSLETTER").html("Preencha o campo nome");
                    return false;
                }

                if (NewsEmail == "Digite seu email" || NewsEmail == "") {
                    $("#LV_MSG_NEWSLETTER").html("Preencha o campo email");
                    return false;
                }

                $.ajax({
                    type: "GET",
                    url: "/cadastroAJAX/cadastro.aspx",
                    data: "tipo=newsletter&nome=" + NewsNome + "&email=" + NewsEmail + "&LV_ID=" + LV_ID,
                    beforeSend: function () {
                        $("#LV_MSG_NEWSLETTER").html("Cadastrando... aguarde.");
                    },
                    error: function () {
                        $("#LV_MSG_NEWSLETTER").html("Não foi possível realizar a operação, tente novamente mais tarde.");
                    },
                    success: function (retorno) {
                        if (retorno == "1") {
                            $("#LV_MSG_NEWSLETTER").html("Cadastro realizado com sucesso.");
                            $("#LV_NOME_NEWSLETTER").val("Digite seu nome");
                            $("#LV_EMAIL_NEWSLETTER").val("Digite seu email");
                        }
                        else if (retorno == "2") {
                            $("#LV_MSG_NEWSLETTER").html("O email já está cadastrado no sistema.");
                            $("#LV_NOME_NEWSLETTER").val("Digite seu nome");
                            $("#LV_EMAIL_NEWSLETTER").val("Digite seu email");
                        }
                        else {
                            $("#LV_MSG_NEWSLETTER").html(retorno);
                        }
                    }
                });

            }
        )
        //====================================================       
        //FIM CADASTRO NESLETTER











        //BUSCA LOJA
        //====================================================
        $("#LV_BT_BUSCA").attr("style", "cursor:pointer");
        $("#LV_BT_BUSCA").click
        (
            function () {

                BuscaTecladoOFF = "OFF";

                var LV_valorBUSCA = $("#LV_TXTbusca").val();
                var LV_tipoBUSCA = $("#LV_OPCbusca").val();

                if (LV_tipoBUSCA != undefined) {
                    LV_tipoBUSCA = Number($("#LV_OPCbusca").val());
                } else {
                    LV_tipoBUSCA = "0";
                }

                var LV_ID = $("#HD_LV_ID").val();
                var LV_NOME = $("#HD_LV_NOME").val();
                var LV_DOMINIO = $("#HD_LV_DOMINIO").val();

                if (LV_valorBUSCA == "") {
                    alert("Preencha o campo busca.");
                    BuscaTecladoOFF = "";
                }
                else {
                    FuncaoBuscaBotao("LV_TXTbusca");
                    //window.location.href = '/busca/' + LV_ID + '/' + LV_tipoBUSCA + '/' + URLamigavel(LV_valorBUSCA);
                }

            }
        )
        //====================================================




        //BOTAO CARRINHO
        //====================================================
        $("#LV_BT_CARRINHO").attr("style", "cursor:pointer");
        $("#LV_BT_CARRINHO").click
        (
            function () {

                var LV_ID = $("#HD_LV_ID").val();
                window.location.href = '/carrinho/' + LV_ID + '/carrinho.aspx';

            }
        )
        //====================================================





        //MODAL
        $(".MASK").click
       (
            function () {
                HIDE_MODAL();
            }
       )
        //MODAL
        $(".FOTOS_SHOW").click
       (
            function () {
                HIDE_MODAL();
            }
       )
        //MODAL
        $(".TABLE_SHOW_FOTO").click
       (
            function () {
                HIDE_MODAL();
            }
       )
        //MODAL
        $(".TABLE_POPUP").click
       (
            function () {
                HIDE_MODAL();
            }
       )


        //====================================================
        if ($("#LV_TOTAL_BANN_ROT").val() != "" && $("#LV_TOTAL_BANN_ROT").val() != "0") {

            VerificaBannerRotativo();

        }
        //====================================================







        //====================================================
        //BANNER POPUP
        var POPUP = $(".LV_BANNER_fundo").html();
        if (POPUP != "" && POPUP != undefined) {

            $(".LV_BANNER_fundo").attr("class", "LV_BANNER_fundo2");
            $(".LV_BANNER_fundo2").css("height", getDocHeight());
            $(".LV_BANNER_popup").show();
            $(".LV_BANNER_popup").css("left", ((getSizeElemento("form1", "W") / 2) - (getSizeElemento("LV_BANNER_popup", "W") / 2)));
            $(".LV_BANNER_popup").hide();

            $(".LV_BANNER_AreaClick").click(
                function () {
                    FecharModalPopup();
                }
            );

            $(document).keyup(function (e) {
                if (e.keyCode == 27) { FecharModalPopup(); }   // esc
            });

            MostrarModal();
        } else {
            $(".LV_BANNER_popup").hide();
            $(".LV_BANNER_fundo").hide();
            $(".LV_BANNER_fundo2").hide();
        }
        //====================================================







        //FIM DO CODIGO
    }
)



//=======================================
//FUNCAO BUSCA TECLADO
function FuncaoListaBuscaTeclado(evento) {

    var ItemAtual = $("#LV_BUSCA_AJAX_SELECTED").val();
    var TotalItens = $("#LV_TOTAL_LISTA_BUSCA_AJAX").val();

    if (TotalItens != undefined) {

        if (Number(TotalItens) > 0) {

            if (evento == "40" && Number(ItemAtual) < Number(TotalItens)) {
                ItemAtual = Number(ItemAtual) + 1;
            }
            
            if (evento == "38" && Number(ItemAtual) > 1) {
                ItemAtual = Number(ItemAtual) - 1;
            }

            for (a = 0; a < Number(TotalItens); a++) {
                $("#ItemListaBusca_" + a).css("background-color", "#FFF");
            }

            $("#ItemListaBusca_" + (Number(ItemAtual)-1)).css("background-color", "#e8e8e8");

            $("#LV_BUSCA_AJAX_SELECTED").val(ItemAtual);

        }

    }

}





//=======================================
//FUNCAO VERIFICA BANNER ROTATIVO
function VerificaBannerRotativo() {

    var QTD_BANNERS = Number($("#LV_TOTAL_BANN_ROT").val());
    var INTERVALO = $("#LV_INTERVAL_BANN_ROT").val();

    SetaListaRotativo(LV_BANNER_ATUAL);

    if (QTD_BANNERS > 1) {

        ChangeBannersRotativos();
        LV_CHANGE_BANNER = window.setInterval("ChangeBannersRotativos()", (INTERVALO * 1000));

    } else if (QTD_BANNERS == 1) {

        ChangeBannersRotativos();
        $("#LV_DIV_LIST_BANNER_ROT").hide();

    }

}



//=======================================
//FUNCAO MUDA BANNER ROTATIVO
function ChangeBannersRotativos() {

    if (QTD_BANNERS > 1) {
        window.clearInterval(LV_CHANGE_BANNER);
        LV_CHANGE_BANNER = window.setInterval("ChangeBannersRotativos()", (INTERVALO * 1000));
    }
    var QTD_BANNERS = Number($("#LV_TOTAL_BANN_ROT").val());

    if (LV_BANNER_ATUAL >= QTD_BANNERS) {
        LV_BANNER_ATUAL = 0;
    }

    SetaListaRotativo(LV_BANNER_ATUAL);

    var VALOR = $("#LV_BANNER_ROT_" + LV_BANNER_ATUAL).val().replace("|||", "'");

    $("#LV_DIV_IMG_BANNER_ROT").html(VALOR);

    LV_BANNER_ATUAL++;

}




//=======================================
//SETA BANNER ROTATIVO
function SetaBannerRotativo(BANN) {

    var INTERVALO = $("#LV_INTERVAL_BANN_ROT").val();

    window.clearInterval(LV_CHANGE_BANNER);
    LV_BANNER_ATUAL = Number(BANN) - 1;
    
    ChangeBannersRotativos();
    LV_CHANGE_BANNER = window.setInterval("ChangeBannersRotativos()", (INTERVALO * 1000));

}




//=======================================
//SETA LISTA BANNER ROTATIVO
function SetaListaRotativo(BANN) {

    var QTD_BANNERS = Number($("#LV_TOTAL_BANN_ROT").val());
    var conteudo = "";
    $("#LV_DIV_LIST_BANNER_ROT").html("");

    if (QTD_BANNERS >= 1) {

        conteudo = "<ul>";

        for (a = 1; a <= QTD_BANNERS; a++) {

            if ((BANN + 1) == a) {
                conteudo += "<li class='Selected'><a href=\"javascript:void(SetaBannerRotativo(" + a + "))\">" + a + "</a></li>";
            } else {
                conteudo += "<li><a href=\"javascript:void(SetaBannerRotativo(" + a + "))\">" + a + "</a></li>";
            }

            //$("#LV_BANNER_CARREGA").html($("#LV_BANNER_CARREGA").html() + $("#LV_BANNER_ROT_" + (a - 1)).val());
            $("#LV_BANNER_CARREGA").html($("#LV_BANNER_ROT_" + (a - 1)).val());

        }

        $("#LV_DIV_LIST_BANNER_ROT").html(conteudo + "</ul>");

    }

}




//=======================================
//FUNCAO PREPARA URL AMIGAVEL
function URLamigavel(valor)
{
    
    valor = TrataValorURL(valor);
    
    return valor + "";

}


function TrataValorURL(valor)
{
    
    contador = 1;
    
    while (contador < 5)
    {
        /*valor = valor.replace("á","a");
        valor = valor.replace("à","a");
        valor = valor.replace("â","a");
        valor = valor.replace("ã","a");
        valor = valor.replace("ä","a");
        valor = valor.replace("é","e");
        valor = valor.replace("è","e");
        valor = valor.replace("ê","e");
        valor = valor.replace("ë","e");
        valor = valor.replace("í","i");
        valor = valor.replace("ì","i");
        valor = valor.replace("î","i");
        valor = valor.replace("ï","i");
        valor = valor.replace("ó","o");
        valor = valor.replace("ò","o");
        valor = valor.replace("ô","o");
        valor = valor.replace("õ","o");
        valor = valor.replace("ö","o");
        valor = valor.replace("ú","u");
        valor = valor.replace("ù","u");
        valor = valor.replace("û","u");
        valor = valor.replace("ü","u");
        valor = valor.replace("ç","c");
        valor = valor.replace("Á","A");
        valor = valor.replace("À","A");
        valor = valor.replace("Â","A");
        valor = valor.replace("Ã","A");
        valor = valor.replace("Ä","A");
        valor = valor.replace("É","E");
        valor = valor.replace("È","E");
        valor = valor.replace("Ê","E");
        valor = valor.replace("Ë","E");
        valor = valor.replace("Í","I");
        valor = valor.replace("Ì","I");
        valor = valor.replace("Î","I");
        valor = valor.replace("Ï","I");
        valor = valor.replace("Ó","O");
        valor = valor.replace("Ò","O");
        valor = valor.replace("Ô","O");
        valor = valor.replace("Õ","O");
        valor = valor.replace("Ö","O");
        valor = valor.replace("Ú","U");
        valor = valor.replace("Ù","U");
        valor = valor.replace("Û","U");
        valor = valor.replace("Ü","U");
        valor = valor.replace("Ç","C");*/
        
        valor = valor.replace("´","-");
        valor = valor.replace("`","-");
        valor = valor.replace("'","-");
        valor = valor.replace("(","-");
        valor = valor.replace(")","-");
        valor = valor.replace("/","-");
        valor = valor.replace(".","-");
        valor = valor.replace("&", "-");
        valor = valor.replace("^","-");
        valor = valor.replace("~","-");
        valor = valor.replace("]","-");
        valor = valor.replace("[","-");
        valor = valor.replace("?","-");
        valor = valor.replace("{","-");
        valor = valor.replace("}","-");
        valor = valor.replace("#","-");
        valor = valor.replace("²","-");
        valor = valor.replace("£","-");
        valor = valor.replace("%","-");
        valor = valor.replace("¨","-");
        valor = valor.replace("*","-");
        valor = valor.replace("@","-");
        valor = valor.replace("§","-");
        valor = valor.replace("=","-");
        valor = valor.replace("+", "-");
        valor = valor.replace("!","-");
        
        valor = valor.replace(" ","-");
        
        contador++;
        
    }
    
    return valor;
    
}


function decodeFromHex(str)
{
    var r="";
    var e=str.length;
    var s;
    while(e>=0){
        s=e-3;
        r=String.fromCharCode("0x"+str.substring(s,e))+r;
        e=s;
    }
    return r;
}



function SHOW_MODAL()
{
    
    $(".TABLE_POPUP").show();
    
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    $('#MASK').css({'width':maskWidth,'height':maskHeight});
    $('#MASK').show();
    $('#MASK').fadeTo("slow",0.8);
	
    $('#FOTOS_SHOW_MASK2').css({'width':maskWidth,'height':maskHeight});
    $('#FOTOS_SHOW_MASK2').fadeIn(1000);

    var winH = $(window).height();
    var winW = $(window).width();

    $("#TABLE_SHOW_FOTO").css('height', winH);
    
    $("#FlashControl1").hide();
    
}


function HIDE_MODAL()
{
    $(".ShowMenuDiv").show();
    $("#FOTOS_SHOW_MASK").hide();
    $("#FOTOS_SHOW_MASK2").hide();
    $('#MASK').hide();            
    $("#FlashControl1").show();
    $(".DivBannerFull").css("visibility","visible");
}



function HIDE_PRETTYPHOTO() {
    $.prettyPhoto.close();
}



function tratarACENTOS(valor)
{

    cont = 0;
    
    while (cont < 30)
    {
    
        valor = valor.replace("À","&Agrave;");
        valor = valor.replace("à","&agrave;");
        valor = valor.replace("Á","&Aacute;");
        valor = valor.replace("á","&aacute;");
        valor = valor.replace("Â","&Acirc;");
        valor = valor.replace("â","&acirc;");
        valor = valor.replace("Ã","&Atilde;");
        valor = valor.replace("ã","&atilde;");
        valor = valor.replace("Ç","&Ccedil;");
        valor = valor.replace("ç","&ccedil;");
        valor = valor.replace("È","&Egrave;");
        valor = valor.replace("è","&egrave;");
        valor = valor.replace("É","&Eacute;");
        valor = valor.replace("é","&eacute;");
        valor = valor.replace("Ê","&Ecirc;");
        valor = valor.replace("ê","&ecirc;");
        valor = valor.replace("Ì","&Igrave;");
        valor = valor.replace("ì","&igrave;");
        valor = valor.replace("Í","&Iacute;");
        valor = valor.replace("í","&iacute;");
        valor = valor.replace("Ï","&Iuml;");
        valor = valor.replace("ï","&iuml;");
        valor = valor.replace("Ò","&Ograve;");
        valor = valor.replace("ò","&ograve;");
        valor = valor.replace("Ó","&Oacute;");
        valor = valor.replace("ó","&oacute;");
        valor = valor.replace("Õ","&Otilde;");
        valor = valor.replace("õ","&otilde;");
        valor = valor.replace("Ù","&Ugrave;");
        valor = valor.replace("ù","&ugrave;");
        valor = valor.replace("Ú","&Uacute;");
        valor = valor.replace("ú","&uacute;");
        valor = valor.replace("Ü","&Uuml;");
        valor = valor.replace("ü","&uuml;");
        valor = valor.replace("ª","&ordf;");
        valor = valor.replace("º","&ordm;");
    
        cont++;
    
    }
    
    return valor;
    
}




function tratarLINKs(valor)
{

    cont = 0;
    
    while (cont < 30)
    {
    
        valor = valor.replace("/","-");    
        valor = valor.replace("&","-");
        valor = valor.replace("´","-");
        valor = valor.replace("~","-");
        valor = valor.replace("^","-");
        valor = valor.replace("?","-");
        valor = valor.replace("#","-");
        valor = valor.replace("%","-");
        valor = valor.replace("$","-");
        valor = valor.replace("*","-");
    
        valor = valor.replace("À","__Agrave__");
        valor = valor.replace("\n","__BR__");
        valor = valor.replace("à","__agrave__");
        valor = valor.replace("Á","__Aacute__");
        valor = valor.replace("á","__aacute__");
        valor = valor.replace("Â","__Acirc__");
        valor = valor.replace("â","__acirc__");
        valor = valor.replace("Ã","__Atilde__");
        valor = valor.replace("ã","__atilde__");
        valor = valor.replace("Ç","__Ccedil__");
        valor = valor.replace("ç","__ccedil__");
        valor = valor.replace("È","__Egrave__");
        valor = valor.replace("è","__egrave__");
        valor = valor.replace("É","__Eacute__");
        valor = valor.replace("é","__eacute__");
        valor = valor.replace("Ê","__Ecirc__");
        valor = valor.replace("ê","__ecirc__");
        valor = valor.replace("Ì","__Igrave__");
        valor = valor.replace("ì","__igrave__");
        valor = valor.replace("Í","__Iacute__");
        valor = valor.replace("í","__iacute__");
        valor = valor.replace("Ï","__Iuml__");
        valor = valor.replace("ï","__iuml__");
        valor = valor.replace("Ò","__Ograve__");
        valor = valor.replace("ò","__ograve__");
        valor = valor.replace("Ó","__Oacute__");
        valor = valor.replace("ó","__oacute__");
        valor = valor.replace("Õ","__Otilde__");
        valor = valor.replace("õ","__otilde__");
        valor = valor.replace("Ù","__Ugrave__");
        valor = valor.replace("ù","__ugrave__");
        valor = valor.replace("Ú","__Uacute__");
        valor = valor.replace("ú","__uacute__");
        valor = valor.replace("Ü","__Uuml__");
        valor = valor.replace("ü","__uuml__");
        valor = valor.replace("ª","__ordf__");
        valor = valor.replace("º","__ordm__");
    
        cont++;
    
    }
    
    return valor;
    
}






function funcao_finaliza()
{
    if ($("#LV_ARQUIVO_FINAL").val() != "")
    {
        var LV_ID = $("#HD_LV_ID").val();
        window.location.href="/pedidofinalizado/" + LV_ID + "/" + $("#LV_ARQUIVO_FINAL").val();
    }
}



function abre_atendimento()
{
    
    var LV_ID = $("#HD_LV_ID").val();
    /*window.open("http://www.webstore.net.br/atendimento/ATENDIMENTO_iniciar.aspx?LV_ID="+LV_ID,"ATENDENTE_CLIENTE","width=500,height=610,scrollbars=no,status=yes,location=yes");*/

    largura = 500;
    altura = 610;

    w = screen.width;
    h = screen.height;

    meio_w = w / 2;
    meio_h = h / 2;

    altura2 = altura / 2;
    largura2 = largura / 2;
    meio1 = meio_h - altura2;
    meio2 = meio_w - largura2;

    window.open('http://www.webstore.net.br/atendimento/ATENDIMENTO_iniciar.aspx?LV_ID=' + LV_ID, 'ATENDENTE_CLIENTE', 'height=' + altura + ', width=' + largura + ', top=' + meio1 + ', left=' + meio2 + '');
    
}

function abre_atendimento_msn()
{
    
    var LV_ID = $("#HD_LV_ID").val();
    window.open("http://www.webstore.net.br/atendimento_msn/ATENDIMENTO_iniciar.aspx?LV_ID="+LV_ID,"ATENDENTE_CLIENTE","width=320,height=320,scrollbars=no,status=yes,location=yes");
    
}

function BradescoSomeMensagem()
{
    $("#LV_BradescoFormulario").hide();
    $("#LV_DIV_BRADESCO_SHOW_FINAL").show();
}


function FuncaoBusca()
{
     if ($("#LV_HD_BUSCA_VALOR").val() != "" && $("#LV_HD_BUSCA_VALOR").val() != undefined)
     {
     
         var BUSCA_VALOR = TrataValorURL($("#LV_HD_BUSCA_VALOR").val());
         var LV_ID = $("#HD_LV_ID").val();
         var BUSCA_SESSAO = $("#LV_HD_BUSCA_SESSAO").val();
         var BUSCA_CLI_ID = $("#LV_HD_BUSCA_CLI_ID").val();
         
         $.ajax({
               type: "POST",
               url: "/cadastroAJAX/estatisticas.aspx",
               data: "tipo=busca&busca="+BUSCA_VALOR+"&sessao="+BUSCA_SESSAO+"&cliid="+BUSCA_CLI_ID+"&LV_ID="+LV_ID,
               beforeSend: function()
               {
                    
               },
               error: function()
               {
                    
               },
               success: function(retorno)
               {
                    
               }
         });
     
     }         
    
}


function FuncaoAcessos()
{
     /*if ($("#LV_HD_CONTROLE_ACESSO").val() != "" && $("#LV_HD_CONTROLE_ACESSO").val() != undefined)
     {
        
         var VALOR = $("#LV_HD_CONTROLE_ACESSO").val();

         $.ajax({
             type: "POST",
             url: "/cadastroAJAX/estatisticas.aspx",
             data: "tipo=acessos&valor=" + VALOR,
             beforeSend: function () {

             },
             error: function () {
                 
             },
             success: function (retorno) {
                 
             }
         });
     
     }*/

 }


var BuscaTecladoOFF = "";
var NovaBuscaWait = "";
var BuscaAtual = "";
var BSAKeepTop = "";
var BSAKeepLeft = "";
var BSAKeepHeight = "";
var BSAKeepWidth = "";
var WaitLiberaBusca = "";
function LV_FuncaoBuscaAjax(Valor, Top, Left, Height, Width)
{

    BSAKeepTop = Top;
    BSAKeepLeft = Left;
    BSAKeepHeight = Height;
    BSAKeepWidth = Width;

    NovaBuscaWait = Valor;

    if (BuscaTecladoOFF == "" && Valor.length > 2 && (BuscaAtual == "" || BuscaAtual != Valor)) {

        BuscaTecladoOFF = "OFF";
        BuscaAtual = Valor;

        var LV_ID = $("#HD_LV_ID").val();

        $.ajax({
            type: "GET",
            url: "/cadastroAJAX/buscaAjax.aspx",
            data: "tipo=busca&LV_ID=" + LV_ID + "&valor=" + Valor,
            beforeSend: function () {
                //window.open("/cadastroAJAX/buscaAjax.aspx?tipo=busca&LV_ID=" + LV_ID + "&valor=" + Valor);
            },
            error: function () {
                
            },
            success: function (retorno) {

                WaitLiberaBusca = window.setInterval("LiberaBuscaAjax()", 2000);

                if ($("#LV_DIV_BUSCA_AJAX").html() == undefined) {
                    $("body").append("<div class='LV_DIV_BUSCA_AJAX' id='LV_DIV_BUSCA_AJAX'></div>");
                }

                if (retorno != "") {
                    $("#LV_DIV_BUSCA_AJAX").css("position", "absolute");
                    $("#LV_DIV_BUSCA_AJAX").css("background-color", "#FFF");
                    $("#LV_DIV_BUSCA_AJAX").css("left", Left + "px");
                    $("#LV_DIV_BUSCA_AJAX").css("top", (Number(Top) + Number(Height)) + "px");
                    $("#LV_DIV_BUSCA_AJAX").css("width", Width + "px");
                    $("#LV_DIV_BUSCA_AJAX").fadeIn("fast");
                    $("#LV_DIV_BUSCA_AJAX").html(retorno);
                }

            }
        });
    }

}
function LiberaBuscaAjax() {
    window.clearInterval(WaitLiberaBusca);
    BuscaTecladoOFF = "";
    if (NovaBuscaWait != BuscaAtual && BuscaAtual != "" & NovaBuscaWait != "") {
        LV_FuncaoBuscaAjax(NovaBuscaWait, BSAKeepTop, BSAKeepLeft, BSAKeepHeight, BSAKeepWidth);
    }
}


function getPosicaoElemento(elemID,tipo)
{ 
    
    // onde elemID é o id do objeto que quero detectar a posicao no meu caso a imagem.
    var offsetTrail = document.getElementById(elemID);
    var i = 0;
    var offsetLeft = 0;
    var offsetTop = 0;
    while (offsetTrail || i>1) {
            offsetLeft += offsetTrail.offsetLeft;
            offsetTop += offsetTrail.offsetTop;
            offsetTrail = offsetTrail.offsetParent;
    }
    if (navigator.userAgent.indexOf("Mac") != -1 && 
            typeof document.body.leftMargin != "undefined") {
            offsetLeft += document.body.leftMargin;
            offsetTop += document.body.topMargin;
    }
    
    // return {left:offsetLeft, top:offsetTop};
    //alert(offsetLeft+"----"+offsetTop);
    if (tipo == "L")
    {
        return offsetLeft;
    }
    else
    {
        return offsetTop;
    }
    
}

function getSizeElemento(elemID,tipo)
{ 
    
    var offsetTrail = document.getElementById(elemID);
    var i = 0;
    var offsetWidth = 0;
    var offsetHeight = 0;

    if (offsetTrail) 
    {
            offsetWidth = offsetTrail.offsetWidth;
            offsetHeight = offsetTrail.offsetHeight;
    }

    if (tipo == "W")
    {
        return offsetWidth;
    }
    else
    {
        return offsetHeight;
    }
    
}


function FuncaoPaginacaoUltimosVisitados(page, numpages)
{
    
    if (Number(numpages) > 0){ $("#LV_PAGINA_LAST_1").html("1"); $("#LV_ULTIMOS_VISTO_PAGE_1").hide(); }
    if (Number(numpages) > 1){ $("#LV_PAGINA_LAST_2").html("2"); $("#LV_ULTIMOS_VISTO_PAGE_2").hide(); }
    if (Number(numpages) > 2){ $("#LV_PAGINA_LAST_3").html("3"); $("#LV_ULTIMOS_VISTO_PAGE_3").hide(); }
    
    $("#LV_PAGINA_LAST_"+page).html("<strong>"+page+"</strong>");
    
    $("#LV_ULTIMOS_VISTO_PAGE_"+page).show();

}


function Trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}





var LV_CONT_PRODUTOS_DESTAQUE = 0;
var LV_PROD_DEST_ATUAL = 0;
var LV_REP_DESTAQUE = "";

function FuncaoProdutosDestaque() {

    $("#LV_LISTA_PRODUTOS_DESTAQUE li").each(
        function () {
            LV_CONT_PRODUTOS_DESTAQUE++;
            $(this).attr("id", "LV_LIST_PROD_DEST" + LV_CONT_PRODUTOS_DESTAQUE);
        }
    )

    var ContIndice = 0;
    $("#LV_LISTA_INDICE_DESTAQUE li").each(
        function () {
            ContIndice++;
            $(this).attr("id", "LV_INDICE_DEST" + ContIndice);
        }
    )

    if (LV_CONT_PRODUTOS_DESTAQUE > 0) {
        FuncaoAlternarDestaqueAuto();
    }

}


function FuncaoMudarProdDestaque(NUM) {

    if (DesativaBotoesDestaque == "OK") { return false; }

    if (LV_PROD_DEST_ATUAL > 0) {
        FuncaoHideDestaque(LV_PROD_DEST_ATUAL);
    }
    LV_PROD_DEST_ATUAL = NUM;
    FuncaoShowDestaque(LV_PROD_DEST_ATUAL);
}


function FuncaoMudarProdDestaqueMENOS() {

    if (DesativaBotoesDestaque == "OK") { return false; }

    DestaqueGoMenos = "OK";

    FuncaoHideDestaque(LV_PROD_DEST_ATUAL);

    LV_PROD_DEST_ATUAL--;

    if (LV_PROD_DEST_ATUAL <= 0) {
        LV_PROD_DEST_ATUAL = LV_CONT_PRODUTOS_DESTAQUE;
    }
    
    FuncaoShowDestaque(LV_PROD_DEST_ATUAL);

}


function FuncaoMudarProdDestaqueMAIS() {

    if (DesativaBotoesDestaque == "OK") { return false; }

    FuncaoHideDestaque(LV_PROD_DEST_ATUAL);

    LV_PROD_DEST_ATUAL++;

    if (LV_PROD_DEST_ATUAL > LV_CONT_PRODUTOS_DESTAQUE) {
        LV_PROD_DEST_ATUAL = 1;
    }

    FuncaoShowDestaque(LV_PROD_DEST_ATUAL);

}


function FuncaoAlternarDestaqueAuto() {

    FuncaoHideDestaque(LV_PROD_DEST_ATUAL);

    LV_PROD_DEST_ATUAL++;
    
    if (LV_PROD_DEST_ATUAL > LV_CONT_PRODUTOS_DESTAQUE) {
        LV_PROD_DEST_ATUAL = 1;
    }

    FuncaoShowDestaque(LV_PROD_DEST_ATUAL);

}

var DesativaBotoesDestaque = "";
var DestaqueGoMenos = "";
function FuncaoShowDestaque(Val) {
    
    if (DesativaBotoesDestaque == "OK") { return false; }

    DesativaBotoesDestaque = "OK";

    $("#LV_LISTA_INDICE_DESTAQUE li a").attr("class", "");
    $("#LV_INDICE_DEST" + Val + " a").attr("class", "Selected");

    if (DestaqueGoMenos != "OK") {
        $("#LV_LIST_PROD_DEST" + Val).animate({ left: "-1000", opacity: 0 }, 10, function () { });
    } else {
        $("#LV_LIST_PROD_DEST" + Val).animate({ left: "1500", opacity: 0 }, 10, function () { });
    }
    $("#LV_LIST_PROD_DEST" + Val).show();
    $("#LV_LIST_PROD_DEST" + Val).animate({ left: "10", opacity: 1 }, 800, function () { DesativaBotoesDestaque = ""; DestaqueGoMenos = ""; });

    window.clearInterval(LV_REP_DESTAQUE);
    if (LV_CONT_PRODUTOS_DESTAQUE > 1) {
        LV_REP_DESTAQUE = window.setInterval("FuncaoAlternarDestaqueAuto()", 5000);
    } else {
        $("#LV_LISTA_INDICE_DESTAQUE").hide();
    }

}


function FuncaoHideDestaque(Val) {


    if (DestaqueGoMenos == "OK") {
        $("#LV_LIST_PROD_DEST" + Val).animate({ left: "-1000", opacity: 0 }, 800);
    } else {
        $("#LV_LIST_PROD_DEST" + Val).animate({ left: "1500", opacity: 0 }, 800);
    }

}


//DO NOTHING
//====================================================
function FuncaoDoNothing() { }
//====================================================




function FuncaoClearHistorico() {

    $.ajax({
        type: "POST",
        url: "/cadastroAJAX/estatisticas.aspx",
        data: "tipo=ClearHistorico",
        beforeSend: function () {
            //window.open("/cadastroAJAX/estatisticas.aspx?tipo=ClearHistorico");
        },
        error: function () {
        },
        success: function (retorno) {

            window.location.href = window.location.href;

        }
    });

}






function MostrarModal() {

    var W = $("#HD_WIDTH_BANN_POP").val();
    var H = $("#HD_HEIGHT_BANN_POP").val();
    var ID = $("#HD_ID_BANN_POP").val();

    var COOKIE = getCookie("BANN_POP_" + ID);

    if (COOKIE == null || COOKIE == undefined) {

        $(".LV_BANNER_fundo2").attr("class", "LV_BANNER_fundo");

        setCookie("BANN_POP_" + ID, "1", 60);

        var Conteudo = $(".LV_BANNER_popup").html();
        Conteudo = "<input type='text' class='CampoGetFocus' id='TxtGetFocus'/><a href='javascript:void(FecharModalPopup())' class='LinkClose'>fechar</a>" + Conteudo;

        $(".LV_BANNER_popup").css("height", getDocHeight());
        $(".LV_BANNER_AreaClick").css("height", getDocHeight());


        $(".LV_BANNER_popup").html(Conteudo);

        $(".LV_BANNER_popup").css("top", "100px");
        $(".LV_BANNER_popup").css("left", "50%");
        $(".LV_BANNER_popup").css("margin-left", "-" + (W / 2) + "px");
        $(".LV_BANNER_popup").css("width", W + "px");
        $(".LV_BANNER_popup").css("height", H + "px");

        $(".LV_BANNER_popup").show();
        $("#TxtGetFocus").focus();

    } else {
        $(".LV_BANNER_popup").hide();
        $(".LV_BANNER_fundo").hide();
        $(".LV_BANNER_fundo2").hide();
    }

}
function FecharModalPopup() {

    $(".LV_BANNER_popup").animate({
        top: "-1000px",
        opacity: 0
    }, 500, function () {
        $(".LV_BANNER_popup").html("");
        $(".LV_BANNER_fundo").animate({
            opacity: 0
        }, 500, function () { $(".LV_BANNER_fundo").hide(); $(".LV_BANNER_popup").hide(); });
    });

}
function setCookie(name, value, seconds) {

    var date = new Date();
    date.setTime(date.getTime() + (1000 * seconds));
    var expires = "; expires=" + date.toGMTString();

    document.cookie = name + "=" + value + expires + "; path=/";

};
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
};
function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}







function FuncaoAddProdCar(LV_ID, PROD_ID) {

    try {

        console.log("Add produto:" + PROD_ID);

        var QTD = $("#HD_QTD_PROD_" + PROD_ID).val();
        var QTDMINIMA = $("#HD_QTD_PROD_" + PROD_ID).attr("QtdMinima");

        if (QTD != undefined && QTD != null) {
            if (Number(QTD) == "NaN") {
                alert("Quantidade inválida.");
                $("#HD_QTD_PROD_" + PROD_ID).focus();
                return false;
            }
        }

        if (QTDMINIMA != undefined && QTDMINIMA != null) {
            if (Number(QTD) < Number(QTDMINIMA)) {
                alert("Quantidade menor do que a quantidade mínima.\nQuantidade mínima:" + QTDMINIMA);
                $("#HD_QTD_PROD_" + PROD_ID).focus();
                return false;
            }
        }

        if (QTD == undefined || QTD == null)
        {
            QTD = 1;
        }

        console.log("QTD:" + QTD);

        if (QTD != undefined) {

            var LVCLI_B2B = $("#LV_USU_B2B").val();

            $.ajax({
                type: "GET",
                //url: "/carrinhoAJAX/carrinho.aspx",
                url: "/CheckoutSmart/CarrinhoSmart.aspx",
                data: "tipo=adiciona_lista&LV_ID=" + LV_ID + "&PROD_ID=" + PROD_ID + "&QTD=" + QTD + "&LVCLI_B2B=" + LVCLI_B2B,
                beforeSend: function () {
                    $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Adicionando produto ao carrinho... aguarde.");
                    $("#BT_COMPRAR_LIST_PROD_" + PROD_ID).hide();
                },
                error: function () {
                    $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Não foi possível incluir o produto ao carrinho.");
                },
                success: function (retorno) {

                    $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("");

                    if (retorno.indexOf("SUBPRODUTOS") >= 0) {

                        $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Aguarde um momento por favor...");
                        window.location.href = "/produto/" + LV_ID + "/" + PROD_ID + "/detalhe-do-produto.aspx";

                    } else if (retorno.indexOf("POSSUICAMPOS") >= 0) {

                        $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Aguarde um momento por favor...");
                        window.location.href = "/produto/" + LV_ID + "/" + PROD_ID + "/detalhe-do-produto.aspx";

                    } else if (retorno.indexOf("Sucesso:") >= 0 || retorno.indexOf("<!--SUCESSO-->") >= 0) {

                        $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Produto adicionado com sucesso.");

                        var FuncaoAfter = $("#HD_FUNCAO_AFTER_BT_COMPRAR_LISTA").val();
                        var DadosAfter = $("#HD_DADOS_FUNCAO_AFTER_BT_COMPRAR_LISTA").val();

                        if (FuncaoAfter != undefined && FuncaoAfter != null && FuncaoAfter != "") {
                            if (DadosAfter != undefined && DadosAfter != null) {
                                $("#HD_DADOS_FUNCAO_AFTER_BT_COMPRAR_LISTA").val(PROD_ID);
                            }
                            eval(FuncaoAfter);
                        } else {
                            window.location.href = '/carrinho/' + LV_ID + '/carrinho.aspx';
                        }

                    } else {

                        alert("RETORNO:" + retorno);
                        $("#BT_COMPRAR_LIST_PROD_" + PROD_ID).show();

                    }

                }
            });

        }

    } catch (e) { console.log(e.message); }

}


function FuncaoAddProdCarLC(LV_ID, PROD_ID, LISTA_CASAMENTO) {

    try{

        var QTD = $("#HD_QTD_PROD_" + PROD_ID).val();
        var QTDMINIMA = $("#HD_QTD_PROD_" + PROD_ID).attr("QtdMinima");

        if (QTD != undefined && QTD != null) {
            if (Number(QTD) == "NaN") {
                alert("Quantidade inválida.");
                $("#HD_QTD_PROD_" + PROD_ID).focus();
                return false;
            }
        } else {
            QTD = "1";
        }

        if (QTDMINIMA != undefined && QTDMINIMA != null) {
            if (Number(QTD) < Number(QTDMINIMA)) {
                alert("Quantidade menor do que a quantidade mínima.\nQuantidade mínima:" + QTDMINIMA);
                $("#HD_QTD_PROD_" + PROD_ID).focus();
                return false;
            }
        }

        if (QTD != undefined) {

            var LVCLI_B2B = $("#LV_USU_B2B").val();

            $.ajax({
                type: "GET",
                url: "/carrinhoAJAX/carrinho.aspx",
                data: "tipo=adiciona_lista&LV_ID=" + LV_ID + "&PROD_ID=" + PROD_ID + "&QTD=" + QTD + "&LVCLI_B2B=" + LVCLI_B2B + "&LISTA_CASAMENTO=" + LISTA_CASAMENTO,
                beforeSend: function () {
                    $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Adicionando produto ao carrinho... aguarde.");
                    $("#BT_COMPRAR_LIST_PROD_" + PROD_ID).hide();
                },
                error: function () {
                    $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Não foi possível incluir o produto ao carrinho.");
                },
                success: function (retorno) {

                    $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("");

                    if (retorno.indexOf("SUBPRODUTOS") >= 0) {

                        $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Aguarde um momento por favor...");
                        window.location.href = "/produto/" + LV_ID + "/" + PROD_ID + "/detalhe-do-produto.aspx";

                    } else if (retorno.indexOf("POSSUICAMPOS") >= 0) {

                        $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Aguarde um momento por favor...");
                        window.location.href = "/produto/" + LV_ID + "/" + PROD_ID + "/detalhe-do-produto.aspx";

                    } else if (retorno.indexOf("Sucesso:") >= 0) {

                        $("#LV_LABEL_BT_COMPRAR_" + PROD_ID).html("Produto adicionado com sucesso.");

                        var FuncaoAfter = $("#HD_FUNCAO_AFTER_BT_COMPRAR_LISTA").val();
                        var DadosAfter = $("#HD_DADOS_FUNCAO_AFTER_BT_COMPRAR_LISTA").val();

                        if (FuncaoAfter != undefined && FuncaoAfter != null && FuncaoAfter != "") {
                            if (DadosAfter != undefined && DadosAfter != null) {
                                $("#HD_DADOS_FUNCAO_AFTER_BT_COMPRAR_LISTA").val(PROD_ID);
                            }
                            eval(FuncaoAfter);
                        } else {
                            window.location.href = '/carrinho/' + LV_ID + '/carrinho.aspx';
                        }

                    } else {

                        alert(retorno);
                        $("#BT_COMPRAR_LIST_PROD_" + PROD_ID).show();

                    }

                }
            });

        }

    } catch (e) {

        alert(e.message);

    }

}



var GEO_ip = "";
var GEO_hostname = "";
var GEO_city = "";
var GEO_region = "";
var GEO_country = "";
var GEO_loc = "";
function FuncaoGeoLocalizacao(FuncaoAfter) {

    try{
        $.ajax({
            type: "POST",
            url: "/cadastroAJAX/GeoLocal.aspx",
            data: "",
            beforeSend: function () {
            
            },
            error: function () {

            },
            success: function (retorno) {
                eval(retorno);
                if (FuncaoAfter != "") {
                    eval(FuncaoAfter);
                }
            }
        });
    } catch (e) {

    }

}






//CARRINHO AJAX
//====================================================

$(document).ready(
    function () {

        var CARRINHO_ON_PAGE = $("#LV_CARRINHO_ON_PAGE").html();
        if (CARRINHO_ON_PAGE != null) {

            window.setTimeout("CarregaCarrinhoOnPage()", 2000);

        }

    }
);

function CarregaCarrinhoOnPage() {

    var LV_ID = $("#HD_LV_ID").val();

    $.ajax({
        type: "GET",
        url: "/CheckoutSmart/CarrinhoSmart.aspx",
        data: "tipo=CarrinhoOnPage&LV_ID=" + LV_ID,
        beforeSend: function () {

            $("#LV_CARRINHO_ON_PAGE").html("<div class='CarregandoCarOnPage'>Carregando...</a>");

        },
        error: function () {

            $("#LV_CARRINHO_ON_PAGE").html("<div class='ErroCarOnPage'>Erro ao carregar carrinho on page.</a>");

        },
        success: function (retorno) {

            $("#LV_CARRINHO_ON_PAGE").html(retorno);

        }
    });
    
}

//CARRINHO AJAX
//====================================================





function validacaoEmail(email) {

    if (email == "" || email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        return false;
    }
    return true;
};



function BuscaInicializa(ID) {

    try {


        //console.log("Input com ID " + ID + " iniciado para busca");

        
        var HTML = $("body").html();
        if (HTML.indexOf("LV_BUSCA_AJAX_SELECTED") < 0) {
            $("body").append("<input type='hidden' id='LV_BUSCA_AJAX_SELECTED' value=''/>");
        }


        //BUSCA (ON ENTER)
        //====================================================

        $("#" + ID).keyup
        (
            function (event) {

                try {

                    //console.log("Input com ID " + ID + " teve keyup (" + event.keyCode + ").");

                    if (event.keyCode == '38' || event.keyCode == '40') {

                        FuncaoListaBuscaTeclado(event.keyCode);

                    }

                    if (event.keyCode == '13') {

                        if ($("#LV_BUSCA_AJAX_SELECTED").val() != undefined && $("#LV_BUSCA_AJAX_SELECTED").val() != "") {

                            if ($("#LV_LINK_LISTA_BUSCA_AJAX_" + (Number($("#LV_BUSCA_AJAX_SELECTED").val()) - 1)).val() != undefined) {

                                window.location.href = ($("#LV_LINK_LISTA_BUSCA_AJAX_" + (Number($("#LV_BUSCA_AJAX_SELECTED").val()) - 1)).val());

                            }

                        } else {

                            //$("#LV_BT_BUSCA").click();
                            FuncaoBuscaBotao(ID);

                        }

                    }

                    if (event.keyCode != '38' && event.keyCode != '40' && event.keyCode != '13') {

                        var Valor = Trim($(this).val());

                        if (Valor != "") {

                            var Left = getPosicaoElemento(ID, 'L');
                            var Top = getPosicaoElemento(ID, 'T');
                            var Height = getSizeElemento(ID, 'H');
                            var Width = getSizeElemento(ID, 'W');

                            LV_FuncaoBuscaAjax(Valor, Top, Left, Height, Width);

                        } else {

                            $("#LV_DIV_BUSCA_AJAX").hide();

                        }

                    }

                } catch (e) { console.log(e.message); }


            }
        )

        //====================================================




        //BUSCA (AJAX)
        //====================================================

        $("#" + ID).blur
        (
            function () {

                $("#LV_DIV_BUSCA_AJAX").fadeOut("fast");

            }
        )

        //====================================================


    } catch (e) { console.log("falha inicializando busca:" + e.message); }


}



function FuncaoBuscaBotao(ID) {

    BuscaTecladoOFF = "OFF";

    var LV_valorBUSCA = $("#" + ID).val();
    var LV_tipoBUSCA = "0";

    var LV_ID = $("#HD_LV_ID").val();
    var LV_NOME = $("#HD_LV_NOME").val();
    var LV_DOMINIO = $("#HD_LV_DOMINIO").val();

    if (LV_valorBUSCA == "") {
        BuscaTecladoOFF = "";
    }
    else {
        window.location.href = '/busca/' + LV_ID + '/' + LV_tipoBUSCA + '/' + URLamigavel(LV_valorBUSCA);
    }

}