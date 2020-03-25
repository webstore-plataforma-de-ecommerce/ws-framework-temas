var useLazyLoadBanner = true;
var banners_finished;

$(document).ready(function () {
	try{
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

				for(a = 0; a < obj.banners.length; a++){
					var banner = obj.banners[a];
					var li = "";
					var img = "";

					if (banner.conteudo) {
						li = '<div class="banner-video">';

						li += banner.conteudo;

						li += '</div>';
					}else{

						if(banner.url != null && banner.url != undefined && banner.url.length > 0){
							var href = 'href="'+banner.url+'"';
						}else{
							var href = "";
						}

						if(banner.altura != '0' || banner.largura != '0'){

							if(banner.altura != '0' && banner.largura != '0'){
                                var img = '<img ' + addCodeLazyLoad + 'src="' + banner.imagem + '" alt="' + banner.titulo + '" class="' + classLazyLoad + '" style="width: '+banner.largura+'px; height: '+banner.altura+'px">';
							}else if(banner.altura != 0){
                                var img = '<img ' + addCodeLazyLoad + 'src="' + banner.imagem + '" alt="' + banner.titulo + '" class="' + classLazyLoad + '" style="height: '+banner.altura+'px; width: auto; max-width: 100%;">';
							}else if(banner.largura != 0){
                                var img = '<img ' + addCodeLazyLoad + 'src="' + banner.imagem + '" alt="' + banner.titulo + '" class="' + classLazyLoad + '" style="width: '+banner.largura+'px">';
							}

						}else{
                            var img = '<img ' + addCodeLazyLoad + 'src="' + banner.imagem + '" class="' + classLazyLoad + '" alt="'+banner.titulo+'">';
						}

						if (banner.tipo == 'topo') {

							li += '<li id="slide-'+banner.id+'">';
							li += '<a '+href+' target="'+banner.target+'">'+img+'</a></li>';

						}else if(banner.tipo == 'mini'){

							li += '<li id="slide-'+banner.id+'">';
							li += '<a '+href+' target="'+banner.target+'">'+img+'</a></li>';

						}else if(banner.tipo == 'lateral'){
							lateralDir = true;
							FrameworkResponsivo();

							li += '<a '+href+' target="'+banner.target+'">'+img+'</a>';

						}else if(banner.tipo == 'lateralEsq'){
							lateralEsq = true;
							FrameworkResponsivo();

							li += '<a '+href+' target="'+banner.target+'">'+img+'</a>';

						}else{

							li += '<a '+href+' target="'+banner.target+'">'+img+'</a>';

						}

					}


					if( $('#banner-'+banner.tipo).length){

						$('#banner-'+banner.tipo).append(li);
						if (tipo.indexOf(banner.tipo) == -1){
							tipo.push(banner.tipo);
						}

					}

				}

				if (typeof bannerFull !== 'undefined'){
					$('#slider').find('.container').removeClass('container');
				}

				var speedBann = 4000;
				if (typeof speedBanners !== 'undefined') {
				    speedBann = speedBanners;
				}

				for(b = 0; b < tipo.length; b++){
					if(tipo[b] == "topo" || tipo[b] == "mobile"){
						$('#banner-' + tipo[b])
							.removeClass('hidden')
							.css('visibility', 'hidden')
							.slick({
								infinite: true,
								slidesToShow: 1,
								slidesToScroll: 1,
								autoplaySpeed: speedBann,
							  	prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
								nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
								autoplay: true
							})
							.css('visibility', 'visible');
					}
					
					if(tipo[b] == "popup"){
						$("#banner-flutua").modal('show');
					}
					if(tipo[b] == "mini"){
						$("#banner-mini").removeClass('hidden');
					}
					if(tipo[b] == "tarja"){
						$("#banner-tarja").removeClass('hidden');
					}
					if(tipo[b] == "rodape"){
						$("#banner-section").removeClass('hidden');
					}
				}

				if (tipo.indexOf('mini') != -1){
					var length = $('#banner-mini li').length;
					
					if (length == 1) {
						$('#banner-mini li').addClass('col-xs-12');
					}else if(length == 2) {
						$('#banner-mini li').addClass('col-xs-12 col-sm-6');
					}else if(length == 3) {
						$('#banner-mini li').addClass('col-xs-12 col-sm-4');
					}else if(length >= 4) {
						$('#banner-mini li').addClass('col-xs-6 col-sm-3');
					}

				}
			}else{
				empty('banner');
			}
		}else{
			empty('banner');
		}


		var Etapa = $("#HdEtapaLoja").val();

		if (Etapa == "HOME") {
			if(cfg['produtos_linha'] == 0){
				ColunasResponsivo('#prod-list .list-item, #ultimos-list .list-item', 2, 2, 3, 3);
			}else{
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

	} catch (e) { console.log('BannersRetorno: '+e.message); }
}


function SetBannerSlick(id, show, speed, scroll, auto) {

    try {
        $(id).css('visibility', 'hidden')
            .slick({
                infinite: true,
                slidesToShow: show,
                slidesToScroll: scroll,
                autoplaySpeed: speed,
                prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
                nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
                autoplay: auto
            })
            .css('visibility', 'visible');
    } catch (e) { console.log("Falha SetBannerSlick:" + e.message); }

}