/*$(window).resize(function() {
	var height = $(window).height()-134;
	$('#map').css("height",height+"px");
});*/
(function() {
	$(document).ready(function(){
		setInterval(function() {
			var rotated = false;     
			document.getElementById('rotateThis').classList.toggle('rotated');
		}, 3000);
	});
})();