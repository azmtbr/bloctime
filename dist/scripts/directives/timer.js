(function() {
	function timer() {
		
		return {
			templateUrl: '/templates/directives/timer.html',
			replace: true,
			restrict: 'E',
			scope: { },
			link: function (scope, $interval, element, attrs){
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
				} else {
					$interval.cancel(interval);
					interval = null;
					scope.mainButtonLabel = "Start";
					scope.remainingTime = 60;
					}		
				};
			}
		};
	}
	angular
		.module('blocTime')
		.directive('timer', timer);
})();																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
																		 
