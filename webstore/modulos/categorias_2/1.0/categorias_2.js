$(document).ready(function () {
    try {
        console.log("Categorias_2_Lista:0");
        isReady("PAG", "Categorias_2_Lista()");
        $(window).resize(function () {
            ajustaNav_cat_2();
        });
        $(window).on('orientationchange', function () {
            ajustaNav_cat_2();
        });
    } catch (e) { console.log(e.message); }
});

var categoria = "";
function Categorias_2_Lista() {
    console.log("Categorias_2_Lista:1");
    ApiWS.ListaCategorias("Categorias_2_Lista_Retorno");
};

var menu = "";
var categoriasKeep;
function Categorias_2_Lista_Retorno() {

    try {

        console.log("Categorias_2_Lista:2");
        var OBJETO = ApiWS.Json;
        objetos.Categorias_2_Lista = OBJETO;
        var obj = jQuery.parseJSON(OBJETO);
        jsonCategorias = obj;
        var LOG = [];

        categoriasKeep = Departamentos_2_just(obj.Categorias);

        var NivelGo = 1;
        if (obj.MenuPersonalizado && obj.MenuPersonalizado.length > 0) { NivelGo = 2; }

        var categorias = Departamentos_2(obj.Categorias, NivelGo, LOG),
        categoria = obj.Categorias;

        if (obj.MenuPersonalizado != null && obj.MenuPersonalizado != undefined && obj.MenuPersonalizado.length > 0) {
            var item = obj.MenuPersonalizado;
            for (a = 0; a < item.length; a++) {
                try {
                    var registro = PAG[item[a].registro];
                    if (item[a].tipo == 'dpt' && item[a].registro == 0) {

                        menu += '<li class="dpt-onclick-nivel-0" id="departamento-' + item[a].id + '">';

                        IdMenu++;
                        menu += '<a href="javascript:void(FuncOpenSubMenu(' + IdMenu + '))" rel="cat-' + IdMenu + '" link="' + item[a].url + '" class="com-sub link-dpt-main">' + item[a].nome + '</a>';

                        menu += '<div id="dpt-div-' + IdMenu + '" rel="dpt-ul-subs">';
                        menu += '<ul class="dpt-onclick-ul-nivel-0">';
                        menu += categorias;
                        menu += '</ul>';
                        menu += '</div>';

                        menu += '</li>';

                    } else if (item[a].tipo == 'dpt' && item[a].registro != 0) {
                        if (LOG[item[a].registro] != null && LOG[item[a].registro] != undefined) {
                            menu += '<li class="dpt-onclick-nivel-0 link-dpt-main" id="departamento-' + item[a].id + '">';
                            menu += MenuPersonal_2(LOG[item[a].registro], 0, item[a].nome);
                            menu += '</li>';
                        } else {
                            menu += '<li class="dpt-onclick-nivel-0 link-dpt-main" id="departamento-' + item[a].id + '">';
                            menu += '<a href="">' + item[a].nome + '</a>';
                            menu += '</li>';
                        }
                    } else if (item[a].tipo == 'inst') {
                        if (registro != null && registro != undefined) {
                            menu += '<li class="dpt-onclick-nivel-0 link-dpt-main" id="departamento-' + item[a].id + '">';
                            menu += '<a href="' + registro[0].url + '">' + item[a].nome + '</a>';
                            menu += '</li>';
                        }
                    } else if (item[a].tipo == 'sistema') {
                        menu += '<li class="dpt-onclick-nivel-0 link-dpt-main" id="departamento-' + item[a].id + '">';
                        menu += '<a href="' + item[a].url + '">' + item[a].nome + '</a>';
                        menu += '</li>';
                    }
                } catch (e) { console.log('Item do menu: ' + e.message); }
            }
            $('.departamentos-nav-on-click').append((menu));
        } else if (obj.Categorias != null && obj.Categorias != undefined && obj.Categorias.length > 0) {
            $('.departamentos-nav-on-click').append((categorias));
        }

        ajustaNav_cat_2();

    } catch (e) {
        console.log("Falha categorias:" + e.message);
    }

};

var IdMenu = 0;
function Departamentos_2(OBJ, NIVEL, LOG) {
    try {

        console.log("Categorias_2_Lista:3");

        var a = 0;
        var li = "";
        
        for (a = 0; a < OBJ.length; a++) {

            if (LOG != null) {
                LOG[OBJ[a].id] = [OBJ[a]];
            }

            li += '<li class="dpt-onclick-nivel-' + NIVEL + '" id="departamento-' + OBJ[a].id + '">';

            if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0 && NIVEL == 1) {
                IdMenu++;
                li += '<a href="javascript:void(FuncOpenSubMenu(' + IdMenu + '))" rel="cat-' + IdMenu + '" link="' + OBJ[a].url + '" class="com-sub link-dpt-main">' + OBJ[a].nome + '</a>';
                if (NIVEL == 1) {
                    li += '<span class="fa fa-angle-down menu-toggle" aria-hidden="true"></span>';
                }
            } else {
                li += '<a href="' + OBJ[a].url + '" class="link-dpt-main">' + OBJ[a].nome + '</a>';
            }

            if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0 && NIVEL == 1) {
                li += '<div id="dpt-div-' + IdMenu + '" rel="dpt-ul-subs">';
                li += '<ul class="dpt-onclick-ul-nivel-' + (NIVEL + 1) + '">';
                var subcat = OBJ[a].subcategorias;
                var nivel = NIVEL + 1;
                li += '<li class="dpt-onclick-nivel-' + nivel + ' todo-departamento" id="departamento-' + OBJ[a].id + '">';
                li += '<a href="' + OBJ[a].url + '">Todo o departamento</a>';
                li += '</li>';
                li += Departamentos_2(subcat, 2, LOG);
                li += '</ul>';
                li += '</div>';
            }

            li += '</li>';

        }

        return (li);

    } catch (e) { console.log('Departamentos_2: ' + e.message); }

}

