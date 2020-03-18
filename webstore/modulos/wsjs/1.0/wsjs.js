/* 08-05-2019 */

var ApiWS = {}
var UrlApi = "";
var VersaoApi = "api-loja-v2";
var WsParamAdds = "";
var LimpaCache = "";


ApiWS.Token = null;
ApiWS.FileReturn = null;
ApiWS.Json = null;
ApiWS.LV = null;
ApiWS.LVdashview = null;


ApiWS.ApiStart = function () {
    try {
        var Token = $("#HdTokenLojaTemp").val();
        ApiWS.LV = $("#HD_LV_ID").val();
        ApiWS.LVdashview = "";
        var CliId = $("#HD_LVCLI_ID").val();
        if (CliId != undefined && CliId != null && CliId != "" && CliId != "0") {
            WsParamAdds = "&WsCliId=" + CliId;
        }
        var CliIsB2b = $("#LV_USU_B2B").val();
        if (CliIsB2b == "1") {
            WsParamAdds += "&CliIsB2b=1";
        } else {
            WsParamAdds += "&CliIsB2b=0";
        }
        var UseCdn = false;
        var UrlNavegador = window.location.href;
        if (UrlNavegador.indexOf("localhost") < 0 || UrlNavegador.indexOf("localhost:3000") >= 0) {
            UseCdn = true;
            console.log("WEB");
        } else {
            console.log("LOCAL");
        }

        try {
            var layout = $("#API_layout").val();
            if (layout) {
                WsParamAdds += "&layout=" + layout;
            }
        } catch (e) { }

        LimpaCache = "randomCache=" + Math.floor(Math.random() * 1004) + "&";

        try {
            if (UrlNavegador.indexOf("?dashview") >= 0 || (UrlNavegador.indexOf("localhost") >= 0 && UrlNavegador.indexOf("localhost:3000") < 0)) {
                UseCdn = false;
                localStorage["dashview"] = "1";
            }
            var CookieDashview = "";
            if ((UrlNavegador.indexOf("localhost") < 0)) {
                CookieDashview = localStorage["dashview"];
            }
            if (CookieDashview != "" && CookieDashview != null && CookieDashview != undefined) {
                if (CookieDashview == "1") {
                    UseCdn = false;
                    ApiWS.LVdashview = "1";
                }
            }
            console.log("LVdashview:" + ApiWS.LVdashview);
        } catch (e) { }
        //UseCdn = true; //APAGAR!!!
        //ApiWS.LVdashview = "1"; //APAGAR!!!
        if (typeof UseCdn !== 'undefined') {
            try {
                if (UseCdn == true) {
                    console.log("XCDNTRUE001");
                    UrlApi = "https://apiloja.wscache.webstore.net.br";
                }
            } catch (e) { }
        }
        //console.log("Token:" + Token);
        //console.log("LV:" + ApiWS.LV);
    }
    catch (e) {
        console.log(e.message);
    }
}


ApiWS.FuncAfter_ListaProdutosHome = null;
ApiWS.ListaProdutosHome_Tentativas = 0;
ApiWS.ListaProdutosHome = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaProdutosHome = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaProdutosHome;
    }
    try {
        ApiWS.ListaProdutosHome_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "prods_home" + ApiWS.LV + VarsCategorias;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie)
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("ProdutosHome Keep");
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/home";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            //console.log(URLget + "?" + Parametros);
            ApiWS.addApiCalls(URLget + "?" + Parametros);
            $.ajax({
                type: "GET",
                url: URLget,
                data: LimpaCache + Parametros,
                beforeSend: function () { },
                error: function (e) { console.log("Falha ao listar produtos da página inicial"); },
                success: function (retorno) {
                    console.log("ProdutosHome new");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        JSON.parse(retorno);
                        ApiWS.Json = retorno;
                        //console.log("Retorno ListaProdutosHome:" + retorno);
                        //console.log("Endpoint:/"+ VersaoApi + "/produtos/home");
                        //console.log("Post:LOJA=" + ApiWS.LV + "&LvToken=" + Token + WsParamAdds);
                        if (retorno.indexOf("erro") < 0) {
                            try {
                                ApiWS.setCookie(NomeCookie, retorno, 2400);
                            } catch (e) { }
                        }
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    } catch (e) {
                        console.log("Falha ListaProdutosHome " + e.message + " - " + retorno);
                        if (ApiWS.ListaProdutosHome_Tentativas < 2) {
                            window.setTimeout("ApiWS.ListaProdutosHome()", 500);
                        }
                    }
                }
            });
        }
        ApiWS.EndTime("prodhome");
    } catch (e) { console.log("Falha ao listar produtos da página inicial:" + e.message); }
}


