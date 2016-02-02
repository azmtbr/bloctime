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
		 			"WORK": 3,
		 			"BREAK": 2,
					"LONG_BREAK": 100
	 			});
})();
