(function($) {	
	
		set = function() {	
		
			var h = $(window).height() - $('header#top').height() - $('footer').height();
			var w = $(window).width();
			
			$('article > div').removeClass('contents');
			
			$('article > section').each(function(index, domEle) {
				$(domEle).height(h).css('overflow-y' , 'auto');
				$(domEle).children().width(w / 2);
			});
			
			if (w <= 1200) {
				$('section div').width(w * 0.9);
			}
			
			$('#news li:first-child').addClass('current');
		},
		
		move = function() {

		var i	= 0;
			
			$('section').eq(0).addClass('load');
			
			$('main li').on('click' , function() {
				
				var w		= $(window).width();
				var hit		= $(this);
				var num		= $('main li').index(hit);
				var lockon	= $('section').eq(num);
				
				hit.siblings().removeClass('active');
				
				if (i < num) {
				
					function startTimer(){
						timer = setInterval(function(){
							$('section').eq(i).slideUp(500);
							i++;
							
							if (i == num) {
								stopTimer();
								i = num;
							}
							
						}, 300);
					}
					
					function stopTimer(){
						clearInterval(timer);
						$('section').removeClass('load');
						lockon.addClass('load');
					}
					
					startTimer();
					
				} else if (i > num) {
					function startTimer2(){
						timer2 = setInterval(function(){
							$('section').eq(i).slideDown(500);
							i--;
							
							if (i < num) {
								stopTimer2();
								i = num;
							}
						}, 300);
					}
					
					function stopTimer2(){
						clearInterval(timer2);
						$('section').removeClass('load');
						lockon.addClass('load');
					}
					
					startTimer2();
				}
				
				hit.addClass('active');
				$('main > span').animate({left: 25 * num + '%'} , 500);
				
				return false;
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
							$('#next').show();
							$('#prev').hide();
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
						$('#prev').hide();
					} else {
						$('#prev').show();
					}
					
					if (lockonnum+1 == cnt) {
						$('#next').hide();
					} else {
						$('#next').show();
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
		move();
		news();
	});	
	
	$(window).resize(function() {
		set();
	});
	
})($);// JavaScript Document