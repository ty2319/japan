$(document).ready(function(){
	
	$('.accordion').css('cursor','pointer');	
	$('.accordion + div').hide().css('margin-bottom','10em');
	
	$('section > .half').tile();
	
	$("a[rel=game1],a[rel=game2],a[rel=game3],a[rel=game4],a[rel=game5]").fancybox({
		'transitionIn'		: 'fade',
		'transitionOut'		: 'fade',
		'titlePosition' 	: 'over',
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		}
	});
	
	$(".light-gallery").lightGallery({
        showThumbByDefault:true,
        addClass:'showThumbByDefault',
		loop:true
	});
	
	$('.fancy dt + dd').css('margin',0);
	$('.fancy > dt:first-child').css({'border':'none','margin-top': 0,'padding-top': '1em'});
	
	$('.accordion').click(function(){
		$(this).next('div').slideToggle('slow' ,function() {
			$('section > .half').tile();
		});
	}).toggle(function() {
		$('span' , this).text("※クリックすると上に閉じます。 ▲");
	}, function() {
		$('span' , this).text("※クリックすると下に開きます。 ▼");
	});
	
}); 
