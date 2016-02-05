(function() {
	function homeController($scope, Tasks) {
		$scope.title = "Timer";
		$scope.titleFollower = "di Pomodoro";

		$scope.taskAddButton = "Add New Task";
		$scope.taskRemoveButton = "Remove Task";


		$scope.tasks = Tasks.all;
		$scope.sessionsPerTask = 0;

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
		};

		//session counter

		$scope.addSessionNumber = function (session_count) {
			$scope.sessionsPerTask++;
		};

		$scope.subtractSessionNumber = function (session_count) {
			$scope.sessionsPerTask--;
			if ($scope.sessionsPerTask < 0) {
				$scope.sessionsPerTask = 0;
			}
		};
}


	angular
		.module('blocTime')
		.controller('homeController', ['$scope', 'Tasks', homeController]);
})();
