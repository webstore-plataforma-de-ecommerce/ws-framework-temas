var BreakPoint_3 = 992;
var BreakPoint_2 = 768;
var BreakPoint_1 = 375;

$(document).ready(function () {
	try{
		if ($("#HdEtapaLoja").val() == "HOME") {
            isReady("banners_finished", "ProdutosStart()");
		}
	} catch (e) { console.log(e.message); }
});

function ProdutosStart() {
    console.log("bann finished");
    isReady("cfg['estrutura']", "ProdutosGrupos()");
}
function ProdutosGrupos() {
    modulos_to_complete++;
	ApiWS.ListaProdutosGrupos("ProdutosGruposRetorno");
}
function ProdutosGruposRetorno() {

    try {

        modulos_completed++;

        var OBJETO = ApiWS.Json;

        if (typeof over_produtos_grupos !== 'undefined') { try { eval(over_produtos_grupos); return; } catch (e) { console.log(e.message); } }

        if (typeof over_BreakPoint_3 !== 'undefined') { try { BreakPoint_3 = over_BreakPoint_3; } catch (e) { } }
        if (typeof over_BreakPoint_2 !== 'undefined') { try { BreakPoint_2 = over_BreakPoint_2; } catch (e) { } }
        if (typeof over_BreakPoint_1 !== 'undefined') { try { BreakPoint_1 = over_BreakPoint_1; } catch (e) { } }

        var useSlickgroups = true;
        if (typeof over_useSlickgroups !== 'undefined') { try { useSlickgroups = over_useSlickgroups; } catch (e) { } }

        objetos.ProdutosGrupos = OBJETO;

        var obj = jQuery.parseJSON(OBJETO);

        var qtdGrupos = "";
        var prods_linha = '';
        var template = $('#template').html();

        if (cfg['produtos_linha'] == 0 && cfg['menu_lateral_home'] == true) {
            prods_linha = 3;
        } else if (cfg['produtos_linha'] == 0 && cfg['menu_lateral_home'] == false) {
            prods_linha = 4;
        } else {
            prods_linha = cfg['produtos_linha'];
        }

        if (prodsLinha != null && prodsLinha != undefined && prodsLinha > 0) {
            prods_linha = prodsLinha;
        }

        if (obj.grupos != null && obj.grupos != undefined && obj.grupos.length > 0) {

            for (a = 0; a < obj.grupos.length; a++) {
                var content = "";
                qtdGrupos++;
                content += '<div class="div-grupo grupo-' + qtdGrupos + ' col-xs-12 no-gutter" id="cod-grupo-' + obj.grupos[a].codigo + '" data-grupo-loja>';
                content += '<div class="titulo-grupo">';
                var titulo = obj.grupos[a].nome;
                try {
                    var url = obj.grupos[a].url;
                    if (url != "") {
                        titulo = '<a href="' + url + '" class="grupos-pg-inicial-link-titulo">' + titulo + '</a>';
                    }
                } catch (e) { }
                content += '<h3 class="grupos-pg-inicial-titulo">' + titulo + '</h3>';
                if (useSlickgroups) {
                    content += '<span class="arrow">';
                    content += '<i class="fa fa-angle-left left-arrow"></i>';
                    content += '<i class="fa fa-angle-right right-arrow"></i>';
                    content += '</span>';
                }
                content += '</div>';

                content += '<ul class="lista-grupo" id="lista-grupo-' + obj.grupos[a].codigo + '">';

                var objProdutos = obj.grupos[a].produtos;
                if (objProdutos != null && objProdutos != undefined && objProdutos.length > 0) {
                    for (b = 0; b < objProdutos.length; b++) {
                        content += BlocoProduto(objProdutos[b], template);
                    }
                }

                content += '</ul></div>';

                $('#preloader').fadeOut('fast');
                $('#produtos-grupos').append(content);
                blocoHeight('#produtos-grupos');


                

                if (useSlickgroups) {

                    // verifica se a quantidade de itens é maior do que o slider em sí
                    $('#lista-grupo-' + obj.grupos[a].codigo).on('init', function (event, slick, direction) {
                        if ($('#lista-grupo-' + obj.grupos[a].codigo + ' .list-item').length <= prods_linha) {

                            // se não há scroll, remove as setas
                            $('#cod-grupo-' + obj.grupos[a].codigo + ' .arrow').hide();

                        }
                    });

                    var prods_linha_now = prods_linha;

                    var prods_linha_breakpoint_1 = 1;
                    var prods_linha_breakpoint_2 = 2;
                    var prods_linha_breakpoint_3 = 3;

                    var slickOver = true;

                    //DESKTOP
                    try { if (typeof eval("prods_linha_grupo_" + a) !== 'undefined') { prods_linha_now = eval("prods_linha_grupo_" + a); } } catch (e) { }
                    //992
                    try { if (typeof eval("prods_linha_grupo_bp_1_" + a) !== 'undefined') { prods_linha_breakpoint_1 = eval("prods_linha_grupo_bp_1_" + a); } } catch (e) { }
                    //768
                    try { if (typeof eval("prods_linha_grupo_bp_2_" + a) !== 'undefined') { prods_linha_breakpoint_2 = eval("prods_linha_grupo_bp_2_" + a); } } catch (e) { }
                    //375
                    try { if (typeof eval("prods_linha_grupo_bp_3_" + a) !== 'undefined') { prods_linha_breakpoint_3 = eval("prods_linha_grupo_bp_3_" + a); } } catch (e) { }

                    try { if (typeof eval("prods_slick_grupo_" + a) !== 'undefined') { slickOver = eval("prods_slick_grupo_" + a); } } catch (e) { }

                    if (slickOver) {

                        $('#lista-grupo-' + obj.grupos[a].codigo).slick({
                            infinite: true,
                            slidesToShow: prods_linha_now,
                            autoplay: false,
                            prevArrow: $('#cod-grupo-' + obj.grupos[a].codigo + ' .left-arrow'),
                            nextArrow: $('#cod-grupo-' + obj.grupos[a].codigo + ' .right-arrow'),
                            responsive: [
                                {
                                    breakpoint: BreakPoint_3,
                                    settings: {
                                        slidesToShow: prods_linha_breakpoint_3,
                                        infinite: true
                                    }
                                },
                                {
                                    breakpoint: BreakPoint_2,
                                    settings: {
                                        slidesToShow: prods_linha_breakpoint_2
                                    }
                                },
                                {
                                    breakpoint: BreakPoint_1,
                                    settings: {
                                        slidesToShow: prods_linha_breakpoint_1
                                    }
                                }],
                        });

                    }

                }
            }

            nomeProd("#produtos-grupos");

        } else {

            try {
                if (typeof modVitrineOn == 'undefined') {
                    ProdutosHome();
                }
            } catch (e) { }

        }

        window.setTimeout("blocoHeightAjusta()", 2000);

        LazyLoadApply();

        if (typeof call_after_produtos_grupos !== 'undefined') { try { eval(call_after_produtos_grupos); } catch (e) { console.log("Falha call_after_produtos_grupos" + e.message); } }
        WsModifiersCall("produtos_grupos_1_1");

    } catch (e) { console.log('ProdutosGruposRetorno: ' + e.message); }

}