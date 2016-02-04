(function() {
	function homeController($scope, Tasks) {
		$scope.title = "Timer";
		$scope.titleFollower = "di Pomodoro";

		$scope.taskAddButton = "Add New Task";
		$scope.taskRemoveButton = "Remove Task";


		$scope.tasks = Tasks.all;

    $scope.addTask = function () {
      Tasks.all.$add({
         task: $scope.task,
				 created_at: Date.now()
       });
       $scope.task = null;
    };

		$scope.removeTask = function (task) {
			$scope.tasks.$remove(task);
		};
	}

	angular
		.module('blocTime')
		.controller('homeController', ['$scope', 'Tasks', homeController]);
})();
