(function($) {

	//ie css
	ie = function() {
		var ua = navigator.userAgent;
		var isIE = ua.match(/msie/i),
		isIE6 = ua.match(/msie [6.]/i),
		isIE7 = ua.match(/msie [7.]/i),
		isIE8 = ua.match(/msie [8.]/i),
		isIE9 = ua.match(/msie [9.]/i),
		isIE10 = ua.match(/msie [10.]/i),
		isIE11 = ua.match(/msie [11.]/i);
		if (isIE) {
		$("html").addClass('ie');
			if (isIE6) {
				$("html").addClass('ie6');
			} else if (isIE7) {
				$("html").addClass('ie7');
			} else if (isIE8) {
				$("html").addClass('ie8');
			} else if (isIE9) {
				$("html").addClass('ie9');
			} else if (isIE10) {
				$("html").addClass('ie10');
			} else if (isIE11) {
				$("html").addClass('ie11');
			}
		}
		
		$('#topnavi li a,footer li a,#issues a').prepend('≫ ');
		$('#side li a').append(' ●');
		$('.box dt').not('#issues dt').append('：');
		$('.dot dd').prepend('・');
		$('.box2 dt').prepend('―　').append('　―');
	},
	
	section = function() {
		
        $('section .quarter:nth-child(8n),section .quarter:nth-child(8n-2),section .quarter:nth-child(8n-3),section .quarter:nth-child(8n-5)').not('table').addClass('back_gray');
		
        $('section .quarter:nth-child(8n+1),section .quarter:nth-child(8n-1),section .quarter:nth-child(8n-4),section .quarter:nth-child(8n-6)').not('table').addClass('back_white');
		
		$('article').children('section:not(.half,.one_third,.quarter),div').addClass('contents');
		
		$('header#title').append('<p id="scroll">scroll<span class="fa fa-angle-down fa-2x"></span></p>');
		
		$('.contents:odd').css('background-color','#e9f2ff');
		$('.contents:even').css('background-color','#FFFFFF');
		$('.contents:eq(0)').css('border-top' , '#012052 7px solid');
		
		$('.contents').each(function() {
			var A = Math.floor(6*Math.random());
            $(this).addClass('bg'+A);
        });
	},
	
	font = function() {
		$('.contents').each(function() {
            $('.half:odd' , this).css('border-left-width' , $(window).width() * 0.001);
        });
	},
	
	//top button
	goTop = function() {
		
		var flag = false;
		var pagetop = $('#pagetop');
		
		$(window).scroll(function () {
			
			if ($(this).scrollTop() > 300) {
				if (flag == false) {
					flag = true;
					pagetop.stop().animate({
						'bottom': '50px'
					}, 200);
				}
			} else {
				if (flag) {
					flag = false;
					pagetop.stop().animate({
						'bottom': '-50px'
					}, 200);
				}
			}			
		});
		
		pagetop.click(function () {
			$('body, html').animate({ scrollTop: 0}, 500);
			return false;
		});
	},
	
	nav = function() {
		
		var path	= location.href.split('/');
		var loc		= path[path.length-1];
		
		$('nav#global a').each(function(e,v){
			href = $(this).attr('href');
			if(loc == '') {
				loc = 'index';
			}
			if(href.match('japan') && href.match(loc)) {
				$(this).addClass('active');
			}
		});
			
		$('.menu-trigger:not(.on)').hover(function() {
			$('#global > dl > dd').slideDown(500).css('display' , 'table-cell');
			$('#global > dl > dd > dl').slideDown(500);
			$(this).addClass('on');
			$('i' , this).text('close');
			$('#global').nextAll().addClass('menu_open');
		} , function() {
			
			$('#global').hover(function() {
				$(this).show();
				$('.menu-trigger i').text('close');
			} , function() {
				$('#global > dl > dd').slideUp(500);
				$('#global > dl > dd > dl').slideUp(500);
				$('#global .on').removeClass('on');
				$('#global').nextAll().removeClass('menu_open');
				$('.menu-trigger i').text('menu');
			});
		});
		
		$('.menu-trigger').on('click' , function() {
			$('#global > dl > dd').slideToggle(500).css('display' , 'table-cell');
			$('#global > dl > dd > dl').slideToggle(500)
			$(this).toggleClass('on');
			$('#global').nextAll().toggleClass('menu_open');
			
			if ($('i' , this).text() == 'close'){
				$('i' , this).text('menu');
		   } else {
			   $('i' , this).text('close');
		   }
		});
	},
	
	//title
	title = function() {
			
		var ct	= $('.contents:first').offset().top + 7;
		var A	= Math.floor(9*Math.random());
		
		$('body').addClass('bg'+A);
		
		$('header#title').addClass('load');
		
		$('header#title #scroll').on('click' , function() {
			$("html, body").stop(true).animate({scrollTop: ct}, 500, "swing");
		});

	},
	
	// SmoothScroll
	smoothScroll = function() {
		
		$('article #side li a[href^=#]').click(function(){
			var speed = 500;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			var body = 'body';
			$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
		});
		
		var set =  $('#global').height() + 1;//ウインドウ上部からどれぐらいの位置で変化させるか
		var boxTop = new Array;
		var current = -1;
		var startPosition = 0;
		var navtop = $('#global').offset().top;
		
		//各要素の位置
		$(window).on("load resize", function(){
			$('article > section,article > div').each(function(i) {
				boxTop[i] = $(this).offset().top;
			});
		});
		//最初の要素にclass="on"をつける
		changeBox(0);
		//スクロールした時の処理
		$(window).scroll(function(){
			
			var scrollPosition	= $(window).scrollTop();		
				
			for (var i = boxTop.length - 1 ; i >= 0; i--) {
				if (scrollPosition >= boxTop[i] - set) {
					$('#pan').slideDown('slow');
					$('#side').fadeIn('slow');
								
					changeBox(i);
					break;
				} else if (scrollPosition < boxTop[0] - set) {
					$('#pan').slideUp('slow');
					$('#side').fadeOut('slow');
				}
			};
			
			if (navtop < scrollPosition) {
				$('#global').addClass('fix');
			} else {
				$('#global').removeClass('fix');
			}
					
			if (scrollPosition >= $(document).height() - $(window).height() - $('footer ul').height()) {
				$('#pan').css('position' , 'absolute');
			} else {
				$('#pan').css('position' , 'fixed');
			}
			
			startPosition = scrollPosition;
		});
		
		//ナビの処理
		function changeBox(secNum) {
			if (secNum != current) {
				
				current = secNum;
				secNum2 = secNum + 1;//HTML順序用
				$('article #side li').removeClass('on');
				$('article #side li:nth-child(' + secNum2 +')').addClass('on');
	
				/* 位置によって個別に処理をしたい場合　
				if (current == 0) {
					// 現在地がsection1の場合の処理
				} else if (current == 1) {
					// 現在地がsection2の場合の処理
				} else if (current == 2) {
					// 現在地がsection3の場合の処理
				}*/
			}
		};
	},
	
	//sidemenu
	side = function() {
		$('#side').hover(function() {
			$('body').append('<div id="modal"></div>');
			$('span',this).fadeIn('slow');
			$('a',this).css('cursor','pointer');
		},function() {
			$('div#modal').remove();
			$('span',this).fadeOut('slow');
		});
	}
	
	$(document).ready(function() {
		ie();
		section();
		font();
		goTop();
		nav();
		title();
		smoothScroll();
		side();
	});	
	
	$(window).resize(function() {
		title();
		font();
	});
	
})($);

// JavaScript Document