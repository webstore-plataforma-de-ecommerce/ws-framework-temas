var SetEndPointRestCalls = 'http://woodlight.com.br';﻿/* 23-07-2021 */

var ApiWS = {}
var UrlApi = "";
var VersaoApi = "api-loja-v2";
var WsParamAdds = "";


ApiWS.Token = null;
ApiWS.FileReturn = null;
ApiWS.Json = null;
ApiWS.LV = null;
ApiWS.LVdashview = null;
ApiWS.objetosReturn = null;


ApiWS.ApiStart = function () {
    try {


        //funcaoWsToken();

        console.log("WsJsVrs23-08-2019-08-53");

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

        try {
            var CookieDashview = "";

            if (UrlNavegador.indexOf("?dashview") >= 0 || (UrlNavegador.indexOf("localhost") >= 0 && UrlNavegador.indexOf("localhost:3000") < 0)) {
                UseCdn = false;
                localStorage["dashview"] = "1";
                CookieDashview = localStorage["dashview"];
            }
            
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
        var GetTypeCdn = $("#HD_TYPE_CDN").val();
        var GetTypeCdnApi = $("#HD_TYPE_CDN_API").val();
        var CdnOption = $("#HD_CDN_OPT").val();
        var CdnKind = $("#HD_CDN_KIND").val();
        //console.log("GetTypeCdn:" + GetTypeCdn);

        var CdnKindChoice = "";
        var CdnKindChoiceMatch = "";
        try {

            if (CdnKind != "" && CdnOption != "" && CdnKind != undefined && CdnOption != undefined) {

                var objCdnOptions = JSON.parse(CdnOption);

                for (o = 0; o < objCdnOptions.length; o++) {

                    if (objCdnOptions[o].kind == CdnKind) {
                        CdnKindChoice = objCdnOptions[o].url;
                        CdnKindChoiceMatch = "1";
                    } else if (CdnKindChoiceMatch == "") {
                        CdnKindChoice = objCdnOptions[o].url;
                    }

                }

            }

        } catch (e) { }

        console.log("CdnKindChoice:" + CdnKindChoice);
        console.log("CdnKind:" + CdnKind);
        //console.log("CdnOption:" + CdnOption);


        if (UrlNavegador.indexOf(":3000") > 0) {
            GetTypeCdn = "wslojas.com.br";
            ApiWS.LVdashview = "1";
        }

        //UseCdn = true;

        if (typeof UseCdn !== 'undefined') {
            try {

                if (UseCdn == true) {

                    if (CdnKindChoice != "") {

                        console.log("CDN_Option_" + CdnKind + "");
                        UrlApi = CdnKindChoice;

                    } else {

                        console.log("XCDNTRUE001");

                        /*if (GetTypeCdn.indexOf("wslojas.com.br") >= 0) {
                            UrlApi = "https://apilojaws.wslojas.com.br";
                        } else if (GetTypeCdn.indexOf("plataformawebstore.com.br") >= 0) {
                            UrlApi = "https://apilojaws.plataformawebstore.com.br";
                        }
                        else {
                            UrlApi = "https://apilojaws.wslojas.com.br";
                        }*/

                        UrlApi = "https://apilojaws.wslojas.com.br";
                        /*UrlApi = "https://cdn-api-ws5.webstore.com.br";*/

                        if (GetTypeCdnApi != "" && GetTypeCdnApi != undefined && GetTypeCdnApi != null) {
                            UrlApi = GetTypeCdnApi;
                        }

                    }

                }

            } catch (e) { }
        }

        

        //console.log("Token:" + Token);
        //console.log("LV:" + ApiWS.LV);

        window.setInterval("keepWsBrand()", 3000);

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

    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("M10");

    try {
        ApiWS.ListaProdutosHome_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "prods_home" + ApiWS.LV + VarsCategorias;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "M30")
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("ProdutosHome Keep");
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/home";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            //console.log(URLget + "?" + Parametros);
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
                beforeSend: function () { },
                error: function (e) { console.log("Falha ao listar produtos da página inicial"); },
                success: function (retorno) {
                    console.log("ProdutosHome new");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        var objverif = JSON.parse(retorno);
                        ApiWS.Json = retorno;

                        if (!ApiWS.Json || objverif.erro > 0) {
                            ApiWS.DoAgain("ApiWS.ListaProdutosHome()", 2000, ApiWS.ListaProdutosHome_Tentativas);
                        } else {

                            //console.log("Retorno ListaProdutosHome:" + retorno);
                            //console.log("Endpoint:/"+ VersaoApi + "/produtos/home");
                            //console.log("Post:LOJA=" + ApiWS.LV + "&LvToken=" + Token + WsParamAdds);
                            if (retorno.indexOf("erro") < 0) {
                                try {
                                    ApiWS.setCookie(NomeCookie, retorno, "M30");
                                } catch (e) { }
                            }
                            try { eval(FuncaoAfter + "()"); } catch (e) { }

                        }
                    } catch (e) {
                        console.log("Falha ListaProdutosHome " + e.message + " - " + retorno);
                        ApiWS.DoAgain("ApiWS.ListaProdutosHome()", 2000, ApiWS.ListaProdutosHome_Tentativas);
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

    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("M");

    try {
        ApiWS.ListaProdutosUltimos_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var Ultimos = getCookie("WS_LOJA_" + ApiWS.LV);
        if (Ultimos != "" && Ultimos != null && Ultimos != undefined) {
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/ultimos";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&ultimos=" + Ultimos;
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
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

    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("M10");

    try {
        ApiWS.ListaProdutosRelacionados_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var Produto = $("#LV_HD_PROD_ID").val();
        var NomeCookie = "relacionados" + ApiWS.LV + Produto;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "H")
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("Relacionados Keep");
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/relacionados";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&Produto=" + Produto;
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
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
                                ApiWS.setCookie(NomeCookie, retorno, "H");
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

    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("M30");

    try {
        ApiWS.ListaProdutosDestaque_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "destaques" + ApiWS.LV
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "H")
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("ProdutosDestaque Keep");
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/destaques";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
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
                                ApiWS.setCookie(NomeCookie, retorno, "H");
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

    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("H");

    try {
               
        var Token = $("#HdTokenLojaTemp").val();

        var NomeCookie = "grupos" + ApiWS.LV
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "H")

        if (Cookie != "" && Cookie != null && Cookie != undefined) {

            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("ProdutosGrupos Keep");

        } else {

            ApiWS.ListaProdutosGrupos_Tentativas++;
            var Token = $("#HdTokenLojaTemp").val();
            var URLget = UrlApi + "/" + VersaoApi + "/produtos/grupos";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
                beforeSend: function () { },
                error: function (e) { console.log(e.message); console.log("Falha ao listar grupos da página inicial"); },
                success: function (retorno) {
                    retorno = ApiWS.LimpaJson(retorno);
                    try {

                        var objverif = JSON.parse(retorno);
                        ApiWS.Json = retorno;

                        console.log("ProdutosGrupos New");

                        if (retorno.indexOf("erro") < 0) {
                            try {
                                ApiWS.setCookie(NomeCookie, retorno, "H");
                            } catch (e) { }
                        }

                        if (!ApiWS.Json || objverif.erro > 0) {
                            console.log("Falha grupos produtos, tentando novamente...");
                            ApiWS.DoAgain("ApiWS.ListaProdutosGrupos()", 2000, ApiWS.ListaProdutosGrupos_Tentativas);
                        } else {
                            try { eval(FuncaoAfter + "()"); } catch (e) { }
                        }

                    } catch (e) {
                        console.log("Falha ListaProdutosGrupos " + e.message + " - " + retorno);
                        ApiWS.DoAgain("ApiWS.ListaProdutosGrupos()", 2000, ApiWS.ListaProdutosGrupos_Tentativas);
                    }
                }
            });

        }
                       
    } catch (e) { console.log(e.message); console.log("Falha ao listar grupos da página inicial:" + e.message); }
}


ApiWS.FuncAfter_ProdutoDados = null;
ApiWS.ProdutoDados_Tentativas = 0;
ApiWS.ProdutoDados = function (FuncaoAfter) {
    ApiWS.StartTime();
    //console.log("ProdutoDados Start");
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ProdutoDados = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ProdutoDados;
    }
    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("M");
    try {
        ApiWS.ProdutoDados_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var Produto = $("#LV_HD_PROD_ID").val();
        var URLget = UrlApi + "/" + VersaoApi + "/produtos/dadosproduto";
        var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&Produto=" + Produto;
        ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
        $.ajax({
            type: "GET",
            url: URLget,
            data: Parametros + cacheAdjust,
            beforeSend: function () { },
            error: function (e) {
                console.log(e.message);
                console.log("Falha ao exibir dados do produto.");
                ApiWS.DoAgain("ApiWS.ProdutoDados()", 2000, ApiWS.ProdutoDados_Tentativas);
            },
            success: function (retorno) {
                //console.log(retorno);
                ApiWS.Json = "";
                retorno = ApiWS.LimpaJson(retorno);
                try {
                    var objverif = JSON.parse(retorno);
                    ApiWS.Json = retorno;
                    if (!ApiWS.Json || objverif.erro > 0) {
                        ApiWS.DoAgain("ApiWS.ProdutoDados()", 2000, ApiWS.ProdutoDados_Tentativas);
                    } else {
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    }
                } catch (e) {
                    console.log("Falha ProdutoDados " + e.message + " - " + retorno);
                    ApiWS.DoAgain("ApiWS.ProdutoDados()", 2000, ApiWS.ProdutoDados_Tentativas);
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
    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("D");
    try {
        ApiWS.ListaCategorias_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var VarsCategorias = $("#VarsCategorias").val();

        var VarsFiltrosListagem = "";
        try { VarsFiltrosListagem = $("#HdFiltrosListagem").val(); } catch (e) { }

        var VarsFiltrosListagemJson = "";
        try { VarsFiltrosListagemJson = $("#HdFiltrosListagemJson").val(); } catch (e) { }

        var FieldsCategoriasId = "";
        var DptId = $("#HD_CAT_ID").val();
        var DptTipo = $("#HD_CAT_TIPO").val();

        var NomeCookie = "categoriasv4" + ApiWS.LV + VarsCategorias + "_" + DptTipo + "_" + DptId + "_" + VarsFiltrosListagem;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "D")
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("Categorias Keep");
        } else {

            var URLget = UrlApi + "/" + VersaoApi + "/categorias";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&VarsCategorias=" + VarsCategorias + "&DptTipo=" + DptTipo + "&DptId=" + DptId + "&VarsFiltrosListagem=" + VarsFiltrosListagem + "&VarsFiltrosListagemJson=" + VarsFiltrosListagemJson;

            //console.log("Parametros:" + Parametros);
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
                beforeSend: function () { },
                error: function (e) { console.log(e.message); console.log("Falha ao listar categorias"); },
                success: function (retorno) {
                    console.log("Categorias New");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        var objverif = JSON.parse(retorno);
                        ApiWS.Json = retorno;

                        if (!ApiWS.Json || objverif.erro > 0) {
                            ApiWS.DoAgain("ApiWS.ListaCategorias()", 2000, ApiWS.ListaCategorias_Tentativas);
                        } else {

                            if (retorno.indexOf("erro") < 0) {
                                try {
                                    ApiWS.setCookie(NomeCookie, retorno, "D");
                                } catch (e) { }
                            }
                            //console.log("FuncaoAfter:" + FuncaoAfter);
                            //console.log("OK");
                            try { eval(FuncaoAfter + "()"); } catch (e) { }
                        }
                    } catch (e) {
                        console.log("Falha ListaCategorias " + e.message + " - " + retorno);
                        ApiWS.DoAgain("ApiWS.ListaCategorias()", 2000, ApiWS.ListaCategorias_Tentativas);
                    }
                }
            });
        }
    } catch (e) { console.log(e.message); console.log("Falha ao listar categorias:" + e.message); }
}


ApiWS.FuncAfter_ListaFiltros = null;
ApiWS.ListaFiltros_Tentativas = 0;
ApiWS.ListaFiltros = function (FuncaoAfter, Categoria, FiltroSearch, Fabricante, Filtro1, Filtro2, Filtro3) {
    ApiWS.StartTime();

    if (!FuncaoAfter) { console.log("Falha ListarFiltros: FuncaoAfter(1) é obrigatório. Envie o nome da função para ser chamada após o retorno dos dados."); return; }
    if (!Categoria) { console.log("Falha ListarFiltros: Categoria(2) é obrigatória. Envie o ID da categoria de base para listagem dos filtros."); return; }
    if (!FiltroSearch) { console.log("Falha ListarFiltros: FiltroSearch(2) é obrigatório. Envie o ID da característica para listagem dos filtros."); return; }

    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaFiltros = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaFiltros;
    }
    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("D");
    try {
        ApiWS.ListaFiltros_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();

        var NomeCookie = "filtros_" + ApiWS.LV + "_" + Fabricante + "_" + Categoria + "_" + FiltroSearch + "_" + Filtro1 + "_" + Filtro2 + "_" + Filtro3;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "D")
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
            console.log("Filtros Keep");
        } else {

            var URLget = UrlApi + "/" + VersaoApi + "/categorias";
            var Parametros = "LOJA=" + ApiWS.LV +
                "&LVdashview=" + ApiWS.LVdashview +
                "&LvToken=" + Token + WsParamAdds +
                "&TipoChamada=ListaFiltros" +
                "&FiltrosCategoria=" + Categoria +
                "&FiltrosFabricante=" + Fabricante +
                "&FiltroSearch=" + FiltroSearch +
                "&FiltrosFiltro1=" + Filtro1 +
                "&FiltrosFiltro2=" + Filtro2 +
                "&FiltrosFiltro3=" + Filtro3;

            //console.log("Parametros:" + URLget + "?" + Parametros);
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
                beforeSend: function () { },
                error: function (e) { console.log(e.message); console.log("Falha ao listar filtros"); },
                success: function (retorno) {
                    console.log("Filtros New");
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        var objverif = JSON.parse(retorno);
                        ApiWS.Json = retorno;

                        if (ApiWS.Json) {

                            if (retorno.indexOf("erro") < 0) {
                                try {
                                    ApiWS.setCookie(NomeCookie, retorno, "D");
                                } catch (e) { }
                            }

                            try { eval(FuncaoAfter + "()"); } catch (e) { }

                        }
                    } catch (e) {
                        console.log("Falha ListaFiltros " + e.message + " - " + retorno);
                    }
                }
            });
        }
    } catch (e) {
        console.log(e.message); console.log("Falha ao listar filtros:" + e.message);
    }
}



ApiWS.FuncAfter_ListaProdutosPags = null;
ApiWS.ListaProdutosPags_Tentativas = 0;
ApiWS.ListaProdutosPags = function (FuncaoAfter, PageNum) {
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_ListaProdutosPags = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_ListaProdutosPags;
    }
    var pagina = "";
    console.log("PageNum : " + PageNum);
    if (PageNum) {
        pagina = "&num_pagina=" + PageNum;
        console.log("buscando produtos " + pagina);
    }
    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("M10");
    var VarsFiltrosListagem = "";
    try { VarsFiltrosListagem = $("#HdFiltrosListagem").val(); } catch (e) { }
    var VarsFiltrosListagemJson = "";
    try { VarsFiltrosListagemJson = $("#HdFiltrosListagemJson").val(); } catch (e) { }
    try {
        ApiWS.ListaProdutosPags_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val() + pagina.replace("_", "");
        var InfoListagem = $("#HdVarInfoListagem").val();
        var SubEtapaWs = $("#HdSubEtapa").val();
        var URLget = UrlApi + "/" + VersaoApi + "/produtos/listagem";
        var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&SubEtapaWs=" + SubEtapaWs + "&InfoListagem=" + InfoListagem + "&VarsFiltrosListagem=" + VarsFiltrosListagem + "&VarsFiltrosListagemJson=" + VarsFiltrosListagemJson + pagina;
        ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
        $.ajax({
            type: "GET",
            url: URLget,
            data: Parametros + cacheAdjust,
            beforeSend: function () { },
            error: function (e) { console.log(e.message); console.log("Falha ao listar produtos subpáginas"); },
            success: function (retorno) {
                //console.log("retorno produtos listagem:" + retorno);
                retorno = ApiWS.LimpaJson(retorno);
                try {
                    var objverif = JSON.parse(retorno);
                    ApiWS.Json = retorno;
                    if (!ApiWS.Json || objverif.erro > 0) {
                        ApiWS.DoAgain("ApiWS.ListaProdutosPags()", 2000, ApiWS.ListaProdutosPags_Tentativas);
                    } else {
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    }
                } catch (e) {
                    console.log("Falha ListaProdutosPags " + e.message + " - " + retorno);
                    ApiWS.DoAgain("ApiWS.ListaProdutosPags()", 2000, ApiWS.ListaProdutosPags_Tentativas);
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
    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("H");
    try {
        ApiWS.ListaFabricantes_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var InfoListagem = $("#HdVarInfoListagem").val();
        var NomeCookie = "fabricantes" + ApiWS.LV;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "D")
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            console.log("Fabricantes Keep");
            ApiWS.Json = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/fabricantes";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
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
                                ApiWS.setCookie(NomeCookie, retorno, "D");
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

    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("H");

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
            var Cookie = ApiWS.getCookie(NomeCookie, "", "H")
            //console.log("banners infos:" + InfoListagem);
            if (Cookie != "" && Cookie != null && Cookie != undefined) {
                ApiWS.Json = Cookie;
                console.log("banners keep:");
                try { eval(FuncaoAfter + "()"); } catch (e) { }
            } else {
                var URLget = UrlApi + "/" + VersaoApi + "/banners";
                var Parametros = "LOJA=" + ApiWS.LV + "&LVetapa=" + etapa + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&InfoListagem=" + InfoListagem;
                ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
                $.ajax({
                    type: "GET",
                    url: URLget,
                    data: Parametros + cacheAdjust,
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
                                    ApiWS.setCookie(NomeCookie, retorno, "H");
                                } catch (e) { }
                            }
                            try { eval(FuncaoAfter + "()"); } catch (e) { }
                        } catch (e) {
                            console.log("Falha ListaBanners " + e.message + " - " + retorno);
                            ApiWS.DoAgain("ApiWS.ListaBanners()", 2000, ApiWS.ListaBanners_Tentativas);
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
    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("H");
    try {
        ApiWS.InfosLojas_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "infoloja" + ApiWS.LV;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "H")
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            console.log("InfosLojas Keep");
            try { eval(FuncaoAfter + "()"); } catch (e) { }
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/InfosLojas";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
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
                                ApiWS.setCookie(NomeCookie, retorno, "H");
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


ApiWS.FuncAfter_PaginasAdd = null;
ApiWS.PaginasAdd_Tentativas = 0;
ApiWS.PaginasAdd = function (FuncaoAfter, PaginaSearch) {

    ApiWS.LV = $("#HD_LV_ID").val();

    console.log("Iniciando PaginasAdd");
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_PaginasAdd = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_PaginasAdd;
    }
    var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("H");
    try {
        ApiWS.PaginasAdd_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "paginasadd" + ApiWS.LV;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var Cookie = ApiWS.getCookie(NomeCookie, "", "H")
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.Json = Cookie;
            console.log("PaginasAdd Keep");
            try { eval(FuncaoAfter + "()"); } catch (e) { }
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/PaginasAdd";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&LvPage=" + PaginaSearch;
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
                beforeSend: function () { },
                error: function (e) {
                    console.log("Erro ao verificar paginas add da loja.(" + "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&LvPage=" + PaginaSearch + " / " + e.message + ")");
                    //window.open(URLget + "?" + Parametros + cacheAdjust);
                },
                success: function (retorno) {
                    //console.log("retorno info loja:" + retorno);
                    console.log("PaginasAdd new");
                    //window.open(URLget + "?" + Parametros + cacheAdjust);
                    retorno = ApiWS.LimpaJson(retorno);
                    try {
                        JSON.parse(retorno);
                        ApiWS.Json = retorno;
                        objetos.PaginasAdd = retorno;
                        if (retorno.indexOf("erro") < 0) {
                            try {
                                ApiWS.setCookie(NomeCookie, retorno, "H");
                            } catch (e) { }
                        }
                        try { eval(FuncaoAfter + "()"); } catch (e) { }
                    } catch (e) {
                        console.log("Falha PaginasAdd " + e.message + " - " + retorno);
                    }
                }
            });
        }
        ApiWS.EndTime("PaginasAdd");
    } catch (e) { console.log(e.message); console.log("Erro ao verificar informações da loja(PaginasAdd):" + e.message); }
}


ApiWS.resultLogin = null;
ApiWS.Login = function (email, senha, FuncaoAfter) {

    try {
        var VAR_EMAIL = email;
        var VAR_SENHA = senha;
        var LV_ID = $("#HD_LV_ID").val();

        if (VAR_EMAIL == "") {
            ApiWS.resultLogin = ("Preencha o campo E-Mail");
            eval(FuncaoAfter + "()");
            return false;
        }

        if (VAR_SENHA == "") {
            ApiWS.resultLogin = ("Preencha o campo Senha");
            eval(FuncaoAfter + "()");
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/loginAJAX/login.aspx",
            data: "tipo=logar&LV_ID=" + LV_ID + "&LOGIN=" + VAR_EMAIL + "&SENHA=" + VAR_SENHA,
            beforeSend: function () {

                ApiWS.resultLogin = ("Aguarde... verificando os dados.");
                eval(FuncaoAfter + "()");

            },
            error: function (request, status, error) {

                ApiWS.resultLogin = ("Não foi possível efetuar o login, tente novamente.<!--" + request.responseText + "-->");
                eval(FuncaoAfter + "()");

            },
            success: function (retorno) {

                if (retorno.indexOf("CODIGO:") >= 0) {
                    ApiWS.resultLogin = ("Login efetuado com sucesso, aguarde.");
                    window.location.href = window.location.href;
                }
                else if (retorno.indexOf("AFTERLINK:") >= 0) {
                    ApiWS.resultLogin = ("Login efetuado com sucesso, aguarde.");
                    window.location.href = window.location.href;
                }
                else {
                    ApiWS.resultLogin = (retorno);
                }
                eval(FuncaoAfter + "()");

            }
        });

    } catch (e) { console.log("Falha ao fazer login:" + e.message); }

}



ApiWS.FuncAfter_Carrinho = null;
ApiWS.Carrinho_Tentativas = 0;
ApiWS.Carrinho = function (FuncaoAfter) {

    ApiWS.LV = $("#HD_LV_ID").val();

    console.log("Iniciando Carrinho OnPage");
    ApiWS.StartTime();
    if (FuncaoAfter != null && FuncaoAfter != "") {
        ApiWS.FuncAfter_Carrinho = FuncaoAfter;
    } else {
        FuncaoAfter = ApiWS.FuncAfter_Carrinho;
    }
    try {
        ApiWS.Carrinho_Tentativas++;
        var Token = $("#HdTokenLojaTemp").val();
        var URLget = endPointRestCalls + "/CheckoutSmart/CarrinhoSmart.aspx";
        var Parametros = "tipo=CarrinhoOnPageVrs2&LV_ID=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;
        ApiWS.addApiCalls(URLget + "?" + Parametros);
        $.ajax({
            type: "GET",
            url: URLget,
            data: Parametros,
            beforeSend: function () { },
            error: function (e) {
                console.log("Erro ao verificar carrinho.(" + "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + " / " + e.message + ")");
            },
            success: function (retorno) {
                console.log("Carrinho retornou");
                retorno = ApiWS.LimpaJson(retorno);
                try {
                    JSON.parse(retorno);
                    objetos.Carrinho = retorno;
                    try { eval(FuncaoAfter + "()"); } catch (e) { }
                } catch (e) {
                    console.log("Falha Carrinho " + e.message + " - " + retorno);
                }
            }
        });
    ApiWS.EndTime("Carrinho");
    } catch (e) { console.log(e.message); console.log("Erro ao verificar informações da loja(Carrinho):" + e.message); }

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
            data: "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&Nome=" + Nome + "&Email=" + Email,
            beforeSend: function () { },
            error: function (e) { console.log("Erro ao cadastrar email de newsletter." + e.message); console.log("Erro ao cadastrar email de newsletter"); },
            success: function (retorno) {
                ApiWS.Json = retorno;
                try { eval(FuncaoAfter + "()"); } catch (e) { }
            }
        });
    } catch (e) { console.log(e.message); console.log("Erro ao cadastrar email de newsletter:" + e.message); }
}


ApiWS.Confirm301 = function (domain) {
    try {

        var URL = window.location.href;
        URL = URL.replace(domain, "");
        URL = URL.replace(domain.replace("www.", ""), "");

        console.log("starting 301:" + URL);

        if (URL.indexOf("logoff") < 0) {

            if (URL.length > 10) {

                console.log("Analisando 301");

                $.ajax({
                    type: "GET",
                    url: UrlApi + "/" + VersaoApi + "/InfosLojas",
                    data: "LOJA=" + ApiWS.LV + "&analisa301=" + URL,
                    beforeSend: function () { },
                    error: function (e) { console.log("Falha analisando 301"); },
                    success: function (retorno) {

                        console.log("301:" + retorno);
                        if (retorno.indexOf("REDIRECT:") >= 0) {
                            window.location.href = domain + retorno.replace("REDIRECT:", "");
                        }

                    }
                });

            }
        }

    } catch (e) { console.log(e.message); console.log("Erro ao cadastrar email de newsletter:" + e.message); }
}


ApiWS.ImportFile = function (file, FuncaoAfter) {
    try {
        var Token = $("#HdTokenLojaTemp").val();
        var NomeCookie = "import_file_" + ApiWS.LV;
        while (NomeCookie.indexOf("|") >= 0 || NomeCookie.indexOf("_") >= 0) {
            NomeCookie = NomeCookie.replace("|", "").replace("_", "");
        }
        var cacheAdjust = "&cachetype=" + ApiWS.cacheTime("M30");
        var Cookie = ApiWS.getCookie(NomeCookie, "", "D")
        console.log("import_file:" + file);
        console.log("FuncaoAfter:" + FuncaoAfter);
        if (Cookie != "" && Cookie != null && Cookie != undefined) {
            ApiWS.FileReturn = Cookie;
            try { eval(FuncaoAfter + "()"); } catch (e) { }
        } else {
            var URLget = UrlApi + "/" + VersaoApi + "/importfile";
            var Parametros = "LOJA=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds + "&File=" + file;
            ApiWS.addApiCalls(URLget + "?" + Parametros + cacheAdjust);
            $.ajax({
                type: "GET",
                url: URLget,
                data: Parametros + cacheAdjust,
                beforeSend: function () { },
                error: function (e) { console.log("Erro ao tentar importar arquivo." + e.message); },
                success: function (retorno) {
                    console.log("retorno import ok");
                    ApiWS.FileReturn = retorno;

                    try {
                        ApiWS.setCookie(NomeCookie, retorno, "D");
                    } catch (e) { }
                    try { eval(FuncaoAfter + "()"); } catch (e) { }
                }
            });
        }
    } catch (e) { console.log(e.message); console.log("Falha ao importar arquivo " + file + ":" + e.message); }
}


ApiWS.nameCookie = function (name, value, tipo) {
    var d = new Date();
    var minute = d.getMinutes();
    var hour = d.getHours();
    var day = d.getDate() + "-" + d.getMonth();
    var minutePlus = 0;

    if (minute < 30) { minutePlus = 1; }
    else { minutePlus = 2; }

    var cacheUse = "";

    if (tipo == "D") { cacheUse = "_" + day; }
    if (tipo == "H") { cacheUse = "_" + day + "_" + hour; }
    if (tipo == "M10") { cacheUse = "_" + day + "_" + hour + "_" + minute.toString().substring(0, 1); }
    if (tipo == "M30") { cacheUse = "_" + day + "_" + hour + "_" + minutePlus; }

    var Token = $("#HdTokenLojaTemp").val();
    var CliId = $("#HD_LVCLI_ID").val();
    if (CliId != undefined && CliId != null && CliId != "" && CliId != "0") {
        Token += "_" + CliId;
    }

    var B2B = $("#LV_USU_B2B").val();
    var URL = window.location.href;

    return Token + name + B2B + cacheUse;

}