ApiWS.FuncAfter_ListaProdutosUltimos = null;
ApiWS.ListaProdutosUltimos_Tentativas = 0;
ApiWS.ListaProdutosUltimos = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaProdutosUltimos = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaProdutosUltimos;
    }
    try {
        ApiWS.ListaProdutosUltimos_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var Ultimos = getCookie("WS_LOJA_" + ApiWS.LV);
        if (Ultimos != "" && Ultimos != null && Ultimos != undefined) {
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/ultimos";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&ultimos=" + Ultimos;
            ApiWS.addApiCalls(URLget + "?" + Parametros);
            $.ajax({
                type: "GET",
                url: URLget,
                data: LimpaCache + Parametros,
                beforeSend: function () { },
                error: function (e) { console.log(e.message); console.log("Falha ao listar produtos vistos recentemente"); },
                success: function (retorno) {
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        JSON.parse(retorno);
                    } catch (e) {
                        console.log("Falha ListaProdutosUltimos " + e.message + " - " + retorno);
                        if (ApiWS.ListaProdutosUltimos_Tentativas < 2) {
                            window.setTimeout("ApiWS.ListaProdutosUltimos()", 500);
                        }
                    }
                    ApiWS.Json = retorno;
                    try { eval(FuncaoAfter + "()"); } catch (e) { }
                }
            });
        }
    } catch (e) { console.log(e.message); console.log("Falha ao listar produtos vistos recentemente:" + e.message); }
}


ApiWS.FuncAfter_ListaProdutosRelacionados = null;
ApiWS.ListaProdutosRelacionados_Tentativas = 0;
ApiWS.ListaProdutosRelacionados = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaProdutosRelacionados = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaProdutosRelacionados;
    }

    try {
        ApiWS.ListaProdutosRelacionados_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var Produto = $("#LV_HD_PROD_ID").val();
        var NomeCookie = "relacionados" + ApiWS.LV + Produto;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie)
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("Relacionados Keep");
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/relacionados";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&Produto=" + Produto;
            ApiWS.addApiCalls(URLget + "?" + Parametros);
            $.ajax({
                type: "GET",
                url: URLget,
                data: LimpaCache + Parametros,
                beforeSend: function () { },
                error: function (e) { console.log(e.message); console.log("Falha ao listar produtos vistos recentemente"); },
                success: function (retorno) {
                    console.log("Relacionados New");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        JSON.parse(retorno);
                        ApiWS.Json = retorno;
                        if (retorno.indexOf("erro") < 0) {
                            try {
                                ApiWS.setCookie(NomeCookie, retorno, 2400);
                            } catch (e) { }
                        }
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    } catch (e) {
                        console.log("Falha ListaProdutosRelacionados " + e.message + " - " + retorno);
                        if (ApiWS.ListaProdutosRelacionados_Tentativas < 2) {
                            window.setTimeout("ApiWS.ListaProdutosRelacionados()", 500);
                        }
                    }
                }
            });
        }
    } catch (e) { console.log(e.message); console.log("Falha ao listar produtos vistos recentemente:" + e.message); }
}


ApiWS.FuncAfter_ListaProdutosDestaque = null;
ApiWS.ListaProdutosDestaque_Tentativas = 0;
ApiWS.ListaProdutosDestaque = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaProdutosDestaque = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaProdutosDestaque;
    }
    try {
        ApiWS.ListaProdutosDestaque_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "destaques" + ApiWS.LV
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie)
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("ProdutosDestaque Keep");
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/destaques";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            ApiWS.addApiCalls(URLget + "?" + Parametros);
            $.ajax({
                type: "GET",
                url: URLget,
                data: LimpaCache + Parametros,
                beforeSend: function () { },
                error: function (e) { console.log(e.message); console.log("Falha ao listar produtos em destaque"); },
                success: function (retorno) {
                    console.log("ProdutosDestaque New");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        JSON.parse(retorno);
                        ApiWS.Json = retorno;
                        if (retorno.indexOf("erro") < 0) {
                            try {
                                ApiWS.setCookie(NomeCookie, retorno, 2400);
                            } catch (e) { }
                        }
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    } catch (e) {
                        console.log("Falha ListaProdutosDestaque " + e.message + " - " + retorno);
                        if (ApiWS.ListaProdutosDestaque_Tentativas < 2) {
                            window.setTimeout("ApiWS.ListaProdutosDestaque()", 500);
                        }
                    }
                }
            });
        }
    } catch (e) { console.log(e.message); console.log("Falha ao listar produtos em destaque:" + e.message); }
}


