$(document).ready(function() {
	var facebook = $('.container .social a.facebook').attr('href');
	var vkontakte = $('.container .social a.vkontakte').attr('href');
	$(function(){
		$(window).hashchange(function(){
			//alert( location.hash );
			$('.container .social a.facebook').attr('href', facebook+location.hash);
			$('.container .social a.vkontakte').attr('href', vkontakte+location.hash);
		})
		$(window).hashchange();
	});
	$('a.contestresult').click(function() {
		$('body').append('<div class="fade"></div>');
		$('.fade').css({'z-index': '9500'});
		var id = $(this).attr('title');
		$('div.contestresult.'+id+', .fade').fadeIn(150);
		var contesttop = $(window).scrollTop();
		var contestheight = $('div.contestresult.'+id).height();
		var bodyheight = $('body').height();
		if (bodyheight > (contesttop+contestheight)) {
			$('div.contestresult.'+id).css({'top': contesttop+25+'px'});
		}
		else {
			$('div.contestresult.'+id).css({'top': bodyheight-contestheight-25+'px'});
		}
		return false;
	});
	$('div.contestresult span').click(function() {
		$(this).parents('div.contestresult').fadeOut(150);
		$('.fade').fadeOut(150);
		$('body').remove('<div class="fade"></div>');
		return false;
	});
	$('.newcatalog div > ul > li > ul > li > div').append('<span class="fadet"></span><span class="fadeb"></span>');
	$('.newcatalog div > ul > li > ul > li > a').click(function(event) {
		$(this).parent().parent().parent().siblings().find('ul > li').removeClass('active');
		$(this).parent().siblings().removeClass('active');
		$(this).parent().toggleClass('active');
		var dropheight = $(this).parent().find('ul').height();
		var tobottom = $('body').height() - $(this).parent().position().top - 182;
		if (dropheight > tobottom || dropheight == 285) {
			$(this).parent().find('div ul').height(tobottom);
			$(this).parent().find('div ul').delay(150).jScrollPane({
				verticalDragMinHeight: 60,
				verticalDragMaxHeight: 60,
				horizontalDragMinWidth: 60,
				horizontalDragMaxWidth: 60,
				mouseWheelSpeed: 50
			});
		}
		$('html').one('click',function() {
			$('.newcatalog div > ul > li > ul > li').removeClass('active');
		});
		event.stopPropagation();
		return false;
	});
	$('a.zoom').fancybox({
		'showNavArrows' : false
	});
	$('a.fancybox').fancybox({
		'showNavArrows' : true,
	});
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('.mobileslider').fadeIn(0);
		//$('.thumbs').jScrollPane();
		$('#main-slider').liquidSlider({
			autoHeight: true,
			dynamicTabs: false,
			hashLinking: true,
			responsive: true,
			hoverArrows: false,
			preloader: false,
			crossLinks: true,
			slideEaseDuration: 500
		});
	}
	else {
		$('.container .inner').fadeIn(0);
		var w = $('.container').width();
		if (w > 1600) {
			w = 1600;
		}
		var h = w * 0.66;
		$('#journal').wowBook({
			height : h,
			width  : w,
			centeredWhenClosed : true,
			hardcovers : false,
			turnPageDuration : 1000,
			numberedPages : [1,-2],
			flipSound     : true,
			flipSoundFile : ['page-flip.mp3', 'page-flip.ogg'],
			flipSoundPath : 'sounds/',
			controls : {
					zoomIn    : '#zoomin',
					zoomOut   : '#zoomout',
					next      : '#next',
					back      : '#back',
					first     : '#first',
					last      : '#last',
					slideShow : '#slideshow',
					flipSound : '#flipsound',
					thumbnails : '#thumbs'
				}
			,thumbnailsPosition : 'bottom'
		}).css({'display':'none', 'margin':'auto'}).fadeIn(1000);
		$('#cover').click(function(){
			$.wowBook('journal').advance();
		});
		$('#thumbs').click();
		var book = $.wowBook('#journal');
		function rebuildThumbnails(){
			book.destroyThumbnails()
			book.showThumbnails()
			$('#thumbs_holder').css('marginTop', -$('#thumbs_holder').height()/2)
		}
		var factor = 0.02*( $(this).index() ? -3.48 : 1 );
		book.opts.thumbnailScale = book.opts.thumbnailScale + factor;
		rebuildThumbnails();
		var scrollPane = $('.wowbook-thumbnails').jScrollPane({
			verticalDragMinHeight: 106,
			verticalDragMaxHeight: 106,
			horizontalDragMinWidth: 106,
			horizontalDragMaxWidth: 106
		});
		var api = scrollPane.data('jsp'); 
		scrollPane.bind('mousewheel', function (event, delta, deltaX) { 
			api.scrollByX(delta*-50);
			return false;
		});
	}
	$('.popup, div.gallery').append('<button class="close"></button>');
	$('.popup .close').click(function() {
		$('.popup, .fade').fadeOut(250);
	});
	$('div.gallery .close').click(function() {
		$('.fade').fadeOut(250);
		$('div.gallery').css({'left': '-9999px', 'top': '-9999px'});
	});
	$(this).keydown(function(eventObject){
		if (eventObject.which == 27)
		$('.popup, .fade').fadeOut(250);
		$('div.gallery').css({'left': '-9999px', 'top': '-9999px'});
	});
	var popup = $('.popup');
	$('.feature ul li.sale a, .feature ul li.contest a, .feature ul li.information a, .feature ul li.video a').click(function () {
		popup.hide();
		popup.filter(this.hash).stop(true, true).fadeIn(150);
		$('.fade').fadeIn(250);
		return false;
	});
	var gallery = $('div.gallery');
	$('.feature ul li.gallery a').click(function () {
		gallery.css({'left': '-9999px', 'top': '-9999px'});
		gallery.filter(this.hash).css({'left': '50%', 'top': '250px'});
		$('.fade').fadeIn(250);
		return false;
	});
    var galleries = $('.slideshow').adGallery();
    $('#next, #back, #first, #last, #thumbs').click(function(){      
        $('iframe').attr('src', $('iframe').attr('src'));
    });
	/* Added 15 Dec */
	$('.feature ul li').each(function() {
		var ws = $(this).children('span').width() / 2;
		$(this).children('span').css({'left': -ws+'px'});
	});
	$('.feature ul li').hover(
		function() {
			$(this).children('span').stop(true,true).fadeIn(150);
		},
		function() {
			$(this).children('span').stop(true,true).fadeOut(150);
		}
	);
	$('#fancybox-wrap').unbind('mousewheel.fb');
});