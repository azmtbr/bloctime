(function() {
	function timer(TIMER, $interval) {

		return {
			templateUrl: '/templates/directives/timer.html',
			replace: true,
			restrict: 'E',
			scope: { },
			link: function (scope, interval, element, attrs){
			scope.remainingWorkTime = TIMER.WORK;
			scope.remainingBreakTime = TIMER.BREAK;
			scope.workButtonLabel = "Start Work";
			scope.breakButtonLabel = "Start Break";
			scope.onBreak = true;
			var interval = null;

			var tickWork = function() {
				if (scope.remainingWorkTime > 0) {
						scope.remainingWorkTime--;
						scope.workButtonLabel = "Reset";
						scope.running = true;
						scope.onBreak = false;
					} else {
						scope.onBreak = true;
						scope.breakButtonLabel = "Start Break";
						scope.remainingBreakTime = TIMER.BREAK;
						scope.running = false;
					}
			};

			var tickBreak = function() {
				if (scope.remainingBreakTime > 0) {
						scope.remainingBreakTime--;
						scope.breakButtonLabel = "Reset";
						scope.running = true;
						scope.onBreak = true;
					} else {
						scope.onBreak = false;
						scope.workButtonLabel = "Start Work";
						scope.remainingWorkTime = TIMER.WORK;
						scope.running = false;
					}
			};

			scope.startWork = function() {

						if (scope.workButtonLabel === "Start Work"){
							interval = $interval(tickWork, 1000);
						} else {
							$interval.cancel(interval);
							interval = null;
							scope.workButtonLabel = "Start Work";
							scope.remainingWorkTime = TIMER.WORK;
							scope.running = false;
							}
						};



			scope.startBreak = function() {

						if (scope.breakButtonLabel === "Start Break"){
							interval = $interval(tickBreak, 1000);
						} else {
							$interval.cancel(interval);
							interval = null;
							scope.breakButtonLabel = "Start Break";
							scope.remainingBreakTime = TIMER.BREAK;
							scope.running = false;
							}
						};

			 }
		};
	}
angular
		.module('blocTime')
		.directive('timer', ['TIMER', '$interval', timer]);
})();