ApiWS.setCookie = function (name, value, tipo) {
    try {

        var NomeCookie = ApiWS.nameCookie(name, value, tipo);

        //console.log("salvando " + NomeCookie);

        localStorage[NomeCookie] = value;

    } catch (e) {
        try {
            console.log("XYH*&:" + e.message);
            var erro = e.message;
            if (erro.indexOf("exceeded the quota") >= 0) {
                localStorage.clear();
            }
        } catch (e) { }
    }
}


ApiWS.getCookie = function (name, value, tipo) {
    try {

        var NomeCookie = ApiWS.nameCookie(name, value, tipo);       

        //console.log("tentando " + NomeCookie);

        c_value = localStorage[NomeCookie];

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


ApiWS.DoAgain = function (Funcao, Tempo, Tentativas) {
    try {

        UrlApi = "";

        console.log("TryAgain " + Funcao + " " + Tentativas);

        if (Tentativas < 3) {
            window.setTimeout(Funcao, Tempo);
        }

    } catch (e) { }
}



ApiWS.cacheTime = function (tipo) {

    try {

        var d = new Date();
        var minute = d.getMinutes();
        var hour = d.getHours();
        var day = d.getDate() + "-" + d.getMonth();
        var minutePlus = 0;

        if (minute < 30) { minutePlus = 1; }
        else { minutePlus = 2; }

        var cacheUse = "";

        if (tipo == "D") { cacheUse = day; }
        if (tipo == "H") { cacheUse = day + "_" + hour; }
        if (tipo == "M10") { cacheUse = day + "_" + hour + "_" + minute.toString().substring(0, 1); }
        if (tipo == "M30") { cacheUse = day + "_" + hour + "_" + minutePlus; }
        if (tipo == "M") { cacheUse = day + "_" + hour + "_" + minute.toString(); }

        return cacheUse;

    } catch (e) { console.log(e.message); }

}

function keepWsBrand() {
    $("div[class*='LV_RODAPE_']").show();
}

function funcaoWsToken() {
    try {

        //window.setTimeout("funcaoWsTokenStart()", 2000);

    } catch (e) { }
}

var WsTokenOk = "";
var ObjAtualWsToken = "";
function funcaoWsTokenStart() {

    try {
        
        var ObjWsExist = $("#" + ObjAtualWsToken).html();

        $("a[rel='Webstore']").parent().parent().parent().remove();

        if (ObjWsExist) {
            $("#" + ObjAtualWsToken).remove();
            $("style[rel='wstokencss" + ObjAtualWsToken+"']").remove();
        }

        var rnd = Math.floor((Math.random() * 100000) + 1);
        var rnd2 = Math.floor((Math.random() * 100000000) + 1);

        ObjAtualWsToken = rnd + "_" + rnd2;

        var print =""+
            //"<divwstag id='" + ObjAtualWsToken + "' class='random1'><divwstag id='random1'><divwstag><spanwstag>T<!--random1-->e<!--random1-->c<!--random1-->n<!--random1-->o<!--random1-->l<!--random1-->o<!--random1-->g<!--random1-->i<!--random1-->a<!--random1--></spanwstag><a href='http://www.webstore.com.br' target='_blank' title='Webstore | Plataforma de E-commerce para criar ou montar loja virtual'>W<!--random1-->e<!--random1-->b<!--random1-->s<!--random1-->t<!--random1-->o<!--random1-->r<!--random1-->e<!--random1--> - P<!--random1-->l<!--random1-->a<!--random1-->t<!--random1-->a<!--random1-->f<!--random1-->o<!--random1-->r<!--random1-->m<!--random1-->a<!--random1--> <!--random1-->d<!--random1-->e<!--random1--> l<!--random1-->o<!--random1-->j<!--random1-->a<!--random1--> v<!--random1-->i<!--random1-->r<!--random1-->t<!--random1-->u<!--random1-->a<!--random1-->l<!--random1--></a></divwstag></divwstag></divwstag>" +
            "<divwstag id='" + ObjAtualWsToken + "' class='random1'><divwstag id='random1'><divwstag><spanwstag>T<!--random1-->e<!--random1-->c<!--random1-->n<!--random1-->o<!--random1-->l<!--random1-->o<!--random1-->g<!--random1-->i<!--random1-->a<!--random1--></spanwstag><a href='http://www.webstore.com.br' target='_blank' title='Webstore | Plataforma de E-commerce para criar ou montar loja virtual'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 499.6 73.16'><defs><style>.cls-1{fill:#232323;}.cls-2{fill:url(#linear-gradient);}.cls-3{fill:url(#linear-gradient-2);}.cls-4{fill:url(#linear-gradient-3);}</style><linearGradient id='linear-gradient' x1='-4.59' y1='-11.59' x2='96.62' y2='138.27' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#ff8723'/><stop offset='1' stop-color='#f8175d'/></linearGradient><linearGradient id='linear-gradient-2' x1='8149.55' y1='-5072.5' x2='8155.53' y2='-5072.5' gradientTransform='matrix(-5.06, 5.91, 5.91, 5.06, 71307.31, -22504.71)' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#ff8723'/><stop offset='1' stop-color='#f8175d'/></linearGradient><linearGradient id='linear-gradient-3' x1='89.32' y1='-15.44' x2='77.95' y2='194.08' xlink:href='#linear-gradient'/></defs><title>Ativo 1</title><g id='Camada_2' data-name='Camada 2'><g id='Layer_2' data-name='Layer 2'><path class='cls-1' d='M214.43,17.63A4.82,4.82,0,0,0,209.81,21l-7.61,25-7.13-24.49a5.46,5.46,0,0,0-10.48,0l-7.07,24.48-7.61-25a4.85,4.85,0,1,0-9.22,3l9.22,26.42a7.66,7.66,0,0,0,14.46,0l2.12-6.06,3.37-12.64,3.37,12.64,2.12,6.06a7.65,7.65,0,0,0,14.45,0L219,24A4.82,4.82,0,0,0,214.43,17.63Z'/><path class='cls-1' d='M243.2,16.55c-12.26,0-20.07,8.28-20.07,19.77,0,12.11,7.73,20.15,20.76,20.15a25.76,25.76,0,0,0,11.75-2.81,4.24,4.24,0,0,0,1-6.76,4.29,4.29,0,0,0-4.95-.73A18.1,18.1,0,0,1,244,48c-6.59,0-10.65-3.37-11.26-8h24a5.54,5.54,0,0,0,5.53-6C261.48,22.37,254.11,16.55,243.2,16.55ZM232.93,32.18c1.38-4.9,5.52-7.35,10.58-7.35,5.36,0,9.19,2.45,9.8,7.35Z'/><path class='cls-1' d='M290.1,16.78c-4,0-10.19,2.15-12.42,6.06V6.59a4.68,4.68,0,0,0-9.35,0V50.85a4.63,4.63,0,0,0,9.22.54l.13-1.12c2.92,4.52,7.59,6,12.19,6,11.11,0,19.46-7.36,19.46-19.77C309.33,23.53,301.13,16.78,290.1,16.78Zm-.85,30.88A10.7,10.7,0,0,1,278.3,36.55a10.77,10.77,0,0,1,10.95-11c6,0,10.73,4.21,10.73,11C300,43.14,295.23,47.66,289.25,47.66Z'/><path class='cls-1' d='M331.81,32.26c-4.83-.31-7.05-1.68-7.05-4.14s2.45-3.75,6.89-3.75a14,14,0,0,1,6.72,1.47,4,4,0,0,0,5-.89h0a4,4,0,0,0-1.12-6.08,22.44,22.44,0,0,0-10.76-2.23c-6.9,0-15.94,3.07-15.94,11.8s8.51,11.19,15.63,11.72c5.37.31,7.51,1.38,7.51,4s-3.29,4.59-6.82,4.52A22.72,22.72,0,0,1,322,45.75a4.19,4.19,0,0,0-4.56,7c4.62,3.34,9.48,4,14.34,4C342.53,56.78,348,51,348,44.37,348,34.33,338.93,32.72,331.81,32.26Z'/><path class='cls-1' d='M374.28,47.42a8.25,8.25,0,0,1-1.19.09c-2.91,0-4.9-1.76-4.9-5.36V25.82h6.47a4,4,0,0,0,0-8h-6.4V12.25a4.67,4.67,0,1,0-9.34,0v5.53h-3a4,4,0,1,0,0,8h3V42.15c0,9.42,5.36,14.09,13.56,13.79a22.73,22.73,0,0,0,3.08-.28,4.17,4.17,0,0,0-1.28-8.24Z'/><path class='cls-1' d='M402.54,16.94c-12,0-19.54,8.88-19.54,19.69s7.35,19.69,19.61,19.69,19.7-8.81,19.7-19.69S414.57,16.94,402.54,16.94Zm.07,30.8c-6.82,0-10.26-5.37-10.26-11.11s3.52-11.19,10.26-11.19c6.29,0,10.27,5.52,10.27,11.19S409.43,47.74,402.61,47.74Z'/><path class='cls-1' d='M453.76,17.66a15.73,15.73,0,0,0-5.36-.95c-3.83,0-7.74.68-10.65,5.36l-.07-.43a4.67,4.67,0,0,0-9.28.73V50.81a4.67,4.67,0,0,0,4.67,4.67h0a4.67,4.67,0,0,0,4.67-4.67V35.56c0-7,4.52-9.58,9.42-9.58a10.68,10.68,0,0,1,3.4.48,4.54,4.54,0,0,0,5.49-2.16l.18-.35A4.49,4.49,0,0,0,453.76,17.66Z'/><path class='cls-1' d='M499.52,32C498,21.7,490.84,16.55,480.58,16.55c-12.26,0-20.08,8.28-20.08,19.77,0,12.11,7.74,20.15,20.77,20.15A25.8,25.8,0,0,0,493,53.66a4.24,4.24,0,0,0,1-6.76,4.29,4.29,0,0,0-4.95-.73,18.17,18.17,0,0,1-7.66,1.8c-6.59,0-10.65-3.37-11.26-8h22.5A6.94,6.94,0,0,0,499.52,32Zm-29.21.21c1.38-4.9,5.52-7.35,10.58-7.35,5.36,0,9.19,2.45,9.8,7.35Z'/><path class='cls-2' d='M54.5,42.13,45.15,27.68,33.73,10A8.6,8.6,0,0,0,30,6.87L15.71.44A5,5,0,0,0,10.93.8L2.3,6.4A5,5,0,0,0,0,10.6V26.5a7.91,7.91,0,0,0,1.28,4.32l11.51,17.8L22.74,64a19.27,19.27,0,0,0,27.5,5.12C58.69,63,60.17,50.89,54.5,42.13Zm-38-16.34a7,7,0,1,1,7-7A7,7,0,0,1,16.52,25.79Z'/><path class='cls-3' d='M79.39,56.47l-1.56,2.26c8.88,5.75,21.79,14.69,27.54,5.81l22.64-35A19.16,19.16,0,0,0,95.84,8.75l-22.63,35C67.46,52.61,70.51,50.73,79.39,56.47Z'/><path class='cls-4' d='M122.63,35.05h0a19.15,19.15,0,0,1-26.52-5.5L89.2,19h0L82.39,8.65A19.16,19.16,0,0,0,55.86,3.14h0a19.16,19.16,0,0,0-5.5,26.53L73.21,64.49a19.3,19.3,0,0,0,32.25-.08L127.05,31A18.79,18.79,0,0,1,122.63,35.05Z'/></g></g></svg></a></divwstag></divwstag></divwstag>" +
            "<style rel='wstokencss" + ObjAtualWsToken + "'>" +
            "body .random1 { background-color:#FFF !important;padding:10px; }" +
            "body .random1 #random1 {display:table !important;margin:0 auto !important;font-size:11px !important;font-family:Arial !important;color:#999;clear:both !important;}" +
            "body .random1 #random1 divwstag {} " +
            "body .random1 divwstag spanwstag {display:inline-block !important;padding:6px !important;float:left !important;}" +
            //"body .random1 divwstag a {display:inline-block !important;background-image:url(/lojas/img/Webstore-Assinatura.png) !important;background-repeat:no-repeat !important;width:111px;height:21px;overflow:hidden;text-indent:-12000px;opacity: 0.5;-webkit-filter: grayscale(100%); filter: grayscale(100%); transition: -webkit-filter 0.5s, filter 0.5s, opacity 0.5s; }" +
            "body .random1 divwstag a {display:inline-block !important;opacity: 0.5;-webkit-filter: grayscale(100%); filter: grayscale(100%); transition: -webkit-filter 0.5s, filter 0.5s, opacity 0.5s; }" +
            "body .random1 divwstag a svg { width:111px; }" +
            "body .random1 divwstag a:hover {opacity: 1 !important;-webkit-filter: grayscale(0%) !important; filter: grayscale(0%) !important; }" +
            "</style>";

        while (print.indexOf("random1") >= 0) {
            print = print.replace("random1", "L" + rnd);
        }

        while (print.indexOf("wstag") >= 0) {
            print = print.replace("wstag", "ws" + rnd2);
        }

        if (typeof wsx015694030 == 'undefined') {
            $("body").append(print);
        }

        WsTokenOk = "1";


        //window.setTimeout("funcaoWsTokenStart()", 5000);

    } catch (e) { }

}


function WsModifiersCall(name) {

    try {
        if (typeof eval("callafter_" + name) !== 'undefined') {
            console.log("Modificador localizado: " + "callafter_" + name);
            var FuncaoName = eval("callafter_" + name);
            try {
                eval(FuncaoName);
                console.log("Modificador executado: " + FuncaoName);
            } catch (e) { console.log("Falha call_after " + FuncaoName + ": " + e.message); }
        }
    } catch (e) { }

}



if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(t){"use strict";function e(e,s){return this.each(function(){var n=t(this),a=n.data("bs.modal"),o=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);a||n.data("bs.modal",a=new i(this,o)),"string"==typeof e?a[e](s):o.show&&a.show(s)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.3.7",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var s=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){s.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(s.$element)&&(s.ignoreBackdropClick=!0)})}),this.backdrop(function(){var n=t.support.transition&&s.$element.hasClass("fade");s.$element.parent().length||s.$element.appendTo(s.$body),s.$element.show().scrollTop(0),s.adjustDialog(),n&&s.$element[0].offsetWidth,s.$element.addClass("in"),s.enforceFocus();var a=t.Event("shown.bs.modal",{relatedTarget:e});n?s.$dialog.one("bsTransitionEnd",function(){s.$element.trigger("focus").trigger(a)}).emulateTransitionEnd(i.TRANSITION_DURATION):s.$element.trigger("focus").trigger(a)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var s=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var a=t.support.transition&&n;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),a&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;a?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var o=function(){s.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",o).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):o()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},i.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},i.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var s=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=s,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var s=t(this),n=s.attr("href"),a=t(s.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),o=a.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},a.data(),s.data());s.is("a")&&i.preventDefault(),a.one("show.bs.modal",function(t){t.isDefaultPrevented()||a.one("hidden.bs.modal",function(){s.is(":visible")&&s.trigger("focus")})}),e.call(a,o,this)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var s=t(this),n=s.data("bs.tab");n||s.data("bs.tab",n=new i(this)),"string"==typeof e&&n[e]()})}var i=function(e){this.element=t(e)};i.VERSION="3.3.7",i.TRANSITION_DURATION=150,i.prototype.show=function(){var e=this.element,i=e.closest("ul:not(.dropdown-menu)"),s=e.data("target");if(s||(s=e.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var n=i.find(".active:last a"),a=t.Event("hide.bs.tab",{relatedTarget:e[0]}),o=t.Event("show.bs.tab",{relatedTarget:n[0]});if(n.trigger(a),e.trigger(o),!o.isDefaultPrevented()&&!a.isDefaultPrevented()){var r=t(s);this.activate(e.closest("li"),i),this.activate(r,r.parent(),function(){n.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:n[0]})})}}},i.prototype.activate=function(e,s,n){function a(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),r?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),n&&n()}var o=s.find("> .active"),r=n&&t.support.transition&&(o.length&&o.hasClass("fade")||!!s.find("> .fade").length);o.length&&r?o.one("bsTransitionEnd",a).emulateTransitionEnd(i.TRANSITION_DURATION):a(),o.removeClass("in")};var s=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=i,t.fn.tab.noConflict=function(){return t.fn.tab=s,this};var n=function(i){i.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',n).on("click.bs.tab.data-api",'[data-toggle="pill"]',n)}(jQuery),+function(t){"use strict";function e(e){var i,s=e.attr("data-target")||(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return t(s)}function i(e){return this.each(function(){var i=t(this),n=i.data("bs.collapse"),a=t.extend({},s.DEFAULTS,i.data(),"object"==typeof e&&e);!n&&a.toggle&&/show|hide/.test(e)&&(a.toggle=!1),n||i.data("bs.collapse",n=new s(this,a)),"string"==typeof e&&n[e]()})}var s=function(e,i){this.$element=t(e),this.options=t.extend({},s.DEFAULTS,i),this.$trigger=t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};s.VERSION="3.3.7",s.TRANSITION_DURATION=350,s.DEFAULTS={toggle:!0},s.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},s.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,n=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(n&&n.length&&(e=n.data("bs.collapse"),e&&e.transitioning))){var a=t.Event("show.bs.collapse");if(this.$element.trigger(a),!a.isDefaultPrevented()){n&&n.length&&(i.call(n,"hide"),e||n.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var r=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return r.call(this);var l=t.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",t.proxy(r,this)).emulateTransitionEnd(s.TRANSITION_DURATION)[o](this.$element[0][l])}}}},s.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var n=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[i](0).one("bsTransitionEnd",t.proxy(n,this)).emulateTransitionEnd(s.TRANSITION_DURATION):n.call(this)}}},s.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},s.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(i,s){var n=t(s);this.addAriaAndCollapsedClass(e(n),n)},this)).end()},s.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var n=t.fn.collapse;t.fn.collapse=i,t.fn.collapse.Constructor=s,t.fn.collapse.noConflict=function(){return t.fn.collapse=n,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(s){var n=t(this);n.attr("data-target")||s.preventDefault();var a=e(n),o=a.data("bs.collapse"),r=o?"toggle":n.data();i.call(a,r)})}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,s=this;t(this).one("bsTransitionEnd",function(){i=!0});var n=function(){i||t(s).trigger(t.support.transition.end)};return setTimeout(n,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);
/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013, Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*/
(function(){window.$clamp=function(c,d){function s(a,b){n.getComputedStyle||(n.getComputedStyle=function(a,b){this.el=a;this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;"float"==b&&(b="styleFloat");c.test(b)&&(b=b.replace(c,function(a,b,c){return c.toUpperCase()}));return a.currentStyle&&a.currentStyle[b]?a.currentStyle[b]:null};return this});return n.getComputedStyle(a,null).getPropertyValue(b)}function t(a){a=a||c.clientHeight;var b=u(c);return Math.max(Math.floor(a/b),0)}function x(a){return u(c)*
a}function u(a){var b=s(a,"line-height");"normal"==b&&(b=1.2*parseInt(s(a,"font-size")));return parseInt(b)}function l(a){if(a.lastChild.children&&0<a.lastChild.children.length)return l(Array.prototype.slice.call(a.children).pop());if(a.lastChild&&a.lastChild.nodeValue&&""!=a.lastChild.nodeValue&&a.lastChild.nodeValue!=b.truncationChar)return a.lastChild;a.lastChild.parentNode.removeChild(a.lastChild);return l(c)}function p(a,d){if(d){var e=a.nodeValue.replace(b.truncationChar,"");f||(h=0<k.length?
k.shift():"",f=e.split(h));1<f.length?(q=f.pop(),r(a,f.join(h))):f=null;m&&(a.nodeValue=a.nodeValue.replace(b.truncationChar,""),c.innerHTML=a.nodeValue+" "+m.innerHTML+b.truncationChar);if(f){if(c.clientHeight<=d)if(0<=k.length&&""!=h)r(a,f.join(h)+h+q),f=null;else return c.innerHTML}else""==h&&(r(a,""),a=l(c),k=b.splitOnChars.slice(0),h=k[0],q=f=null);if(b.animate)setTimeout(function(){p(a,d)},!0===b.animate?10:b.animate);else return p(a,d)}}function r(a,c){a.nodeValue=c+b.truncationChar}d=d||{};
var n=window,b={clamp:d.clamp||2,useNativeClamp:"undefined"!=typeof d.useNativeClamp?d.useNativeClamp:!0,splitOnChars:d.splitOnChars||[".","-","\u2013","\u2014"," "],animate:d.animate||!1,truncationChar:d.truncationChar||"\u2026",truncationHTML:d.truncationHTML},e=c.style,y=c.innerHTML,z="undefined"!=typeof c.style.webkitLineClamp,g=b.clamp,v=g.indexOf&&(-1<g.indexOf("px")||-1<g.indexOf("em")),m;b.truncationHTML&&(m=document.createElement("span"),m.innerHTML=b.truncationHTML);var k=b.splitOnChars.slice(0),
h=k[0],f,q;"auto"==g?g=t():v&&(g=t(parseInt(g)));var w;z&&b.useNativeClamp?(e.overflow="hidden",e.textOverflow="ellipsis",e.webkitBoxOrient="vertical",e.display="-webkit-box",e.webkitLineClamp=g,v&&(e.height=b.clamp+"px")):(e=x(g),e<=c.clientHeight&&(w=p(l(c),e)));return{original:y,clamped:w}}})();
/*
 *	jQuery elevateZoom 3.0.8
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *

/*
 *	jQuery elevateZoom 3.0.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {
	var ElevateZoom = {
			init: function( options, elem ) {
				var self = this;

				self.elem = elem;
				self.$elem = $( elem );

				self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");

				self.options = $.extend( {}, $.fn.elevateZoom.options, options );

				//TINT OVERRIDE SETTINGS
				if(self.options.tint) {
					self.options.lensColour = "none", //colour of the lens background
					self.options.lensOpacity =  "1" //opacity of the lens
				}
				//INNER OVERRIDE SETTINGS
				if(self.options.zoomType == "inner") {self.options.showLens = false;}


				//Remove alt on hover

				self.$elem.parent().removeAttr('title').removeAttr('alt');

				self.zoomImage = self.imageSrc;

				self.refresh( 1 );



				//Create the image swap from the gallery 
				$('#'+self.options.gallery + ' a').click( function(e) { 

					//Set a class on the currently active gallery image
					if(self.options.galleryActiveClass){
						$('#'+self.options.gallery + ' a').removeClass(self.options.galleryActiveClass);
						$(this).addClass(self.options.galleryActiveClass);
					}
					//stop any link on the a tag from working
					e.preventDefault();

					//call the swap image function            
					if($(this).data("zoom-image")){self.zoomImagePre = $(this).data("zoom-image")}
					else{self.zoomImagePre = $(this).data("image");}
					self.swaptheimage($(this).data("image"), self.zoomImagePre);
					return false;
				});

			},

			refresh: function( length ) {
				var self = this;

				setTimeout(function() {
					self.fetch(self.imageSrc);

				}, length || self.options.refresh );
			},

			fetch: function(imgsrc) {
				//get the image
				var self = this;
				var newImg = new Image();
				newImg.onload = function() {
					//set the large image dimensions - used to calculte ratio's
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					//once image is loaded start the calls
					self.startZoom();
					self.currentImage = self.imageSrc;
					//let caller know image has been loaded
					self.options.onZoomedImageLoaded(self.$elem);
				}
				newImg.src = imgsrc; // this must be done AFTER setting onload

				return;

			},

			startZoom: function( ) {
				var self = this;
				//get dimensions of the non zoomed image
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				//activated elements
				self.isWindowActive = false;
				self.isLensActive = false;
				self.isTintActive = false;
				self.overWindow = false;    

				//CrossFade Wrappe
				if(self.options.imageCrossfade){
					self.zoomWrap = self.$elem.wrap('<div style="height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;" class="zoomWrapper" />');        
					self.$elem.css('position', 'absolute'); 
				}

				self.zoomLock = 1;
				self.scrollingLock = false;
				self.changeBgSize = false;
				self.currentZoomLevel = self.options.zoomLevel;


				//get offset of the non zoomed image
				self.nzOffset = self.$elem.offset();
				//calculate the width ratio of the large/small image
				self.widthRatio = (self.largeWidth/self.currentZoomLevel) / self.nzWidth;
				self.heightRatio = (self.largeHeight/self.currentZoomLevel) / self.nzHeight; 


				//if window zoom        
				if(self.options.zoomType == "window") {
					self.zoomWindowStyle = "overflow: hidden;"
						+ "background-position: 0px 0px;text-align:center;"  
						+ "background-color: " + String(self.options.zoomWindowBgColour)            
						+ ";width: " + String(self.options.zoomWindowWidth) + "px;"
						+ "height: " + String(self.options.zoomWindowHeight)
						+ "px;float: left;"
						+ "background-size: "+ self.largeWidth/self.currentZoomLevel+ "px " +self.largeHeight/self.currentZoomLevel + "px;"
						+ "display: none;z-index:100;"
						+ "border: " + String(self.options.borderSize) 
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    


				//if inner  zoom    
				if(self.options.zoomType == "inner") {
					//has a border been put on the image? Lets cater for this

					var borderWidth = self.$elem.css("border-left-width");

					self.zoomWindowStyle = "overflow: hidden;"
						+ "margin-left: " + String(borderWidth) + ";" 
						+ "margin-top: " + String(borderWidth) + ";"         
						+ "background-position: 0px 0px;"
						+ "width: " + String(self.nzWidth) + "px;"
						+ "height: " + String(self.nzHeight) + "px;"
						+ "px;float: left;"
						+ "display: none;"
						+ "cursor:"+(self.options.cursor)+";"
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    



				//lens style for window zoom
				if(self.options.zoomType == "window") {


					// adjust images less than the window height

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;              
					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}
					if(self.largeWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					self.lensStyle = "background-position: 0px 0px;width: " + String((self.options.zoomWindowWidth)/self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight)/self.heightRatio)
					+ "px;float: right;display: none;"
					+ "overflow: hidden;"
					+ "z-index: 999;"   
					+ "-webkit-transform: translateZ(0);"               
					+ "opacity:"+(self.options.lensOpacity)+";filter: alpha(opacity = "+(self.options.lensOpacity*100)+"); zoom:1;"
					+ "width:"+lensWidth+"px;"
					+ "height:"+lensHeight+"px;"
					+ "background-color:"+(self.options.lensColour)+";"					
					+ "cursor:"+(self.options.cursor)+";"
					+ "border: "+(self.options.lensBorderSize)+"px" +
					" solid "+(self.options.lensBorderColour)+";background-repeat: no-repeat;position: absolute;";
				} 


				//tint style
				self.tintStyle = "display: block;"
					+ "position: absolute;"
					+ "background-color: "+self.options.tintColour+";"	
					+ "filter:alpha(opacity=0);"		
					+ "opacity: 0;"	
					+ "width: " + self.nzWidth + "px;"
					+ "height: " + self.nzHeight + "px;"

					;

				//lens style for lens zoom with optional round for modern browsers
				self.lensRound = '';

				if(self.options.zoomType == "lens") {

					self.lensStyle = "background-position: 0px 0px;"
						+ "float: left;display: none;"
						+ "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour+";"
						+ "width:"+ String(self.options.lensSize) +"px;"
						+ "height:"+ String(self.options.lensSize)+"px;"
						+ "background-repeat: no-repeat;position: absolute;";


				}


				//does not round in all browsers
				if(self.options.lensShape == "round") {
					self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";

				}

				//create the div's                                                + ""
				//self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

				self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+self.nzOffset.left+'px;top:'+self.nzOffset.top+'px;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;"></div>');
				$('body').append(self.zoomContainer);	


				//this will add overflow hidden and contrain the lens on lens mode       
				if(self.options.containLensZoom && self.options.zoomType == "lens"){
					self.zoomContainer.css("overflow", "hidden");
				}
				if(self.options.zoomType != "inner") {
					self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound +"'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});


					if(self.options.tint) {
						self.tintContainer = $('<div/>').addClass('tintContainer');	
						self.zoomTint = $("<div class='zoomTint' style='"+self.tintStyle+"'></div>");


						self.zoomLens.wrap(self.tintContainer);


						self.zoomTintcss = self.zoomLens.after(self.zoomTint);	

						//if tint enabled - set an image to show over the tint

						self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+self.nzWidth+'px; height: '+self.nzHeight+'px;" src="'+self.imageSrc+'">')
						.appendTo(self.zoomLens)
						.click(function () {

							self.$elem.trigger('click');
						});

					}          

				}







				//create zoom window 
				if(isNaN(self.options.zoomWindowPosition)){
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo('body')
					.click(function () {
						self.$elem.trigger('click');
					});
				}else{
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});
				}              
				self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css("width",self.options.zoomWindowWidth);
				self.zoomWindow.wrap(self.zoomWindowContainer);


				//  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";                                                                                                                                                                                                                                          
				// self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				/*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
				//Needed to work in IE
				self.$elem.bind('mousemove', function(e){   
					if(self.overWindow == false){self.setElements("show");}
					//make sure on orientation change the setposition is not fired
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    

				});  	

				self.zoomContainer.bind('mousemove', function(e){ 

					if(self.overWindow == false){self.setElements("show");} 

					//make sure on orientation change the setposition is not fired 
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    
				});  	
				if(self.options.zoomType != "inner") {
					self.zoomLens.bind('mousemove', function(e){      
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});
				}
				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.bind('mousemove', function(e){ 
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.bind('mousemove', function(e) {
						//self.overWindow = true;
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}


				//  lensFadeOut: 500,  zoomTintFadeIn
				self.zoomContainer.add(self.$elem).mouseenter(function(){

					if(self.overWindow == false){self.setElements("show");} 


				}).mouseleave(function(){
					if(!self.scrollLock){
						self.setElements("hide");
            self.options.onDestroy(self.$elem);
					}
				});
				//end ove image





				if(self.options.zoomType != "inner") {
					self.zoomWindow.mouseenter(function(){
						self.overWindow = true;   
						self.setElements("hide");                  
					}).mouseleave(function(){

						self.overWindow = false;
					});
				}
				//end ove image



//				var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

				//      $(this).empty();    
				//    return false;

				//fix for initial zoom setting
				if (self.options.zoomLevel != 1){
					//	self.changeZoomLevel(self.currentZoomLevel);
				}
				//set the min zoomlevel
				if(self.options.minZoomLevel){
					self.minZoomLevel = self.options.minZoomLevel;
				}
				else{
					self.minZoomLevel = self.options.scrollZoomIncrement * 2;
				}


				if(self.options.scrollZoom){


					self.zoomContainer.add(self.$elem).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){


//						in IE there is issue with firing of mouseleave - So check whether still scrolling
//						and on mouseleave check if scrolllock          
						self.scrollLock = true;
						clearTimeout($.data(this, 'timer'));
						$.data(this, 'timer', setTimeout(function() {
							self.scrollLock = false;
							//do something
						}, 250));

						var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1


						//this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
						//   e.preventDefault();


						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();


						if(theEvent /120 > 0) {
							//scrolling up
							if(self.currentZoomLevel >= self.minZoomLevel){ 
								self.changeZoomLevel(self.currentZoomLevel-self.options.scrollZoomIncrement);        
							}

						}
						else{
							//scrolling down


							if(self.options.maxZoomLevel){
								if(self.currentZoomLevel <= self.options.maxZoomLevel){           
									self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
								}
							}
							else{
								//andy 

								self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
							}

						}
						return false;
					});
				}


			},
			setElements: function(type) {
				var self = this;
        if(!self.options.zoomEnabled){return false;}
				if(type=="show"){
					if(self.isWindowSet){
						if(self.options.zoomType == "inner") {self.showHideWindow("show");}
						if(self.options.zoomType == "window") {self.showHideWindow("show");}
						if(self.options.showLens) {self.showHideLens("show");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("show");
						}
					}
				}

				if(type=="hide"){
					if(self.options.zoomType == "window") {self.showHideWindow("hide");}
					if(!self.options.tint) {self.showHideWindow("hide");}
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint) {	self.showHideTint("hide");}
				}   
			},
			setPosition: function(e) {
      
				var self = this;
        
        if(!self.options.zoomEnabled){return false;}

				//recaclc offset each time in case the image moves
				//this can be caused by other on page elements
				self.nzHeight = self.$elem.height();
				self.nzWidth = self.$elem.width();
				self.nzOffset = self.$elem.offset();

				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.css({ top: 0});
					self.zoomTint.css({ left: 0});
				}
				//set responsive       
				//will checking if the image needs changing before running this code work faster?
				if(self.options.responsive && !self.options.scrollZoom){
					if(self.options.showLens){ 
						if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
							lensHeight = self.nzHeight;              
						}
						else{
							lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
						}
						if(self.largeWidth < self.options.zoomWindowWidth){
							lensWidth = self.nzWidth;
						}       
						else{
							lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
						}
						self.widthRatio = self.largeWidth / self.nzWidth;
						self.heightRatio = self.largeHeight / self.nzHeight;        
						if(self.options.zoomType != "lens") {


							//possibly dont need to keep recalcalculating
							//if the lens is heigher than the image, then set lens size to image size
							if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
								lensHeight = self.nzHeight;  

							}
							else{
								lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
							}

							if(self.nzWidth < self.options.zoomWindowHeight/self.heightRatio){
								lensWidth = self.nzWidth;
							}       
							else{
								lensWidth =  String((self.options.zoomWindowWidth/self.widthRatio));
							}            

							self.zoomLens.css('width', lensWidth);    
							self.zoomLens.css('height', lensHeight); 

							if(self.options.tint){    
								self.zoomTintImage.css('width', self.nzWidth);    
								self.zoomTintImage.css('height', self.nzHeight); 
							}

						}                     
						if(self.options.zoomType == "lens") {  

							self.zoomLens.css({ width: String(self.options.lensSize) + 'px', height: String(self.options.lensSize) + 'px' })      


						}        
						//end responsive image change
					}
				}

				//container fix
				self.zoomContainer.css({ top: self.nzOffset.top});
				self.zoomContainer.css({ left: self.nzOffset.left});
				self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
				self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
				//calculate the Location of the Lens

				//calculate the bound regions - but only if zoom window
				if(self.options.zoomType == "window") {
					self.Etoppos = (self.mouseTop < (self.zoomLens.height()/2));
					self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height()/2)-(self.options.lensBorderSize*2));
					self.Eloppos = (self.mouseLeft < 0+((self.zoomLens.width()/2))); 
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width()/2)-(self.options.lensBorderSize*2)));  
				}
				//calculate the bound regions - but only for inner zoom
				if(self.options.zoomType == "inner"){ 
					self.Etoppos = (self.mouseTop < ((self.nzHeight/2)/self.heightRatio) );
					self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight/2)/self.heightRatio)));
					self.Eloppos = (self.mouseLeft < 0+(((self.nzWidth/2)/self.widthRatio)));
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth/2)/self.widthRatio-(self.options.lensBorderSize*2)));  
				}

				// if the mouse position of the slider is one of the outerbounds, then hide  window and lens
				if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight ) {				          
					self.setElements("hide");
					return;
				}
				//else continue with operations
				else {


					//lens options
					if(self.options.showLens) {
						//		self.showHideLens("show");
						//set background position of lens
						self.lensLeftPos = String(Math.floor(self.mouseLeft - self.zoomLens.width() / 2));
						self.lensTopPos = String(Math.floor(self.mouseTop - self.zoomLens.height() / 2));


					}
					//adjust the background position if the mouse is in one of the outer regions 

					//Top region
					if(self.Etoppos){
						self.lensTopPos = 0;
					}
					//Left Region
					if(self.Eloppos){
						self.windowLeftPos = 0;
						self.lensLeftPos = 0;
						self.tintpos=0;
					}     
					//Set bottom and right region for window mode
					if(self.options.zoomType == "window") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( (self.nzHeight)-self.zoomLens.height()-(self.options.lensBorderSize*2), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.zoomLens.width())-(self.options.lensBorderSize*2));
						}  
					}  
					//Set bottom and right region for inner mode
					if(self.options.zoomType == "inner") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( ((self.nzHeight)-(self.options.lensBorderSize*2)), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.nzWidth)-(self.options.lensBorderSize*2));
						}  

					}
					//if lens zoom
					if(self.options.zoomType == "lens") {  
						self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));   
						self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));

						self.zoomLens.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });

						if(self.changeBgSize){  

							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								}   

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								}   
								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
							}
							self.changeBgSize = false;
						}    

						self.setWindowPostition(e);  
					}
					//if tint zoom   
					if(self.options.tint && self.options.zoomType != "inner") {
						self.setTintPosition(e);

					}
					//set the css background position 
					if(self.options.zoomType == "window") {
						self.setWindowPostition(e);   
					}
					if(self.options.zoomType == "inner") {
						self.setWindowPostition(e);   
					}
					if(self.options.showLens) {

						if(self.fullwidth && self.options.zoomType != "lens"){
							self.lensLeftPos = 0;

						}
						self.zoomLens.css({ left: self.lensLeftPos + 'px', top: self.lensTopPos + 'px' })  
					}

				} //end else



			},
			showHideWindow: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isWindowActive){
						if(self.options.zoomWindowFadeIn){
							self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}
						self.isWindowActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isWindowActive){
						if(self.options.zoomWindowFadeOut){
							self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function () {
								if (self.loop) {
									//stop moving the zoom window when zoom window is faded out
									clearInterval(self.loop);
									self.loop = false;
								}
							});
						}
						else{self.zoomWindow.hide();}
						self.isWindowActive = false;        
					}      
				}
			},
			showHideLens: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isLensActive){
						if(self.options.lensFadeIn){
							self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
						}
						else{self.zoomLens.show();}
						self.isLensActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isLensActive){
						if(self.options.lensFadeOut){
							self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
						}
						else{self.zoomLens.hide();}
						self.isLensActive = false;        
					}      
				}
			},
			showHideTint: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isTintActive){

						if(self.options.zoomTintFadeIn){
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate().stop(true, true).fadeIn("slow");
						}
						else{
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate();
							self.zoomTint.show();


						}
						self.isTintActive = true;
					}            
				}
				if(change == "hide"){      
					if(self.isTintActive){ 

						if(self.options.zoomTintFadeOut){
							self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
						}
						else{self.zoomTint.hide();}
						self.isTintActive = false;        
					}      
				}
			},
			setLensPostition: function( e ) {


			},
			setWindowPostition: function( e ) {
				//return obj.slice( 0, count );
				var self = this;

				if(!isNaN(self.options.zoomWindowPosition)){

					switch (self.options.zoomWindowPosition) { 
					case 1: //done         
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
						self.windowOffsetLeft =(+self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 2:
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						}
						else{ //negative margin

						}
						break;
					case 3: //done        
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;      
					case 4: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 5: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 6: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}


						break;
					case 7: //done  
						self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
						self.windowOffsetLeft = 0; //DONE 7, 13
						break;
					case 8: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 9:  //done  
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 10: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						}
						else{ //negative margin

						}
						break;
					case 11: 
						self.windowOffsetTop = (self.options.zoomWindowOffety);
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 12: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 13: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(0); //DONE 7, 13
						break;
					case 14: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}

						break;
					case 15://done   
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 16:  //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;            
					default: //done  
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
					self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
					} 
				} //end isNAN
				else{
					//WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
					self.externalContainer = $('#'+self.options.zoomWindowPosition);
					self.externalContainerWidth = self.externalContainer.width();
					self.externalContainerHeight = self.externalContainer.height();
					self.externalContainerOffset = self.externalContainer.offset();

					self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
					self.windowOffsetLeft =self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

				}
				self.isWindowSet = true;
				self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
				self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;

				self.zoomWindow.css({ top: self.windowOffsetTop});
				self.zoomWindow.css({ left: self.windowOffsetLeft});

				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ top: 0});
					self.zoomWindow.css({ left: 0});

				}   


				self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));   
				self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
				if(self.Etoppos){self.windowTopPos = 0;}
				if(self.Eloppos){self.windowLeftPos = 0;}     
				if(self.Eboppos){self.windowTopPos = (self.largeHeight/self.currentZoomLevel-self.zoomWindow.height())*(-1);  } 
				if(self.Eroppos){self.windowLeftPos = ((self.largeWidth/self.currentZoomLevel-self.zoomWindow.width())*(-1));}    

				//stops micro movements
				if(self.fullheight){
					self.windowTopPos = 0;

				}
				if(self.fullwidth){
					self.windowLeftPos = 0;

				}
				//set the css background position 


				if(self.options.zoomType == "window" || self.options.zoomType == "inner") {

					if(self.zoomLock == 1){
						//overrides for images not zoomable
						if(self.widthRatio <= 1){

							self.windowLeftPos = 0;
						}
						if(self.heightRatio <= 1){ 
							self.windowTopPos = 0;
						}
					}
					// adjust images less than the window height

					if (self.options.zoomType == "window") {
						if (self.largeHeight < self.options.zoomWindowHeight) {

							self.windowTopPos = 0;
						}
						if (self.largeWidth < self.options.zoomWindowWidth) {
							self.windowLeftPos = 0;
						}
					}

					//set the zoomwindow background position
					if (self.options.easing){

						//     if(self.changeZoom){
						//           clearInterval(self.loop);
						//           self.changeZoom = false;
						//           self.loop = false;

						//            }
						//set the pos to 0 if not set
						if(!self.xp){self.xp = 0;}
						if(!self.yp){self.yp = 0;}  
						//if loop not already started, then run it 
						if (!self.loop){           
							self.loop = setInterval(function(){                
								//using zeno's paradox    

								self.xp += (self.windowLeftPos  - self.xp) / self.options.easingAmount; 
								self.yp += (self.windowTopPos  - self.yp) / self.options.easingAmount;
								if(self.scrollingLock){


									clearInterval(self.loop);
									self.xp = self.windowLeftPos;
									self.yp = self.windowTopPos            

									self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
									self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));                         

									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){  
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}   
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{   
											if(self.options.zoomType != "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}            
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            

										}

										/*
             if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
						if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}  
                 if (!self.bgloop){   
                 	self.bgloop = setInterval(function(){   

                 self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount; 
								self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

           self.zoomWindow.css({ "background-size": self.bgxp + 'px ' + self.bgyp + 'px' });


                  }, 16);

                 }
										 */
										self.changeBgSize = false;
									}

									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.scrollingLock = false;
									self.loop = false;

								}
								else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
									//stops micro movements
									clearInterval(self.loop);
									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.loop = false;
								}
								else{
									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){ 
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}         
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{                 
											if(self.options.zoomType != "lens"){     
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
											}      
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
										}
										self.changeBgSize = false;
									}                   

									self.zoomWindow.css({ backgroundPosition: self.xp + 'px ' + self.yp + 'px' });
								}       
							}, 16);
						}
					}   
					else{    
						if(self.changeBgSize){  
							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								} 

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								} 
								if((self.largeHeight/self.newvaluewidth) < self.options.zoomWindowHeight){ 

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
								}
								else{

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });   
								}

							}
							self.changeBgSize = false;
						}     

						self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });       
					}
				} 
			},
			setTintPosition: function(e){
				var self = this;
				self.nzOffset = self.$elem.offset();
				self.tintpos = String(((e.pageX - self.nzOffset.left)-(self.zoomLens.width() / 2)) * (-1)); 
				self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));	
				if(self.Etoppos){
					self.tintposy = 0;
				}
				if(self.Eloppos){
					self.tintpos=0;
				}     
				if(self.Eboppos){
					self.tintposy = (self.nzHeight-self.zoomLens.height()-(self.options.lensBorderSize*2))*(-1);
				} 
				if(self.Eroppos){
					self.tintpos = ((self.nzWidth-self.zoomLens.width()-(self.options.lensBorderSize*2))*(-1));
				}    
				if(self.options.tint) {
					//stops micro movements
					if(self.fullheight){
						self.tintposy = 0;

					}
					if(self.fullwidth){ 
						self.tintpos = 0;

					}   
					self.zoomTintImage.css({'left': self.tintpos+'px'});
					self.zoomTintImage.css({'top': self.tintposy+'px'});
				}
			},

			swaptheimage: function(smallimage, largeimage){
				var self = this;
				var newImg = new Image(); 

				if(self.options.loadingIcon){
					self.spinner = $('<div style="background: url(\''+self.options.loadingIcon+'\') no-repeat center;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
					self.$elem.after(self.spinner);
				}

				self.options.onImageSwap(self.$elem);

				newImg.onload = function() {
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					self.zoomImage = largeimage;
					self.zoomWindow.css({ "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px' });
					self.swapAction(smallimage, largeimage);
					return;              
				}          
				newImg.src = largeimage; // this must be done AFTER setting onload

			},
			swapAction: function(smallimage, largeimage){


				var self = this;    

				var newImg2 = new Image(); 
				newImg2.onload = function() {
					//re-calculate values
					self.nzHeight = newImg2.height;
					self.nzWidth = newImg2.width;
					self.options.onImageSwapComplete(self.$elem);

					self.doneCallback();  
					return;      
				}          
				newImg2.src = smallimage; 

				//reset the zoomlevel to that initially set in options
				self.currentZoomLevel = self.options.zoomLevel;
				self.options.maxZoomLevel = false;

				//swaps the main image
				//self.$elem.attr("src",smallimage);
				//swaps the zoom image     
				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				} 



				self.currentImage = largeimage;

				if(self.options.imageCrossfade){
					var oldImg = self.$elem;
					var newImg = oldImg.clone();         
					self.$elem.attr("src",smallimage)
					self.$elem.after(newImg);
					newImg.stop(true).fadeOut(self.options.imageCrossfade, function() {
						$(this).remove();         
					});

					//       				if(self.options.zoomType == "inner"){
					//remove any attributes on the cloned image so we can resize later
					self.$elem.width("auto").removeAttr("width");
					self.$elem.height("auto").removeAttr("height");
					//   }

					oldImg.fadeIn(self.options.imageCrossfade);

					if(self.options.tint && self.options.zoomType != "inner") {

						var oldImgTint = self.zoomTintImage;
						var newImgTint = oldImgTint.clone();         
						self.zoomTintImage.attr("src",largeimage)
						self.zoomTintImage.after(newImgTint);
						newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function() {
							$(this).remove();         
						});



						oldImgTint.fadeIn(self.options.imageCrossfade);


						//self.zoomTintImage.attr("width",elem.data("image"));

						//resize the tint window
						self.zoomTint.css({ height: self.$elem.height()});
						self.zoomTint.css({ width: self.$elem.width()});
					}    

					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.zoomType == "inner"){ 
						if(!self.options.constrainType){
							self.zoomWrap.parent().css("height", self.$elem.height());
							self.zoomWrap.parent().css("width", self.$elem.width());

							self.zoomWindow.css("height", self.$elem.height());
							self.zoomWindow.css("width", self.$elem.width());
						}
					} 

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}
				else{
					self.$elem.attr("src",smallimage); 
					if(self.options.tint) {
						self.zoomTintImage.attr("src",largeimage);
						//self.zoomTintImage.attr("width",elem.data("image"));
						self.zoomTintImage.attr("height",self.$elem.height());
						//self.zoomTintImage.attr('src') = elem.data("image");
						self.zoomTintImage.css({ height: self.$elem.height()}); 
						self.zoomTint.css({ height: self.$elem.height()});

					}
					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}              
				if(self.options.constrainType){     

					//This will contrain the image proportions
					if(self.options.constrainType == "height"){ 

						self.zoomContainer.css("height", self.options.constrainSize);
						self.zoomContainer.css("width", "auto");

						if(self.options.imageCrossfade){  
							self.zoomWrap.css("height", self.options.constrainSize);
							self.zoomWrap.css("width", "auto"); 
							self.constwidth = self.zoomWrap.width();


						}
						else{                  
							self.$elem.css("height", self.options.constrainSize);
							self.$elem.css("width", "auto");
							self.constwidth = self.$elem.width();
						} 

						if(self.options.zoomType == "inner"){

							self.zoomWrap.parent().css("height", self.options.constrainSize);
							self.zoomWrap.parent().css("width", self.constwidth);   
							self.zoomWindow.css("height", self.options.constrainSize);
							self.zoomWindow.css("width", self.constwidth);    
						}        
						if(self.options.tint){
							self.tintContainer.css("height", self.options.constrainSize);
							self.tintContainer.css("width", self.constwidth);
							self.zoomTint.css("height", self.options.constrainSize);
							self.zoomTint.css("width", self.constwidth);
							self.zoomTintImage.css("height", self.options.constrainSize);
							self.zoomTintImage.css("width", self.constwidth); 
						} 

					}
					if(self.options.constrainType == "width"){       
						self.zoomContainer.css("height", "auto");
						self.zoomContainer.css("width", self.options.constrainSize);

						if(self.options.imageCrossfade){
							self.zoomWrap.css("height", "auto");
							self.zoomWrap.css("width", self.options.constrainSize);
							self.constheight = self.zoomWrap.height();
						}
						else{            
							self.$elem.css("height", "auto");
							self.$elem.css("width", self.options.constrainSize); 
							self.constheight = self.$elem.height();              
						} 
						if(self.options.zoomType == "inner"){
							self.zoomWrap.parent().css("height", self.constheight);
							self.zoomWrap.parent().css("width", self.options.constrainSize);   
							self.zoomWindow.css("height", self.constheight);
							self.zoomWindow.css("width", self.options.constrainSize);    
						} 
						if(self.options.tint){
							self.tintContainer.css("height", self.constheight);
							self.tintContainer.css("width", self.options.constrainSize);
							self.zoomTint.css("height", self.constheight);
							self.zoomTint.css("width", self.options.constrainSize);
							self.zoomTintImage.css("height", self.constheight);
							self.zoomTintImage.css("width", self.options.constrainSize); 
						}   

					}        


				}

			},
			doneCallback: function(){

				var self = this;
				if(self.options.loadingIcon){
					self.spinner.hide();     
				}   

				self.nzOffset = self.$elem.offset();
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				// reset the zoomlevel back to default
				self.currentZoomLevel = self.options.zoomLevel;

				//ratio of the large to small image
				self.widthRatio = self.largeWidth / self.nzWidth;
				self.heightRatio = self.largeHeight / self.nzHeight; 

				//NEED TO ADD THE LENS SIZE FOR ROUND
				// adjust images less than the window height
				if(self.options.zoomType == "window") {

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;  

					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}

					if(self.options.zoomWindowWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					if(self.zoomLens){

						self.zoomLens.css('width', lensWidth);    
						self.zoomLens.css('height', lensHeight); 


					}
				}
			},
			getCurrentImage: function(){
				var self = this;  
				return self.zoomImage; 
			}, 
			getGalleryList: function(){
				var self = this;   
				//loop through the gallery options and set them in list for fancybox
				self.gallerylist = [];
				if (self.options.gallery){ 


					$('#'+self.options.gallery + ' a').each(function() {

						var img_src = '';
						if($(this).data("zoom-image")){
							img_src = $(this).data("zoom-image");
						}
						else if($(this).data("image")){
							img_src = $(this).data("image");
						}			
						//put the current image at the start
						if(img_src == self.zoomImage){
							self.gallerylist.unshift({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});	
						}
						else{
							self.gallerylist.push({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});
						}


					});
				}                                                       
				//if no gallery - return current image
				else{
					self.gallerylist.push({
						href: ''+self.zoomImage+'',
						title: $(this).find('img').attr("title")
					}); 
				}
				return self.gallerylist;

			},
			changeZoomLevel: function(value){
				var self = this;   

				//flag a zoom, so can adjust the easing during setPosition     
				self.scrollingLock = true;   

				//round to two decimal places
				self.newvalue = parseFloat(value).toFixed(2);
				newvalue = parseFloat(value).toFixed(2);




				//maxwidth & Maxheight of the image
				maxheightnewvalue = self.largeHeight/((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);     
				maxwidthtnewvalue = self.largeWidth/((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);   	




				//calculate new heightratio
				if(self.options.zoomType != "inner")
				{
					if(maxheightnewvalue <= newvalue){
						self.heightRatio = (self.largeHeight/maxheightnewvalue) / self.nzHeight;
						self.newvalueheight = maxheightnewvalue;
						self.fullheight = true;

					}
					else{
						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						self.newvalueheight = newvalue;
						self.fullheight = false;

					}


//					calculate new width ratio

					if(maxwidthtnewvalue <= newvalue){
						self.widthRatio = (self.largeWidth/maxwidthtnewvalue) / self.nzWidth;
						self.newvaluewidth = maxwidthtnewvalue;
						self.fullwidth = true;

					}
					else{
						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;

					}
					if(self.options.zoomType == "lens"){
						if(maxheightnewvalue <= newvalue){
							self.fullwidth = true;
							self.newvaluewidth = maxheightnewvalue;

						} else{
							self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
							self.newvaluewidth = newvalue;

							self.fullwidth = false;
						}}
				}



				if(self.options.zoomType == "inner")
				{
					maxheightnewvalue = parseFloat(self.largeHeight/self.nzHeight).toFixed(2);     
					maxwidthtnewvalue = parseFloat(self.largeWidth/self.nzWidth).toFixed(2);      
					if(newvalue > maxheightnewvalue){
						newvalue = maxheightnewvalue;
					}
					if(newvalue > maxwidthtnewvalue){
						newvalue = maxwidthtnewvalue;
					}      


					if(maxheightnewvalue <= newvalue){


						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						if(newvalue > maxheightnewvalue){
							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = true;


					}
					else{



						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 

						if(newvalue > maxheightnewvalue){

							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = false;
					}




					if(maxwidthtnewvalue <= newvalue){   

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						if(newvalue > maxwidthtnewvalue){

							self.newvaluewidth = maxwidthtnewvalue;
						}else{
							self.newvaluewidth = newvalue;
						}

						self.fullwidth = true;


					}
					else{  

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;
					}        


				} //end inner
				scrcontinue = false;

				if(self.options.zoomType == "inner"){

					if(self.nzWidth >= self.nzHeight){
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{

							scrcontinue = false;
							self.fullheight = true;
							self.fullwidth = true;
						}
					}
					if(self.nzHeight > self.nzWidth){     
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{
							scrcontinue = false;  

							self.fullheight = true;
							self.fullwidth = true;
						}
					}
				}

				if(self.options.zoomType != "inner"){
					scrcontinue = true;
				}

				if(scrcontinue){



					self.zoomLock = 0;
					self.changeZoom = true;

					//if lens height is less than image height


					if(((self.options.zoomWindowHeight)/self.heightRatio) <= self.nzHeight){


						self.currentZoomLevel = self.newvalueheight; 
						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({height: String((self.options.zoomWindowHeight)/self.heightRatio) + 'px' }) 
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;  
						}	


					} 




					if((self.options.zoomWindowWidth/self.widthRatio) <= self.nzWidth){



						if(self.options.zoomType != "inner"){
							if(self.newvaluewidth > self.newvalueheight)   {
								self.currentZoomLevel = self.newvaluewidth;                 

							}
						}

						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({width: String((self.options.zoomWindowWidth)/self.widthRatio) + 'px' })
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;
						}	

					}
					if(self.options.zoomType == "inner"){
						self.changeBgSize = true;  

						if(self.nzWidth > self.nzHeight){
							self.currentZoomLevel = self.newvaluewidth;
						}
						if(self.nzHeight > self.nzWidth){
							self.currentZoomLevel = self.newvaluewidth;
						}
					}

				}      //under

				//sets the boundry change, called in setWindowPos
				self.setPosition(self.currentLoc);
				//
			},
			closeAll: function(){
				if(self.zoomWindow){self.zoomWindow.hide();}
				if(self.zoomLens){self.zoomLens.hide();}
				if(self.zoomTint){self.zoomTint.hide();}
			},
			changeState: function(value){
      	var self = this;
				if(value == 'enable'){self.options.zoomEnabled = true;}
				if(value == 'disable'){self.options.zoomEnabled = false;}

			}

	};




	$.fn.elevateZoom = function( options ) {
		return this.each(function() {
			var elevate = Object.create( ElevateZoom );

			elevate.init( options, this );

			$.data( this, 'elevateZoom', elevate );

		});
	};

	$.fn.elevateZoom.options = {
			zoomActivation: "hover", // Can also be click (PLACEHOLDER FOR NEXT VERSION)
      zoomEnabled: true, //false disables zoomwindow from showing
			preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
			zoomLevel: 1, //default zoom level of image
			scrollZoom: false, //allow zoom on mousewheel, true to activate
			scrollZoomIncrement: 0.1,  //steps of the scrollzoom
			minZoomLevel: false,
			maxZoomLevel: false,
			easing: false,
			easingAmount: 12,
			lensSize: 200,
			zoomWindowWidth: 400,
			zoomWindowHeight: 400,
			zoomWindowOffetx: 0,
			zoomWindowOffety: 0,
			zoomWindowPosition: 1,
			zoomWindowBgColour: "#fff",
			lensFadeIn: false,
			lensFadeOut: false,
			debug: false,
			zoomWindowFadeIn: false,
			zoomWindowFadeOut: false,
			zoomWindowAlwaysShow: false,
			zoomTintFadeIn: false,
			zoomTintFadeOut: false,
			borderSize: 4,
			showLens: true,
			borderColour: "#888",
			lensBorderSize: 1,
			lensBorderColour: "#000",
			lensShape: "square", //can be "round"
			zoomType: "window", //window is default,  also "lens" available -
			containLensZoom: false,
			lensColour: "white", //colour of the lens background
			lensOpacity: 0.4, //opacity of the lens
			lenszoom: false,
			tint: false, //enable the tinting
			tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
			tintOpacity: 0.4, //opacity of the tint
			gallery: false,
			galleryActiveClass: "zoomGalleryActive",
			imageCrossfade: false,
			constrainType: false,  //width or height
			constrainSize: false,  //in pixels the dimensions you want to constrain on
			loadingIcon: false, //http://www.example.com/spinner.gif
			cursor:"default", // user should set to what they want the cursor as, if they have set a click function
			responsive:true,
			onComplete: $.noop,
      onDestroy: function() {},
			onZoomedImageLoaded: function() {},
			onImageSwap: $.noop,
			onImageSwapComplete: $.noop
	};

})( jQuery, window, document );
window.FontAwesomeCdnConfig = {
  autoA11y: {
    enabled: true
  },
  asyncLoading: {
    enabled: true
  },
  reporting: {
    enabled: false
  },
  useUrl: "use.fontawesome.com",
  faCdnUrl: "https://cdn.fontawesome.com:443",
  code: "f0e0d85eb6"
};
!function(){function a(a){var b,c=[],d=document,e=d.documentElement.doScroll,f="DOMContentLoaded",g=(e?/^loaded|^c/:/^loaded|^i|^c/).test(d.readyState);g||d.addEventListener(f,b=function(){for(d.removeEventListener(f,b),g=1;b=c.shift();)b()}),g?setTimeout(a,0):c.push(a)}function b(a,b){var c=!1;return a.split(",").forEach(function(a){var d=new RegExp(a.trim().replace(".","\\.").replace("*","(.*)"));b.match(d)&&(c=!0)}),c}function c(a){"undefined"!=typeof MutationObserver&&new MutationObserver(a).observe(document,{childList:!0,subtree:!0})}function d(a){var b,c,d,e;a=a||"fa",b=document.querySelectorAll("."+a),Array.prototype.forEach.call(b,function(a){c=a.getAttribute("title"),a.setAttribute("aria-hidden","true"),d=a.nextElementSibling?!a.nextElementSibling.classList.contains("sr-only"):!0,c&&d&&(e=document.createElement("span"),e.innerHTML=c,e.classList.add("sr-only"),a.parentNode.insertBefore(e,a.nextSibling))})}!function(){"use strict";function a(a){l.push(a),1==l.length&&k()}function b(){for(;l.length;)l[0](),l.shift()}function c(a){this.a=m,this.b=void 0,this.f=[];var b=this;try{a(function(a){f(b,a)},function(a){g(b,a)})}catch(c){g(b,c)}}function d(a){return new c(function(b,c){c(a)})}function e(a){return new c(function(b){b(a)})}function f(a,b){if(a.a==m){if(b==a)throw new TypeError;var c=!1;try{var d=b&&b.then;if(null!=b&&"object"==typeof b&&"function"==typeof d)return void d.call(b,function(b){c||f(a,b),c=!0},function(b){c||g(a,b),c=!0})}catch(e){return void(c||g(a,e))}a.a=0,a.b=b,h(a)}}function g(a,b){if(a.a==m){if(b==a)throw new TypeError;a.a=1,a.b=b,h(a)}}function h(b){a(function(){if(b.a!=m)for(;b.f.length;){var a=b.f.shift(),c=a[0],d=a[1],e=a[2],a=a[3];try{0==b.a?e("function"==typeof c?c.call(void 0,b.b):b.b):1==b.a&&("function"==typeof d?e(d.call(void 0,b.b)):a(b.b))}catch(f){a(f)}}})}function i(a){return new c(function(b,c){function d(c){return function(d){g[c]=d,f+=1,f==a.length&&b(g)}}var f=0,g=[];0==a.length&&b(g);for(var h=0;h<a.length;h+=1)e(a[h]).c(d(h),c)})}function j(a){return new c(function(b,c){for(var d=0;d<a.length;d+=1)e(a[d]).c(b,c)})}var k,l=[];k=function(){setTimeout(b)};var m=2;c.prototype.g=function(a){return this.c(void 0,a)},c.prototype.c=function(a,b){var d=this;return new c(function(c,e){d.f.push([a,b,c,e]),h(d)})},window.Promise||(window.Promise=c,window.Promise.resolve=e,window.Promise.reject=d,window.Promise.race=j,window.Promise.all=i,window.Promise.prototype.then=c.prototype.c,window.Promise.prototype["catch"]=c.prototype.g)}(),function(){function a(a){this.el=a;for(var b=a.className.replace(/^\s+|\s+$/g,"").split(/\s+/),c=0;c<b.length;c++)d.call(this,b[c])}function b(a,b,c){Object.defineProperty?Object.defineProperty(a,b,{get:c}):a.__defineGetter__(b,c)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var c=Array.prototype,d=c.push,e=c.splice,f=c.join;a.prototype={add:function(a){this.contains(a)||(d.call(this,a),this.el.className=this.toString())},contains:function(a){return-1!=this.el.className.indexOf(a)},item:function(a){return this[a]||null},remove:function(a){if(this.contains(a)){for(var b=0;b<this.length&&this[b]!=a;b++);e.call(this,b,1),this.el.className=this.toString()}},toString:function(){return f.call(this," ")},toggle:function(a){return this.contains(a)?this.remove(a):this.add(a),this.contains(a)}},window.DOMTokenList=a,b(Element.prototype,"classList",function(){return new a(this)})}}();var e=function(a,b,c){function d(a){return g.body?a():void setTimeout(function(){d(a)})}function e(){h.addEventListener&&h.removeEventListener("load",e),h.media=c||"all"}var f,g=window.document,h=g.createElement("link");if(b)f=b;else{var i=(g.body||g.getElementsByTagName("head")[0]).childNodes;f=i[i.length-1]}var j=g.styleSheets;h.rel="stylesheet",h.href=a,h.media="only x",d(function(){f.parentNode.insertBefore(h,b?f:f.nextSibling)});var k=function(a){for(var b=h.href,c=j.length;c--;)if(j[c].href===b)return a();setTimeout(function(){k(a)})};return h.addEventListener&&h.addEventListener("load",e),h.onloadcssdefined=k,k(e),h},f=null;!function(){function a(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function b(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function b(){document.removeEventListener("DOMContentLoaded",b),a()}):document.attachEvent("onreadystatechange",function c(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",c),a())})}function c(a){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(a)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function d(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function e(a){var b=a.a.offsetWidth,c=b+100;return a.f.style.width=c+"px",a.c.scrollLeft=c,a.b.scrollLeft=a.b.scrollWidth+100,a.g!==b?(a.g=b,!0):!1}function g(b,c){function d(){var a=f;e(a)&&a.a.parentNode&&c(a.g)}var f=b;a(b.b,d),a(b.c,d),e(b)}function h(a,b){var c=b||{};this.family=a,this.style=c.style||"normal",this.weight=c.weight||"normal",this.stretch=c.stretch||"normal"}function i(){if(null===l){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}l=""!==a.style.font}return l}function j(a,b){return[a.style,a.weight,i()?a.stretch:"","100px",b].join(" ")}var k=null,l=null,m=null;h.prototype.load=function(a,e){var f=this,h=a||"BESbswy",i=e||3e3,l=(new Date).getTime();return new Promise(function(a,e){if(null===m&&(m=!!window.FontFace),m){var n=new Promise(function(a,b){function c(){(new Date).getTime()-l>=i?b():document.fonts.load(j(f,f.family),h).then(function(b){1<=b.length?a():setTimeout(c,25)},function(){b()})}c()}),o=new Promise(function(a,b){setTimeout(b,i)});Promise.race([o,n]).then(function(){a(f)},function(){e(f)})}else b(function(){function b(){var b;(b=-1!=q&&-1!=r||-1!=q&&-1!=s||-1!=r&&-1!=s)&&((b=q!=r&&q!=s&&r!=s)||(null===k&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),k=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=k&&(q==t&&r==t&&s==t||q==u&&r==u&&s==u||q==v&&r==v&&s==v)),b=!b),b&&(w.parentNode&&w.parentNode.removeChild(w),clearTimeout(x),a(f))}function m(){if((new Date).getTime()-l>=i)w.parentNode&&w.parentNode.removeChild(w),e(f);else{var a=document.hidden;!0!==a&&void 0!==a||(q=n.a.offsetWidth,r=o.a.offsetWidth,s=p.a.offsetWidth,b()),x=setTimeout(m,50)}}var n=new c(h),o=new c(h),p=new c(h),q=-1,r=-1,s=-1,t=-1,u=-1,v=-1,w=document.createElement("div"),x=0;w.dir="ltr",d(n,j(f,"sans-serif")),d(o,j(f,"serif")),d(p,j(f,"monospace")),w.appendChild(n.a),w.appendChild(o.a),w.appendChild(p.a),document.body.appendChild(w),t=n.a.offsetWidth,u=o.a.offsetWidth,v=p.a.offsetWidth,m(),g(n,function(a){q=a,b()}),d(n,j(f,'"'+f.family+'",sans-serif')),g(o,function(a){r=a,b()}),d(o,j(f,'"'+f.family+'",serif')),g(p,function(a){s=a,b()}),d(p,j(f,'"'+f.family+'",monospace'))})})},f=h}();var g={observe:function(a,b){for(var c=b.prefix,d=function(a){var b=a.weight?"-"+a.weight:"",d=a.style?"-"+a.style:"",e=a.className?"-"+a.className:"",g=a.className?"-"+a.className+b+d:"",h=document.getElementsByTagName("html")[0].classList,i=function(a){h.add(c+e+"-"+a),h.add(c+g+"-"+a)},j=function(a){h.remove(c+e+"-"+a),h.remove(c+g+"-"+a)};i("loading"),new f(a.familyName).load(a.testString).then(function(){i("ready"),j("loading")},function(){i("failed"),j("loading")})},e=0;e<a.length;e++)d(a[e])}},h={load:function(a){var b=document.createElement("link");b.href=a,b.media="all",b.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(b)},loadAsync:function(a){e(a)}},i={load:function(a){var b=document.createElement("script"),c=document.scripts[0];b.src=a,c.parentNode.appendChild(b)}};try{if(window.FontAwesomeCdnConfig){var j=window.FontAwesomeCdnConfig,k=j.useUrl,l=j.faCdnUrl,m=j.code,n="FontAwesome",o="fa",p="",q=d.bind(d,"fa"),r=function(){};j.autoA11y.enabled&&(a(q),c(q)),j.reporting.enabled&&b(j.reporting.domains,location.host)&&i.load(l+"/js/stats.js"),cssUrl="https://"+k+"/"+m+".css",new f(n).load(p).then(function(){var a=(window.FontAwesomeHooks||{}).loaded||r;a()},r),j.asyncLoading.enabled?h.loadAsync(cssUrl):h.load(cssUrl),g.observe([{familyName:n,testString:p}],{prefix:o+"-events-icons"})}}catch(s){}}();
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});


/*! lazysizes - v5.2.0 */
!function (a, b) { var c = b(a, a.document, Date); a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c) }("undefined" != typeof window ? window : {}, function (a, b, c) { "use strict"; var d, e; if (function () { var b, c = { lazyClass: "lazyload", loadedClass: "lazyloaded", loadingClass: "lazyloading", preloadClass: "lazypreload", errorClass: "lazyerror", autosizesClass: "lazyautosizes", srcAttr: "data-src", srcsetAttr: "data-srcset", sizesAttr: "data-sizes", minSize: 40, customMedia: {}, init: !0, expFactor: 1.5, hFac: .8, loadMode: 2, loadHidden: !0, ricTimeout: 0, throttleDelay: 125 }; e = a.lazySizesConfig || a.lazysizesConfig || {}; for (b in c) b in e || (e[b] = c[b]) }(), !b || !b.getElementsByClassName) return { init: function () { }, cfg: e, noSupport: !0 }; var f = b.documentElement, g = a.HTMLPictureElement, h = "addEventListener", i = "getAttribute", j = a[h].bind(a), k = a.setTimeout, l = a.requestAnimationFrame || k, m = a.requestIdleCallback, n = /^picture$/i, o = ["load", "error", "lazyincluded", "_lazyloaded"], p = {}, q = Array.prototype.forEach, r = function (a, b) { return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b] }, s = function (a, b) { r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b) }, t = function (a, b) { var c; (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " ")) }, u = function (a, b, c) { var d = c ? h : "removeEventListener"; c && u(a, b), o.forEach(function (c) { a[d](c, b) }) }, v = function (a, c, e, f, g) { var h = b.createEvent("Event"); return e || (e = {}), e.instance = d, h.initEvent(c, !f, !g), h.detail = e, a.dispatchEvent(h), h }, w = function (b, c) { var d; !g && (d = a.picturefill || e.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), d({ reevaluate: !0, elements: [b] })) : c && c.src && (b.src = c.src) }, x = function (a, b) { return (getComputedStyle(a, null) || {})[b] }, y = function (a, b, c) { for (c = c || a.offsetWidth; c < e.minSize && b && !a._lazysizesWidth;)c = b.offsetWidth, b = b.parentNode; return c }, z = function () { var a, c, d = [], e = [], f = d, g = function () { var b = f; for (f = d.length ? e : d, a = !0, c = !1; b.length;)b.shift()(); a = !1 }, h = function (d, e) { a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g))) }; return h._lsFlush = g, h }(), A = function (a, b) { return b ? function () { z(a) } : function () { var b = this, c = arguments; z(function () { a.apply(b, c) }) } }, B = function (a) { var b, d = 0, f = e.throttleDelay, g = e.ricTimeout, h = function () { b = !1, d = c.now(), a() }, i = m && g > 49 ? function () { m(h, { timeout: g }), g !== e.ricTimeout && (g = e.ricTimeout) } : A(function () { k(h) }, !0); return function (a) { var e; (a = !0 === a) && (g = 33), b || (b = !0, e = f - (c.now() - d), e < 0 && (e = 0), a || e < 9 ? i() : k(i, e)) } }, C = function (a) { var b, d, e = 99, f = function () { b = null, a() }, g = function () { var a = c.now() - d; a < e ? k(g, e - a) : (m || f)(f) }; return function () { d = c.now(), b || (b = k(g, e)) } }, D = function () { var g, m, o, p, y, D, F, G, H, I, J, K, L = /^img$/i, M = /^iframe$/i, N = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent), O = 0, P = 0, Q = 0, R = -1, S = function (a) { Q-- , (!a || Q < 0 || !a.target) && (Q = 0) }, T = function (a) { return null == K && (K = "hidden" == x(b.body, "visibility")), K || !("hidden" == x(a.parentNode, "visibility") && "hidden" == x(a, "visibility")) }, U = function (a, c) { var d, e = a, g = T(a); for (G -= c, J += c, H -= c, I += c; g && (e = e.offsetParent) && e != b.body && e != f;)(g = (x(e, "opacity") || 1) > 0) && "visible" != x(e, "overflow") && (d = e.getBoundingClientRect(), g = I > d.left && H < d.right && J > d.top - 1 && G < d.bottom + 1); return g }, V = function () { var a, c, h, j, k, l, n, o, q, r, s, t, u = d.elements; if ((p = e.loadMode) && Q < 8 && (a = u.length)) { for (c = 0, R++; c < a; c++)if (u[c] && !u[c]._lazyRace) if (!N || d.prematureUnveil && d.prematureUnveil(u[c])) ba(u[c]); else if ((o = u[c][i]("data-expand")) && (l = 1 * o) || (l = P), r || (r = !e.expand || e.expand < 1 ? f.clientHeight > 500 && f.clientWidth > 500 ? 500 : 370 : e.expand, d._defEx = r, s = r * e.expFactor, t = e.hFac, K = null, P < s && Q < 1 && R > 2 && p > 2 && !b.hidden ? (P = s, R = 0) : P = p > 1 && R > 1 && Q < 6 ? r : O), q !== l && (D = innerWidth + l * t, F = innerHeight + l, n = -1 * l, q = l), h = u[c].getBoundingClientRect(), (J = h.bottom) >= n && (G = h.top) <= F && (I = h.right) >= n * t && (H = h.left) <= D && (J || I || H || G) && (e.loadHidden || T(u[c])) && (m && Q < 3 && !o && (p < 3 || R < 4) || U(u[c], l))) { if (ba(u[c]), k = !0, Q > 9) break } else !k && m && !j && Q < 4 && R < 4 && p > 2 && (g[0] || e.preloadAfterLoad) && (g[0] || !o && (J || I || H || G || "auto" != u[c][i](e.sizesAttr))) && (j = g[0] || u[c]); j && !k && ba(j) } }, W = B(V), X = function (a) { var b = a.target; if (b._lazyCache) return void delete b._lazyCache; S(a), s(b, e.loadedClass), t(b, e.loadingClass), u(b, Z), v(b, "lazyloaded") }, Y = A(X), Z = function (a) { Y({ target: a.target }) }, $ = function (a, b) { try { a.contentWindow.location.replace(b) } catch (c) { a.src = b } }, _ = function (a) { var b, c = a[i](e.srcsetAttr); (b = e.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c) }, aa = A(function (a, b, c, d, f) { var g, h, j, l, m, p; (m = v(a, "lazybeforeunveil", b)).defaultPrevented || (d && (c ? s(a, e.autosizesClass) : a.setAttribute("sizes", d)), h = a[i](e.srcsetAttr), g = a[i](e.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), m = { target: a }, s(a, e.loadingClass), p && (clearTimeout(o), o = k(S, 2500), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (M.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, { src: g })), a._lazyRace && delete a._lazyRace, t(a, e.lazyClass), z(function () { var b = a.complete && a.naturalWidth > 1; p && !b || (b && s(a, "ls-is-cached"), X(m), a._lazyCache = !0, k(function () { "_lazyCache" in a && delete a._lazyCache }, 9)), "lazy" == a.loading && Q-- }, !0) }), ba = function (a) { if (!a._lazyRace) { var b, c = L.test(a.nodeName), d = c && (a[i](e.sizesAttr) || a[i]("sizes")), f = "auto" == d; (!f && m || !c || !a[i]("src") && !a.srcset || a.complete || r(a, e.errorClass) || !r(a, e.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, Q++ , aa(a, b, f, d, c)) } }, ca = C(function () { e.loadMode = 3, W() }), da = function () { 3 == e.loadMode && (e.loadMode = 2), ca() }, ea = function () { if (!m) { if (c.now() - y < 999) return void k(ea, 999); m = !0, e.loadMode = 3, W(), j("scroll", da, !0) } }; return { _: function () { y = c.now(), d.elements = b.getElementsByClassName(e.lazyClass), g = b.getElementsByClassName(e.lazyClass + " " + e.preloadClass), j("scroll", W, !0), j("resize", W, !0), j("pageshow", function (a) { if (a.persisted) { var c = b.querySelectorAll("." + e.loadingClass); c.length && c.forEach && l(function () { c.forEach(function (a) { a.complete && ba(a) }) }) } }), a.MutationObserver ? new MutationObserver(W).observe(f, { childList: !0, subtree: !0, attributes: !0 }) : (f[h]("DOMNodeInserted", W, !0), f[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (a) { b[h](a, W, !0) }), /d$|^c/.test(b.readyState) ? ea() : (j("load", ea), b[h]("DOMContentLoaded", W), k(ea, 2e4)), d.elements.length ? (V(), z._lsFlush()) : W() }, checkElems: W, unveil: ba, _aLSL: da } }(), E = function () { var a, c = A(function (a, b, c, d) { var e, f, g; if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || "")) for (e = b.getElementsByTagName("source"), f = 0, g = e.length; f < g; f++)e[f].setAttribute("sizes", d); c.detail.dataAttr || w(a, c.detail) }), d = function (a, b, d) { var e, f = a.parentNode; f && (d = y(a, f, d), e = v(a, "lazybeforesizes", { width: d, dataAttr: !!b }), e.defaultPrevented || (d = e.detail.width) && d !== a._lazysizesWidth && c(a, f, e, d)) }, f = function () { var b, c = a.length; if (c) for (b = 0; b < c; b++)d(a[b]) }, g = C(f); return { _: function () { a = b.getElementsByClassName(e.autosizesClass), j("resize", g) }, checkElems: g, updateElem: d } }(), F = function () { !F.i && b.getElementsByClassName && (F.i = !0, E._(), D._()) }; return k(function () { e.init && F() }), d = { cfg: e, autoSizer: E, loader: D, init: F, uP: w, aC: s, rC: t, hC: r, fire: v, gW: y, rAF: z } });

