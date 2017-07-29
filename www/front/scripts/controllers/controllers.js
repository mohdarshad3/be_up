var Front = angular.module('Front');
/*-------------Home Header Ctrl----------*/
Front.controller('HomeheaderCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage) {
	$scope.scrolldowndiv=function(divid){
		$fromtop=(angular.element('#'+divid).position().top);
		$fromtop=(divid=='who-we-are')?($fromtop-100):$fromtop;
		angular.element('body,html').animate({ scrollTop: $fromtop }, 800);
	}
});
/*-------------Home Ctrl----------*/
Front.controller('HomeCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, userService, toastr, Reddit, messageBoardService) {
	$rootScope.headerurl=($location.path()=='' || $location.path()=='/home')?'front/directives/homeheader.html':'front/directives/header.html';
	
});
/*-------------Login Ctrl----------*/
Front.controller('LoginCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, userService, toastr, Reddit, messageBoardService) {
	$rootScope.headerurl=($location.path()=='' || $location.path()=='/home')?'front/directives/homeheader.html':'front/directives/header.html';
});
/*-------------Register Ctrl----------*/
Front.controller('RegisterCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, userService, toastr, Reddit, messageBoardService) {
	$rootScope.headerurl=($location.path()=='' || $location.path()=='/home')?'front/directives/homeheader.html':'front/directives/header.html';
});
/*-------------Reset Password Ctrl----------*/
Front.controller('ResetPasswordCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, userService, toastr, Reddit, messageBoardService) {
	$rootScope.headerurl=($location.path()=='' || $location.path()=='/home')?'front/directives/homeheader.html':'front/directives/header.html';
});
/*-------------Team Ctrl----------*/
Front.controller('TeamCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, userService, toastr, Reddit, messageBoardService) {
	$rootScope.headerurl=($location.path()=='' || $location.path()=='/home')?'front/directives/homeheader.html':'front/directives/header.html';
});
/*------------WhoWeAreCtrl---------*/
Front.controller('WhoWeAreCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, userService, toastr, Reddit, messageBoardService) {
	$rootScope.headerurl=($location.path()=='' || $location.path()=='/home')?'front/directives/homeheader.html':'front/directives/header.html';
});


