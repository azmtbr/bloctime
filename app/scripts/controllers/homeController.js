(function() {
	function homeController($scope, Tasks) {
		$scope.title = "Timer";
		$scope.titleFollower = "di Pomodoro";

		$scope.taskButtonLabel = "Add New Task";


		$scope.tasks = Tasks.all;

    $scope.addTask = function () {
      Tasks.all.$add({
         task: $scope.task

       });

       $scope.task = null;

    };
	}

	angular
		.module('blocTime')
		.controller('homeController', ['$scope', 'Tasks', homeController]);
})();