var useLazyLoadMain = false;
var LazyLoadOver = true;

var buySamePage = true;
var buySamePageFull = true;

//var NOTbuySamePage = "1";

$(document).ready(function () {


    window.setTimeout("FuncVerifModulosComplete()", 1000);


    if (typeof LazyLoadOver !== 'undefined') {
        useLazyLoadMain = LazyLoadOver;
    }

	//CHAMADAS DA API
	try {
		ApiWS.ApiStart();
		InfosLojas();
	} catch (e) { console.log(e.message); }

	// INICIALIZA CAMPOS DE BUSCA
	try{
		BuscaInicializa('input-busca');
		BuscaInicializa('input-busca-2');
		BuscaInicializa('input-busca-3');
		$("#botao-busca").on('click', function () {
			FuncaoBuscaBotao('input-busca');
		});
		$("#botao-busca-2").on('click', function () {
			FuncaoBuscaBotao('input-busca-2');
		});
		$("#botao-busca-3").on('click', function () {
			FuncaoBuscaBotao('input-busca-3');
		});
	} catch (e) { console.log(e.message); }


	try{
		$('#burguer-menu').on('click',function(){
			$('#float-menu').toggleClass('active');
		});

		$(window).scroll(function () {
			handleScroll();
		});

	} catch (e) { console.log(e.message); }

});

