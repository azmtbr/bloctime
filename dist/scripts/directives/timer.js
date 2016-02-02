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
			var workSessions = 0;

			var ding = new buzz.sound( "/assets/sounds/ding.mp3", {
				preload: true
			});

			var playDing = function() {
				ding.play();
			};

			scope.$watch('remainingWorkTime', function (newVal, oldVal) {
				if (!scope.remainingWorkTime > 0) {
					playDing();
				}
			});

			scope.$watch('remainingBreakTime', function (newVal, oldVal) {
				if (!scope.remainingBreakTime > 0) {
					playDing();
				}
			});


			var tickWork = function() {
				if (scope.remainingWorkTime > 0) {
						scope.remainingWorkTime--;
				}	else {
					// playDing();
					workSessions++;
					if (scope.metSessions()) {
							scope.onLongBreak = true;
							resetBreakTimer();
							scope.onBreak = true;
					} else {
						resetBreakTimer();
						scope.onBreak = true;
					}
				}

					scope.running = scope.isRunning();

			};

			var tickBreak = function() {
				if (scope.remainingBreakTime > 0) {
						scope.remainingBreakTime--;
					} else if (scope.remainingBreakTime === 0 && scope.onLongBreak) {
						// playDing();
						workSessions = 0;
						scope.onLongBreak = false;
						resetWorkTimer();
						scope.onBreak = false;
					} else {
						// playDing();
						resetWorkTimer();
						scope.onBreak = false;
					}

					scope.running = scope.isRunning();

			};

			scope.metSessions = function(){
				return workSessions > 3;
			};

			scope.isRunning = function(){
				return interval !== null;
			};

			var resetWorkTimer = function() {
				$interval.cancel(interval);
				interval = null;
				scope.running = scope.isRunning();
				scope.workButtonLabel = "Start Work";
				scope.remainingWorkTime = TIMER.WORK;
			};

			var resetBreakTimer = function() {
				if (scope.onLongBreak && scope.metSessions) {
					scope.remainingBreakTime = TIMER.LONG_BREAK;
				} else {
					scope.remainingBreakTime = TIMER.BREAK;
				}

				$interval.cancel(interval);
				interval = null;
				scope.running = scope.isRunning();
				scope.breakButtonLabel = "Start Break";

			};

			scope.startWork = function() {
					if (!scope.isRunning()){
						interval = $interval(tickWork, 1000);
						scope.onBreak = false;
						tickWork();
					} else {
						resetWorkTimer();
						}
					};


			scope.startBreak = function() {
					if (!scope.isRunning()){
						interval = $interval(tickBreak, 1000);
						scope.onBreak = true;
						tickBreak();
					} else {
						resetBreakTimer();
						}
					};
			 }
		};
	}
angular
		.module('blocTime')
		.directive('timer', ['TIMER', '$interval', timer]);
})();
