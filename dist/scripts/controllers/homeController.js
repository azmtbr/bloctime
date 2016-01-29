(function() {
	function homeController($scope) {
		$scope.title = "Timer";
	}
	
	angular
		.module('blocTime')
		.controller('homeController', homeController);
})();