var cfg = [],
	cliente,
	lateralDir = false,
	lateralEsq = false,
	modoLoja = "",
	objetos = {},
	objInstitucional = "",
	PAG = [],
	prodsLinha = "",
    valores = [],
    info_lojas_finish,
    modulos_to_complete = 0,
    modulos_completed = 0;


function InfosLojas() {
	console.log('InfosLojas');
	ApiWS.InfosLojas("InfosLojasRetorno");
}
function InfosLojasRetorno() {

    try {

        var OBJETO = ApiWS.Json;
        var obj = jQuery.parseJSON(OBJETO);
        objetos.InfosLojas = OBJETO;

        //console.log("NOTbuySamePage:"+NOTbuySamePage);
        setTagsWs(obj, "InfosLojas");
        cookieAskMsg(obj);

        if (typeof buySamePage !== 'undefined') {
            if (typeof NOTbuySamePage !== 'undefined') {
                buySamePage = undefined;
                buySamePageFull = undefined;
            } else {
                try { FuncBuySamePage(); } catch (e) { }
            }
        }
        

        var social = obj.redes_sociais,
			links = obj.links,
			contato = obj.dadoscontato,
			estrutura = obj.estrutura,
			institucional = obj.menuinstitucional,
            condicoes = obj.condicoes,
			li = '';

        cliente = obj.cliente;
        objInstitucional = obj.menuinstitucional;
        modoLoja = estrutura.modo;

        cfg['estrutura'] = estrutura;
        cfg['produtos_pagina'] = estrutura.produtos_pagina;
        cfg['produtos_linha'] = estrutura.produtos_linha;
        cfg['menu_lateral_home'] = estrutura.menu_lateral_home;
        cfg['troca_fotos'] = estrutura.troca_fotos;
        cfg['menu_lateral'] = estrutura.menu_lateral;
        cfg['ultimos_vistos'] = estrutura.ultimos_vistos;
        cfg['tipo_zoom'] = estrutura.tipo_zoom;
        cfg['preco_apos_login'] = estrutura.preco_apos_login;

        var Etapa = $("#HdEtapaLoja").val();

        $('.input-busca').attr('placeholder', estrutura.placeholder_busca);

        if (modoLoja == 4 || modoLoja == 5) {
            $('.carrinho-texto').html("Meu or&ccedil;amento");
            $('.cart-total').css('visibility', 'hidden');
        } else {
            $('.carrinho-texto').html(estrutura.carrinho_compras_texto);
        }

        if (modoLoja == 2 || modoLoja == 3) {
            estrutura.carrinho_compras = false;
            $('.input-qtd').hide();
            $('#calcula-frete').hide();
        }

        if (
			estrutura.carrinho_compras == false
		) {
            $('header .div-carrinho').addClass('hidden');
            $('header fieldset').addClass('sem-carrinho');
            $('#barra-flutuante fieldset').addClass('sem-carrinho');
            $('#barra-flutuante .div-carrinho').addClass('hidden');
        }


        if (cfg['preco_apos_login'] == true || modoLoja == 3 || modoLoja == 5) {
            semVariacao = true;
        }

        if (cfg['produtos_linha'] != 0) {
            prodsLinha = cfg['produtos_linha'];
        }

        if (estrutura.bandeiras_pagamento != null && estrutura.bandeiras_pagamento != undefined && estrutura.bandeiras_pagamento.length > 0) {
            var str = estrutura.bandeiras_pagamento;
            var res = str.split("|");
            for (i = 0; i < res.length; i++) {
                if (res[i] != "") {
                    li += '<li class="bandeira' + res[i] + '"></li>';
                }
            }
            $('#footer-pagamento').append(li);
            WsSetObjetos("ul_pagamento", "<ul id='ws-ul-pagamento'>" + li + "</ul>");
            li = '';
        }

        if (links) {
            if (links.cadastro != null && links.cadastro != undefined) {
                $('#link-cadastro').attr('href', links.cadastro);
            }
            if (links.login != null && links.login != undefined) {
                $('#link-login, #link-login-2, #link-entrar, .link-login').attr('href', links.login);
            }
            if (links.carrinho != null && links.carrinho != undefined) {
                $('#link-carrinho, .link-carrinho').attr('href', links.carrinho);
            }
            if (links.meus_pedidos != null && links.meus_pedidos != undefined) {
                $('#link-meus-pedidos').attr('href', links.meus_pedidos);
                $('#link-pedidos').attr('href', links.meus_pedidos);
                $('.link-meus-pedidos').attr('href', links.meus_pedidos);
                $('.link-pedidos').attr('href', links.meus_pedidos);
            }
            if (links.pagina_inicial != null && links.pagina_inicial != undefined) {
                $('#link-pagina-inicial, .link-pagina-inicial').attr('href', links.pagina_inicial);
            }
            if (links.faleconosco != null && links.faleconosco != undefined) {
                $('.fale-conosco').append('<a href="' + links.faleconosco + '" id="link-faleconosco"><i class="fa fa-fw fa-address-book-o"></i>Fale Conosco</a>');
            }
        }

        if (institucional != null && institucional != undefined && institucional.length > 0) {

            for (i = 0; i < institucional.length; i++) {
                PAG[institucional[i].id] = [institucional[i]];
                if (institucional[i].tipo == "EXT") {
                    li += '<li><a href="' + institucional[i].url + '" target="_blank" rel="noopener" title="' + institucional[i].titulo + '">' + institucional[i].titulo + '</a></li>';
                } else {
                    li += '<li><a href="' + institucional[i].url + '" title="' + institucional[i].titulo + '">' + institucional[i].titulo + '</a></li>';
                }
            }

            if (links.cadastro_b2b && li.indexOf("cadastro-b2b") < 0 && li.indexOf("atacado") < 0) {
                li += '<li class="linkB2bFooter" data-link-b2b><a href="' + links.cadastro_b2b + '.aspx" title="Compre no atacado">Compre no atacado</a></li>';
            }

            if (Etapa == "PAGINAS_INST") {
                var ul = '<ul id="institucional-lateral"><h3>Institucional</h3>';
                ul += li;
                ul += '</ul>';

                $('#div-barra-esquerda').prepend(ul);

                ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 3);
                ColunasResponsivo('#div-conteudo', 12, 12, 9);
            }

            $('#institucional-footer').append(li);
            WsSetObjetos("ul_institucional", "<ul id='ws-ul-institucional'>" + li + "</ul>");
            li = '';
            
        }


        if (condicoes.length) {
            FuncExibeCondicoes(condicoes);
        };

        // window.setTimeout("CategoriasLista()", 1);

        if (social != null && social != undefined) {
            if (social.facebook != null && social.facebook != undefined) {
                li += '<li><a href="https://www.facebook.com/' + social.facebook + '" target="_blank" rel="noopener">';
                li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x fa-inverse"></i></span>';
                li += '</a></li>';
            }
            if (social.twitter != null && social.twitter != undefined) {
                li += '<li><a href="https://www.twitter.com/' + social.twitter + '" target="_blank" rel="noopener">';
                li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-twitter fa-stack-1x fa-inverse"></i></span>';
                li += '</a></li>';
            }
            if (social.linkedin != null && social.linkedin != undefined) {
                li += '<li><a href="https://www.linkedin.com/' + social.linkedin + '" target="_blank" rel="noopener">';
                li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x fa-inverse"></i></span>';
                li += '</a></li>';
            }
            if (social.instagram != null && social.instagram != undefined) {
                li += '<li><a href="https://www.instagram.com/' + social.instagram + '" target="_blank" rel="noopener">';
                li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-instagram fa-stack-1x fa-inverse"></i></span>';
                li += '</a></li>';
            }
            if (social.youtube != null && social.youtube != undefined) {
                li += '<li><a href="https://www.youtube.com/' + social.youtube + '" target="_blank" rel="noopener">';
                li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-youtube fa-stack-1x fa-inverse"></i></span>';
                li += '</a></li>';
            }
            if (social.pinterest != null && social.pinterest != undefined) {
                li += '<li><a href="https://www.pinterest.com/' + social.pinterest + '" target="_blank" rel="noopener">';
                li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-pinterest fa-stack-1x fa-inverse"></i></span>';
                li += '</a></li>';
            }
            if (social.google != null && social.google != undefined) {
                li += '<li><a href="https://plus.google.com/' + social.google + '" target="_blank" rel="noopener">';
                li += '<span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-google-plus fa-stack-1x fa-inverse"></i></span>';
                li += '</a></li>';
            }
            $('#social-footer').append(li);
            $('.append-social').append(li);
            $('[data-wbstr-social]').after(li).remove();
            WsSetObjetos("ul_social", "<ul id='ws-ul-social'>" + li + "</ul>");
            li = '';
        }

        if (contato != null && contato != undefined) {

            if (contato.horario != null && contato.horario != undefined && contato.horario.length > 0) {
                li += '<li><i class="fa fa-fw fa-clock-o"></i>' + contato.horario + '</li>';
            }
            if (contato.fone_1 != null && contato.fone_1 != undefined && contato.fone_1.length > 0) {
                var fone1 = clearNum(contato.fone_1);
                $('.telefone-topo').append('<a href="tel:+55' + fone1 + '"><i class="fa fa-phone"></i>' + contato.fone_1 + '</a>');
                li += '<li class="footer-fones"><a href="tel:+55' + fone1 + '"><i class="fa fa-fw fa-phone"></i>' + contato.fone_1 + '</a></li>';
            }
            if (contato.fone_2 != null && contato.fone_2 != undefined && contato.fone_2.length > 0) {
                var fone2 = clearNum(contato.fone_2);
                li += '<li class="footer-fones"><a href="tel:+55' + fone2 + '"><i class="fa fa-fw fa-phone"></i>' + contato.fone_2 + '</a></li>';
            }
            if (contato.fone_3 != null && contato.fone_3 != undefined && contato.fone_3.length > 0) {
                var fone3 = clearNum(contato.fone_3);
                $('.telefone-topo').html('<a href="http://api.whatsapp.com/send?1=pt_BR&phone=55' + fone3 + '" target="_blank" rel="noopener"><i class="fa fa-whatsapp"></i>' + contato.fone_3 + '</a>');
                li += '<li class="footer-fones"><a href="http://api.whatsapp.com/send?1=pt_BR&phone=55' + fone3 + '" target="_blank" rel="noopener"><i class="fa fa-fw fa-whatsapp"></i>' + contato.fone_3 + '</a></li>';
            }
            if (contato.email_1 != null && contato.email_1 != undefined && contato.email_1.length > 0) {
                li += '<li class="footer-mails"><a href="mailto:' + contato.email_1 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_1 + '</a></li>';
            }
            if (contato.email_2 != null && contato.email_2 != undefined && contato.email_2.length > 0) {
                li += '<li class="footer-mails"><a href="mailto:' + contato.email_2 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_2 + '</a></li>';
            }
            if (contato.email_3 != null && contato.email_3 != undefined && contato.email_3.length > 0) {
                li += '<li class="footer-mails"><a href="mailto:' + contato.email_3 + '?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o"></i>' + contato.email_3 + '</a></li>';
            }
            contato.endereco = null;
            if (contato.endereco != null && contato.endereco != undefined && contato.endereco.length > 0) {
                li += '<li class="footer-address"><p><i class="fa fa-fw fa-map-marker"></i>' + contato.endereco;
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
            }
            if (links.faleconosco != null && links.faleconosco != undefined) {
                li += '<li class="footer-contact-link"><a href="' + links.faleconosco + '" id="link-faleconosco"><i class="fa fa-fw fa-address-book-o"></i>Fale Conosco</a></li>';
            }

            $('#contato-footer').append(li);

            WsSetObjetos("ul_contato", "<ul id='ws-ul-contatos'>" + li + "</ul>");

            if (contato.razao != null && contato.razao != undefined && contato.razao.length > 0 && contato.cnpj != null && contato.cnpj != undefined && contato.cnpj.length > 0) {
                $('#cnpj-footer').html('<span>' + contato.razao + ' - ' + contato.cnpj + '</span>');
            }
        }

        info_lojas_finish = "ok";

        if (typeof call_after_info_lojas !== 'undefined') { try { eval(call_after_info_lojas); } catch (e) { console.log("Falha call_after_info_lojas" + e.message); } }
        if (typeof WsJsStart !== 'undefined') { try { eval(WsJsStart); } catch (e) { console.log("Falha WsJsStart" + e.message); } }

    } catch (e) {
        console.log("Falha info lojas:" + e.message);
    }

}

