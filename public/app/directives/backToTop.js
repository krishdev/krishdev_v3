angular.module('backToTop', [])
	.directive('backToTop', function ($window, $document) {
		return {
			restrict: 'AC',
			link: function (scope, iElem, attrs) {
				var timer = 0,
					windowHeight,
					scrollPerSec;
				iElem.bind('click', function () {
					timer = 0;
					windowHeight = $document.height() - 1000;
					scrollPerSec = windowHeight / 50;
					var sInterval = setInterval(function () {
						if (timer < 50) {
							windowHeight = Math.round(windowHeight - scrollPerSec);
							$window.scrollTo(0, windowHeight);
							timer++;
						} else {
							$window.scrollTo(0, 0);
							clearInterval(sInterval);
						}
					}, 0);
				})
			}
		};
	});
