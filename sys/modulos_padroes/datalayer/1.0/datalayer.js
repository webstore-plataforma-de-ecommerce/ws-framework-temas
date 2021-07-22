
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