function ColunasResponsivo(ELEMENTO, XS, SM, MD, LG){
	// inserir o elemento a ser adicionado as classes, e a quantidade de colunas

	var CLASS = '';

	if(XS != null && XS != undefined){
		if (XS == 'hidden'){
			CLASS += 'hidden-xs ';
		}else if (XS >= 1 && XS <= 12) {
			CLASS += 'col-xs-'+XS+' ';
		}
	}
	if(SM != null && SM != undefined){
		if (SM == 'hidden'){
			CLASS += 'hidden-sm ';
		}else if (SM >= 1 && SM <= 12) {
			CLASS += 'col-sm-'+SM+' ';
		}
	}
	if(MD != null && MD != undefined){
		if (MD == 'hidden'){
			CLASS += 'hidden-md ';
		}else if (MD >= 1 && MD <= 12) {
			CLASS += 'col-md-'+MD+' ';
		}
	}
	if(LG != null && LG != undefined){
		if (LG == 'hidden'){
			CLASS += 'hidden-lg ';
		}else if (LG >= 1 && LG <= 12) {
			CLASS += 'col-lg-'+LG+' ';
		}
	}

	var remove = "hidden col-xs-12 col-xs-11 col-xs-10 col-xs-9 col-xs-8 col-xs-7 col-xs-6 col-xs-5 col-xs-4 col-xs-3 col-xs-2 col-xs-1 ";
	remove += "col-sm-12 col-sm-11 col-sm-10 col-sm-9 col-sm-8 col-sm-7 col-sm-6 col-sm-5 col-sm-4 col-sm-3 col-sm-2 col-sm-1 ";
	remove += "col-md-12 col-md-11 col-md-10 col-md-9 col-md-8 col-md-7 col-md-6 col-md-5 col-md-4 col-md-3 col-md-2 col-md-1 ";
	remove += "col-lg-12 col-lg-11 col-lg-10 col-lg-9 col-lg-8 col-lg-7 col-lg-6 col-lg-5 col-lg-4 col-lg-3 col-lg-2 col-lg-1 ";
	$(ELEMENTO).removeClass(remove);
	$(ELEMENTO).addClass(CLASS);
}

function LazyLoadApply() {
    try {

        //window.setTimeout("LazyLoadApplyGo()", 500);
        /*if (useLazyLoadMain) {
            window.setInterval("LazyLoadApplyGo()", 500);
        }*/

    } catch (e) { }
}
function LazyLoadApplyGo() {
    try {

        /*console.log("Lazy ok");

        $("[data-obj-img-load]").lazyload();

        $('[data-obj-img-load]').each(
            function () {
                //$(this).removeAttr("data-obj-img-load");
                $(this).attr("lazzy-done", "ok");
            }
        );*/

    } catch (e) { console.log("Error lazyload." + e.message); }
}

function FrameworkResponsivo() {

	var etapa = $("#HdEtapaLoja").val();
	esq = lateralEsq;
	dir = lateralDir;

	if (etapa == "HOME"){

		if(esq == true && dir == true){
			ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 2);
			ColunasResponsivo('#div-conteudo', 12, 12, 8, 8);
			ColunasResponsivo('#div-barra-direita', 'hidden', 'hidden', 2);
		}else if(esq == true){
			ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 3);
			ColunasResponsivo('#div-conteudo', 12, 12, 9);
		}else if(dir == true){
			ColunasResponsivo('#div-barra-direita', 'hidden', 'hidden', 3);
			ColunasResponsivo('#div-conteudo', 12, 12, 9);			
		}
	}

	if (etapa == "LISTAGEM"){

		if(esq == true && dir == true){
			ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 3);
			ColunasResponsivo('#div-conteudo', 12, 12, 9);
		}else if(esq == true){
			ColunasResponsivo('#div-barra-esquerda', 'hidden', 'hidden', 3);
			ColunasResponsivo('#div-conteudo', 12, 12, 9);
		}else if(dir == true){
			ColunasResponsivo('#div-conteudo', 12);			
		}
	}

    ConteudoResponsivo();

    

}

var itensMaxHeight = 0;
function ConteudoResponsivo(){

	if(prodsLinha == 0){
		if(lateralEsq == true || lateralDir == true){
			prodsLinha = 3;
		}
	}

	if(prodsLinha != null && prodsLinha != undefined){
		if(prodsLinha == 4){
			ColunasResponsivo('.list-item', 6, 6, 4, 3);
		}else if(prodsLinha == 3){
			ColunasResponsivo('.list-item', 6, 6, 4);
		}else if(prodsLinha == 2){
			ColunasResponsivo('.list-item', 12, 12, 6);
		}else if(prodsLinha == 0){
			ColunasResponsivo('.list-item', 6, 6, 4, 3);
		}
    }

    window.setTimeout("ajusteHeightItens()", 500);
    
}

var KeepObjHeightList = "";
function ajusteHeightItens() {

    try {

        var addX = 0;
        if (typeof var_minH_addX !== 'undefined') { try { addX = var_minH_addX; } catch (e) { console.log("Falha var_minH_addX" + e.message); } }

        itensMaxHeight = 0;

        $("#div-conteudo .list-item").css("min-height", "initial");

        $("#div-conteudo .list-item").each(function () {
            var thisH = $(this).outerHeight();//.find(".div-item")
            var itemReg = $(this).attr("item-reg");
            var thisClass = $(this).attr("class");
            if (thisH > itensMaxHeight && thisClass.indexOf("slick-slide") < 0) {
                itensMaxHeight = thisH;
            }
            KeepObjHeightList += ("    itemReg:" + itemReg + " ==> " + itensMaxHeight);
        });

        if (itensMaxHeight > 0 && addX > 0) {
            itensMaxHeight = itensMaxHeight + addX;
        }

        KeepObjHeightList += ("    itens min h:" + itensMaxHeight);

        $("#div-conteudo .list-item").each(function () {
            var thisClass = $(this).attr("class");
            if (itensMaxHeight > 0 && thisClass.indexOf("slick-slide") < 0) {
                $(this).css("min-height", itensMaxHeight + "px");
            }
        });

        if (itensMaxHeight <= 0) {
            window.setTimeout("ajusteHeightItens()", 1000);
        }

    } catch (e) { }

}

function replaceStr(str, find, replace) {
	for (var i = 0; i < find.length; i++) {
		str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
	}
	return str;
}

function handleScroll() {
    var T = getScrollTop();

    if (T >= 100) {
    	$('#barra-flutuante').addClass('active');
    	$('#header-mobile').addClass('header-fixed');
    } else {
    	$('#barra-flutuante').removeClass('active');
    	$('#header-mobile').removeClass('header-fixed');
    }
}

function getScrollTop() {
    if (typeof pageYOffset != 'undefined') {
        return pageYOffset;
    } else {
        var B = document.body;
        var D = document.documentElement;
        D = (D.clientHeight) ? D : B;
        return D.scrollTop;
    }
}

function getElementPositionPage(elemID, tipo) {

    // onde elemID � o id do objeto que quero detectar a posicao no meu caso a imagem.
    var offsetTrail = document.getElementById(elemID);
    var i = 0;
    var offsetLeft = 0;
    var offsetTop = 0;
    while (offsetTrail || i > 1) {
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
    if (tipo == "L") {
        return offsetLeft;
    }
    else {
        return offsetTop;
    }

}


function AjustaMoney(VALOR) {
	return VALOR.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").replace(",", "|").replace(".", ",").replace("|", ".");
}

function clearNum(NUM){
	return (NUM.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ''));
}

function AjustaTopoMobile(){
	var headerHeight = $('#header-mobile').outerHeight(true);
	$('#mobile-placeholder').css('height', headerHeight);
}

ConteudoResponsivo();

function nomeProd(obj, linhas) {

    if (!obj) { return; }

    try {

        if (typeof qtdLinhas !== 'undefined') {
            try { linhas = qtdLinhas; } catch (e) { }
        }

        if (linhas) {
            qtdLinhas = linhas;
        }

        if (typeof qtdLinhas !== 'undefined') {

            if (typeof $clamp === "function") {
                $(obj + ' .prod-nome a').each(function (index, el) {
                    $clamp(el, { clamp: Number(qtdLinhas), useNativeClamp: true });
                });
            }

        } else {

            if (typeof $clamp === "function") {
                $(obj + ' .prod-nome a').each(function (index, el) {
                    $clamp(el, { clamp: '3', useNativeClamp: true });
                });
            }
        }

    } catch (e) { }

}

var allModulosOk = null;
function FuncVerifModulosComplete() {
    if (modulos_to_complete > 0) {
        if (modulos_to_complete <= modulos_completed) {
            allModulosOk = true;
            console.log("All modulos ok (" + modulos_to_complete + "/" + modulos_completed + ")");
        } else {
            //console.log("Not all modulos complete");
            window.setTimeout("FuncVerifModulosComplete()", 500);
        }
    } else {
        window.setTimeout("FuncVerifModulosComplete()", 1000);
    }

}

function isReady(check, callback, counter) {

	if (!counter) {counter = 0};
	var teste = eval('typeof ' + check);
	if(teste !== 'undefined' && teste != null){
		eval(callback);
		return true;
	}else{
		counter++;
		//console.log('counter: ' + counter);
		if(counter < 100){
			window.setTimeout(function(){
				isReady(check, callback, counter);
			}, 100);
		}else{
			return false;
		}
    }

}

function ValorJurosComposto(Juros, NumParcela, ParcelaJurosInicia, Valor) {

	var ValorParcela = 0;

	try {
		if (Juros > 0 && NumParcela >= ParcelaJurosInicia && NumParcela > 1) {
			ValorParcela = (Valor * (Juros / 100)) / (1 - (1 / (Math.pow((1 + (Juros / 100)), ((NumParcela))))));
		}
		else {
			ValorParcela = (Valor / NumParcela);
		}
	} catch (e) {}

	return ValorParcela;
}


var TYPES = {
    'undefined': 'undefined',
    'number': 'number',
    'boolean': 'boolean',
    'string': 'string',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error'
},
TOSTRING = Object.prototype.toString;
function typeObj(o) {
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
var WsGlobalVars = [];
var WsGlobalVarsList;
var WsObjetos;
function setTagsWs(obj, path) {

    try {

        if (path == undefined) { path = ""; }
        else if (path != "") {
            path += "_";
        }

        var passPath = "";

        var indexAtual = "";

        $.each(obj, function (index, value) {

            var tipo = typeObj(value);

            if (indexAtual == "" || indexAtual != index) {
                indexAtual = index;
                passPath = path;
            }

            if (tipo != undefined && tipo != null) {

                if (tipo == "object") {

                    if (passPath != "" && index != "" && passPath != undefined) {
                        passPath += index;
                    }

                    WsSetGlobalCars(passPath + index, value, tipo);

                    setTagsWs(value, passPath);

                }
                else if (tipo == "array") {

                    WsSetGlobalCars(passPath + index, value, tipo);

                }
                else if (tipo == "string" || tipo == "boolean" || tipo == "number") {

                    //console.log("TagName:" + passPath + index + " => " + value + " => " + tipo);

                    WsSetGlobalCars(passPath + index, value, tipo);

                    WsSetObjetos(passPath + index, value)

                } else {

                }

            }

        });

    } catch (e) {

        console.log("Falha setTagsWs:" + e.message);

    }

}

function WsSetObjetos(nome, valor) {
    try {
        $("span[rel='ws_" + nome + "']").each(function () { $(this).after(valor); $(this).remove(); });
        WsObjetos += "<span rel='ws_" + nome + "'></span> => (" + valor + ")\r\n";
    } catch (e) { }
}

function WsSetGlobalCars(nome, valor, tipo) {
    try {
        WsGlobalVars[nome] = valor;
        WsGlobalVarsList += nome + "  [" + tipo + "] => (" + valor + ")\r\n";
    } catch (e) { }
}


function FuncBuySamePageLoad() {
    var FundoLoadin = $("#LoadingBackHolder").html();
    if (FundoLoadin == undefined) {
        $("body").append("<div class='LoadingBackHolder' id='LoadingBackHolder'></div>");
    }
    $("#LoadingBackHolder").show();
}

function FuncBuySamePage() {
    try {

        console.log("BuySamePage");

        var CamposAdd = '<input type="hidden" id="HD_FUNCAO_AFTER_BT_COMPRAR_LISTA" value="FuncBuySamePageAfter()" />' +
            '<input type="hidden" id="HD_DADOS_FUNCAO_AFTER_BT_COMPRAR_LISTA" value="FuncBuySamePageAfter()" />';

        $("body").append(CamposAdd);

    } catch (e) { }
}

function FuncBuySamePageAfter() {
    try {

        var IdProduto = $("#HD_DADOS_FUNCAO_AFTER_BT_COMPRAR_LISTA").val();

        //$("li[item-reg='" + IdProduto + "']").find("[rel='buy-buttom-list']").hide();

        $("li[item-reg='" + IdProduto + "']").find("[rel='buy-buttom-list']").addClass("prod-in-kart");
        $("li[item-reg='" + IdProduto + "']").find("[rel='buy-buttom-list']").find("i").removeClass("fa-shopping-cart").addClass("fa-check");

        FuncRefreshCartInfo();
        
    } catch (e) {
        console.log("Falha BuySamePage:" + e.message);
    }
}

function FuncRefreshCartInfo(ask) {

    try {

        if (ask == true) {

            var varBoxMsgProdAdd = $("#BoxMsgProdAddAsk").html();
            var LV_ID = $("#HD_LV_ID").val();

            if (varBoxMsgProdAdd == undefined) {

                var iconSuccess = "<i class='far fa-check-circle'></i>";
                if (typeof over_iconSuccessProdAdd !== 'undefined') { iconSuccess = over_iconSuccessProdAdd; }

                $("body").append("" +
                    "<div class='BoxMsgProdAddAskBack' id='BoxMsgProdAddAskBack'></div>" +
                    "<div class='BoxMsgProdAddAsk' id='BoxMsgProdAddAsk'>" +
                    "<div class='BoxMsgProdAddAskContent'>" +
                    "   <div>" +
                    "       <strong>" + iconSuccess + "<br>Produto adicionado com sucesso ao carrinho!</strong> " +
                    "       <p>" +
                    "           <a href='javascript:void(FuncFecharAskAddProd())' class='bt-continuar-ask'>Continuar comprando</a>" +
                    "           <a href='/carrinho/" + LV_ID + "/carrinho' class='bt-go-cart-ask'>Ir para o carrinho</a>" +
                    "       </p>" +
                    "   </div>" +
                    "</div>");

            }
            $("#LoadingBackHolder").hide();
            $("#BoxMsgProdAddAskBack").show();
            $("#BoxMsgProdAddAsk").show();

        } else {

            var varBoxMsgProdAdd = $("#BoxMsgProdAdd").html();
            if (varBoxMsgProdAdd == undefined) {
                $("body").append("<div class='BoxMsgProdAdd' id='BoxMsgProdAdd'><a href='javascript:void(FuncCloseCartInfo())'>X</a><p>Produto adicionado com sucesso!</p><span>Acesse o carrinho para finalizar a compra.</span></div>");
            }

            $("#BoxMsgProdAdd").show();

            window.setTimeout("FuncCloseCartInfo()", 4000);

        }

        CarregaCarrinhoOnPage();

    } catch (e) {
        console.log("Falha FuncRefreshCartInfo");
    }

}

function FuncCloseCartInfo() {
    $("#BoxMsgProdAdd").fadeOut("fast");
}

function FuncFecharAskAddProd() {
    $("#BoxMsgProdAddAskBack").fadeOut("fast");
    $("#BoxMsgProdAddAsk").fadeOut("fast");
    $("#LV_BT_COMPRAR").show();
    window.setTimeout("FuncSomeMsgAddProd()", 500);
    window.setTimeout("FuncSomeMsgAddProd()", 1000);
}

function FuncSomeMsgAddProd() {
    $("#retornoBtComprar").remove();
}

function FuncExibeCondicoes(condicoes) {

    try {

        if (typeof over_condicoes !== 'undefined') { try { eval(over_condicoes); return; } catch (e) { console.log(e.message); } }

        var htmlCondicoes = '<div class="condicoes-loja" id="condicoes-loja">' +
            '<div class="row container">';

        for (c = 0; c < condicoes.length; c++) {

            var Link = '<a href="' + condicoes[c].url + '" title="' + condicoes[c].titulo + ' ' + condicoes[c].subtitulo + '">';
            var LinkFim = '</a>';

            if (condicoes[c].url == "") { Link = ""; LinkFim = ""; }

            htmlCondicoes += '<div class="condicao-item condicao-item-' + condicoes.length + '"> ' +
                '<div class="condicao-item-int">' +
                Link +
                '   <div class="condicao-icone">' + condicoes[c].icone + '</div>' +
                '   <div class="condicao-textos">' +
                '       <h3 class="condicao-titulo">' + condicoes[c].titulo + '</h3>' +
                '       <p class="condicao-subtitulo">' + condicoes[c].subtitulo + '</p>' +
                '   </div>' +
                LinkFim +
                '</div>' +
                '</div>';

        }

        htmlCondicoes += '</div></div>';

        var verifObjtoput = $("span[data-condicoes-loja]").length;

        if (!(verifObjtoput > 0)) {
            $(".homepage #div-conteudo").before(htmlCondicoes);
        } else {
            $("span[data-condicoes-loja]").before(htmlCondicoes);
            $("span[data-condicoes-loja]").remove();
        }

        if (typeof $clamp === "function") {
            $('#condicoes-loja .condicao-titulo').each(function (index, el) {
                $clamp(el, { clamp: 1, useNativeClamp: true });
            });
            $('#condicoes-loja .condicao-subtitulo').each(function (index, el) {
                $clamp(el, { clamp: 1, useNativeClamp: true });
            });
        }

        if (typeof after_condicoes !== 'undefined') { try { eval(after_condicoes); } catch (e) { console.log(e.message); } }

    } catch (e) {

        console.log("falha ao exibir condi&ccedil;�es:" + e.message);

    }

}

function cookieAskMsg(obj) {

    try {

        console.log("Starting cookies ask");

        var cookieLink = "";

        if (typeof over_cookieAsk !== 'undefined') { try { eval(over_cookieAsk); return; } catch (e) { console.log(e.message); } }

        var HTML_cookie_msg = "Este site usa cookies para gerar estat&iacute;sticas e para melhorar sua experi&ecirc;ncia de navega&ccedil;&atilde;o.<br/>" +
            "Ao continuar, voc&ecirc; declara que est&aacute; de acordo.";

        if (typeof over_cookieLink !== 'undefined') { try { cookieLink = over_cookieLink; } catch (e) { console.log(e.message); } } else {
            for (i = 0; i < obj.menuinstitucional.length; i++) {
                if (obj.menuinstitucional[i].titulo.toLowerCase().indexOf("privacidade") >= 0) {
                    cookieLink = obj.menuinstitucional[i].url;
                }
            }
        }

        if (cookieLink != "") {
            HTML_cookie_msg = "Este site usa cookies para gerar estat&iacute;sticas e para melhorar sua experi&ecirc;ncia de navega&ccedil;&atilde;o.<br/>" +
                "Ao continuar, voc&ecirc; declara que est&aacute; de acordo com a nossa <a href=\"" + cookieLink + "\" title=\"Pol&iacute;tica de Privacidade\">Pol&iacute;tica de Privacidade</a>.";
        }

        if (typeof over_cookieMsg !== 'undefined') { try { HTML_cookie_msg = over_cookieMsg; } catch (e) { console.log(e.message); } }

        var HTML_cookieAsk = "<div id=\"aceite_privacidade\" style=\"display: block;\">" +
            "<div class=\"row\">" +
            "<div class=\"col-md-9\">" +
            "<p>" + HTML_cookie_msg + "</p> " +
            "</div>" +
            "<div class=\"col-md-3\">" +
            "<button id=\"linkConfirmCookies\" onclick=\"cookieAceitePrivacidade()\" class=\"btn\">Aceitar</button>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "";

        var jaClicou = localStorage["cookieAsk"];;

        if (localStorage["cookieAsk"]) {
            if (localStorage["cookieAsk"] != "1") {
                $("body").append(HTML_cookieAsk);
            }
        } else {
            $("body").append(HTML_cookieAsk);
        }

        $("#linkConfirmCookies").click(function () { cookieAceitePrivacidade(); });

        console.log("jaClicou:" + jaClicou);

    } catch (e) { console.log("Falha cookie ask:" + e.message); }

}

function cookieAceitePrivacidade() {
    try {
        localStorage["cookieAsk"] = "1";
        $("#aceite_privacidade").fadeOut("fast");
    } catch (e) { console.log("Falha ao ocultar msg de cookies."); }
}




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
            var qtdFiltrosShow = 5;
            if (typeof overqtdFiltrosShow !== 'undefined') { try { qtdFiltrosShow = overqtdFiltrosShow; } catch (e) { } }
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
                                filtro += '<ul class="filtro-opcoes" data-filter-type="' + item[a].titulo + '">';
                                var opcao = item[a].opcoes;
                                for (b = 0; b < opcao.length; b++) {
                                    if (b >= qtdFiltrosShow) {
                                        filtro += '<li class="filtro-opcao shrink">';
                                        filtro += '<a href="' + opcao[b].link + '">' + opcao[b].nome.split('|')[0] + '</a>';
                                        filtro += '</li>';
                                    } else {
                                        filtro += '<li class="filtro-opcao">';
                                        filtro += '<a href="' + opcao[b].link + '">' + opcao[b].nome.split('|')[0] + '</a>';
                                        filtro += '</li>';
                                    }
                                    if (opcao[b].selecionada == true) {
                                        var objFiltro = { 'nome': opcao[b].nome, 'link': opcao[b].link };
                                        filtroAtivo.push(objFiltro);
                                    }
                                    if (b == (opcao.length - 1) && opcao.length > qtdFiltrosShow) {
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
                            span += '<span class="filtro-ativo">' + filtroAtivo[i].nome.split('|')[0] + '<a href="' + filtroAtivo[i].link + '">&times;</a></span>';
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
        WsModifiersCall("categorias_1_0");

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
            console.log("N�o foi poss�vel verificar o tamanho do menu.");
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
var useLazyLoadFabr = false;

$(document).ready(function () {
	
	if ($("#HdEtapaLoja").val() == "HOME") {
		window.setTimeout("Fabricantes()", 0);
	}

});

function Fabricantes() {
	ApiWS.ListaFabricantes("FabricantesRetorno");
}
function FabricantesRetorno() {

	try {

        if (typeof LazyLoadOver !== 'undefined') {
            useLazyLoadFabr = LazyLoadOver;
        }

        var classLazyLoad = "lazyload";
        var addCodeLazyLoad = "data-obj-img-load src='https://fileswscdn.wslojas.com.br/wsfiles/images/LoadBeforeShowImg.jpg' data-";
        if (!useLazyLoadFabr) { addCodeLazyLoad = ""; classLazyLoad = ""; }

		var OBJETO = ApiWS.Json;
		objetos.Fabricantes = OBJETO;

		if (typeof over_fabricantes !== 'undefined') { try { eval(over_fabricantes); return; } catch (e) { console.log(e.message); } }

		var obj = jQuery.parseJSON(OBJETO);
		var li = "";

		if (obj.fabricantes != null && obj.fabricantes != undefined && typeof semBlocoFabricantes == 'undefined') {
			if (obj.fabricantes.length > 0) {
				for(a = 0; a < obj.fabricantes.length; a++){
					var fabricante = obj.fabricantes[a];
					li += '<li id="fabricante-'+fabricante.id+'"><a href="'+fabricante.url+'">';

					if(fabricante.logotipo != null && fabricante.logotipo != undefined){
                        li += '<img ' + addCodeLazyLoad + 'src="' + fabricante.logotipo + '" class="' + classLazyLoad + '" alt="' + fabricante.nome + '" title="' + fabricante.nome + '">';
					}else{
						li += fabricante.nome;
					}
					li += '</a></li>';
				}
				$('#fabricantes').append(li);
				$('#fabricante-holder').removeClass('hidden');
				$('#fabricantes').slick({
					infinite: true,
					slidesToShow: 6,
					slidesToScroll: 1,
					autoplaySpeed: 2000,
				  	prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
					nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
					autoplay: true,
					responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 5,
							infinite: true
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 3
						}
					}],
				});
			}
		}

		if (typeof call_after_fabricantes !== 'undefined') { try { eval(call_after_fabricantes); } catch (e) { console.log("Falha call_after_fabricantes" + e.message); } }
		WsModifiersCall("fabricantes_1_0");

	} catch (e) { console.log(e.message); }
}
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

        WsModifiersCall("fale_conosco_1_0");

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
                FuncShowMsgContact("N�o foi poss�vel enviar o e-mail, tente novamente mais tarde.", "Error");
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

