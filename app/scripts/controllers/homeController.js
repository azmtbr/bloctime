(function() {
	function homeController($scope) {
		$scope.title = "Timer";
		$scope.titleFollower = "de Pomodoro";
	}
	
	angular
		.module('blocTime')
		.controller('homeController', homeController);
})();