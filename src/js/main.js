import './libs/slick.js'
var $ = require( "jquery" );

$(document).ready(function(){
	$(".def-slider-1").slick({
		arrows:true,
		dots:true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$(".def-slider-3").slick({
		arrows:true,
		dots:true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
});

//Mobile search
// $(document).on('click', '.header__nav-search.active', function(e){
// 	e.stopPropagation();
// 	console.log("asdasd")
// 	$(this).find('form').submit();
// });
$(document).on('click', '.header__nav-search', function(e){
	e.stopPropagation();
	$(this).addClass('active');
});
$(document).on('click',function(){
	$('.header__nav-search').removeClass('active');
});

//mob menu
$(document).on('click', '.mob-menu__cross', function(){
	$('body').css("overflow", "visible");
	$('.header__burger').removeClass('active');
	$('.mob-menu').removeClass('active');
});
$(document).on('click', '.header__burger', function(){
	$('body').css("overflow", "hidden");
	$('.header__burger').addClass('active');
	$('.mob-menu').addClass('active');
});

//Modal
$(document).on('click', '.modal-trigger', function(event) {
	$("body").css("overflow", "hidden");

	var modalID = $(this).data('modal-id');
	var modal = $("#" + modalID + ".modal");
	modal.addClass("modal-active");

	var modalTitle = $(this).data('modal-title');
	if(typeof modalTitle !== 'undefined'){
		modal.find(".modal-title").html(modalTitle);
	}
	let modalFieldPresets= $(this).data('field-presets');
	if(modalFieldPresets){
		for (let i = 0; i < modalFieldPresets.length; i++) {
			modal.find(modalFieldPresets[i].childSelector).val(modalFieldPresets[i].value);
		}
	}
});
$(document).on('mousedown touchstart', '.modal-bg, .modal-cross', function(event) {
	$("body").css("overflow", "visible");
	var modal = $(this).closest(".modal");
	modal.removeClass("modal-active");

	//check for iframes in modal
	if(modal.find('iframe').length > 0){
		let contentWrapper = modal.find('.modal-content-wrapper');
		contentWrapper.html(contentWrapper.html());
	}
});
$(document).on('mousedown touchstart', '.modal-window', function(event) {
	event.stopPropagation();
});

//TABS
$(document).on('click', '[data-tab]', function(){
	SwitchTab(this);
});
function SwitchTab(newTab){
	let parent = $(newTab).parent('[data-tab-container]');
	parent.find('[data-tab]').removeClass('active');
	$(newTab).addClass('active');

	let tabWindow = $('#' + $(newTab).data('tab-window-id'));
	tabWindow.parent('[data-tab-window-container]').find('[data-tab-window]').removeClass('active');
	tabWindow.addClass('active');
}
$(document).ready(function(){
	ResetTabs();
});
function ResetTabs(){
	$('.active[data-tab]').each(function( index, element ){
		SwitchTab(element);
	});
}


//END TABS