var bannerEmpty = false;
var produtoEmpty = false;
var destaqueEmpty = false;

var fotoVertical = null;

function empty(TIPO){	

	if (TIPO == 'banner') {
		bannerEmpty = true;
	}

	if (TIPO == 'produto') {
		produtoEmpty = true;
	}

	if (TIPO == 'destaque') {
		destaqueEmpty = true;
	}

	if (bannerEmpty == true && produtoEmpty == true && destaqueEmpty == true){
		console.log('empty');
		$('#div-conteudo').css('minHeight', '40rem');
		lojaVazia();
    }

}

var JsonProdsVazio = '{"totalitens":6,"produtos":[{"id":1742395,"codigo":"PLA2506552","nome":"Moletom","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":115.00,"preco_promocao":99.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#moletom"},"maisprodutos":null,"fotos":["https://imageswscdn.wslojas.com.br/files/20270/PEQ_393721.jpg"],"integracoes":[]},{"id":1742394,"codigo":"PLA5008634","nome":"Cinto","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":50.00,"preco_promocao":42.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#cinto"},"maisprodutos":null,"fotos":["https://imageswscdn.wslojas.com.br/files/20270/PEQ_272687.jpg"],"integracoes":[]},{"id":1742392,"codigo":"PLA6597883","nome":"Bon�","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":25.00,"preco_promocao":12.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#bone"},"maisprodutos":null,"fotos":["https://imageswscdn.wslojas.com.br/files/20270/PEQ_766268.jpg"],"integracoes":[]},{"id":1742393,"codigo":"PLA6365585","nome":"Camiseta","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":99.00,"preco_promocao":65.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#camiseta"},"maisprodutos":null,"fotos":["https://imageswscdn.wslojas.com.br/files/20270/PEQ_137428.jpg"],"integracoes":[]},{"id":1742396,"codigo":"PLA6930909","nome":"�culos de Sol","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":199.00,"preco_promocao":85.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#oculos-de-sol"},"maisprodutos":null,"fotos":["https://imageswscdn.wslojas.com.br/files/20270/PEQ_905085.jpg"],"integracoes":[]},{"id":1742397,"codigo":"PLA1722033","nome":"Touca","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"qtdminima":0,"datalimite":"\/Date(1567652400000)\/","fabricante":null,"precos":{"preco":45.00,"preco_promocao":40.00,"desconto_avista":10.00,"max_parcelas":12,"valor_min_parcelas":5.00,"juros_inicia":1,"juros":2.99},"links":{"botao_comprar":null,"ver_produto":"#touca"},"maisprodutos":null,"fotos":["https://imageswscdn.wslojas.com.br/files/20270/PEQ_340803.jpg"],"integracoes":[]}],"infoadd":" / TEMPO SEARCH:0","paginacao":null,"tipo_exibicao":null,"ordem_atual":"","scripts":"","titulo_pagina":null,"migalha":null,"wssource":"ws-db-1"}';
var JsonBannersVazio = '{"banners":[{"id":17729,"titulo":"Topo 1","tipo":"topo","conteudo":"","imagem":"https://imageswscdn.wslojas.com.br/files/20270/BANNER-MOLETOM.png","target":"_self","url":"","largura":0,"altura":0},{"id":17730,"titulo":"Topo 2","tipo":"topo","conteudo":"","imagem":"https://imageswscdn.wslojas.com.br/files/20270/BANNER-ACESSORIOS.png","target":"_self","url":"","largura":0,"altura":0},{"id":17731,"titulo":"Topo 3","tipo":"topo","conteudo":"","imagem":"https://imageswscdn.wslojas.com.br/files/20270/BANNER-TSHIRTS.png","target":"_self","url":"","largura":0,"altura":0},{"id":17732,"titulo":"Mini 1","tipo":"mini","conteudo":"","imagem":"https://imageswscdn.wslojas.com.br/files/20270/mini-banner-acessorios.png","target":"_self","url":"","largura":0,"altura":0},{"id":17733,"titulo":"Mini 2","tipo":"mini","conteudo":"","imagem":"https://imageswscdn.wslojas.com.br/files/20270/mini-banner-camisetas.png","target":"_self","url":"","largura":0,"altura":0},{"id":17734,"titulo":"Mini 3","tipo":"mini","conteudo":"","imagem":"https://imageswscdn.wslojas.com.br/files/20270/mini-banner-moletom-ok.png","target":"_self","url":"","largura":0,"altura":0}],"wssource":"ws-db-1"}';

function lojaVazia() {

    try {

		return false;

        fotoVertical = true;

        BannersRetorno(JsonBannersVazio);

        //cfg['produtos_pagina'] = 0;
        cfg['produtos_linha'] = 3;
        prodsLinha = 3;
        ProdutosHomeRetorno(JsonProdsVazio);

        menuFake();

        InstitucionalFake();

        AtendimentoFake();

        CategoriasRodapeFake();

    } catch (e)
    {
        console.log("Fail Loja Vazia " + e.message);
    }

}

function lojaVaziaBK(){

	var institucional = "";

	var JSON = '{"produtos":[{"codigo":"COD0000","nome":"Nome do produto","modo":"1","disponivel":true,"lancamento":false,"subprodutos":false,"fretegratis":false,"datalimite":"/Date(1519786800000)/","fabricante":{"nome":"Fabricante","url":"#","logotipo":null},"precos":{"preco":0,"preco_promocao":0,"desconto_avista":0,"max_parcelas":0,"valor_min_parcelas":0,"juros_inicia":0,"juros":0},"links":{"botao_comprar":"#","ver_produto":"#"},"maisprodutos":{"nome":"Categoria","link":"#"},"fotos":["/imagens_cliente/678/PEQ_PROD_678682120171218090806.jpg"],"integracoes":[]}]}';

	var template = $('#template').html();
	var obj = jQuery.parseJSON(JSON);

	var qtdGrupos = 0;
	for (a = 0; a < 3; a++) {
		var content = "";
		var codigo = 1234 + qtdGrupos;
		qtdGrupos++;
		content += '<div class="div-grupo grupo-'+qtdGrupos+' col-xs-12 no-gutter" id="cod-grupo-' + codigo + '"><div class="titulo-grupo">';
		content += '<h3>Grupo exemplo</h3><span class="arrow">';
		content += '<i class="fa fa-angle-left left-arrow"></i>';
		content += '<i class="fa fa-angle-right right-arrow"></i>';
		content += '</span></div>';

		content += '<ul class="lista-grupo" id="lista-grupo-' + codigo + '">';

		for (a = 0; a < 8; a++) {
			obj.produtos[0].fotos[0] = 'https://cdn.webstore.net.br/wsfiles/estrutura/img/prod_placeholder/prod_placeholder_'+a+'.png';
			content += BlocoProdutoFake(obj.produtos[0], template);
		}

		content += '</ul></div>';
		$('#div-conteudo').append(content);
		$("#grupo-loader").fadeOut('fast');
		$('#lista-grupo-1234').slick({
			infinite: true,
			slidesToShow: 4,
			autoplay: false,
			prevArrow: $('#cod-grupo-1234 .left-arrow'),
			nextArrow: $('#cod-grupo-1234 .right-arrow'),
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					infinite: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 375,
				settings: {
					slidesToShow: 1
				}
			}],
		});

	}

	var banner = '<li><img src="https://cdn.webstore.net.br/wsfiles/img/1200x400.png" class="img-responsive"></li>';
	$('#banner-topo').html(banner).removeClass('hidden');

	var miniBanner = '<li class="col-xs-6 col-sm-3"><img src="https://cdn.webstore.net.br/wsfiles/img/300x150.png" class="img-responsive"></li>';
	var miniBanner = miniBanner.repeat(4);
	$('#banner-mini').html(miniBanner).removeClass('hidden');

	console.log(institucional.length);
	if(objInstitucional.length < 1){

		var li = '';

		var JSON = '{"institucional":[{"id":293,"titulo":"Sobre n&oacute;s","tipo":"EXT","url":"#"},{"id":294,"titulo":"Pol&iacute;tica de entrega","tipo":"EXT","url":"#"},{"id":295,"titulo":"Pol&iacute;tica de trocas e devolu&ccedil;&atilde;o","tipo":"EXT","url":"#"},{"id":297,"titulo":"Formas de pagamento","tipo":"INT","url":"#"},{"id":298,"titulo":"Compre no atacado","tipo":"INT","url":"#"}]}';
		var obj = jQuery.parseJSON(JSON);
		obj = obj.institucional;
		console.log(obj.length);

		for (i = 0; i < obj.length; i++){
			PAG[obj[i].id] = [obj[i]];
			li += '<li><a href="'+obj[i].url+'" rel="'+obj[i].titulo+'">'+obj[i].titulo+'</a></li>';
		}

		$('#institucional-footer').append(li);
		li = '';

	}

	menuFake();

}

function menuFake(){
	if(categoria.length == 0){

		var JSON = '{"Categorias":[{"id":38118,"atual":false,"nome":"Exemplo 1","url":"#","subcategorias":[{"id":38122,"atual":false,"nome":"Exemplo 1-1","url":"#","subcategorias":[{"id":38128,"atual":false,"nome":"Exemplo 1-1-1","url":"#","subcategorias":[]}]},{"id":38119,"atual":false,"nome":"Exemplo 1-2","url":"#","subcategorias":[]},{"id":38120,"atual":false,"nome":"Exemplo 1-3","url":"#","subcategorias":[]},{"id":38121,"atual":false,"nome":"Exemplo 1-4","url":"#","subcategorias":[]},{"id":38124,"atual":false,"nome":"Exemplo 1-5","url":"#","subcategorias":[]},{"id":38123,"atual":false,"nome":"Exemplo 1-6","url":"#","subcategorias":[]},{"id":38125,"atual":false,"nome":"Exemplo 1-7","url":"#","subcategorias":[]}]},{"id":38093,"atual":false,"nome":"Exemplo 2","url":"#","subcategorias":[]},{"id":38088,"atual":false,"nome":"Exemplo 3","url":"#","subcategorias":[{"id":38089,"atual":false,"nome":"Exemplo 3-1","url":"#","subcategorias":[]},{"id":38091,"atual":false,"nome":"Exemplo 3-2","url":"#","subcategorias":[]},{"id":38092,"atual":false,"nome":"Exemplo 3-3","url":"#","subcategorias":[]},{"id":38090,"atual":false,"nome":"Exemplo 3-4","url":"#","subcategorias":[]}]},{"id":38111,"atual":false,"nome":"Exemplo 4","url":"#","subcategorias":[]},{"id":38126,"atual":false,"nome":"Exemplo 5","url":"#","subcategorias":[]}]}';
		var obj = jQuery.parseJSON(JSON);
		
		var LOG = [];
		var menu = "";
		var filtro = "";
		var categorias = Departamentos(obj.Categorias, 0, LOG);

		$('.departamentos-nav').append(categorias);
		ajustaSubMenu();
		ajustaNav();
	}
}

function BlocoProdutoFake(OBJ, TEMPLATE){
	var ADD = '<div class="add">',
		FOTO = '',
		PROMOCAO = '',
		PARCELA = '',
		DESCONTO = '',
		MIN_PARCELA = '',
		PORCENTAGEM = '',
		COMPRAR = '',
		PRECO = '',
		VEZES = '',
		UMA = '',
		FAB = '',
		CLASS = 'prod-fake ',
		MAIS = '',
		LINK = OBJ.links.ver_produto;

	FOTO += '<a href="'+LINK+'" title="'+OBJ.nome+'">';
	if (OBJ.fotos != null && OBJ.fotos != undefined){
		FOTO += '<img src="'+OBJ.fotos[0]+'" alt="'+OBJ.nome+'" class="img-responsive">';
	}
	FOTO += '</a>';

	if (OBJ.lancamento == true) {
		ADD += '<span class="prod-lancamento">Lan&ccedil;amento</span>';
	}

	var DESTAQUE = '<span class="prod-detalhes"><a href="'+LINK+'" title="'+OBJ.nome+'">Demonstra&ccedil;&atilde;o</a></span>';
	var NOME = '<p class="prod-nome"><a href="'+LINK+'" title="'+OBJ.nome+'">'+OBJ.nome+'</a></p>';

	var PRECO = Number(OBJ.precos.preco);
	var PROMOCAO = Number(OBJ.precos.preco_promocao);
	var VEZES = Number(OBJ.precos.max_parcelas);
	var DESCONTO = PRECO / 100 * Number(OBJ.precos.desconto_avista);
	var MIN_PARCELA = Number(OBJ.precos.valor_min_parcelas);
	var INICIA = Number(OBJ.precos.juros_inicia);
	var JUROS = Number(OBJ.precos.juros);

	UMA = '<p class="prod-preco-uma"><a href="'+LINK+'" title="'+OBJ.nome+'">R$ $$$ &agrave; vista</a></p>';
	VEZES = '<p class="prod-preco-parc"><a href="'+LINK+'" title="'+OBJ.nome+'">10x de R$ $$$</a></p>';				
	PRECO = '<p class="prod-preco"><a href="'+LINK+'" title="'+OBJ.nome+'">R$ $$$$</a></p>';

	if(OBJ.links.botao_comprar != null && OBJ.links.botao_comprar != undefined){
		COMPRAR = '<div class="prod-botao-comprar">';
		COMPRAR += '<span><a href="'+OBJ.links.botao_comprar+'"><i class="fa fa-shopping-cart"></i> Comprar</a></span>';
		COMPRAR += '</div>';
	}

	if (OBJ.fabricante != null && OBJ.fabricante != undefined) {
		FAB = ' <a href="'+OBJ.fabricante.url+'" title="'+OBJ.fabricante.nome+'">'+OBJ.fabricante.nome+'</a>';
	}

	if (OBJ.maisprodutos != null && OBJ.maisprodutos != undefined) {
		MAIS = ' <a href="'+OBJ.maisprodutos.link+'" title="'+OBJ.maisprodutos.nome+'">'+OBJ.maisprodutos.nome+'</a>';
	}

	ADD += '</div>';

	var find = ["<!--##CLASS##-->","<!--##FOTO##-->","<!--##DESTAQUE##-->","<!--##ADD##-->","<!--##NOME##-->","<!--##PRECO##-->","<!--##VEZES##-->","<!--##UMA##-->","<!--##COMPRAR##-->","<!--##FAB##-->","<!--##MAIS##-->","<!--##LINK##-->"];
	var replace = [CLASS,FOTO,DESTAQUE,ADD,NOME,PRECO,VEZES,UMA,COMPRAR,FAB,MAIS,LINK];

	TEMPLATE = replaceStr(TEMPLATE, find, replace);                            
	return TEMPLATE;
}

function InstitucionalFake() {

    console.log("institucional:" + objInstitucional.length);

    if (objInstitucional.length < 1) {

        var li = '';

        var JSON = '{"institucional":[{"id":293,"titulo":"Sobre n&oacute;s","tipo":"EXT","url":"#"},{"id":294,"titulo":"Pol&iacute;tica de entrega","tipo":"EXT","url":"#"},{"id":295,"titulo":"Pol&iacute;tica de trocas e devolu&ccedil;&atilde;o","tipo":"EXT","url":"#"},{"id":297,"titulo":"Formas de pagamento","tipo":"INT","url":"#"},{"id":298,"titulo":"Compre no atacado","tipo":"INT","url":"#"}]}';
        var obj = jQuery.parseJSON(JSON);
        obj = obj.institucional;
        console.log(obj.length);

        for (i = 0; i < obj.length; i++) {
            PAG[obj[i].id] = [obj[i]];
            li += '<li><a href="' + obj[i].url + '" rel="' + obj[i].titulo + '">' + obj[i].titulo + '</a></li>';
        }

        $('#institucional-footer').append(li);
        li = '';

    }

}

function AtendimentoFake() {

    if ($('#contato-footer li').length <= 1) {

        $('#contato-footer').prepend('' +
            '<li><i class="fa fa-fw fa-clock-o" aria-hidden="true"></i>seg a sex das 0h �s 0h</li> ' +
            '<li class="footer-fones"><a href="tel:+551100000000"><i class="fa fa-fw fa-phone" aria-hidden="true"></i>00 0000-0000</a></li> ' +
            '<li class="footer-fones"><a href="http://api.whatsapp.com/send?1=pt_BR&amp;phone=551100000000" target="_blank" rel="noopener"><i class="fa fa-fw fa-whatsapp" aria-hidden="true"></i>00 0000-0000</a></li> ' +
            '<li class="footer-mails"><a href="mailto:contato@seudominio.com.br?subject=Contato Loja Virtual"><i class="fa fa-fw fa-envelope-o" aria-hidden="true"></i>contato@seudominio.com.br</a></li> ' +
            //'<li class="footer-contact-link"><a href="/contato/678/contato" id="link-faleconosco"><i class="fa fa-fw fa-address-book-o" aria-hidden="true"></i>Fale Conosco</a></li>' +
            '');

    }

}

function CategoriasRodapeFake() {

    if ($('#categoria-footer li').length <= 0) {

        var li = '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 1</a></li>' +
            '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 2</a></li>' +
            '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 3</a></li>' +
            '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 4</a></li>' +
            '<li class="dpt-nivel-0" id="departamento-38118" atual="false"><a href="#" class="com-sub">Exemplo 5</a></li>';

        $("#categoria-footer").html(li);

    }

}
$(document).ready(function(){
	try{

		$('#overlay').click(function(event) {
			if(menuAberto == true || carrinhoAberto == true){
				event.preventDefault();
				closeNav();
				closeCart();
			}
		});

		$('#menu-drawer').click(function(event){
		    event.stopPropagation();
		});

		AjustaTopoMobile();

	} catch (e) { console.log(e.message); }
});

var menuAberto = false;
function openNav() {
	$('#menu-drawer').css({
		visibility: 'visible',
		opacity: '1',
		overflow: 'scroll',
		left: '0'
	});
	$('#main').css({
		left: '40rem'
	});
	$('#overlay').css({
		width: '100%',
		height: '100%',
		opacity: '0.5'
	});
	menuAberto = true;
}
function closeNav() {
	$('#menu-drawer').css({
		visibility: 'hidden',
		opacity: '0',
		overflow: 'hidden',
		left: '-40rem'
	});
	$('#main').css({
		left: '0'
	});
	$('#overlay').css({
		width: '0',
		height: '0',
		opacity: '0'
	});

	$('.subcategoria').fadeOut('fast', function() {
		$('.subcategoria').remove();		
	});

	menuAberto = false;
}

function ajustaSubMenu(){
	$('#menu-drawer a.com-sub').each(function(index, el) {
		var id = $(this).parent('li').attr('id');
		$(this).attr('href', 'javascript:void(abreSubMenu("'+id+'"))');			
	});
}

function abreSubMenu(ID){
	var ul = $('#'+ID+' > ul').html();
	var nome = $('#'+ID+' > a').html();
	$('#'+ID+' ul').hide();
	$('#menu-drawer .container .row > div').append('<div class="subcategoria '+ID+'"><div class="categoria-header"><a href=""><i class="fa fa-angle-left"></i>'+nome+'</a></div><div class="categoria-body"><ul class="departamentos-nav">'+ul+'</ul></div></div>');
	$('.subcategoria.'+ID+' .categoria-header a').attr('href', 'javascript:void(fechaSubMenu("'+ID+'"))');
	$('.subcategoria.'+ID).fadeIn('fast');
	$('.subcategoria.'+ID).css({
		visibility: 'visible',
		left: '0'
	})
	ajustaSubMenu();
}

function fechaSubMenu(ID){
	$('.subcategoria.'+ID).fadeOut('fast', function() {
		$('.subcategoria.'+ID).remove();		
	});	
}

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

$(document).ready(function () {
	try{
		if ($("#HdEtapaLoja").val() == "HOME") {
			//window.setTimeout("ProdutosDestaque()", 0);
			isReady("banners_finished", "ProdutosDestaqueStart()");
		}
	} catch (e) { console.log(e.message); }
});

function ProdutosDestaqueStart() {
	isReady("cfg['estrutura']", "ProdutosDestaque()");
}

function ProdutosDestaque() {
	modulos_to_complete++;
	ApiWS.ListaProdutosDestaque("ProdutosDestaqueRetorno");
}
function ProdutosDestaqueRetorno() {
	try {

		modulos_completed++;

        var OBJETO = ApiWS.Json;

        if (typeof over_produtos_destaque !== 'undefined') { try { eval(over_produtos_destaque); return; } catch (e) { console.log(e.message); } }

		var obj = jQuery.parseJSON(OBJETO);
		objetos.ProdutosDestaque = OBJETO;
		
		var QtdPage = 2;
		if (typeof destaqueQtdPage !== 'undefined') {
		    QtdPage = destaqueQtdPage;
		}
		
		var arrowsOn = false;
		if (typeof destaqueArrowsOn !== 'undefined') {
		    arrowsOn = destaqueArrowsOn;
		}

        var templateDestaque = $('#template-destaque').html();
        var template = $('#template').html();

        if (templateDestaque) {
            template = templateDestaque;
        }

		$("#destaque-list").addClass("destaque-qtd-" + QtdPage);

		$("#destaque-list").html("");
		if (obj.totalitens && obj.totalitens > 0) {

			var li = "";
			var IndiceListProds = "";

			for (a = 0; a < obj.totalitens; a++) {

			    var bloco = BlocoProduto(obj.produtos[a], template);
				li += bloco;

				IndiceListProds += BlocoProduto(obj.produtos[a], template);

			}

		    $('#destaque-list')
			.append(li)
			.css({
				opacity: '1',
				visibility: 'visible'
			})
			.slick({
				infinite: true,
				autoplay: false,
				slidesToShow: QtdPage,
				slidesToScroll: QtdPage,
				autoplaySpeed: 3000,
				arrows: arrowsOn,
				dots: true,
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			});
		    blocoHeight('#destaque-list');

			if (typeof destaqueIndiceListProds !== 'undefined') {
			    $("#destaque-indice-list").html(IndiceListProds);
			    $("#prod-destaque").addClass("destaque-indice-prods");
			    $(".slick-dots").addClass("hidden");
			    IndiceDestaqueListAjusta();
			} else {
			    $("#destaque-indice-list").remove();
			}

			if (typeof tituloDestaque !== 'undefined') {
			    $("#tit-destaque-produtos h3").html(tituloDestaque);
			} else {
			    $("#tit-destaque-produtos").remove();
			}

		}else{
			$('#prod-destaque').hide();
			empty('destaque');
        }

        LazyLoadApply();

		if (typeof call_after_destaque !== 'undefined') { try { eval(call_after_destaque); } catch (e) { console.log("Falha call_after_destaque" + e.message); } }
		WsModifiersCall("produtos_destaque_1_2");

	} catch (e) { console.log('ProdutosDestaqueRetorno: ' + e.message); }
}


function IndiceDestaqueListAjusta() {

    var ContIndice = 0;
    $("#destaque-indice-list li").each(
        function () {

            $(this).find("a").each(function () { $(this).attr("href", "javascript:void(linkIndiceList(" + ContIndice + "))"); })
            ContIndice++;

        }
    );

}

function linkIndiceList(indice) {

    try {

        var contIndiceVerif = 0;
        $(".slick-dots li").each(
            function () {
                if (contIndiceVerif == indice) {
                    $(this).find("button").click();
                }
                contIndiceVerif++;
            }
        )

    } catch (e) {
        console.log("linkIndiceList:" + e.message);
    }

}

function ProdutosHome() {
    isReady("banners_finished", "ProdutosHomeGoOn()");
}

function ProdutosHomeGoOn() {
    modulos_to_complete++;
	ApiWS.ListaProdutosHome("ProdutosHomeRetorno");
}