ApiWS.FuncAfter_ListaProdutosGrupos = null;
ApiWS.ListaProdutosGrupos_Tentativas = 0;
ApiWS.ListaProdutosGrupos = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaProdutosGrupos = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaProdutosGrupos;
    }
    try {
        ApiWS.ListaProdutosGrupos_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var URLget = UrlApi + "/" + VersaoApi + "/produtos/grupos";
        var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
        ApiWS.addApiCalls(URLget + "?" + Parametros);
        $.ajax({
            type: "GET",
            url: URLget,
            data: LimpaCache + Parametros,
            beforeSend: function () { },
            error: function (e) { console.log(e.message); console.log("Falha ao listar grupos da página inicial"); },
            success: function (retorno) {
                retorno = ApiWS.LimpaJson(retorno);
                try {
                    JSON.parse(retorno);
                    ApiWS.Json = retorno;
                    try { eval(FuncaoAfter + "()"); } catch (e) { }
                } catch (e) {
                    console.log("Falha ListaProdutosGrupos " + e.message + " - " + retorno);
                    if (ApiWS.ListaProdutosGrupos_Tentativas < 2) {
                        window.setTimeout("ApiWS.ListaProdutosGrupos()", 500);
                    }
                }
            }
        });
    } catch (e) { console.log(e.message); console.log("Falha ao listar grupos da página inicial:" + e.message); }
}


ApiWS.FuncAfter_ProdutoDados = null;
ApiWS.ProdutoDados_Tentativas = 0;
ApiWS.ProdutoDados = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ProdutoDados = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ProdutoDados;
    }
    try {
        ApiWS.ProdutoDados_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var Produto = $("#LV_HD_PROD_ID").val();
        var URLget = UrlApi + "/" + VersaoApi + "/produtos/dadosproduto";
        var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&Produto=" + Produto;
        ApiWS.addApiCalls(URLget + "?" + Parametros);
        $.ajax({
            type: "GET",
            url: URLget,
            data: LimpaCache + Parametros,
            beforeSend: function () { },
            error: function (e) { console.log(e.message); console.log("Falha ao listar grupos da página inicial"); },
            success: function (retorno) {
                ApiWS.Json = "";
                retorno = ApiWS.LimpaJson(retorno);
                try {
                    JSON.parse(retorno);
                    ApiWS.Json = retorno;
                    try { eval(FuncaoAfter + "()"); } catch (e) { }
                } catch (e) {
                    console.log("Falha ProdutoDados " + e.message + " - " + retorno);
                    if (ApiWS.ProdutoDados_Tentativas < 2) {
                        window.setTimeout("ApiWS.ProdutoDados()", 500);
                    }
                }
            }
        });
    } catch (e) { console.log(e.message); console.log("Falha ao listar grupos da página inicial:" + e.message); }
}


ApiWS.FuncAfter_ListaCategorias = null;
ApiWS.ListaCategorias_Tentativas = 0;
ApiWS.ListaCategorias = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaCategorias = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaCategorias;
    }
    try {
        ApiWS.ListaCategorias_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var VarsCategorias = $("#VarsCategorias").val();
        var NomeCookie = "categoriasv4" + ApiWS.LV + VarsCategorias;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie)
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("Categorias Keep");
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/categorias";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&VarsCategorias=" + VarsCategorias;
            ApiWS.addApiCalls(URLget + "?" + Parametros);
            $.ajax({
                type: "GET",
                url: URLget,
                data: LimpaCache + Parametros,
                beforeSend: function () { },
                error: function (e) { console.log(e.message); console.log("Falha ao listar categorias"); },
                success: function (retorno) {
                    console.log("Categorias New");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        JSON.parse(retorno);
                        ApiWS.Json = retorno;
                        if (retorno.indexOf("erro") < 0) {
                            try {
                                ApiWS.setCookie(NomeCookie, retorno, 2400);
                            } catch (e) { }
                        }
                        //console.log("FuncaoAfter:" + FuncaoAfter);
                        //console.log("OK");
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    } catch (e) {
                        console.log("Falha ListaCategorias " + e.message + " - " + retorno);
                        if (ApiWS.ListaCategorias_Tentativas < 2) {
                            window.setTimeout("ApiWS.ListaCategorias()", 500);
                        }
                    }
                }
            });
        }
    } catch (e) { console.log(e.message); console.log("Falha ao listar categorias:" + e.message); }
}


