;(function () {

	'use strict'

	angular
		.module('sandboxApp', [ 'ngRoute'])
		.config(function ($routeProvider, API_BASE_ENDPOINT) { // you can inject only provider and constants

			$routeProvider
				
				.when('/controllers', {
					// template: '<div>hello....</div>'
					templateUrl: 'views/page1.html',
					controller: 'page1Ctrl'
				})

				.when('/watches', {
					// template: '<div>hello....</div>'
					templateUrl: 'views/watches.html',
					controller: 'WatchCtrl'
				})

				.when('/services' , {
					templateUrl: 'views/service.html',
					controller: 'serviceCtrl as vm'
				})

				.otherwise('/controllers')
				;

		})

		.controller('page1Ctrl', function($scope) {

				//$scope.name = 'Manto';	
		})

		.controller('Ctrl1', function($scope, API_BASE_ENDPOINT, sharedValue, hey) {

				$scope.person = { 'name' : 'Manto'};
				$scope.endpoint = API_BASE_ENDPOINT;
				$scope.shared = sharedValue;

				console.log(hey.sayhello);
		})

		.controller('serviceCtrl', function($scope, API_BASE_ENDPOINT, sharedValue, hey, add10Widget) {

				$scope.serviceName = 'New Service';
				this.endpoint = API_BASE_ENDPOINT;
				this.val = sharedValue.foo;
				this.shared = sharedValue;

				console.log(hey.sayhello);

				console.log(add10Widget(10));

		})

		.constant('API_BASE_ENDPOINT', 'http://example.com/') // a constant, this you can use in config too.

		.value('sharedValue', { // add a global to value and it can be injected anywhere.
			foo : 123
		})

		.factory('hey', function() { // factory to return something

			console.log('I am in Hey Function..!!!');
			return {
				sayhello : 'Hello Again!!'	
			};
		})

		.factory('add10Widget', function(hey) { // you can make factory as function and also inject here

			console.log(hey.sayhello);

			return function(val) {
				return val + 10;	
			};
		})


		.controller('WatchCtrl', function($scope) {
				$scope.person = { 'name' : 'Manto'};

				$scope.dog = {};
				$scope.dog.name = 'mickey';

				$scope.$watch('person.name + dog.name', 
					function(newVal, oldVal) {
					console.log('Persons name want from ' + oldVal + ' to ' + newVal);
				});
		})
		;

}) ();