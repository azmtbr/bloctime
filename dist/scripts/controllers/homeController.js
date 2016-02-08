(function() {
	function homeController($scope, Tasks) {
		$scope.title = "Timer";
		$scope.titleFollower = "di Pomodoro";

		$scope.taskAddButton = "Add";

		$scope.tasks = Tasks.all;

    $scope.addTask = function () {
      Tasks.all.$add({
         task: $scope.task,
				 created_at: Date.now(),
       });
       $scope.task = null;
		 };

		$scope.removeTask = function (task) {
			$scope.tasks.$remove(task);
			if ($scope.autoRemove = true) {
			$scope.$broadcast('taskRemoved')
			}
		};

		$scope.changeAutoRemove = function() {
			if ($scope.autoRemove = true) {
				$scope.autoRemove = false;
			} else {
				$scope.autoRemove = true;
			}
		};
}


	angular
		.module('blocTime')
		.controller('homeController', ['$scope', 'Tasks', homeController]);
})();
