(function() {
	function timer($interval) {
		
		return {
			templateUrl: '/templates/directives/timer.html',
			replace: true,
			restrict: 'E',
			scope: { },
			link: function (scope, interval, element, attrs){
			scope.remainingTime = 60;
			scope.mainButtonLabel = "Start";
			var interval = null;
	
			var tick = function() {
				scope.remainingTime--;
			};
	
			scope.start = function() {
				if (interval === null){
    		interval = $interval(tick, 1000);
				scope.mainButtonLabel = "Reset";
				scope.running = true;
				} else {
					$interval.cancel(interval);
					interval = null;
					scope.mainButtonLabel = "Start";
					scope.remainingTime = 60;
					scope.running = false;
					}		
				};
			}
		};
	}
	angular
		.module('blocTime')
		.directive('timer', ['$interval', timer]);
})();																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
