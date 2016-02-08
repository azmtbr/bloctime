(function() {
	function homeController($scope, Tasks) {
		$scope.title = "Timer";
		$scope.titleFollower = "di Pomodoro";

		$scope.taskAddButton = "Add New Task";
		$scope.taskRemoveButton = "Remove Task";


		$scope.tasks = Tasks.all;
		$scope.sessionsPerTask = 0;
		// $scope.removed = false;

    $scope.addTask = function () {
      Tasks.all.$add({
         task: $scope.task,
				 created_at: Date.now(),
				 session_count: $scope.sessionsPerTask
       });
       $scope.task = null;
			 $scope.sessionsPerTask = 0;
    };

		$scope.removeTask = function (task) {
			$scope.tasks.$remove(task);
			// $scope.removed = true;
		};

		//session counter


}


	angular
		.module('blocTime')
		.controller('homeController', ['$scope', 'Tasks', homeController]);
})();
