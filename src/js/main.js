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
		focusOnSelect: true,
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
	$(".review-slider-sec").slick({
		asNavFor: '.review-slider-main',
		arrows:true,
		focusOnSelect: true,
		centerMode: true,
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
	$(".review-slider-main").slick({
		asNavFor: '.review-slider-sec',
		arrows:false,
		dots:false,
		fade: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
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
//window-selector
$(document).ready(function() {
	$('.window-selector select').each(function(){
		let windowSelector = $(this).closest('.window-selector');
		let optionWindows = windowSelector.find('.select-option-window');
		optionWindows.addClass('hidden');
		for (var i = 0; i < optionWindows.length; i++) {
			if($(optionWindows[i]).data('option-value') == this.value){
				$(optionWindows[i]).removeClass('hidden');
			}
		}	
	});
	
});
$(document).on('change', '.window-selector select', function() {
	let windowSelector = $(this).closest('.window-selector');
	let optionWindows = windowSelector.find('.select-option-window');
	optionWindows.addClass('hidden');
	for (var i = 0; i < optionWindows.length; i++) {
		if($(optionWindows[i]).data('option-value') == this.value){
			$(optionWindows[i]).removeClass('hidden');
		}
	}
});

//Validated form


const inputValidationLookup = {
	"regex": {
		validate: function(input){
			if(input.hasClass('hidden')){
				return true;
			}
			let regex = new RegExp(input.data('validation-regex'));
			return regex.test(input.find('input, select>option:selected').val());
		}
	},
	"css-selector": {
		validate: function(input){
			return input.is(input.data('validation-selector'));
		}
	},
}
$(document).on('submit', '.recaptcha-validated-form', function(e){
	e.preventDefault();
	let form = $(this);
	let valid = ValidateForm(form);
	if(valid){
		grecaptcha.ready(function() {
        	grecaptcha.execute(this.data('site-key'), {action: 'submit'}).then(function(token) {
        		this[0].recaptchatoken.value = token;
          		this[0].submit();
        	}.bind(this));
        }.bind(form));
	}
})
$(document).on('submit', '.validated-form', function(e){
	let form = $(this);
	let valid = ValidateForm(form);
	if(!valid){
		e.preventDefault();
	}
});
// $(document).ready(function(){
// 	$('.validated-form').submit(function(e){
		
// 	});
// });

// $(document).on('submit', '.validated-form', function(e){
// 	let form = $(this).closest('.validated-form');
// 	let valid = ValidateForm(form);
// 	console.log(valid);
// 	// if(!valid){
// 		e.preventDefault();
// 	// }
// });
$(document).on('click input change', '.validated-form-input', function(){
	$(this).removeClass('invalid');
});
function ValidateForm(form){
	let inputs = form.find('.validated-form-input');
	// let type = 
	let validated = true;
	for (var i = 0; i < inputs.length; i++) {
		let input = $(inputs[i]);
		let type = input.data('validation-type');
		let inputValid = inputValidationLookup[type].validate(input);
		if(!inputValid){
			input.addClass('invalid')
		}
		validated = validated && inputValid;
		// console.log(inputs[i], $(inputs[i]).data('valid-selector'), $(inputs[i]).is($(inputs[i]).data('valid-selector')));
		// let rInput = $(inputs[i]).find('input[value=""]');
		// if(rInput.length == 0){
		// 	console.log("empty input in ",inputs[i]);
		// }
		
	}
	return validated;
	// form.find(form.data('submit-button-selector')).attr("disabled", !validated);
}