function Departamentos_2_just(OBJ) {
    try {

        var a = 0;
        var li = "";

        for (a = 0; a < OBJ.length; a++) {

            li += '<li class="dpt-onclick-nivel-1" id="departamento-' + OBJ[a].id + '">';
            li += '<a href="' + OBJ[a].url + '" class="link-dpt-main">' + OBJ[a].nome + '</a>';
            li += '</li>';

        }

        return (li);

    } catch (e) { console.log('Departamentos_2: ' + e.message); }

};

function MenuPersonal_2(OBJ, NIVEL, NOME) {
    try {

        console.log("Categorias_2_Lista:4");

        var a = 0;
        var li = "";

        for (a = 0; a < OBJ.length; a++) {

            if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0 && NIVEL == 0) {
                IdMenu++;
                li += '<a href="javascript:void(FuncOpenSubMenu(' + IdMenu + '))" rel="cat-' + IdMenu + '" link="' + OBJ[a].url + '" class="com-sub link-dpt-main">' + NOME + '</a>';
            } else {
                li += '<a href="' + OBJ[a].url + '" class="link-dpt-main">' + NOME + '</a>';
            }

            if (OBJ[a].subcategorias != null && OBJ[a].subcategorias != undefined && OBJ[a].subcategorias.length > 0 && NIVEL == 0) {
                var nivel = NIVEL + 1;
                var subcat = OBJ[a].subcategorias;
                li += '<div id="dpt-div-' + IdMenu + '" rel="dpt-ul-subs">';
                li += '<ul class="dpt-onclick-ul-nivel-' + (NIVEL + 1) + '">';
                li += '<li class="dpt-onclick-nivel-' + nivel + ' todo-departamento-onclick" id="departamento-' + OBJ[a].id + '">';
                li += '<a href="' + OBJ[a].url + '">Todo o departamento</a>';
                li += '</li>';
                li += Departamentos_2(subcat, 2, null);
                li += '</ul>';
                li += "</div>";
            }

        }

        return (li);

    } catch (e) { console.log('MenuPersonal: ' + e.message); }
}

function FuncOpenSubMenu(id) {

    try {

        $("div[rel='dpt-ul-subs']").hide();
        $("div[rel='dpt-ul-subs'] a").each(function () { $(this).removeClass("opened"); });

        $("#dpt-div-" + id).show();
        $("a[rel='cat-" + id + "']").addClass("opened");
        var href = $("a[rel='cat-" + id + "']").attr("href");
        $("a[rel='cat-" + id + "']").attr("href", href.replace("FuncOpenSubMenu", "FuncCloseSubMenu"));

        $(window).click(
            function (event) {
                if (!event.target.matches("#dpt-div-" + id)) {
                    FuncCloseSubMenu(id);
                }
            }
        );

    } catch (e) { console.log('FuncOpenSubMenu: ' + e.message); }

}

function FuncCloseSubMenu(id) {

    try {

        $("#dpt-div-" + id).fadeOut("fast");
        $("a[rel='cat-" + id + "']").removeClass("opened");

        var href = $("a[rel='cat-" + id + "']").attr("href");
        $("a[rel='cat-" + id + "']").attr("href", href.replace("FuncCloseSubMenu", "FuncOpenSubMenu"));

    } catch (e) { console.log('FuncCloseSubMenu: ' + e.message); }

}

function ajustaNav_cat_2() {

    try {

        var container = $('.departamentos-nav-on-click').width();
        var itens = 0;
        var nav2 = false;
        $('.menu-topo-on-click .departamentos-nav-on-click > li').each(function (index, el) {
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
            if ($('.menu-topo-on-click .departamentos-nav-on-click .todos-departamentos-onclick').length) {
                ajustaNav2_cat_2();
            } else {

                $('.menu-topo-on-click .departamentos-nav-on-click > li').removeClass('hidden');

                var todosItens = categoriasKeep;

                var tdsCats = '<li class="dpt-onclick-nivel-0 todos-departamentos-onclick" id="departamento-9999">' +
                '<a href="javascript:void(FuncOpenSubMenu(9999))" rel="cat-9999">' +
                '<i class="fa fa-bars"></i> ' +
                'Categorias' +
                '</a>' +
                '<div id="dpt-div-9999" rel="dpt-ul-subs">' +
                '<ul>' + todosItens + '</ul>' +
                '</div>' +
                '</li>';

                $('.menu-topo-on-click .departamentos-nav-on-click').prepend(tdsCats);
                ajustaNav2_cat_2();

            }
        }

    } catch (e) { alert(e.message); }

}

function ajustaNav2_cat_2() {

    var container = $('.departamentos-nav-on-click').width();
    var itens = 0;
    $('.menu-topo-on-click .departamentos-nav-on-click > li').each(function (index, el) {
        $(this).removeClass('hidden');
        var itemWidth = $(this).width();
        if (itens + itemWidth <= container) {
            itens += itemWidth;
        } else {
            $(this).addClass('hidden');
        }
    });

}