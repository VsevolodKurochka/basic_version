(function(){

	// General functions
	function log(logText){
		console.log(logText);
	}
	function hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	function addClass(element,cls){
		if( !hasClass(element, cls) )
			element.className += ' ' + cls;
	}

	function removeClass(element, cls){
			if(hasClass(element, cls)){
				element.classList.remove(cls);
			}
	}
	function toggleClass(element, cls){
		if( hasClass(element, cls) ){
			removeClass(element, cls)
		}else{
			addClass(element, cls);
		}
	}
	// Modal conctructor
	this.Modal = function(){

		// Create global element references
		this.closeButton = null;
		this.modal = null;
		this.overlay = null;
		this.name = "vmodal";

		this.classes = {
			showing: this.name + '_showing_in',
			overlay: this.name + '__overlay'
		}
		var defaults = {
			id: null,
			className: this.name + "_default " + this.name + "_center",
			closeButton: true,
			title: null,
			titleClass: this.name + "__title",
			titleTag: "p",
			content: null,
			overlay: true
		}
		
		this.options = extendDefaults(defaults, arguments[0]);
		//this.appendToDocument();
	}	


	// Public methods

	// Modal.prototype.appendToDocument = function(){
		
	// }

	Modal.prototype.open = function(){
		buildOut.call(this);
		initialize.call(this);
		addClass(this.modal, this.classes.showing);
		addClass(this.overlay, this.classes.showing);
		
	}	

	Modal.prototype.close = function(){
		removeClass(this.overlay, this.classes.showing);
		removeClass(this.modal, this.classes.showing);
		this.modal.parentNode.removeChild(this.modal);
		this.overlay.parentNode.removeChild(this.overlay);
	}


	// Private functions

	function extendDefaults(oldObject, newObject){
		var property;
		for(property in newObject){
			if(newObject.hasOwnProperty(property)){
				oldObject[property] = newObject[property];
			}
		}
		return oldObject;
	}


	function buildOut(){
		var d = document, dFragment, dialog, box, title, content, header, body, footer;

		dFragment = d.createDocumentFragment();

		function newElem(tag, params, parentName){
			var elem = document.createElement(tag);
			for(p in params){
				elem.setAttribute(p, params[p]);
			}
			if(parentName){
				parentName.appendChild(elem);
			}
			return elem;
		}
		// Create wrap
			this.modal = newElem("div",{
				'id': this.options.id,
				'class': this.name + " " + this.options.className
			});

		// Create box
			box = newElem("div",{
				'class': this.name + "__box"
			}, this.modal);

		// Create header
			header = newElem("div",{
				'class': this.name + "__header"
			}, box);

		// Create body
			body = newElem("div",{
				'class': this.name + "__body"
			}, box);

		// Create footer
			footer = newElem("div",{
				'class': this.name + "__footer"
			}, box);


		if(this.options.closeButton == true){
			this.closeButton = newElem("button", {
				'class': this.name + "__close",
				'data-close': this.name
			}, header);
			this.closeButton.innerHTML = "&times;";
		}


		if(typeof this.options.title === "string"){
			title = newElem(this.options.titleTag, {
				'class': this.options.titleClass
			}, header);
			title.innerHTML = this.options.title;
		}


		if(typeof this.options.content === "string"){
			content = this.options.content;
		}else{
			content = this.options.content.innerHTML;
		}
		body.innerHTML = content;


		dFragment.appendChild(this.modal);

		if(this.options.overlay == true){
			this.overlay = newElem("div",{
				'class': this.classes.overlay
			}, dFragment);
		}


		d.body.appendChild(dFragment);
	}


	function initialize(){
		
		if(this.overlay){
			this.overlay.addEventListener('click', this.close.bind(this));
		}
		if(this.closeButton){
			this.closeButton.addEventListener('click', this.close.bind(this));
		}
	}

	document.addEventListener("DOMContentLoaded", function(){

		var d = document;
		var classes = {
			active: 'active',
			menuActive: 'vnav__menu_active'
		}

		var modalCollect = [];
		var modalBtn = d.querySelectorAll('[data-func="vmodal"]');
		var modalClass, modalTarget, modalTitle, modalContent;

		var jsNav = d.getElementById('navigation');
		var jsNavBtn = d.getElementById('js-vnav__btn');
		var jsNavLinks = d.querySelectorAll('.vnav__menu a[href*="#"]');
		var jsNavText = d.getElementById('js-nav-text');

		var anchors = d.getElementsByClassName('anchor');
		

		// Functions

			function scrollTo(element, to, duration) {
				if (duration <= 0) return;
				var difference = to - element.scrollTop - 75;
				var perTick = difference / duration * 10;
				setTimeout(function() {
					element.scrollTop = element.scrollTop + perTick;
					if (element.scrollTop === to) return;
					scrollTo(element, to, duration - 10);
				}, 10);
			}

			function clickChangeClasses(el_1, el_1_class, el_2, el_2_class){
				el_1.addEventListener('click', function(){
					toggleClass(this, el_1_class);
					toggleClass(el_2, el_2_class);
				});
			}


		for(var i = 0; i < modalBtn.length; i++){
			modalBtn[i].addEventListener('click', function(){

				modalTitle = this.dataset.title;
				modalContent = this.dataset.content.replace("#", "");
				modalID = this.dataset.id.replace("#", "");

				modalCollect[i] = modalID;
				modalCollect[i] = new Modal({
					id: modalID,
					title: modalTitle,
					content: d.getElementById(modalContent)
				}).open();

				if(this.dataset.video != undefined){
					
					var this_modalID = d.getElementById(modalID);
					modalClass = this.dataset.class;
					var this_modalVideoWrap = this_modalID.getElementsByClassName('vmodal__video')[0];
					var this_modalIframe = d.createElement('iframe');
					var this_modalVideo = this.dataset.video;

					addClass(this_modalID, modalClass);
					removeClass(this_modalID, 'vmodal_default');
					addClass(this_modalIframe, 'vmodal__iframe');
					this_modalVideoWrap.appendChild(this_modalIframe);
					this_modalIframe.setAttribute('src', this_modalVideo);

				}

			});
		}
		
		// Button menu
			clickChangeClasses(jsNavBtn, classes.active, jsNav, classes.menuActive);


		// Click on toggle element in navigation
			jsNavText.addEventListener('click', function(){
				toggleClass(this, classes.active);
			});	

		for(var i = 0; i < anchors.length; i++){
			anchors[i].addEventListener('click', function(e){
				e.preventDefault();
				var href = this.getAttribute("href").replace("#", "");
				var scrollAnchor = document.getElementById(href);
				scrollTo(document.body, scrollAnchor.offsetTop, 600);
			});
		}
		

		for(var i = 0; i < jsNavLinks.length; i++){
			jsNavLinks[i].addEventListener('click', function(e){
				e.preventDefault();

				var vnavhref = this.getAttribute("href").replace("#", "");
				var vnavscrollAnchor = document.getElementById(vnavhref);

				removeClass(jsNavBtn, classes.active);
				removeClass(jsNav, classes.menuActive);

				scrollTo(document.body, vnavscrollAnchor.offsetTop, 600);

			});
		}

		// Preloader
			// var images 								= d.images,
			// 		images_total_count 		= images.length,
			// 		images_loaded_count 	= 0,
			// 		loader_percent 				= d.getElementById('loader_percent'),
			// 		loader_bar 						= d.getElementById('loader_bar'),
			// 		loader_animation 			= d.getElementById('loader_animation'),
			// 		image_clone,
			// 		images_formula;


			// for(var i = 0; i < images_total_count; i++){
			// 	image_clone = new Image();
			// 	image_clone.onload = loader;
			// 	image_clone.onerror = loader;
			// 	image_clone.src = images[i].src;
			// }


			// function loader(){
			// 	images_loaded_count++;
			// 	images_formula = parseInt((100 / images_total_count) * images_loaded_count);
			// 	loader_percent.innerHTML = images_formula + '%';
			// 	//loader_bar.style.width = images_formula + '%';
			// 	if( (typeof(loader_animation) != 'undefined' && loader_animation != null ) && (images_loaded_count >= images_total_count / 2)){
			// 		loader_animation.style.animationDuration = "0.5s";
			// 	}
			// 	if(images_loaded_count >= images_total_count){
			// 		setTimeout(function(){
			// 			addClass(d.body, 'loaded');
			// 		}, 1200);
			// 	}
			// }

	});
}());