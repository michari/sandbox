;(function () {

	'use strict'

	angular
		.module('sandboxApp', [ 'ngRoute'])
		.config(function ($routeProvider) { // you can inject only provider and constants

			$routeProvider
				
				.when('/controllers', {
					// template: '<div>hello....</div>'
					templateUrl: 'views/page1.html',
					controller: 'page1Ctrl'
				})

				.otherwise('/controllers')
				;

		})

		.controller('page1Ctrl', function($scope) {

				$scope.name = 'Manto';	
		})

		.controller('Ctrl1', function($scope) {

				$scope.name = 'Manto';
		})

		.controller('Ctrl2', function($scope) {

		})
		;

}) ();