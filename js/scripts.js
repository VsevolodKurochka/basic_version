$(document).ready(function(){

		// VARIABLES
		var header_menu_name 	= 'header-menu',
				header_menu 			= $('.' + header_menu_name),
				button_menu 			= $('.btn-menu'),
				body 							= $(".body");

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
			body.hammer().on("swiperight", function(){
				toggler();
			});
			body.hammer().on("swipeleft", function(){
				toggler();
			});
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
		var attr = $(".clicker").attr("data-open");
		$(".clicker").click(function(){
			$(attr).slideToggle();
		});
});	