ApiWS.FuncAfter_ListaProdutosPags = null;
ApiWS.ListaProdutosPags_Tentativas = 0;
ApiWS.ListaProdutosPags = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaProdutosPags = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaProdutosPags;
    }
    try {
        ApiWS.ListaProdutosPags_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var InfoListagem = $("#HdVarInfoListagem").val();
        var URLget = UrlApi + "/" + VersaoApi + "/produtos/listagem";
        var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&InfoListagem=" + InfoListagem;
        ApiWS.addApiCalls(URLget + "?" + Parametros);
        $.ajax({
            type: "GET",
            url: URLget,
            data: LimpaCache + Parametros,
            beforeSend: function () { },
            error: function (e) { console.log(e.message); console.log("Falha ao listar produtos subpáginas"); },
            success: function (retorno) {
                retorno = ApiWS.LimpaJson(retorno);
                try {
                    JSON.parse(retorno);
                    ApiWS.Json = retorno;
                    try { eval(FuncaoAfter + "()"); } catch (e) { }
                } catch (e) {
                    console.log("Falha ListaProdutosPags " + e.message + " - " + retorno);
                    if (ApiWS.ListaProdutosPags_Tentativas < 2) {
                        window.setTimeout("ApiWS.ListaProdutosPags()", 500);
                    }
                }
            }
        });
    } catch (e) { console.log(e.message); console.log("Falha ao listar produtos subpáginas:" + e.message); }
}


ApiWS.FuncAfter_ListaFabricantes = null;
ApiWS.ListaFabricantes_Tentativas = 0;
ApiWS.ListaFabricantes = function (FuncaoAfter) {
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaFabricantes = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaFabricantes;
    }
    try {
        ApiWS.ListaFabricantes_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var InfoListagem = $("#HdVarInfoListagem").val();
        var NomeCookie = "fabricantes" + ApiWS.LV;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie)
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            console.log("Fabricantes Keep");
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/fabricantes";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            ApiWS.addApiCalls(URLget + "?" + Parametros);
            $.ajax({
                type: "GET",
                url: URLget,
                data: LimpaCache + Parametros,
                beforeSend: function () { },
                error: function (e) { console.log(e.message); console.log("Falha ao listar fabricantes"); },
                success: function (retorno) {
                    console.log("Fabricantes New");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        JSON.parse(retorno);

                        ApiWS.Json = retorno;
                        if (retorno.indexOf("erro") < 0) {
                            try {
                                ApiWS.setCookie(NomeCookie, retorno, 2400);
                            } catch (e) { }
                        }
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    } catch (e) {
                        console.log("Falha ListaFabricantes " + e.message + " - " + retorno);
                        if (ApiWS.ListaFabricantes_Tentativas < 2) {
                            window.setTimeout("ApiWS.ListaFabricantes()", 500);
                        }
                    }
                }
            });
        }
    } catch (e) { console.log(e.message); console.log("Falha ao listar fabricantes:" + e.message); }
}


