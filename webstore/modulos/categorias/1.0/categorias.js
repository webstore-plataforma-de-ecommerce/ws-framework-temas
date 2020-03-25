/*09-05-2019*/
$(document).ready(function () {
    try {
        isReady("info_lojas_finish", "CategoriasLista()");
    } catch (e) { console.log(e.message); }
    try {

        $(window).resize(function () {
            ajustaNav();
        });
        $(window).on('orientationchange', function () {
            ajustaNav();
        });
        ajustaSubMenu();
    } catch (e) { console.log(e.message); }
});

var categoria = "";
function CategoriasLista() {
    ApiWS.ListaCategorias("CategoriasListaRetorno");
}

var megaMenu = false;
var startSub = null;
function CategoriasListaRetorno() {

    try {

        if (typeof configStartSub !== 'undefined') { try { startSub = configStartSub; } catch (e) { startSub = null; } }

        var OBJETO = ApiWS.Json;
        objetos.CategoriasLista = OBJETO;
        var obj = jQuery.parseJSON(OBJETO);

        if (startSub != null) {
            for (c = 0; c < obj.Categorias.length; c++) {
                if (obj.Categorias[c].id == startSub) {
                    var NewJson = "{\"Categorias\":" + JSON.stringify(obj.Categorias[c].subcategorias) + "}";
                    var obj2 = jQuery.parseJSON(NewJson);
                    CategoriasManage(obj2, true);
                }
            }
        }

        CategoriasManage(obj, false);

    } catch (e) {
        console.log("Falha categorias:" + e.message);
    }

}
function CategoriasManage(obj, ShowStartSub) {

    try {

        if (typeof megaMenuAtiva !== 'undefined') { try { megaMenu = megaMenuAtiva; } catch (e) { megaMenu = false; } }

        var WindowWidth = $(window).width();
        if (WindowWidth < 760) { megaMenu = false; }

        var LOG = [];
        var categorias = Departamentos(obj.Categorias, 1, LOG, false);
        var LOGlateral = [];
        var categoriasLateral = Departamentos(obj.Categorias, 1, LOGlateral, true);
        var filtro = "";
        var menu = "";

        WsSetObjetos("todas_categorias", "<ul class='ul-dpts-ws' id='ul-dpts-ws'>" + categorias + "</ul>");

        categoria = obj.Categorias;
        if (obj.MenuPersonalizado != null && obj.MenuPersonalizado != undefined && obj.MenuPersonalizado.length > 0) {
            var item = obj.MenuPersonalizado;

            for (a = 0; a < item.length; a++) {
                try {
                    var menuTemp = "";
                    var registro = PAG[item[a].registro];
                    //todos os departamentos
                    if (item[a].tipo == 'dpt' && item[a].registro == 0) {
                        menuTemp += '<li class="dpt-nivel-0" id="departamento-' + item[a].id + '">';
                        menuTemp += '<a class="com-sub">' + item[a].nome + '</a><ul class="dpt-ul-nivel-0">';
                        menuTemp += categorias;
                        menuTemp += '</ul>';
                    } else if (item[a].tipo == 'dpt' && item[a].registro != 0) {
                        if (LOG[item[a].registro] != null && LOG[item[a].registro] != undefined) {
                            menuTemp += '<li class="dpt-nivel-0" id="departamento-' + item[a].id + '">';
                            menuTemp += MenuPersonal(LOG[item[a].registro], 0, item[a].nome);
                            menuTemp += '</li>';
                        } else {
                            menuTemp += '<li class="dpt-nivel-0" id="departamento-' + item[a].id + '">';
                            menuTemp += '<a href="">' + item[a].nome + '</a>';
                            menuTemp += '</li>';
                        }
                    } else if (item[a].tipo == 'inst') {
                        if (registro != null && registro != undefined) {
                            menuTemp += '<li class="dpt-nivel-0" id="departamento-' + item[a].id + '">';
                            menuTemp += '<a href="' + registro[0].url + '">' + item[a].nome + '</a>';
                            menuTemp += '</li>';
                        }
                    } else if (item[a].tipo == 'sistema') {
                        menuTemp += '<li class="dpt-nivel-0" id="departamento-' + item[a].id + '">';
                        menuTemp += '<a href="' + item[a].url + '">' + item[a].nome + '</a>';
                        menuTemp += '</li>';
                    }
                    /*if (item[a].atual) {
                        menu = menuTemp + menu;
                    } else {
                        menu += menuTemp;
                    }*/
                    menu += menuTemp;
                } catch (e) { console.log('Item do menu: ' + e.message); }
            }

            if (((ShowStartSub && startSub) || !startSub)) { $('.departamentos-nav').append(SubstMegaMenu(menu)); };
            dropDownMenu();
            $('#categoria-footer').append(categorias);
        } else if (obj.Categorias != null && obj.Categorias != undefined && obj.Categorias.length > 0) {
            if ((ShowStartSub && startSub) || !startSub) { $('.departamentos-nav').append(SubstMegaMenu(categorias)); };
            dropDownMenu();
            $('#categoria-footer').append(categorias);
        }
        var etapa = $("#HdEtapaLoja").val();
        if (etapa == "HOME") {
            if (cfg['menu_lateral_home'] == true) {
                $('#menu-lateral').append(categorias);
            } else {
                $('#menu-lateral').remove();
            }
        }
        if (etapa == "LISTAGEM") {
            if (cfg['menu_lateral'] == true) {
                $('#menu-lateral').append(categoriasLateral);
            } else {
                $('#menu-lateral').remove();
            }
            var filtroAtivo = [];
            if (obj.Filtros != null && obj.Filtros != undefined) {
                if (obj.Filtros.length > 0) {
                    var filtroLigado = false;
                    var item = obj.Filtros;
                    for (a = 0; a < obj.Filtros.length; a++) {
                        if (item[a].opcoes.length > 0) {
                            filtroLigado = true;
                            filtro += '<li class="filtro-' + item[a].tipo + '">';
                            filtro += '<span class="titulo-filtro">' + item[a].titulo + '</span>';
                            if (item[a].opcoes != null && item[a].opcoes != undefined && item[a].opcoes.length > 0) {
                                filtro += '<ul class="filtro-opcoes">';
                                var opcao = item[a].opcoes;
                                for (b = 0; b < opcao.length; b++) {
                                    if (b >= 5) {
                                        filtro += '<li class="filtro-opcao shrink">';
                                        filtro += '<a href="' + opcao[b].link + '">' + opcao[b].nome + '</a>';
                                        filtro += '</li>';
                                    } else {
                                        filtro += '<li class="filtro-opcao">';
                                        filtro += '<a href="' + opcao[b].link + '">' + opcao[b].nome + '</a>';
                                        filtro += '</li>';
                                    }
                                    if (opcao[b].selecionada == true) {
                                        var objFiltro = { 'nome': opcao[b].nome, 'link': opcao[b].link };
                                        filtroAtivo.push(objFiltro);
                                    }
                                    if (b == (opcao.length - 1) && opcao.length > 5) {
                                        filtro += '<li class="filtro-opcao ver-mais">(+) Ver mais</li>';
                                    }
                                }
                                filtro += '</ul>';
                            }
                            filtro += '</li>';

                        }
                    }
                    if (filtroAtivo != null && filtroAtivo != undefined && filtroAtivo.length > 0) {
                        var span = ""
                        for (i = 0; i < filtroAtivo.length; i++) {
                            span += '<span class="filtro-ativo">' + filtroAtivo[i].nome + '<a href="' + filtroAtivo[i].link + '">&times;</a></span>';
                        }
                        $('#div-barra-esquerda').prepend(span);
                    }
                    if (filtroLigado) {
                        $('#filtros-lateral').append(filtro);
                        $('#filtros-lateral').removeClass('hidden');
                    }
                    var filtroAberto = false;
                    $('#filtros-lateral .ver-mais').on('click', function () {
                        if (!filtroAberto) {
                            $(this).siblings('.shrink').toggleClass('unshrink');
                            $(this).html("(-) Ver menos");
                            filtroAberto = true;
                        } else {
                            $(this).siblings('.shrink').toggleClass('unshrink');
                            $(this).html("(-) Ver mais");
                            filtroAberto = false;
                        }
                    })
                }
            }
        }

        $('#menu-lateral .dpt-nivel-1 > .com-sub').on('click', function () {
            console.log("menu clicado");
            event.preventDefault();
            console.log("...1");
            $(this).toggleClass('hover');
            console.log("...2");
            var ul = $(this).siblings('ul');
            console.log("...3");
            var span = $(this).siblings('span');
            console.log("...4");
            span.toggleClass('fa-angle-down fa-angle-up');
            console.log("...5");
            ul.toggleClass("open");
            console.log("...6");
        });

        $('.menu-toggle').on('click', function () {
            var ul = $(this).siblings('ul');
            $(this).toggleClass('fa-angle-down fa-angle-up');
            ul.toggleClass("open");
        });

        ajustaSubMenu();

        ajustaNav();

        if (megaMenu) {
            $(".departamentos-nav").addClass("dapart-nav-megamenu");
        }

        window.setTimeout("AjustaMegaMenu()", 1000);

        if (typeof call_after_categorias !== 'undefined') { try { eval(call_after_categorias); } catch (e) { console.log("Falha call_after_categorias" + e.message); } }

    } catch (e) {
        console.log("Falha categorias:" + e.message);
    }

}

