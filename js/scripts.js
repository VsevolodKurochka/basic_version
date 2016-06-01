$(document).ready(function(){
	var header_menu = $('.header-menu'),
		navbar_toggle = $('.navbar-toggle');
	function toggler(){
		navbar_toggle.toggleClass('navbar-toggle-open');
		header_menu.toggleClass('header-menu-open');
	}
	navbar_toggle.click(function(e){
		toggler();
		e.stopPropagation();
	});
	$(document).click(function(e){
		if ( ! $(e.target).is('.header-menu,.header-menu *') ) {
			toggler();
		}
	});
	$(document).ready(function(){
		$('.anchor').click(function(){
			var href = $(this).attr('href');
			$('body,html').animate({
				scrollTop: $(href).offset().top
			},2000);
			return false;
		});
		$(window).on('hashchange', function(e){
			history.replaceState ("", document.title, e.originalEvent.oldURL);
		});
	});
	
});