ApiWS.FuncAfter_ListaBanners = null;
ApiWS.ListaBanners_Tentativas = 0;
ApiWS.ListaBanners = function (FuncaoAfter) {
    ApiWS.StartTime();
    var etapa = $("#HdEtapaLoja").val();

    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaBanners = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaBanners;
    }
    var BUSCA = "";
    try { BUSCA = $("#LV_HD_BUSCA_VALOR").val(); } catch (e) { }
    if (BUSCA != undefined && BUSCA != "" && BUSCA != null) {
        ApiWS.Json = null;
        try { eval(FuncaoAfter + "()"); } catch (e) { }
    } else {
        try {
            ApiWS.ListaBanners_Tentativas++;
            var Token = $("#HdTokenLojaTemp").val();
            var InfoListagem = $("#HdVarInfoListagem").val();
            var NomeCookie = "banners_" + ApiWS.LV + InfoListagem;
            while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
                NomeCookie = NomeCookie.replace("|", "").replace("_", "");
            }
            var Cookie = ApiWS.getCookie(NomeCookie)
            //console.log("banners infos:" + InfoListagem);
            if (Cookie != "" && Cookie != null && Cookie != undefined) {
                ApiWS.Json = Cookie;
                console.log("banners keep:");
                try { eval(FuncaoAfter + "()"); } catch (e) { }
            } else {
                var URLget = UrlApi + "/" + VersaoApi + "/banners";
                var Parametros = "LOJA=" + ApiWS.LV + "&LVetapa=" + etapa + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&InfoListagem=" + InfoListagem;
                ApiWS.addApiCalls(URLget + "?" + Parametros);
                $.ajax({
                    type: "GET",
                    url: URLget,
                    data: LimpaCache + Parametros,
                    beforeSend: function () { },
                    error: function (e) { console.log("Erro ao lista banners." + e.message); console.log("Falha ao listar banners"); },
                    success: function (retorno) {
                        console.log("banners new");
                        retorno = ApiWS.LimpaJson(retorno);
                        try {
                            JSON.parse(retorno);
                            ApiWS.Json = retorno;
                            //console.log("banners:" + ApiWS.Json);
                            if (retorno.indexOf("erro") < 0) {
                                try {
                                    ApiWS.setCookie(NomeCookie, retorno, 2400);
                                } catch (e) { }
                            }
                            try { eval(FuncaoAfter + "()"); } catch (e) { }
                        } catch (e) {
                            console.log("Falha ListaBanners " + e.message + " - " + retorno);
                            if (ApiWS.ListaBanners_Tentativas < 2) {
                                window.setTimeout("ApiWS.ListaBanners()", 500);
                            }
                        }
                    }
                });
            }
        } catch (e) { console.log(e.message); console.log("Falha ao listar banners:" + e.message); }
    }
}


ApiWS.FuncAfter_InfosLojas = null;
ApiWS.InfosLojas_Tentativas = 0;
ApiWS.InfosLojas = function (FuncaoAfter) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_InfosLojas = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_InfosLojas;
    }
    try {
        ApiWS.InfosLojas_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "infoloja" + ApiWS.LV;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie)
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            console.log("InfosLojas Keep");
            try { eval(FuncaoAfter + "()"); } catch (e) { }
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/InfosLojas";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            ApiWS.addApiCalls(URLget + "?" + Parametros);
            $.ajax({
                type: "GET",
                url: URLget,
                data: LimpaCache + Parametros,
                beforeSend: function () { },
                error: function (e) {
                    console.log("Erro ao verificar informações da loja.(" + "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + " / " + e.message + ")");
                    console.log("Erro ao verificar informações da loja");
                },
                success: function (retorno) {
                    //console.log("retorno info loja:" + retorno);
                    console.log("InfosLojas new");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        JSON.parse(retorno);
                        ApiWS.Json = retorno;
                        //console.log("InfosLojas:" + ApiWS.Json + " (" + "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + ")");
                        if (retorno.indexOf("erro") < 0) {
                            try {
                                ApiWS.setCookie(NomeCookie, retorno, 2400);
                            } catch (e) { }
                        }
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    } catch (e) {
                        console.log("Falha InfosLojas " + e.message + " - " + retorno);
                        if (ApiWS.InfosLojas_Tentativas < 2) {
                            window.setTimeout("ApiWS.InfosLojas()", 500);
                        }
                    }
                }
            });
        }
        ApiWS.EndTime("infoloja");
    } catch (e) { console.log(e.message); console.log("Erro ao verificar informações da loja:" + e.message); }
}


