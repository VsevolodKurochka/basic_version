$(document).ready(function(){
	// Variables
	var body 							= $("body"),
			modalVisibility		= "showing-in",
			active 						= "active",
			backdrop 					= $("<div />", {
				class: "vmodal-backdrop"
			});
	// Menu
		$("[data-menu]").click(function(){
			var menu_href = $(this).attr("data-menu");
			//$(body).toggleClass('vnav-active');
			$(menu_href).toggleClass('vnav-active');
			//$("[data-menu]").not($(this)).removeClass(active);
			$(this).toggleClass(active);
		});
		$('.vnav a[href*="#"]').click(function(){
			var href = $(this).attr('href');
			$('body,html').animate({
				scrollTop: $(href).offset().top
			},2000);
			$("[data-menu]").removeClass(active);
			$('.vnav-wrap-fixed .vnav').removeClass('vnav-active');
			return false;
		});
		$(".vnav-text-toggle").click(function(){
			$(this).toggleClass(active);
			$(".vnav-text").toggleClass(active);
		});
	// Scroll to block
		$('.anchor').click(function(){
			var href = $(this).attr('href');
			$('body,html').animate({
				scrollTop: $(href).offset().top
			},2000);
			return false;
		});
	// Modal
		var videoBlock = $('#modalvideo .vmodal-video');
		function videoBlockClear(){
			videoBlock.html('');
		}
		function videoBlockIsShowing(){
			if($("#modalvideo").hasClass('showing-in')){
				videoBlockClear();
			}
		}
		$('[data-func="vmodal"]').click(function(){
			var thisTarget = $(this).attr("data-target");
			videoBlockIsShowing();
			if ( $(thisTarget).length > 0 ) {
				$('.vmodal').removeClass(modalVisibility)
				$(thisTarget).addClass(modalVisibility);
				body.addClass("vmodal-open").append(backdrop.addClass(modalVisibility));
			}else{
				console.log("No element with " + thisTarget + " name");
			}
		});
		$('[data-close="vmodal"]').click(function(){
			$(this).closest(".showing-in").removeClass(modalVisibility);
			backdrop.removeClass(modalVisibility);
			body.removeClass("vmodal-open");
		});
		$(window).click(function(e){
			if ( backdrop.length > 0 && $(e.target).is(".vmodal") ) {
				$(".showing-in").removeClass(modalVisibility);
				backdrop.removeClass(modalVisibility);
				videoBlockClear();
				body.removeClass("vmodal-open");
			}
		});
		// Video
		$('[data-video]').click(function(){
			var thisVideo = $(this).attr('data-video');
			var thisSource = $(this).attr('data-source');
			var thisTitle = $(this).attr('data-title');
			var output;
			videoBlockClear();
			if(thisTitle){
				$("#modalvideo .vmodal-title").text(thisTitle);
			}
			if( thisSource == 'youtube'){
				output = $('<iframe />', {
					class: 'vmodal-iframe',
					src: thisVideo + '?autoplay=1'
				}).appendTo('#modalvideo .vmodal-video');
			}
		});
		$("#modalvideo .vmodal-close").click(function(){
			videoBlockClear();
		});
	// Collapse
		$(".vcollapse-inner.active").children(".vcollapse-body").slideDown();
		$('.vcollapse-wrap').on('click', '.vcollapse-header', function(){
			let collapseInner = $(this).parents('.vcollapse-wrap').find('.vcollapse-inner');
			$(this).parent().toggleClass(active);
			$(this).next().slideToggle('slow');
			collapseInner.not($(this).parent()).removeClass("active");
			collapseInner.children('.vcollapse-body').not($(this).next()).slideUp("slow");
		});
	// Tabs
		$('[data-func="tab"]').click(function(){			
			// Tab links toggle class
				$(this).closest(".vtabs-list").children("li").removeClass(active);
				$(this).parent().addClass(active);
			// Show tab content
				var tabTarget = $(this).attr('data-target');
				$(tabTarget).addClass(active);
				$(".vtabs-content > div").not($(tabTarget)).removeClass(active);
		});
	// Develope
		var widthDevice = $(window).width();
		$(".development").html(widthDevice);
});	