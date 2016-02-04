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
			scope.running = false;



			var interval = null;
			var workSessions = 0;


			//Sounds
			var ding = new buzz.sound( "/assets/sounds/ding.mp3", {
				preload: true
			});

			var pop = new buzz.sound( "/assets/sounds/pop.mp3", {
				preload: true
			});

			var playDing = function() {
				ding.play();
			};

			scope.$watch('running', function (newVal, oldVal) {
				if (scope.running) {
					pop.play();
				}
			});

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

			// scope.$watch('running', function (newVal, oldVal) {
			// 	if (interval !== null) {
			// 		scope.running = true;
			// 	}
			// })

			//Timer functions
			var tickWork = function() {
				if (scope.remainingWorkTime > 0) {
						scope.remainingWorkTime--;
				}	else {
					workSessions++;
					if (scope.metSessions()) {
							scope.onLongBreak = true;
					}
					scope.onBreak = true;
					resetTimer();
				}

					scope.running = scope.isRunning();

			};

			var tickBreak = function() {
				if (scope.remainingBreakTime > 0) {
						scope.remainingBreakTime--;
					} else {
						if (scope.remainingBreakTime === 0 && scope.onLongBreak) {
							workSessions = 0;
							scope.onLongBreak = false;
						}
						scope.onBreak = false;
						resetTimer();
					}

					scope.running = scope.isRunning();

			};

			scope.metSessions = function(){
				return workSessions > 3;
			};

			scope.isRunning = function(){
				return interval !== null;
			};


			var resetTimer = function() {
				if (scope.onLongBreak) {
					scope.breakButtonLabel = "Start Break";
					scope.remainingBreakTime = TIMER.LONG_BREAK;
				} else if (scope.onBreak) {
					scope.breakButtonLabel = "Start Break";
					scope.remainingBreakTime = TIMER.BREAK;
				} else {
					scope.workButtonLabel = "Start Work";
					scope.remainingWorkTime = TIMER.WORK;
				}

				$interval.cancel(interval);
				interval = null;
				scope.running = scope.isRunning();


			};

			scope.startWork = function() {
					if (!scope.isRunning()){
						interval = $interval(tickWork, 1000);
						scope.onBreak = false;
						tickWork();
					} else {
						resetTimer();
						}
					};


			scope.startBreak = function() {
					if (!scope.isRunning()){
						interval = $interval(tickBreak, 1000);
						scope.onBreak = true;
						tickBreak();
					} else {
						resetTimer();
						}
					};
			 }
		};
	}
angular
		.module('blocTime')
		.directive('timer', ['TIMER', '$interval', timer]);
})();
