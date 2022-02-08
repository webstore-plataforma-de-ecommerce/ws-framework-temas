/* 23-07-2021 */

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


