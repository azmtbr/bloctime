(function () {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
		});

		$stateProvider
			.state('home', {
				url: '/',
				controller: 'homeController as home',
				templateUrl: '/templates/home.html'
			});
	}


	angular
		.module('blocTime', ['ui.router', 'firebase'])
		.config(config)
				.constant("TIMER", {
		 			"WORK": 5,
		 			"BREAK": 3,
					"LONG_BREAK": 10
	 			});
})();