function dropDownMenu() {

    $('.departamentos-nav li').off();
    $('.departamentos-nav li').hover(function () {
        $(this).closest('li').find('>ul').css({
            'opacity': 0,
            'margin-top': 15
        })
            .show().animate({
                'margin-top': 0,
                'opacity': 1
            }, 50);
    }, function () {
        $(this)
            .closest('li')
            .find('>ul')
            .fadeOut(200, function () {
                $(this).hide();
            });
    });

}
function ajustaNav() {

    var skipPass = false;

    if (typeof todasCategorias !== 'undefined') {
        try {

            if (todasCategorias == false) { skipPass = true; };

        } catch (e) { }
    }

    if (!megaMenu && !skipPass) {

        var container = $('.departamentos-nav').width();
        var itens = 0;
        var nav2 = false;
        $('.menu-topo .departamentos-nav > li').each(function (index, el) {
            $(this).removeClass('hidden');
            var itemWidth = $(this).width();
            if (itens + itemWidth <= container) {
                itens += itemWidth;
            } else {
                nav2 = true;
                $(this).addClass('hidden');
            }
        });

        if (nav2 == true) {

            if ($('.menu-topo .departamentos-nav .todos-departamentos').length) {
                ajustaNav2();
            } else {
                $('.menu-topo .departamentos-nav > li').removeClass('hidden');
                var todosItens = $('.menu-topo .departamentos-nav').html();
                $('.menu-topo .departamentos-nav').prepend('<li class="dpt-nivel-0 todos-departamentos"><a><i class="fa fa-bars"></i> Categorias</a><ul>' + todosItens + '</ul></li>');
                ajustaNav2();
            }

        }

        dropDownMenu();

    }

}
function ajustaNav2() {

    if (!megaMenu) {

        var container = $('.departamentos-nav').width();
        var itens = 0;
        $('.menu-topo .departamentos-nav > li').each(function (index, el) {
            $(this).removeClass('hidden');
            var itemWidth = $(this).width();
            if (itens + itemWidth <= container) {
                itens += itemWidth;
            } else {
                $(this).addClass('hidden');
            }
        });

    }

}
function Departamentos(OBJ, NIVEL, LOG, LATERAL) {
    try {
        var a = 0;
        var li = "";
        for (a = 0; a < OBJ.length; a++) {
            var liTemp = "";
            if (LOG != null) {
                LOG[OBJ[a].id] = [OBJ[a]];
            }
            var ClassMenuToggle = "fa-angle-down";
            var ClassUlOpen = "";

            var possuiCatAtual = JSON.stringify(OBJ[a].subcategorias);
            var isAtual = false;
            if ((OBJ[a].atual || possuiCatAtual.indexOf(":true") >= 0) && LATERAL) {
                ClassMenuToggle = "fa-angle-up";
                ClassUlOpen = "open";
                isAtual = true;
            }
            liTemp += '<li class="dpt-nivel-' + NIVEL + '" id="departamento-' + OBJ[a].id + '" atual="' + OBJ[a].atual + '">';
            if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0) {
                liTemp += '<a href="' + OBJ[a].url + '" class="com-sub">' + OBJ[a].nome + '</a>';
                if (NIVEL == 1) {
                    liTemp += '<span class="fa ' + ClassMenuToggle+' menu-toggle" aria-hidden="true" id="linkOpenMenuLateral' + OBJ[a].id+'"></span>';
                }
            } else {
                liTemp += '<a href="' + OBJ[a].url + '">' + OBJ[a].nome + '</a>';
            }
            if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0) {
                if (megaMenu) { liTemp += '<!--megamenuinfo1' + (NIVEL + 1) + 'megamenuinfo2-->'; }
                liTemp += '<ul class="dpt-ul-nivel-' + (NIVEL + 1) + ' ' + ClassUlOpen + '">';
                var subcat = OBJ[a].subcategorias;
                var nivel = NIVEL + 1;
                liTemp += '<li class="dpt-nivel-' + nivel + ' todo-departamento">';
                liTemp += '<a href="' + OBJ[a].url + '">Todo o departamento</a>';
                liTemp += '</li>';
                liTemp += Departamentos(subcat, nivel, LOG);
                liTemp += '</ul>';
                if (megaMenu) { liTemp += "<!--megamenuinfo3-->"; }
            }
            liTemp += '</li>';

            if (isAtual) {
                li = liTemp + li;
            } else {
                li += liTemp;
            }

        }
        return (li);
    } catch (e) { console.log('Departamentos: ' + e.message); }
}
function MenuPersonal(OBJ, NIVEL, NOME) {
    try {
        var a = 0;
        var li = "";
        for (a = 0; a < OBJ.length; a++) {
            if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0) {
                li += '<a href="' + OBJ[a].url + '" class="com-sub">' + NOME + '</a>';
            } else {
                li += '<a href="' + OBJ[a].url + '">' + NOME + '</a>';
            }
            if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0) {
                var nivel = NIVEL + 1;
                var subcat = OBJ[a].subcategorias;
                if (megaMenu) { li += '<div class="dpt-div-nivel-' + (NIVEL + 1) + '">'; }
                li += '<ul class="dpt-ul-nivel-' + (NIVEL + 1) + '">';
                li += '<li class="dpt-nivel-' + nivel + ' todo-departamento">';
                li += '<a href="' + OBJ[a].url + '">Todo o departamento</a>';
                li += '</li>';
                li += Departamentos(subcat, nivel, null);
                li += '</ul>';
                if (megaMenu) { li += "</div>"; }
            }
        }
        return (li);
    } catch (e) { console.log('MenuPersonal: ' + e.message); }
}
function AjustaMegaMenu() {
    try {

        var maxH = 0;

        $(".departamentos-nav .dpt-nivel-2").each(
            function () {
                var Hthis = getSizeElemento($(this), "H");
                console.log("Altura: " + Hthis + "px");
                if (Hthis > maxH) {
                    maxH = Hthis;
                }
            }
        );

        console.log("maxH: " + maxH + "px");

        if (maxH > 0) {
            $(".departamentos-nav .dpt-nivel-2").each(function () { $(this).css("min-height", maxH + "px"); });
            console.log("MegaMenu:" + maxH);
        } else {
            console.log("Não foi possível verificar o tamanho do menu.");
        }

    } catch (e) { }
}
function getSizeElemento(obj, tipo) {

    var offsetTrail = obj;
    var i = 0;
    var offsetWidth = 0;
    var offsetHeight = 0;

    if (offsetTrail) {
        offsetWidth = offsetTrail.offsetWidth;
        offsetHeight = offsetTrail.offsetHeight;
    }

    if (tipo == "W") {
        return offsetWidth;
    }
    else {
        return offsetHeight;
    }

}
function SubstMegaMenu(html) {
    try {
        while (html.indexOf("<!--megamenuinfo1") >= 0) { html = html.replace('<!--megamenuinfo1', '<div class="dpt-div-nivel-'); }
        while (html.indexOf("megamenuinfo2-->") >= 0) { html = html.replace('megamenuinfo2-->', '">'); }
        while (html.indexOf("<!--megamenuinfo3-->") >= 0) { html = html.replace('<!--megamenuinfo3-->', '</div>'); }
    } catch (e) { }
    return html;
}