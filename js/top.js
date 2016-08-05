(function($) {	
		var	w		= 0;
			h		= 0,
			wh		= 0,
			hh		= 0,
			fh		= 0,
			middle	= 0,
			ssize	= 0,
			onoff	= -1;
	
		set = function() {	
			w = $(window).width();
			h = $(window).height();
			wh = (w*0.05) + 0.75;
			hh = $('haeder#top').outerHeight();
			nh = $('#global ul:first').outerHeight();
			fh = $('footer').outerHeight();
			middle = h - hh - fh;
			
			if (w < 1200) {
				wh = 60.75
			}
			ssize = wh*0.7;
			
			$('main,article:not(#news),#back').width(w).height(middle).css({'top' : hh , 'min-height' : 650});
			$('#button li').width(w*0.05).height(w*0.05);
			$('main > div.btm:not(.active)').width(ssize).height(ssize);
			$('#back div').addClass('inner');
			$('section div.tse-scrollable').width(w*0.18).height(wh * 3.7).TrackpadScrollEmulator();
			$('#news li:first-child').addClass('current');
		}
	
		start = function() {
			
			$('#pv').click(function() { 
				 
				$('body').append('<div id="modal"></div><p id="close">×</p>');
				$('iframe,#close').fadeIn('slow');
				$('#modal,#close').click(function() {
					$('iframe,#modal,#close').remove();
					$('#vs').after('<iframe src="movie.html" frameborder="0"></iframe>');
				});
			});
	
			for(var i = 0; i < 16 ; ++i) {
				//random opacity, top, left and angle
				var o	= 0.3,
				t		= Math.floor(Math.random()*196) + 400, // between 5 and 200
				l		= Math.floor(Math.random()*696) + 50, // between 5 and 700
				a		= Math.floor(Math.random()*101) - 50; // between -50 and 50
						
				$el		= $('<div class="btm">').css({
					opacity		: o,
					top			: t + 100 + 'px',
					left		: l + 'px',
					width		: ssize,
					height		: ssize
				});
						
				$el2		= $('<div class="tp">').css({
					opacity		: o,
					top			: t + 'px',
					left		: l - 30 + 'px',
					width		: ssize * 0.7,
					height		: ssize * 0.7,
					background	: '#012052'
				});
					
				$el.appendTo('main');
				$el2.appendTo('main');
			}
		},
		
		list = function() {
			$('#button li').click(function() {
				$('#button li').removeClass('on');
				$(this).addClass('on');
				var num = $('#button li').index(this);
				
				if (num != onoff) {
					$('section').fadeOut();
					$('#back').fadeOut('fast' , function() {
						$(this).children().css('background-image' , 'url(img/top/' + num + '.jpg)').removeClass('inner');
						$(this).fadeIn('fast' , function() {
							$(this).children().addClass('inner');
						});
					});
					
					if (onoff == -1) {
						$('main > div.btm').each(function(i) {
							var $el		= $(this),
							param		= {
								width	: wh,
								height	: wh,
								top	: (middle * 0.54) + (wh * Math.floor(i/4)),
								left	: (w * 0.07) + (wh * (i%4)),
								opacity	: 0.7,
								zIndex	: 2
							};
									
							if (!$.browser.msie)
								param.rotate	= '0deg';
									
							$el.animate(param, 1000 , function() {
								$('section').eq(num).fadeIn('fast');
							}).addClass('active');
						});
						
						$('main > div.tp').each(function(i) {
							var $el		= $(this),
							param		= {
								width	: wh * 0.7,
								height	: wh * 0.7,
								top		: (middle * 0.34) + ((wh * 0.7) * Math.floor(i/4)),
								left	: (w * 0.25) + ((wh * 0.7) * (i%4)),
								opacity	: 0.7,
								zIndex	: 1
							};
									
							if (!$.browser.msie)
								param.rotate	= '0deg';
									
							$el.animate(param, 1000).addClass('active');
						});
					} else {
						$('section').eq(num).fadeIn('fast').addClass('active');
					}
					
					onoff = num;
				}
			});
		},
		
		batu = function() {
			$('.close').on('click' , function() {
				$('#button li').removeClass('on');
				$(this).parents('section').fadeOut('fast');
				$('#back').fadeOut('fast' , function() {
					$(this).children().removeClass('inner').css('background-image' , 'url(img/top/4.jpg)');
				}).fadeIn('fast' , function() {
					$(this).children().addClass('inner');
				});
				
				$('main > div.btm').each(function(i) {
					//random opacity, top, left and angle
					var o			= 0.3,
					t			= Math.floor(Math.random()*196) + 400, // between 5 and 200
					l			= Math.floor(Math.random()*696) + 50, // between 5 and 700
					a			= Math.floor(Math.random()*101) - 50; // between -50 and 50
					$el			= $(this),
					param		= {
						width	: ssize,
						height	: ssize,
						opacity	: o,
						top		: t + 100 + 'px',
						left	: l + 'px'
					};
							
					if (!$.browser.msie)
						param.rotate	= a + 'deg';
							
					$el.animate(param, 1000).removeClass('active');
				});
				
				$('main > div.tp').each(function(i) {
					//random opacity, top, left and angle
					var o			= 0.3,
					t			= Math.floor(Math.random()*196) + 400, // between 5 and 200
					l			= Math.floor(Math.random()*696) + 50, // between 5 and 700
					a			= Math.floor(Math.random()*101) - 50; // between -50 and 50
					$el			= $(this),
					param		= {
						opacity	: o,
						top			: t + 'px',
						left		: l - 30 + 'px',
						width		: ssize * 0.7,
						height		: ssize * 0.7,
					};
							
					if (!$.browser.msie)
						param.rotate	= a + 'deg';
							
					$el.animate(param, 1000).removeClass('active');
				});
				
				onoff = -1;
			});
		},
		
		active = function() {	
			
			$('main div.btm.active').each(function(i) {
				var t = (middle * 0.54) + (wh * Math.floor(i/4)),
				l = (w * 0.07) + (wh * (i%4));
				
				$(this).css({'width' : wh,'height': wh , 'top': t , 'left': l , 'opacity': 0.7});
			});
			
			$('main div.tp.active').each(function(i) {
				var t = (middle * 0.34) + ((wh * 0.7) * Math.floor(i/4)),
					l = (w * 0.25) + ((wh * 0.7) * (i%4));
				
				$(this).css({'width' : wh * 0.7,'height': wh * 0.7 , 'top': t , 'left': l , 'opacity': 0.7});
			});
		},
		
		news = function() {
		
			var cnt = $('#news li').length;
			
			var preid		= 0;
			var nextid		= 0;
			var nw			= $('#news').width();
			var distance	= 0;
			var timer;
			
			$('#prev').hide();
			
			$('#news ul').width(nw * cnt);
			
			$('#news li').each(function(i){
				var spot = $(this);
				spot.attr('id','news' + (i));
				spot.width(nw);
			});
			
			function startTimer(){
				timer = setInterval(function(){
					
					distance = distance - nw;
					
					$('#prev').fadeIn('fast');
					$('.current').removeClass('current').next().addClass('current');
					preid			= $('.current').prev().attr('id');
					nextid			= $('.current').next().attr('id');
					$('#prev').attr('href' , '#' + preid);
					$('#next').attr('href' , '#' + nextid);	
					$('#news ul').animate({marginLeft: distance} , 500).css('margin-left' , distance);
					
					if ($('#news li:last-child').hasClass('current')) {
						
						$('#next').fadeOut('fast');
						
						setTimeout(function(){
							$('#news ul').animate({marginLeft: 0} , 1000).css('margin-left' , 0);
							$('#news li').removeClass('current');
							$('#news li:eq(0)').addClass('current');
							$('#next').attr('href' , '#news1');	
							$('#next').fadeIn('fast');
							$('#prev').fadeOut('fast');
							distance = 0;
						},7000);
					}
									
				}, 7000);
			}
			
			function stopTimer(){
				clearInterval(timer);
			}
			
			startTimer();
			
			$('#prev,#next').on('click' , function() {
				
				stopTimer();
				
				var lockon		= $(this).attr('href');
				var lockonnum	= $('#news li').index($(lockon));
				preid			= $(lockon).prev().attr('id');
				nextid			= $(lockon).next().attr('id');
				
				$('#news ul').animate({marginLeft: nw * -lockonnum} , 500 , function() {
					if (lockonnum <= 0) {
						$('#prev').fadeOut('fast');
					} else {
						$('#prev').fadeIn('fast');
					}
					
					if (lockonnum+1 == cnt) {
						$('#next').fadeOut('fast');
					} else {
						$('#next').fadeIn('fast');
					}
				
					$('#prev').attr('href' , '#' + preid);
					$('#next').attr('href' , '#' + nextid);
					
					distance	= nw * -lockonnum;
					
				}).css('margin-left' , nw * -lockonnum);
				
				$('#news li').removeClass('current');
				$(lockon).addClass('current');
				startTimer();
				
				return false;
			});
			
			if (cnt == 1 ) {
				$('#prev,#next').hide();
				stopTimer();
			}
		}
		
	$(document).ready(function() {
		set();
		start();
		list();
		batu();
		news();
	});	
	
	$(window).resize(function() {
		set();
		active();
	});
	
})($);// JavaScript Document