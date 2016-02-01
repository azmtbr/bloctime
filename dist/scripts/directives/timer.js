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
			scope.resetButtonLabel = "Reset Timer";
			scope.onBreak = false;

			var interval = null;

			var tickWork = function() {

				if (scope.remainingWorkTime > 0) {
						scope.remainingWorkTime--;
					} else {
						resetTimer();
						scope.onBreak = true;
						scope.breakButtonLabel = "Start Break";
						scope.remainingBreakTime = TIMER.BREAK;
					}

					scope.running = scope.isRunning();

			};

			var tickBreak = function() {

				if (scope.remainingBreakTime > 0) {
						scope.remainingBreakTime--;
					} else {
						resetTimer();
						scope.onBreak = false;
						scope.workButtonLabel = "Start Work";
						scope.remainingWorkTime = TIMER.WORK;
					}

					scope.running = scope.isRunning();

			};

			scope.isRunning = function(){
				return interval !== null;
			};

			var resetTimer = function() {
				$interval.cancel(interval);
				interval = null;
				scope.running = scope.isRunning();
			};

			scope.startWork = function() {

						if (!scope.isRunning()){
							interval = $interval(tickWork, 1000);
							scope.onBreak = false;
						} else {
							resetTimer();
							scope.workButtonLabel = "Start Work";
							scope.remainingWorkTime = TIMER.WORK;
							}
							tickWork();
						};



			scope.startBreak = function() {

						if (!scope.isRunning()){
							interval = $interval(tickBreak, 1000);
							scope.onBreak = true;
						} else {
							resetTimer();
							scope.breakButtonLabel = "Start Break";
							scope.remainingBreakTime = TIMER.BREAK;
							}
							tickBreak();
						};
			 	}
		};
	}
angular
		.module('blocTime')
		.directive('timer', ['TIMER', '$interval', timer]);
})();
