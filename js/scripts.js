$(document).ready(function(){

		// VARIABLES
		var header_menu_name 	= 'header-menu',
				header_menu 			= $('.' + header_menu_name),
				button_menu 			= $('.btn-menu'),
				body 							= $(".body"),
				responsiveBr      = 1024,
				visibility        = "in visible",
		 		backdrop = $("<div />", {
					class: "vmodal-backdrop fade"
				});
		//MENU
			//SCRIPTS
			function toggler(){
				body.toggleClass("header-menu-push");
				button_menu.toggleClass('navbar-toggle-open');
				header_menu.toggleClass('header-menu-open');
			}
			button_menu.click(function(e){
				toggler();
				e.stopPropagation();
			});
			$('.anchor-menu').click(function(){
				var href = $(this).attr('href');
				$('body,html').animate({
					scrollTop: $(href).offset().top
				},2000);
				toggler();
				return false;
			});
			function menuSwipe(){
				if ( $(document).width() <= responsiveBr ) {
					body.hammer().on("swiperight", function(){
						toggler();
					}).on("swipeleft", function(){
						toggler();
					});
				}
			}
			menuSwipe();
			$(window).resize(menuSwipe);
			
		// $(document).click(function(e){
		// 	if( header_menu.hasClass(header_menu_name + '-open') ) {
		// 		if ( ! $(e.target).is('.'+header_menu_name + ', .'+header_menu_name+"*") ) {
		// 			toggler();
		// 		}
		// 	}
		// });

		// SCROLL TO BLOCK
		$('.anchor').click(function(){
			var href = $(this).attr('href');
			$('body,html').animate({
				scrollTop: $(href).offset().top
			},2000);
			return false;
		});
		
		$('[data-modal="modal"]').click(function(){
			var thisTarget = $(this).attr("data-modal-target");
			$(thisTarget).addClass(visibility);
			body.append(backdrop).addClass("vmodal-open");
			backdrop.addClass(visibility);
		});
		$('[data-close="modal"]').click(function(){
			$(this).closest(".vmodal").removeClass(visibility);
			backdrop.removeClass(visibility);
			body.removeClass("vmodal-open");
		});
		$(window).click(function(e){
			if ( backdrop.length > 0 ) {
				if ( $(e.target).is(".vmodal") ) {
					$(".vmodal.in").removeClass(visibility);
					backdrop.removeClass(visibility);
					body.removeClass("vmodal-open");
					console.log("document clicked");
				}
			}
		});
		// backdrop.click(function(){
		// 	$(".vmodal.in").removeClass(visibility);
		// 	backdrop.removeClass(visibility);
		// 	console.log("backdrop clicked");
		// });
		
		// $(".vmodal").click(function(){
		// 	console.log("vmodal clicked");
		// });
});	