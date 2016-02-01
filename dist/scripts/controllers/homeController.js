(function() {
	function homeController($scope) {
		$scope.title = "Timer";
		$scope.titleFollower = "di Pomodoro";
	}

	angular
		.module('blocTime')
		.controller('homeController', homeController);
})();