ApiWS.CadastraNews = function (Nome, Email, FuncaoAfter) {
    try {
        var Token = $("#HdTokenLojaTemp").val();
        if (Nome == "") {
            ApiWS.Json = "{\"status\":500,\"mensagem\":\"Preencha o campo nome.\"}";
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            return;
        }
        if (Email == "") {
            ApiWS.Json = "{\"status\":500,\"mensagem\":\"Preencha o campo e-mail.\"}";
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            return;
        }
        $.ajax({
            type: "POST",
            url: UrlApi + "/" + VersaoApi + "/cadastra-news",
            data: LimpaCache + "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&Nome=" + Nome + "&Email=" + Email,
            beforeSend: function () { },
            error: function (e) { console.log("Erro ao cadastrar email de newsletter." + e.message); console.log("Erro ao cadastrar email de newsletter"); },
            success: function (retorno) {
                ApiWS.Json = retorno;
                try { eval(FuncaoAfter + "()"); } catch (e) { }
            }
        });
    } catch (e) { console.log(e.message); console.log("Erro ao cadastrar email de newsletter:" + e.message); }
}


ApiWS.ImportFile = function (file, FuncaoAfter) {
    try {
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "import_file_" + ApiWS.LV;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie)
        console.log("import_file:" + file);
        console.log("FuncaoAfter:" + FuncaoAfter);
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.FileReturn = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/importfile";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&File=" + file;
            ApiWS.addApiCalls(URLget + "?" + Parametros);
            $.ajax({
                type: "GET",
                url: URLget,
                data: LimpaCache + Parametros,
                beforeSend: function () { },
                error: function (e) { console.log("Erro ao tentar importar arquivo." + e.message); },
                success: function (retorno) {
                    console.log("retorno import ok");
                    ApiWS.FileReturn = retorno;

                    try {
                        ApiWS.setCookie(NomeCookie, retorno, 2400);
                    } catch (e) { }
                    try { eval(FuncaoAfter + "()"); } catch (e) { }
                }
            });
        }
    } catch (e) { console.log(e.message); console.log("Falha ao importar arquivo " + file + ":" + e.message); }
}


ApiWS.setCookie = function (name, value, seconds) {
    try {
        var d = new Date();
        var m = d.getMinutes();
        var time = d.getHours();
        time = "";
        var Token = $("#HdTokenLojaTemp").val();
        var CliId = $("#HD_LVCLI_ID").val();
        if (CliId != undefined && CliId != null && CliId != "" && CliId != "0") {
            Token += "_" + CliId;
        }
        var B2B = $("#LV_USU_B2B").val();
        var URL = window.location.href;
        //if (URL.indexOf(":9696") >= 0) { return ""; }
        //localStorage[time + Token + name + B2B] = value;
        localStorage[Token + name + B2B] = value;
    } catch (e) { console.log(e.message); }
}


ApiWS.getCookie = function (c_name) {
    try {
        var d = new Date();
        var m = d.getMinutes();
        var time = d.getHours();
        time = "";
        var Token = $("#HdTokenLojaTemp").val();
        var CliId = $("#HD_LVCLI_ID").val();
        if (CliId != undefined && CliId != null && CliId != "" && CliId != "0") {
            Token += "_" + CliId;
        }
        var B2B = $("#LV_USU_B2B").val();
        var URL = window.location.href;
        if (URL.indexOf(":9696") >= 0 || ApiWS.LVdashview == "1") { return ""; }
        //c_value = localStorage[time + Token + c_name + B2B];
        c_value = localStorage[Token + c_name + B2B];
        c_value = "";
        return c_value;
    } catch (e) { return ""; }
};


ApiWS.LimpaJson = function (json) {
    try {
        if (json.indexOf("}{") >= 0) {
            json = json.replace("}{", "}__DIVISAO__{");
            json = json.split("__DIVISAO__")[0];
        }
    } catch (e) { }
    return json;
}


ApiWS.startTime = null;
ApiWS.endTime = null;
ApiWS.StartTime = function () {
    ApiWS.startTime = new Date();
};
ApiWS.EndTime = function (ID) {
    //ApiWS.endTime = new Date();
    //var timeDiff = ApiWS.endTime - ApiWS.startTime; //in ms
    // strip the ms
    //timeDiff /= 1000;
    // get seconds 
    //var seconds = Math.round(timeDiff);
    //console.log(ID + ":" + seconds + "");
}


var WsApiCall = {};
var WsApiCalls = [];
ApiWS.addApiCalls = function (url) {
    try {
        WsApiCall = {
            _url: url
        }
        WsApiCalls.push(WsApiCall);
    } catch (e) { return ""; }
};