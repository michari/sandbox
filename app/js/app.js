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

				.when('/promises' , {
					templateUrl: 'views/promise.html',
					controller: 'spromiseCtrl'
				})

				.when('/directives' , {
					templateUrl: 'views/directive.html',
					controller: 'DirectiveCtrl'
				})

				.otherwise('/controllers')
				;

		})

		.controller('page1Ctrl', function($scope, VERSION) {

				$scope.version = VERSION;	
		})

		.controller('Ctrl1', function($scope, API_BASE_ENDPOINT, sharedValue, hey) {

				$scope.person = { 'name' : 'Manto'};
				$scope.endpoint = API_BASE_ENDPOINT;
				$scope.shared = sharedValue;

				console.log(hey.sayhello);
		})





		.controller('serviceCtrl', function($scope, API_BASE_ENDPOINT, sharedValue, hey, widget, utilSvc, newRand) {

				$scope.serviceName = 'New Service';
				this.endpoint = API_BASE_ENDPOINT;
				this.val = sharedValue.foo;
				this.shared = sharedValue;

				console.log(hey.sayhello);

				console.log(widget.add(10));

				this.randomVal = Math.floor(Math.random() * 100);

				console.log(this.randomVal);

				console.log(utilSvc.add(20));

				this.rand = function() {
					//this.randomVal = Math.floor(Math.random() * 100);
					this.randomVal = newRand.generate();
				};

		})

		.factory('newRand', function() {
			
			return {
				generate: function () {
					console.log("New Rand");
					return Math.floor(Math.random() * 100);
				}
			};
		})

		.constant('VERSION', '1.0.1')

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

		.service('utilSvc', function (widget) { // another way to call the util, but its not populare one
			this.add = function (val) {
				return val + 10;
			}
		})

		.factory('widget', function(hey) { // you can make factory as function and also inject here

			console.log(hey.sayhello);

			return {
				add: function(val) {
					console.log('input value: ' + val);
					return val + 10;	
				}
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


		.controller('DirectiveCtrl', function($scope) {
				$scope.address = {};
				$scope.address.street = '9015 S Yosemite St';
				$scope.isEditing = true;
		})


		.directive('usAddress', function () {

			function dialNumber(phone) {
				console.log('Dialing..... ' + phone);
			};

			return {
				templateUrl: 'views/us-address.html',
				transclude: true,
				scope: {
					abcAddress: '=', //Two way binding
					readonly: '='
				},

				controller: function($scope) {
					// Inline Functions	
					//$scope.dialNumber = function() {
					//	console.log('Dialing..... ' + $scope.abcAddress.phone);
					//}
					$scope.dialNumber = dialNumber;
					$scope.checkNumber = function () {
						console.log('Checking..... ' + $scope.abcAddress.phone);
						return !isNaN($scope.abcAddress.phone);
					};
				} 


			};
		})




		.controller('spromiseCtrl', function($scope, $http, $interval, $timeout, $q, $log) {
			
			$timeout (function () {
				console.log('this is a timeout after 3 sec...')	
			}, 3000);

			var t = $timeout(function () {}, 3000); 
			
			t.then (
					function () {
						console.log('this is a timeout after 3 sec from a Promise...');	
					}
				 );

			var p = $interval(function() {}, 1000, 5);

			p.then (
				//success or just null
				function() {
					console.log("I am done waiting 5 times.... ");
				},

				//error	
				function() {},

				//notification
				function() {
					console.log("checking.... callback");
				}	

			);

			p.then ( null, null, function() {
						console.log("a different checker.... callback");
					})
			
			// This is normal $http without promises

			// $http.get('data/customers.json')
				
			// 	.success(function (data) {
			// 		console.log(data + ' ');						
			// 	})

			// 	.error(function () {
			// 		console.log('error happened');
			// 	}) 	

			var h = $http.get('data/customers.json');

			h.then (
				function (response) {
					console.log('My Response ' + response);
				},
				
				function (err) {
					console.log('Some Error ' + err);	
				},

				function () {

				}
			)

			// Having everthing in one promise
			var allP = $q.all([p, t, h]);

			allP.then (
				function() {
					console.log("All Promise Success!");
				},

				function() {
					console.log("All Promise Failed!");
				}
			);

			console.log('Aftet setting up all the code for HTTP get!!!');

			// This is custom Promises

			var deferred = $q.defer();

			var newP = deferred.promise;

			newP.then(
				function(msg) {
					$log.info('success form in custom promise');
					return {foo : "bar"};
				},

				function(reason) {
					$log.error('failure form in custom promise');
				},

				function(error) {
					$log.warn('failure form in custom promise');
				}

				);

			newP.catch( function() {
				$log.error('This is my catch block');
			});

			newP.finally(function () {
				$log.info('This is my finally block');
			});

			$scope.res = function() {
				deferred.resolve('Reslove');
			};

			$scope.rej = function() {
				deferred.reject('Reject');
			};

			$scope.not = function() {
				deferred.notify('Notify');
			};


		})


		;

}) ();