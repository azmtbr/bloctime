(function () {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
		});
		
		$stateProvider
			.state('home', {
				url: '/home',
				controller: 'homeController as home',
				templateUrl: '/templates/home.html'
			});
	}
	
	
	angular
		.module('blocTime', ['ui.router', 'firebase'])
		.config(config);
})();
