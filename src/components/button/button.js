import 'ripple-jquery';

const options = {
	bgColor: 'white', //default is rgba(0,0,0,0.2),
	time: 400
}

$(document).ready(function() {
		$('.button').ripple(options);
		console.log($('.button'))
});