function ProdutosHomeRetorno(getJson) {
    try {

        modulos_completed++;

        var template = $('#template').html();
        var conteudo = '<ul id="prod-list" class="produtos-home">';

        var JSON = "";

        //console.log("Produto getJson:" + getJson);

        if (getJson) {
            JSON = getJson;
        } else {
            JSON = ApiWS.Json;
        }

        objetos.ProdutosHome = JSON;
        var obj = jQuery.parseJSON(JSON);
        var qtdProdutos = 0;

        //console.log("TotalProds:" + obj.totalitens);

        //console.log("produtos_pagina:" + cfg['produtos_pagina']);

        $("#produtos-grupos").html("").css('display', 'none');
        if (obj.totalitens != null && obj.totalitens != undefined) {
            if (obj.totalitens > 0 && cfg['produtos_pagina'] < obj.totalitens) {

                for (a = 0; a < cfg['produtos_pagina']; a++) {
                    qtdProdutos++;
                    var bloco = BlocoProduto(obj.produtos[a], template);
                    conteudo += bloco;
                }

            } else if (obj.totalitens > 0) {

                for (a = 0; a < obj.totalitens; a++) {
                    qtdProdutos++;
                    var bloco = BlocoProduto(obj.produtos[a], template);
                    conteudo += bloco;
                }

            } else {
                empty('produto');
            }
        } else {
            empty('produto');
        }

        conteudo += '</ul>';

        //console.log("ConteudoProds:" + conteudo);

        if ($('#produtos-grupos').length) {
            $('#preloader').fadeOut('fast', function () {

                $('#produtos-grupos').after(conteudo).remove();
                $('#prod-list').show('fast');
                blocoHeight('#prod-list');

            });
        } else {

            $('#div-conteudo').prepend(conteudo);
            $('#prod-list').show('fast');
            blocoHeight('#prod-list');

        }

        ConteudoResponsivo();
        nomeProd("#produtos-grupos");

        window.setTimeout("ConteudoResponsivo()", 1500);

        window.setTimeout("ConteudoResponsivo()", 3000);

        window.setTimeout("ConteudoResponsivo()", 5000);

        window.setTimeout("blocoHeightAjusta()", 2000);

        LazyLoadApply();

        WsModifiersCall("produtos_home_1_1");

    } catch (e) { console.log('ProdutosHomeRetorno: ' + e.message); }

}

$(document).ready(function () {
    window.setTimeout("startModDatalayer()", 1000);
});

function startModDatalayer() {

    var etapa = document.querySelector('#HdEtapaLoja').value;

    if (
          ((etapa == 'HOME' ) && (!objetos.ProdutosDestaque || !objetos.ProdutosGrupos || !objetos.ProdutosHome))
          ||
          ((etapa == "LISTAGEM") && (!objetos.CategoriasLista || !objetos.ProdutosListagem))
          ||
          (etapa == 'PRODUTO' && (!objetos.ProdutoDadosRetorno || !objetos.CategoriasLista))
       ) {
            window.setTimeout("startModDatalayer()", 1000);
            return;
        }

    modDatalayer();

}


function modDatalayer() {

    console.log("modDatalayer started");

    function createObj (etapa) {
        let productsIdArray = [], productsSKUArray = [], productsArray = [];

        let eventToPush, pageDepartament, pageCategory, productUnique;

        let pageDepartamentUrl = window.location.href.split('/');

        function getDepart(mainelem, n) {
            try {
                mainelem.forEach(elem => {
                    if (elem.atual) {
                        pageDepartament = elem.nome;
                    } else {
                        if (n == 5) { return };
                        if (elem.subcategorias == undefined || elem.subcategorias == null) { return };
                        getDepart(elem.subcategorias, n+1);
                    }
                });
            } catch(e) {
                console.log('ERRO ModDataLayer: ', e.message);
                console.log('JSON ModDataLayer', mainelem);
            };
        };

        switch (etapa) {
            case 'HOME':
                eventToPush = 'homeView';
                pageCategory = 'home';
                pageDepartament = null;
                break;
            case 'LISTAGEM':
                eventToPush = 'categoryView';
                pageCategory = 'category';
                break;
            case 'PRODUTO':
                eventToPush = 'productView';
                pageCategory = 'home';
                productUnique = true;
                break;
            default:
                break;
        };

        getDepart(JSON.parse(objetos.CategoriasLista).Categorias, 0);

        if (pageDepartament == undefined) {
            if (pageDepartamentUrl[3] == 'busca') {
                pageDepartament = null;
                eventToPush = 'internalSiteSearchView';
                pageCategory = 'search';
            };
        };

        for (let i = 0; i < 3; i++) { pageDepartamentUrl.shift(); };

        let pagePath = '/' + pageDepartamentUrl.join('/');

        let objToCreate = {
            'event': eventToPush,
            'userId': document.querySelector('#HD_LVCLI_ID').value,
            'pageCategory': pageCategory,
            'pageDepartment': pageDepartament,
            'pageTitle': document.title,
            'path': pagePath
        };

        function getProd(element) {
            let priceFrom = element.precos.preco,
                priceProm = element.precos.preco_promocao;

            let thisProduct = {
                'name': element.nome,
                'id': element.id,
                'priceFrom': priceFrom,
                'price': priceProm,
                'variant': element.codigo
            };

            if (element.fabricante) {
                thisProduct['brand'] = element.fabricante.nome;
            } else {
                thisProduct['brand'] = null;
            };

            if (priceProm == 0 || priceProm == '0') {
                thisProduct['price'] = priceFrom;
            };
            return thisProduct;
        }

        if (productUnique == undefined) {
            Object.keys(objetos).forEach(columnName => {
                let obj = JSON.parse(objetos[columnName]);
                if (!obj) { return }
                if (obj.produtos) {
                    obj.produtos.forEach(element=> {

                        productsIdArray.push(element.id);
                        productsSKUArray.push(element.codigo);
        
                        productsArray.push(getProd(element));
        
                    });
                } else { return; };
            });
        } else {
            objToCreate['product'] = getProd(JSON.parse(objetos.ProdutoDadosRetorno));
        }

        if (productUnique == undefined) {
            objToCreate['productsImpressionsIds'] = productsIdArray;
            objToCreate['productsImpressionsSkus'] = productsSKUArray;
            objToCreate['impressions'] = productsArray;
        };

        return objToCreate;
    }

    function printObj () {
        let objToCreate = JSON.stringify(createObj(document.querySelector('#HdEtapaLoja').value));

        let scriptElem = document.createElement('script');
        scriptElem.innerHTML = `
        var dataLayer = window.dataLayer || [];
            dataLayer.push(${objToCreate});
        `;

        document.querySelector('head').append(scriptElem);
    }
    
    printObj();
    
};
$(document).ready(function () {isReady('allModulosOk', 'modloja_condition_top()');});

function modloja_condition_top() {
    if (objetos.InfosLojas) {
        let div = document.createElement('div');
        div.setAttribute('class', 'condition-top-container');
        JSON.parse(objetos.InfosLojas).condicoes.forEach(elm => {
            let p = document.createElement('p');
                p.setAttribute('class', 'condition-top-title');
                p.innerHTML = `${elm.titulo}&nbsp;<span> ${elm.subtitulo}</span>`;
            div.append(p);
        });
        document.querySelector('header').prepend(div);

        $('.condition-top-container').slick({
            slidesToShow: 1,
            arrows: false,
            draggable: false,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnFocus: false,
            pauseOnHover: false,
            vertical: true
        });

    } else {
        setTimeout(() => {
            modloja_condition_top();
        }, 55);
    };
};
$(document).ready(function(){
	isReady("cliente", "Login()");
});

function Login() {
	try {
		if (typeof over_login !== 'undefined') { try { eval(over_login); return; } catch (e) { console.log(e.message); } }

		let userName = document.querySelector('#HD_LVCLI_NOME').value, lojaId = document.querySelector('#HD_LV_ID').value;

		document.querySelector('.login-list-button .user-name').innerHTML = userName != 'Visitante' ? userName : 'ENTRAR'

		let list = document.createElement('ul');
			list.setAttribute('id', 'lista-login');

			list.innerHTML = userName != 'Visitante' ? 
				`<li><a href="/menu-cliente" class="pos-login link-pedidos">Meus Dados</a></li>
				<li><a href="/menu-cliente" class="pos-login link-pedidos">Meus Pedidos</a></li>
				<li><a href="/logoff/${lojaId}/logoff" class="pos-login link-sair">Sair</a></li>`
			:
				`<li><a href="/login" class="pre-login link-login">Fazer login</a></li>
				<li class="switcher"><span></span>ou<span></span></li>
				<li><a href="/cadastro" class="pre-login link-login">Cadastrar</a></li>`;

		document.querySelector('.login-list-button .lista-login-container').append(list);
		
		if (typeof call_after_login !== 'undefined') { try { eval(call_after_login); } catch (e) { console.log("Falha call_after_login" + e.message); } }
		WsModifiersCall("login_1_0");

	} catch (e) {
		console.log(e.message);
	}
}
var useLazyLoadBanner = true;
var banners_finished;

$(document).ready(function () {
	try {
		var etapa = $("#HdEtapaLoja").val();
		if (etapa == "HOME" || etapa == "LISTAGEM") {
			isReady("cfg['estrutura']", "Banners()");
		}
	} catch (e) { console.log(e.message); }
});

function Banners() {
	ApiWS.ListaBanners("BannersRetorno");
}
function BannersRetorno(getJson) {
	try {

		var dispositivousing = "D";
		//console.log("Tamanho da tela " + $(window).width());
		if ($(window).width() < 720) {
			dispositivousing = "M";
		}

		if (typeof LazyLoadOver !== 'undefined') {
			useLazyLoadBanner = LazyLoadOver;
		}

		var classLazyLoad = "lazyload";
		var addCodeLazyLoad = "data-obj-img-load src='https://fileswscdn.wslojas.com.br/wsfiles/images/LoadBeforeShowImg.jpg' data-";
		if (!useLazyLoadBanner) { addCodeLazyLoad = ""; classLazyLoad = ""; }

		var OBJETO = "";

		if (getJson) {
			OBJETO = getJson;
		} else {
			OBJETO = ApiWS.Json;
		}

		//var OBJETO = ApiWS.Json;
		objetos.Banners = OBJETO;

		if (typeof over_banners !== 'undefined') { try { eval(over_banners); banners_finished = "ok"; return; } catch (e) { console.log(e.message); banners_finished = "ok"; } }

		var obj = jQuery.parseJSON(OBJETO);

		var tipo = [];
		if (obj.banners != null && obj.banners != undefined) {
			if (obj.banners.length > 0) {

				for (a = 0; a < obj.banners.length; a++) {
					var banner = obj.banners[a];
					var li = "";
					var img = "";

					if (banner.tipo == '24') { banner.tipo = 'full'; }

					if (banner.tipo == 'category_description') {
						if (!$("#banner-category_description").length) {
							$("#div-conteudo").prepend("<div id='banner-category_description' class='hidden'></div>");
						}
					}

					var bannerDispositivo = "D";
					try { bannerDispositivo = banner.dispositivos; } catch (e) { }

					if (bannerDispositivo != "D" && bannerDispositivo != "M" && bannerDispositivo != "T") { bannerDispositivo = "D"; }

					//console.log("banner - " + bannerDispositivo + " - " + dispositivousing);

					if (dispositivousing == bannerDispositivo || bannerDispositivo == "T") {

						if (banner.conteudo) {
							li = '<div class="banner-video">';

							li += banner.conteudo;

							li += '</div>';
						} else {

							if (banner.url != null && banner.url != undefined && banner.url.length > 0) {
								var href = 'href="' + banner.url + '"';
							} else {
								var href = "";
							}

							if (banner.altura != '0' || banner.largura != '0') {

								if (banner.altura != '0' && banner.largura != '0') {
									var img = '<img ' + addCodeLazyLoad + 'src="' + banner.imagem + '" alt="' + banner.titulo + '" class="' + classLazyLoad + '" style="width: ' + banner.largura + 'px; height: ' + banner.altura + 'px">';
								} else if (banner.altura != 0) {
									var img = '<img ' + addCodeLazyLoad + 'src="' + banner.imagem + '" alt="' + banner.titulo + '" class="' + classLazyLoad + '" style="height: ' + banner.altura + 'px; width: auto; max-width: 100%;">';
								} else if (banner.largura != 0) {
									var img = '<img ' + addCodeLazyLoad + 'src="' + banner.imagem + '" alt="' + banner.titulo + '" class="' + classLazyLoad + '" style="width: ' + banner.largura + 'px">';
								}

							} else {
								var img = '<img ' + addCodeLazyLoad + 'src="' + banner.imagem + '" class="' + classLazyLoad + '" alt="' + banner.titulo + '">';
							}

							if (banner.tipo == 'topo') {

								li += '<li id="slide-' + banner.id + '">';
								li += '<a ' + href + ' target="' + banner.target + '">' + img + '</a></li>';

							} else if (banner.tipo == 'mini') {

								li += '<li id="slide-' + banner.id + '">';
								li += '<a style="position:relative;"' + href + ' target="' + banner.target + '"><p>' + banner.titulo + '</p>' + img + '</a></li>';

							} else if (banner.tipo == 'full') {

								li += '<li id="slide-' + banner.id + '">';
								li += '<a ' + href + ' target="' + banner.target + '">' + img + '</a></li>';

							} else if (banner.tipo == 'lateral') {
								lateralDir = true;
								FrameworkResponsivo();

								li += '<a ' + href + ' target="' + banner.target + '">' + img + '</a>';

							} else if (banner.tipo == 'lateralEsq') {
								lateralEsq = true;
								FrameworkResponsivo();

								li += '<a ' + href + ' target="' + banner.target + '">' + img + '</a>';

							} else {

								li += '<a ' + href + ' target="' + banner.target + '">' + img + '</a>';

							}

						}

						if ($('#banner-' + banner.tipo).length) {

							$('#banner-' + banner.tipo).append(li);
							if (tipo.indexOf(banner.tipo) == -1) {
								tipo.push(banner.tipo);
							}

						}

					}

				}

				if (typeof bannerFull !== 'undefined') {
					$('#slider').find('.container').removeClass('container');
				}

				var speedBann = 4000;
				if (typeof speedBanners !== 'undefined') {
					speedBann = speedBanners;
				}

				var dotsBann = false;
				if (typeof dotsBanner !== 'undefined') {
					dotsBann = dotsBanner;
				}

				for (b = 0; b < tipo.length; b++) {

					try { $('#banner-' + tipo[b]).removeClass('hidden').removeClass('hidden-xs').removeClass('hidden-md').removeClass('hidden-sm').removeClass('hidden-lg') } catch (e) { }
					try { $('#banner-' + tipo[b]).parent().removeClass('hidden').removeClass('hidden-xs').removeClass('hidden-md').removeClass('hidden-sm').removeClass('hidden-lg') } catch (e) { }
					try { $('#banner-' + tipo[b]).parent().parent().removeClass('hidden').removeClass('hidden-xs').removeClass('hidden-md').removeClass('hidden-sm').removeClass('hidden-lg') } catch (e) { }
					try { $('#banner-' + tipo[b]).parent().parent().parent().removeClass('hidden').removeClass('hidden-xs').removeClass('hidden-md').removeClass('hidden-sm').removeClass('hidden-lg') } catch (e) { }
					try { $('#banner-' + tipo[b]).parent().parent().parent().parent().removeClass('hidden').removeClass('hidden-xs').removeClass('hidden-md').removeClass('hidden-sm').removeClass('hidden-lg') } catch (e) { }

					if (tipo[b] == "topo" || tipo[b] == "mobile" || tipo[b] == "rodape" || tipo[b] == "full" || tipo[b] == "24") {
						$('#banner-' + tipo[b])
							.removeClass('hidden')
							.css('visibility', 'hidden')
							.slick({
								infinite: true,
								dots: dotsBann,
								slidesToShow: 1,
								slidesToScroll: 1,					
								pauseOnFocus: false,
								pauseOnHover: false,
								autoplaySpeed: speedBann,
								prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
								nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
								autoplay: true
							})
							.css('visibility', 'visible');
					}

					if (tipo[b] == "popup") {
						$("#banner-flutua").modal('show');
					}
					if (tipo[b] == "mini") {
						$("#banner-mini").removeClass('hidden').removeClass('hidden-xs');
					}
					if (tipo[b] == "tarja") {
						$("#banner-tarja").removeClass('hidden').removeClass('hidden-xs');
					}
					if (tipo[b] == "rodape") {
						$("#banner-section").removeClass('hidden').removeClass('hidden-xs');
					}
					if (tipo[b] == "category_description") {
						$("#banner-category_description").removeClass('hidden').removeClass('hidden-xs');
					}
				}

			} else {
				empty('banner');
			}
		} else {
			empty('banner');
		}


		var Etapa = $("#HdEtapaLoja").val();

		if (Etapa == "HOME") {
			if (cfg['produtos_linha'] == 0) {
				ColunasResponsivo('#prod-list .list-item, #ultimos-list .list-item', 2, 2, 3, 3);
			} else {
				ColunasResponsivo('#prod-list .list-item, #ultimos-list .list-item', 2, 2, 3, cfg['produtos_linha']);
			}
			if (cfg['menu_lateral_home'] == true) {
				lateralEsq = true;
				FrameworkResponsivo();
			}
		}

		banners_finished = "ok";

		LazyLoadApply();

		if (typeof call_after_banners !== 'undefined') { try { eval(call_after_banners); } catch (e) { console.log("Falha call_after_banners" + e.message); } }
		WsModifiersCall("banners_1_0");

	} catch (e) { console.log('BannersRetorno: ' + e.message); }
}


function SetBannerSlick(id, show, speed, scroll, auto) {

	try {
		$(id).css('visibility', 'hidden')
			.slick({
				infinite: true,
				slidesToShow: show,
				slidesToScroll: scroll,
				autoplaySpeed: speed,
				pauseOnFocus: false,
				pauseOnHover: false,
				prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
				nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
				autoplay: auto
			})
			.css('visibility', 'visible');
	} catch (e) { console.log("Falha SetBannerSlick:" + e.message); }

}
var blocoBotaoComprar = false,
    blocoFabricante = false,
    blocoMais = false,
    blocoPreco = false,
    blocoVariaPreco = false,
    trustvox = false,
    blocofretegratis = false,
    blocodisponibilidade = false;

var produtosInfosKeep = [];
var blocoProdsIdAtual = "";
var blocoProdsTemplateAtual = "";
var varshowfreeshipping = true;
var varshowdisponibilidade = false;
var useLazyLoadBloco = false;

