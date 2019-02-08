function handleScroll() {
    var T = getScrollTop();

    if (T >= 50) {
    	$('header').addClass('active');
    	$('#header-mobile').addClass('header-fixed');
    } else {
    	$('header').removeClass('active');
    	$('#header-mobile').removeClass('header-fixed');
    }
}