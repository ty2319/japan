$(window).on('load resize', function() {
	
	$('.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar').height($(window).width()*0.47);
	
	$('article div section').height($('img.half').height()).mCustomScrollbar({theme: "minimal-dark"});
});

$(function() {
	
	var num2	= 0;
	var num3	= 0; 
	
	$('article > div > div').find('.right:first').show();
		
　　$('article > div > ul a').on('click' , function() {
	
		var hit	= $(this);
		var num		= hit.parents('ul').children().index(hit.parent());
		var target	= hit.attr('href');
			
		setTimeout(function(){
			hit.parents('ul').siblings().children('.right').hide();
			hit.parents('ul').siblings().children('.right').eq(num).show();
		} , 300);
		
		if (num > num2) {
			$(target).animate({left: '3%'}, 600 , 'swing');
		} else if (num < num2) {
			$(target).nextAll('.left').animate({left: '100%'}, 600 , 'swing');
		} else if (num == num2) {
			if (num > num3){
				$(target).animate({left: '3%'}, 600 , 'swing');
			} else {
				$(target).nextAll('.left').animate({left: '100%'}, 600 , 'swing');
			}
		}
		
		hit.parent().siblings().removeClass('show');
		hit.parent().addClass('show');
		
		num2 = num;
		num3 = hit.parents('ul').children().index('.show');
		
		return false;
		
	});
});// JavaScript Document