function BlocoProduto(OBJ, TEMPLATE) {
    try {

        if (typeof LazyLoadOver !== 'undefined') {
            useLazyLoadBloco = LazyLoadOver;
        }

        var classLazyLoad = "lazyload";
        var addCodeLazyLoad = "data-obj-img-load src='https://fileswscdn.wslojas.com.br/wsfiles/images/LoadBeforeShowImg.jpg' data-";
        if (!useLazyLoadBloco) { addCodeLazyLoad = ""; classLazyLoad = ""; }

        //console.log("useLazyLoad:" + useLazyLoadBloco);

        var templateOver = "";
        templateOver = $("#template-bloco-over").html();

        if (templateOver) {
            TEMPLATE = templateOver;
            //console.log("template bloco over on");
        }

        if (typeof WSshowfreeshipping !== 'undefined') {
            varshowfreeshipping = WSshowfreeshipping;
        }

        if (typeof WSshowdisponibilidade !== 'undefined') {
            varshowdisponibilidade = WSshowdisponibilidade;
        }

	    //console.log("Bloco Produto");
		var ADD = '<div class="add">',
		CLASS = '',
		COMPRAR = '',
		DESCONTO = '',
		FAB = '',
		FOTO = '',
		LINK = OBJ.links.ver_produto,
		MAIS = '',
		MIN_PARCELA = '',
		PARCELA = '',
		PORCENTAGEM = '',
		PRECO = '',
		PROMOCAO = '',
		STARS = '',
		TITLE = OBJ.nome,
		TITLE = TITLE.replace(/['"]+/g, ''),
        UMA = '',
        FRETE = '',
        DISPONIBILIDADE = '',
		VEZES = '';
		
		//console.log("produto " + OBJ.nome + " id " + OBJ.id);
		produtosInfosKeep[OBJ.id] = OBJ;

		FOTO += '<a href="' + LINK + '" title="' + TITLE + '">';

        if (typeof fotoVertical !== 'undefined') {
            CLASS += " foto-vertical ";
        }

		if (OBJ.fotos != null && OBJ.fotos != undefined) {
			//a variÃ¡vel fotoVertical faz parte de um conjunto de variÃ¡veis que tem como objetivo setar
			//configuraÃ§Ãµes hard-coded que podem ser facilmente ativadas/desativadas sem a necessidade do painel de controle.
			if (typeof fotoVertical !== 'undefined') {
				//CLASS += " foto-vertical ";
				for (i = 0; i < OBJ.fotos.length; i++) {
					var foto = OBJ.fotos[i];
					foto = foto.replace("PEQ_", "MED_");
					OBJ.fotos[i] = foto;
				}
			}
			if (cfg['troca_fotos'] && OBJ.fotos.length > 1) {
                FOTO += '<img ' + addCodeLazyLoad + 'src="' + OBJ.fotos[0] + '" alt="' + TITLE + '" class="img-responsive img-1 ' + classLazyLoad + '">';
                FOTO += '<img ' + addCodeLazyLoad + 'src="' + OBJ.fotos[1] + '" alt="' + TITLE + '" class="img-responsive img-2 ' + classLazyLoad + '">';
			} else {
                FOTO += '<img ' + addCodeLazyLoad + 'src="' + OBJ.fotos[0] + '" alt="' + TITLE + '" class="img-responsive ' + classLazyLoad + '">';
			}
		} else {
            FOTO += '<img src="/lojas/img/fotoindisponivel.jpg" alt="' + TITLE + '" class="img-responsive ' + classLazyLoad + '">';
		}
		FOTO += '</a>';
		if (OBJ.lancamento == true) {
            ADD += '<span class="prod-lancamento tags-listagem-produto">NEW</span>';
		}
		var DESTAQUE = '<span class="prod-detalhes"><a href="' + LINK + '" title="' + TITLE + '">Ver detalhes</a></span>';
		var NOME = '<p class="prod-nome"><a href="' + LINK + '" title="' + TITLE + '">' + OBJ.nome + '</a></p>';
		if (OBJ.disponivel == true) {
			if (OBJ.precos != null && OBJ.precos != undefined && (cfg['preco_apos_login'] == false || cliente)) {
				if (OBJ.precos.preco != 0) {

				    blocoPreco = true;

					var PRECO = Number(OBJ.precos.preco),
						PROMOCAO = Number(OBJ.precos.preco_promocao),
						VEZES = Number(OBJ.precos.max_parcelas),
						DESCONTO = PRECO / 100 * Number(OBJ.precos.desconto_avista),
						MIN_PARCELA = Number(OBJ.precos.valor_min_parcelas),
						INICIA = Number(OBJ.precos.juros_inicia),
						JUROS = Number(OBJ.precos.juros),
						PROMOCAO_LIMITE = (OBJ.precos.preco_promocao_validade);

				    if (MIN_PARCELA < 3) { MIN_PARCELA = 3; }

					if (INICIA > 1) {
						var semJuros = INICIA - 1;
					} else {
						var semJuros = 0;
					}

					if (PROMOCAO != 0) {

					    PORCENTAGEM = ((PRECO - PROMOCAO) / PRECO * 100).toFixed(0);

					    var tipoDesconto = "1";

					    if (typeof tipoDescontoSet !== 'undefined') {
					        tipoDesconto = tipoDescontoSet;
					    }

					    if (tipoDesconto == "1") {
                            ADD += '<span class="prod-desconto tags-listagem-produto">' + PORCENTAGEM + '% desconto</span>';
					    }
					    else if (tipoDesconto == "2") {
                            ADD += '<span class="prod-desconto tags-listagem-produto">' + PORCENTAGEM + '%</span>';
					    }
						else {
							ADD += '<span class="prod-desconto tags-listagem-produto">' + PORCENTAGEM + '%' + tipoDesconto + '</span>';
						}

						PRECODE = PRECO;
						PRECO = PROMOCAO;
						DESCONTO = PRECO / 100 * Number(OBJ.precos.desconto_avista);

					}

					UMA = PRECO - DESCONTO;
					UMA = AjustaMoney(UMA);
					if (OBJ.precos.desconto_avista != null && OBJ.precos.desconto_avista != undefined && OBJ.precos.desconto_avista != 0) {
						blocoVariaPreco = true;
						UMA = '<p class="prod-preco-uma"><a href="' + LINK + '" title="' + TITLE + '">R$ ' + UMA + ' &agrave; vista</a></p>';
					} else {
						UMA = '<p class="prod-preco-uma"></p>';
					}

					if ((PRECO / VEZES) < MIN_PARCELA) {
						VEZES = Math.floor(PRECO / MIN_PARCELA);
					}

					var cf = ValorJurosComposto(JUROS, VEZES, INICIA, PRECO);

					if (semJuros > VEZES) {
						semJuros = VEZES
					}

					if (semJuros > 1) {
						PARCELA = PRECO / semJuros;
					} else if (VEZES > 1) {
					    PARCELA = PRECO / VEZES;
					} else {
					    PARCELA = PRECO;
					}

					if (VEZES > 1) {

					    var ExibeSemJuros = "";
					    var qtdParc = VEZES;
					    var ValorExibe = PARCELA;

					    if (semJuros > 1) {
					        ExibeSemJuros = " sem juros";
					        qtdParc = semJuros;
					    }
					    else { ValorExibe = cf; }

					    ValorExibe = AjustaMoney(ValorExibe);

						VEZES = '<p class="prod-preco-parc"><a href="' + LINK + '" title="' + TITLE + '">' + qtdParc + 'x de R$ ' + ValorExibe + ' ' + ExibeSemJuros + '</a></p>';
						blocoVariaPreco = true;

					} else {
						VEZES = 1;
						PARCELA = "";
						VEZES = '<p class="prod-preco-parc"></p>';
					}

					if (PROMOCAO != 0) {
						PRECO = "R$ " + AjustaMoney(PRECODE);
						PROMOCAO = "R$ " + AjustaMoney(PROMOCAO);
						var PromLimitInfo = "";
						if (PROMOCAO_LIMITE != "" && PROMOCAO_LIMITE != null && PROMOCAO_LIMITE) {
							CLASS += " prod-prom-relampago ";
							ADD += "<meta data-promocao-limite='' content='" + PROMOCAO_LIMITE + "' />";
							PromLimitInfo = ' data-promocao-limite="' + PROMOCAO_LIMITE + '" ';
						}
						PRECO = '<a href="' + LINK + '" title="' + TITLE + '" ' + PromLimitInfo + '>' + PROMOCAO + '<strike id="preco-de">' + PRECO + '</strike>' + '</a>';
					} else {
						PROMOCAO = "";
						PRECO = AjustaMoney(PRECO);
						PRECO = '<a href="' + LINK + '" title="' + TITLE + '">R$ ' + PRECO + '</a>';
					}

					if (OBJ.links.botao_comprar != null && OBJ.links.botao_comprar != undefined) {

					    var txtBtComprar = "Comprar";
					    if (typeof textBotaoCompra !== 'undefined') {
					        txtBtComprar = textBotaoCompra;
					    }

						COMPRAR = '<span class="prod-no-qty"><a data-sku="'+ OBJ.codigo +'" href="' + OBJ.links.botao_comprar + '">' + txtBtComprar + '</a></span>';
					    blocoBotaoComprar = true;

						var CampoQtd = "";
						if (typeof QtdProdListagem !== 'undefined') {
						    var Qtdmin = OBJ.qtdminima;
						    if (Qtdmin == 0) { Qtdmin = 1; }
						    CampoQtd = "<span class='prod-qtd'><input type='number' id='HD_QTD_PROD_" + OBJ.id + "' value='" + Qtdmin + "' QtdMinima='" + Qtdmin + "' size='2' maxlength='2' /></span>";
						    COMPRAR = COMPRAR.replace("prod-no-qty", "");
						}

						COMPRAR = CampoQtd + COMPRAR;

					}


				} else {
					// PRODUTO COM PREÇO ZERO
					UMA = '<p class="prod-preco-uma"></p>';
					VEZES = '<p class="prod-preco-parc"></p>';
					PROMOCAO = "";
				}
			}
		} else if (OBJ.modo != "3") {
			CLASS += 'produto-indisponivel ';
			PRECO += '<span class="produto-indisponivel"><a href="' + LINK + '" title="' + TITLE + '" class="tarja-indisponivel">Produto indispon&iacute;vel</a></span>';
			CLASS += "preco-null";
		}

        if (OBJ.fretegratis == true) {
            FRETE = '<span class="produto-fretegratis tags-listagem-produto">frete gr&aacute;tis</span>';
            blocofretegratis = true;
        }
        if ((OBJ.disponibilidade || OBJ.disponibilidade == 0) && varshowdisponibilidade == true) {
            if (OBJ.disponibilidade > 0) {
                DISPONIBILIDADE = '<span class="produto-disponibilidade tags-listagem-produto">Dispon&iacute;vel em ' + OBJ.disponibilidade + ' dia(s)</span>';
            } else {
                DISPONIBILIDADE = '<span class="produto-disponibilidade tags-listagem-produto">Disponibilidade imediata</span>';
            }
            blocodisponibilidade = true;
        }
		if (OBJ.fabricante != null && OBJ.fabricante != undefined) {
			FAB = ' <a href="' + OBJ.fabricante.url + '" title="' + OBJ.fabricante.nome + '">' + OBJ.fabricante.nome + '</a>';
			blocoFabricante = true;
		}
		if (OBJ.maisprodutos != null && OBJ.maisprodutos != undefined) {
			MAIS = ' <a href="' + OBJ.maisprodutos.link + '" title="' + OBJ.maisprodutos.nome + '">' + OBJ.maisprodutos.nome + '</a>';
			blocoMais = true;
		}
		if (OBJ.integracoes) {
			var i = "";
			for (i = 0; i < OBJ.integracoes.length; i++) {
				var integracao = OBJ.integracoes[i];
				if (integracao.tipo == 'trustvox_list') {
					trustvox = true;
					STARS = integracao.conteudo;
				}
			}
		}
		
		if (typeof showSobConsultaList !== 'undefined') {
		    if (showSobConsultaList == true) {
		        if (OBJ.modo == "3") {
		            COMPRAR = '<span class="prod-no-qty prod-sob-consulta"><a href="' + OBJ.links.ver_produto + '">Sob consulta</a></span>';
		            blocoBotaoComprar = true;
		        }
		    }
		}

		if (typeof WsFavoritos !== 'undefined') {

			var TipoFavorito = "1";

			if (typeof WsFavoritosType !== 'undefined') {
				TipoFavorito = WsFavoritosType;
			}

			if (WsFavoritos) {

				var ObjFavorit = "<a href=\"javascript:void(funcAddFavoriteWs(" + OBJ.id + "))\" title='Adicionar aos favoritos' class=\"prod-favorite-link prod-favorite-type-" + TipoFavorito + "\" id=\"prod-favorite-link-" + OBJ.id + "\" data=\"prod-favorite-link-" + OBJ.id + "\"></a>";

				if (TEMPLATE.indexOf("<!--##FAVORITO##-->") < 0) {
					if (TipoFavorito == "1") {
						ADD += ObjFavorit;
					}
					else if (TipoFavorito == "2") {
						COMPRAR += ObjFavorit;
					}
					else if (TipoFavorito == "3") {
						FOTO += ObjFavorit;
					}
				} else {
					TEMPLATE = TEMPLATE.replace("<!--##FAVORITO##-->", ObjFavorit);
				}

			}

		}

		ADD += '</div>';
        var find = ["<!--##ITEM_REG##-->", "<!--##CLASS##-->", "<!--##FOTO##-->", "<!--##DESTAQUE##-->", "<!--##ADD##-->", "<!--##NOME##-->", "<!--##PRECO##-->", "<!--##VEZES##-->", "<!--##UMA##-->", "<!--##COMPRAR##-->", "<!--##FAB##-->", "<!--##STARS##-->", "<!--##MAIS##-->", "<!--##LINK##-->", "<!--##FRETE##-->", "<!--##DISPONIBILIDADE##-->"];
        var replace = [OBJ.id, CLASS, FOTO, DESTAQUE, ADD, NOME, PRECO, VEZES, UMA, COMPRAR, FAB, STARS, MAIS, LINK, FRETE, DISPONIBILIDADE];
		TEMPLATE = replaceStr(TEMPLATE, find, replace);

		//console.log("ID:" + OBJ.id + "\nCLASS:" + CLASS + "\nFOTO:" + FOTO + "\nDESTAQUE:" + DESTAQUE + "\nADD:" + ADD + "\nNOME:" + NOME + "\nPRECO:" + PRECO + "\nVEZES:" + VEZES + "\nUMA:" + UMA + "\nCOMPRAR:" + COMPRAR + "\nFAB:" + FAB + "\nSTARS:" + CLASS + "\nMAIS:" + MAIS + "\nLINK:" + LINK + "\nFRETE:" + FRETE + "\nDISPONIBILIDADE:" + DISPONIBILIDADE);
        
		if (typeof call_after_bloco_produto !== 'undefined') {
		    try
		    {
		        blocoProdsIdAtual = OBJ.id;
		        blocoProdsTemplateAtual = TEMPLATE;
		        var retorno = eval(call_after_bloco_produto);
		        if (retorno) {
		            TEMPLATE = retorno;
		        }

		    } catch (e) { console.log("Falha call_after_bloco_produto" + e.message); }
		}

		return TEMPLATE;

	} catch (e) { console.log(e.message); }
}

function blocoHeight(elemento) {
	if(blocoBotaoComprar){
		$(elemento).addClass('blc-comprar')
    }
    if (blocofretegratis) {
        $(elemento).addClass('blc-fretegratis')
    }
	if(blocoFabricante && typeof semFabricante == 'undefined'){
		$(elemento).addClass('blc-fabricante')
	}
	if(blocoMais){
		$(elemento).addClass('blc-mais')
	}
	if(blocoPreco){
		$(elemento).addClass('blc-preco')
	}
	if(blocoVariaPreco && typeof semVariacao == 'undefined'){
		$(elemento).addClass('blc-varia')
	}
	if(trustvox){
		$(elemento).addClass('blc-avalia')
	}
}

var MaxHPrecos = 0; 
function blocoHeightAjusta(){

    $("[data-preco-prod]").each(
        function () {
            var H = $(this).height();
            if (H > MaxHPrecos) { MaxHPrecos = H; };
            //console.log("H:" + H);
            //console.log("MaxHPrecos:" + MaxHPrecos);
        }
    );

    $("[data-preco-prod]").each(
        function () {
            if (MaxHPrecos > 0) {
                $(this).css("min-height", MaxHPrecos)
            }
        }
    );

    MaxHPrecos = 0;
    $("[data-preco-varia]").each(
        function () {
            var H = $(this).height();
            if (H > MaxHPrecos) { MaxHPrecos = H; };
            //console.log("H:" + H);
            //console.log("MaxHPrecos:" + MaxHPrecos);
        }
    );

    $("[data-preco-varia]").each(
        function () {
            if (MaxHPrecos > 0) {
                $(this).css("min-height", MaxHPrecos)
            }
        }
    );

}



$(document).ready(
	function () {
		try {

			isReady("allModulosOk", "funcaoPromRelampagoListagemStart()");

		} catch (e) { }
	}
);

function funcaoPromRelampagoListagemStart() {
	window.setTimeout("funcaoPromRelampagoListagem()", 1000);
}

function funcaoPromRelampagoListagem() {

	try {

		var contItensPromo = 0;
		$(".prod-prom-relampago").each(
			function () {

				try {

					var setadoProm = $(this).find("meta[data-prom-relampago='ok']").length;
					var dataLimite = $(this).find("meta[data-promocao-limite]").attr("content");
					var overPromRelampago = $(this).find(".prom-relampago-over").length;
					var idProd = $(this).attr("item-reg");

					if (!setadoProm > 0) {

						$(this).append("<meta data-prom-relampago='ok' content='" + dataLimite + "' />");

						var ObjetosDataLimite = "";

						if (overPromRelampago > 0) {
							$(this).find(".prom-relampago-over").append("<div class='prom-relampago-limite' id='prod-prom-" + idProd + "'>" + ObjetosDataLimite + "</div>");
						} else {
							$(this).find("[data-preco-prod]").append("<div class='prom-relampago-limite' id='prod-prom-" + idProd + "'>" + ObjetosDataLimite + "</div>");
						}
						//console.log("dataLimite:" + dataLimite);
						clockLimitStart("prod-prom-" + idProd + "", dataLimite);

					}

				} catch (e) {
					console.log("falha prom relampago X1:" + e.message);
				}

			}
		);

		window.setTimeout("funcaoPromRelampagoListagem()", 3000);

	} catch (e) {
		console.log("falha prom relampago X2:" + e.message);
	}

}

function clockLimitStart(id, endtime) {

	try {

		var clock = document.getElementById(id);

		function updateClock() {

			var t = getTimeRemaining2(endtime);

			/*daysSpan.innerHTML = t.days;
			hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
			minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
			secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);*/

			//Só mais 11 horas por este preço!
			var valorLimit = "";

			if (t.days > 1) { valorLimit = t.days + " dias "; }
			else if (t.days > 0) { valorLimit = t.days + " dia "; }

			if (t.days == 0) {
				if (t.hours > 1) { valorLimit = t.hours + " horas "; }
				else if (t.hours > 0) { valorLimit = t.hours + " hora "; }
			}

			if (t.hours == 0) {
				if (t.minutes > 1) { valorLimit = t.minutes + " minutos "; }
				else if (t.minutes > 0) { valorLimit = t.minutes + " minuto "; }
			}

			if (t.minutes == 0) {
				if (t.seconds > 1) { valorLimit = t.seconds + " segundos "; }
				else if (t.seconds > 0) { valorLimit = t.seconds + " segundo "; }
			}

			clock.innerHTML = "S&oacute; mais " + valorLimit + "por este pre&ccedil;o!";

			if (t.total <= 0) {
				//clearInterval(timeinterval);
			}

		}

		updateClock();

		var timeinterval = setInterval(updateClock, 1000);

	} catch (e) {
		console.log("falha limite promocao:" + e.message);
	}

}

function getTimeRemaining2(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

$(document).ready(function () {isReady('allModulosOk', 'footerAbout()');});

function footerAbout() {
    if (objetos.InfosLojas) {
        // document.querySelector('footer .footer-about p').innerHTML = 'aa';
        let pages = JSON.parse(objetos.InfosLojas).menuinstitucional
        let pageToUse = '';
        pages.forEach(elm => {
            if (pageToUse == '') {
                if (elm.url == '/sobre') pageToUse = '/sobre';
                if (elm.url == '/quem-somos') pageToUse = '/quem-somos';
            };
        });
        if (pageToUse != '') {
            document.querySelector('footer .footer-about a').removeAttribute('style');
            document.querySelector('footer .footer-about a').setAttribute('href', pageToUse);
        }
    } else {
        window.setTimeout(()=>{footerAbout()},200);
    }
}

$(document).ready(function () {isReady('allModulosOk', 'modloja_banner_video_call()');});

function modloja_banner_video_call(){
    var etapa = document.querySelector('#HdEtapaLoja').value;

    if (etapa != 'HOME') return

    if (!objetos.Banners) {
        window.setTimeout("modloja_banner_video_call()", 500);
        return; 
    }

    modloja_banner_video();
}

function modloja_banner_video() {
    let banner = JSON.parse(objetos.Banners).banners.filter((b) => {
        return b.tipo == '9'
    })[0];

    if (!banner) return
        
    let content = JSON.parse(banner.conteudo);

    let newDiv = document.createElement('div');
        newDiv.innerHTML = 
        `<div class="background-video"></div>
        <div class="video">
        <h2 class="video-title">${content.title}</h2>
        <p class="video-subtitle">${content.subtitle}</p>
        ${content.iframe}
        </div>
        `;
        newDiv.setAttribute('class', 'video-container');

        document.querySelector('#produtos #div-conteudo').insertBefore(newDiv, document.querySelector('#prod-list'));
}
$(document).ready(function(){
	try{
		isReady("cfg['estrutura']", "ListaProdutosUltimos()");
	} catch (e) { console.log(e.message); }
});

function ListaProdutosUltimos() {
	modulos_to_complete++;
	ApiWS.ListaProdutosUltimos("ListaProdutosUltimosRetorno");
}
function ListaProdutosUltimosRetorno() {

	modulos_completed++;

	if (cfg['ultimos_vistos']){
		try {
			var template = $('#template').html();

			var OBJETO = ApiWS.Json;
			objetos.ListaProdutosUltimos = OBJETO;

			var obj = jQuery.parseJSON(OBJETO);

			if (typeof over_ProdutosUltimos !== 'undefined') { try { eval(over_ProdutosUltimos); return; } catch (e) { console.log(e.message); } }

			$("#ultimos-list").html("");
			if (obj != null && obj != undefined) {
				if (obj.length > 0) {

					for (a = 0; a < obj.length; a++) {
						var bloco = BlocoProduto(obj[a], template);
						$('#ultimos-list').append(bloco);
					}

					blocoHeight('#ultimos-list');

					$('#ultimos-vistos').removeClass('hidden');

					$('#ultimos-list, #ultimos-vistos').css({
						opacity: '1',
						visibility: 'visible',
						height: 'auto'
					});

					// verifica se a quantidade de itens é maior do que o slider em sí
					$('#ultimos-list').on('init', function () {
					    if ($('#ultimos-list .list-item').length <= 4){
					        // se não há scroll, remove as setas
					        $('#ultimos-vistos .arrow').hide();
					    }
					});

					$('#ultimos-list').slick({
						infinite: true,
						slidesToShow: 4,
						prevArrow: $('#ultimos-vistos .left-arrow'),
						nextArrow: $('#ultimos-vistos .right-arrow'),
						autoplay: false,
						responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3,
								infinite: true
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 375,
							settings: {
								slidesToShow: 1
							}
						}]
					});

				}

				if (typeof call_after_ProdutosUltimos !== 'undefined') { try { eval(call_after_ProdutosUltimos); } catch (e) { console.log("Falha call_after_ProdutosUltimos" + e.message); } }
				WsModifiersCall("produtos_ultimos_1_1");

			}

			nomeProd("#ultimos-vistos");

            LazyLoadApply();

			if (typeof call_after_produtos_ultimos !== 'undefined') { try { eval(call_after_produtos_ultimos); } catch (e) { console.log("Falha call_after_produtos_ultimos" + e.message); } }

		} catch (e) { console.log('ListaProdutosUltimosRetorno: ' + e.message); }
	}
}
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
                content += '<h2 class="grupos-pg-inicial-titulo">' + titulo + '</h2>';
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
document.querySelector('.botao-busca-header').addEventListener('click', () => {
    let inptSearch = document.querySelector('header #input-busca');
    if (inptSearch.classList.contains('open-bar')) {
         if (inptSearch.value != '') FuncaoBuscaBotao('input-busca');
    } else {
        inptSearch.classList.add('open-bar');
        inptSearch.focus();
    };
});

document.addEventListener('click', function(event) {
    let inptSearch = document.querySelector('header #input-busca');
    let buttomSearch = document.querySelector('header .botao-busca-header');
    let isClickInside1 = inptSearch.contains(event.target),
        isClickInside2 = buttomSearch.contains(event.target)
  
    if (!isClickInside1 && !isClickInside2) if (inptSearch.classList.contains('open-bar')) {
        inptSearch.classList.remove('open-bar');
        inptSearch.blur();
    }
});
$(document).ready(function () {isReady('allModulosOk', 'refreshCart()');});

async function refreshCart() {
    let Token = document.querySelector("#HdTokenLojaTemp").value, 
        url = endPointRestCalls + "/CheckoutSmart/CarrinhoSmart.aspx?tipo=CarrinhoOnPageVrs2&LV_ID=" + ApiWS.LV + "&LVdashview=" + ApiWS.LVdashview + "&LvToken=" + Token + WsParamAdds;

    let response = await fetch(url)
    let data = await response.json()
    let innerCart = '', innerProds = '';

    if (!data) {
        innerCart = `<span>Seu carrinho est&aacute; vazio</span>
            <p>Temos diversos produtos esperando por voc&ecirc;!</p>
            <a onclick="closeCart()" class='cart-button'>voltar &agrave;s compras</a>
            `;
    } else {
        if (data.products) {
            data.products.forEach(prod => {
                innerProds += `<div class='cart-prod'>
                <a href="${prod.url}">
                <div class="cart-prod-img">
                ${prod.photo.replace('/imagens_cliente', 'https://imageswscdn.plataformawebstore.com.br/files')}
                </div>
                <div class="cart-prod-desc">
                <div class="cart-prod-title">
                ${prod.name}
                </div>
                <div class="cart-prod-variation">
                
                </div>
                </div>
                <div class="cart-prod-val">
                R$ ${prod.total_price.toLocaleString('pt-BR')}
                </div>
                </a>
                </div>`
            });
        }
    }
        
    document.querySelector('#qtd-itens-carrinho').innerHTML = data.qtdItems;
    
    if (innerProds == '') {
        innerCart = `<span>Seu carrinho est&aacute; vazio</span>
            <p>Temos diversos produtos esperando por voc&ecirc;!</p>
            <a onclick="closeCart()" class='cart-button'>voltar &agrave;s compras</a>
            `;
    } else {
        innerCart += `<a class='cart-button' href="${data.link}">ver carrinho</a>`;
    }
    
    let cart = document.querySelector('.cart');
    let headerCart = `<div class="cart-header">
    <span onclick="closeCart()"><span class="material-icons-outlined">
    close
    </span></span>
    <h3><a href="${data.link}">meu carrinho</a></h3>
    </div>`;
    
    if (innerProds == '') {
        cart.innerHTML = headerCart + innerCart;
    } else {
        cart.innerHTML = headerCart +  '<div class=cart-prod-container>' + innerProds + '</div>' + innerCart;
    }
}
    
function openCart(){
    refreshCart();
    document.querySelector('header').parentNode.style.left = '-48rem';
    document.querySelector('.cart').style.right = '0';
    document.querySelector('#overlay').setAttribute('style', 'width: 100%;height: 100%;opacity:0.5');

    carrinhoAberto = true;
}
function closeCart() {
    refreshCart();
	document.querySelector('header').parentNode.style.left = '0';
	document.querySelector('.cart').style.right = '-48rem';
    document.querySelector('#overlay').setAttribute('style', 'width: 0;height: 0;opacity:0');

	carrinhoAberto = false;
}

var tipoDescontoSet = ' OFF';
var call_after_produtos_grupos = 'bannerBetweenGroups();';
var call_after_pag_produto = 'subProdCorrection();';
var call_after_categorias = "FuncaoAfterCategorias();";
var modVitrineOn = true;
$(document).ready(function () {
	try{
		if ($("#HdEtapaLoja").val() == "HOME") {
			isReady("cfg['estrutura']", "ProdutosVitrine()");
		}
	} catch (e) { console.log(e.message); }
});

function ProdutosVitrine() {
	ApiWS.ListaProdutosHome("ProdutosVitrineRetorno");
}
function ProdutosVitrineRetorno() {
	try {
		var template = $('#template').html();

		var JSON = ApiWS.Json;
		objetos.ProdutosHome = JSON;
		var obj = jQuery.parseJSON(JSON);

		$("#prod-list").html("").css('display', 'none');;
		if (obj.totalitens != null && obj.totalitens != undefined) {
			if (obj.totalitens > 0 && cfg['produtos_pagina'] < obj.totalitens) {

				for (a = 0; a < cfg['produtos_pagina']; a++) {
					var bloco = BlocoProduto(obj.produtos[a], template);
					$('#prod-list').append(bloco);
				}

			}else if(obj.totalitens > 0){

				for (a = 0; a < obj.totalitens; a++) {
					var bloco = BlocoProduto(obj.produtos[a], template);
					$('#prod-list').append(bloco);
				}
				
			}else{
				empty('produto');
			}
            let title = document.createElement('div');
                title.setAttribute('class', 'titulo-grupo');
                title.innerHTML = '<h3>Destaques</h3>';
            document.querySelector('#prod-list').prepend(title);
			$('#prod-list').css({
                display: 'flow-root'
            });
		}else{
			empty('produto');
		}

		if (typeof titVitrineProds !== 'undefined') {
		    $("#tit-vitrine-produtos").html(titVitrineProds);
		}

		$('#preloader').fadeOut();

		ConteudoResponsivo();
		nomeProd("#prod-list");
		blocoHeight('#prod-list');

		window.setTimeout("ConteudoResponsivo()", 1500);

		window.setTimeout("ConteudoResponsivo()", 3000);

		window.setTimeout("ConteudoResponsivo()", 5000);

        LazyLoadApply();

		if (typeof call_after_produtos_vitrine !== 'undefined') { try { eval(call_after_produtos_vitrine); } catch (e) { console.log("Falha call_after_produtos_vitrine" + e.message); } }

	} catch (e) { console.log('ProdutosHomeRetorno: ' + e.message); }
}
    
function FuncaoAfterCategorias(){
        $('.menu-topo .dpt-nivel-1 > a.com-sub').each(function () {
            $(this).after("<div class='mega-menu-area'></div>");
        });

        var data = JSON.parse(objetos.CategoriasLista);
        $.each(data.Categorias, function (i, value) {
            if (data.Categorias[i].produtodestaque !== null) {
                console.log("A foto da Categoria " + value.id + " é " + data.Categorias[i].produtodestaque.imagem);
                $('.menu-topo #departamento-' + value.id + ' > .mega-menu-area').append('<div class="area-prod-destaque"><img src="' + data.Categorias[i].produtodestaque.imagem + '" /> <p>'+data.Categorias[i].produtodestaque.nome+'</p> <a href="'+data.Categorias[i].produtodestaque.url+'" class="btn_destaque_categoria">VER MAIS</a> </div>');
                $('.menu-topo #departamento-' + value.id).addClass('hasImgDestaque');
            }
        });
        $('.menu-topo .dpt-nivel-1').each(function () {
            console.log("ALTURA: " + $(this).find('.mega-menu-area img').height());
        });



    }

function bannerBetweenGroups() {
    let b = document.querySelectorAll('#produtos-grupos .div-grupo').length;
    if (b < 2) return;

    let i = b == 2 ? 1 : Math.ceil(document.querySelectorAll('#produtos-grupos .div-grupo').length/2);
    let itemBefore = document.querySelectorAll('#produtos-grupos .div-grupo')[i];

    let divToMove = document.querySelector('#banner-8').cloneNode(true);
                    document.querySelector('#banner-8').remove();

        divToMove.removeAttribute('style');
        divToMove.querySelector('img').setAttribute('style', 'width: 100%');

    document.querySelector('#produtos-grupos').insertBefore(divToMove, itemBefore);
}

function debounce(func, timeout = 200){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

window.addEventListener('resize', () => {
    FuncaoAjustaLimiteCategoriasTopo();
});

window.addEventListener('load', () => {
    FuncaoAjustaLimiteCategoriasTopo();
});

function subProdCorrection() {
    if (document.querySelector('select#LV_PROD_GENERO')) {

        let option = document.querySelector('#LV_PROD_GENERO option:first-child'),
        label = document.createElement('label');
        
        label.innerHTML = 'Selecione uma opção de <span>' +  option.innerHTML + ':</span>';
        
        option.innerHTML = 'Selecione uma opção';
        document.querySelector('.sub-produtos').insertBefore(label, document.querySelector('#LV_DIV_GENERO'));
        
        let idProd = document.querySelector('#LV_HD_PROD_ID').getAttribute('value');
        document.querySelector('.prod-social-fav a').setAttribute('id', 'prod-favorite-link-' + idProd);
        document.querySelector('.prod-social-fav a').setAttribute('data', 'prod-favorite-link-' + idProd);
        document.querySelector('.prod-social-fav a').setAttribute('href' , `javascript:void(funcAddFavoriteWs(${idProd}));`);    
    }

    if (document.querySelector('#LblCalculoFrete')) document.querySelector('#LblCalculoFrete').innerHTML = document.querySelector('#LblCalculoFrete').innerHTML.replace(':', '');
    if (document.querySelector('#BtCalculoFrete')) document.querySelector('#BtCalculoFrete').value = 'Calcular';

    let cloneCep = document.querySelector('#TxtCalculoFrete').cloneNode(true);
        cloneCep.setAttribute('id', 'TxtCalculoFreteHolder');
        cloneCep.setAttribute('pattern', "[0-9]{5}-[0-9]{3} ");
        cloneCep.value = '';

        document.querySelector('#TxtCalculoFrete').style.display = 'none';
        document.querySelector('#FldLV_CalculoFrete > label').insertBefore(cloneCep, document.querySelector('#FldLV_CalculoFrete #BtCalculoFrete'));
        document.querySelector('#BtCalculoFrete').setAttribute('onclick', 'FuncaoCalculaFrete();');
    
    let cepHolder = document.querySelector('#TxtCalculoFreteHolder');

        cepHolder.addEventListener('keyup', (e) => {
            let val = cepHolder.value,
                lastChar = val.split('')[val.length -1];
            
            val = isNaN(lastChar) ? val.slice(0, -1) : val;
            val = val.replace('-', '').length >= 9 ? val.slice(0, 9) : val;

            if (e.key != 'Enter' && e.key != 'Backspace') {
                if (val.length >= 6 && (val.indexOf('-') == -1)) {
                    let arr = val.split('');
                    arr.splice(5, 0, "-");
                    val = arr.join('');
                } else if (val.length == 5) val += '-';
            }

            if (e.key == 'Enter') {
                if (document.querySelector('#TxtCalculoFrete').value.length == 8) {
                    FuncaoCalculaFrete();
                }
            }

            document.querySelector('#TxtCalculoFrete').value = val.replace('-', '');
            document.querySelector('#TxtCalculoFreteHolder').value = val;
        });

        

    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === "class") {
                let span = document.querySelector('.prod-social-fav span');
                if (!span.parentNode.classList.contains('active')) {
                    span.innerHTML = 'favorite_border';
                    span.removeAttribute('style', 'color: red;');
                } else {
                    span.innerHTML = 'favorite';
                    span.setAttribute('style', 'color: red;');
                };
            }
      });
    });
    
    observer.observe(document.querySelector('.prod-social-fav a'), {
        attributes: true
    });

    document.querySelectorAll('.info-box').forEach(box => {
        if (box.innerHTML.trim() == '') box.remove();
    });
    document.querySelector('.loader-container').setAttribute('style', 'opacity: 0;');
    setTimeout(() => {
        document.querySelector('.loader-container').setAttribute('style', 'opacity: 0;display: none;');
        document.querySelector('#produto').removeAttribute('style');
        document.querySelector('.loader-container').remove();
    }, 700)
}

function activeShareLista() {
    let list = document.querySelector('.share-lista-container');
    if (list.classList.contains('active')) {
        list.classList.remove('active');
        setTimeout(()=>{
            list.setAttribute('style', 'display: none');
        }, 300);
    } else {
        list.removeAttribute('style');
        setTimeout(()=>{
            list.classList.add('active');
        }, 10);
    }
}

function resizeLogo() {
    if (window.scrollY >= 1) {
        document.querySelector('.condition-top-container').classList.add('disable');
        document.querySelector('header .logo-header img').style.height = '6rem';
    } else {
        document.querySelector('.condition-top-container').classList.remove('disable');
        document.querySelector('header .logo-header img').style.height = '8rem';
    };
};

const scrollChange = debounce(()=>resizeLogo());

window.addEventListener('scroll', () => {
    scrollChange();
});

function FuncaoAjustaLimiteCategoriasTopo() {
    try {
        var firstTopPosition = "";

        $(".menu-topo .departamentos-nav > li.dpt-nivel-1").each(
            function () {
                var IdObj = $(this).attr("id");
                $(this).removeClass("hidden");

                if (IdObj != "departamento-all") {
                    var TopObj = $(this).offset().top;
                    /*console.log("TopObj:" + IdObj + " = " + TopObj);*/
                    if (TopObj == "0" || TopObj == "") { TopObj = "1"; }
                    $(this).attr("posicao-objeto", TopObj);

                    if (firstTopPosition == "") { firstTopPosition = TopObj; }

                    if (Number(firstTopPosition) < Number(TopObj)) {
                        $(this).addClass("hidden");
                    } else {
                        $(this).removeClass("hidden");
                    }
                }
                console.log("firstTopPosition:" + firstTopPosition);

            }
        );

    } catch (e) { console.log(e.message); }
}
