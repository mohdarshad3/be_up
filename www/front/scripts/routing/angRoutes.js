angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null;
};
angular.module('Front').config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, CONFIG) {
    $httpProvider.interceptors.push('httpInterceptor');
    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(false);
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: CONFIG.baseUrl + 'front/views/user/home.html',
        controller: 'HomeCtrl',
        data: {freeRoute: true}
    }).state('signin', {
        url: '/signin',
        templateUrl: CONFIG.baseUrl + 'front/views/user/signin.html',
        controller: 'LoginCtrl',
        data: {freeRoute: true}
    })
	.state('register', {
        url: '/register',
        templateUrl: CONFIG.baseUrl + 'front/views/user/register.html',
        controller: 'RegisterCtrl',
        data: {freeRoute: true}
    })
	.state('reset-password', {
        url: '/reset-password',
        templateUrl: CONFIG.baseUrl + 'front/views/user/reset-password.html',
        controller: 'ResetPasswordCtrl'
    })
	.state('team', {
        url: '/team',
        templateUrl: CONFIG.baseUrl + 'front/views/user/team.html',
        controller: 'TeamCtrl'
    })
	.state('who-we-are', {
        url: '/who-we-are',
        templateUrl: CONFIG.baseUrl + 'front/views/user/who-we-are.html',
        controller: 'WhoWeAreCtrl'
    })
}).run(function ($location,$rootScope, $state, $stateParams, AUTH_EVENTS, dataService) {
	$rootScope.headerurl=($location.path()=='' || $location.path()=='/home')?'front/directives/homeheader.html':'front/directives/header.html';
    $rootScope.isActive = function (stateName) {
        return $state.includes(stateName);
    };
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        /* var isAuthenticated = dataService.isAuthenticated();
        if (!angular.isUndefinedOrNull(toState.data)) {
            var isAuthAction = toState.data.authenticatedRoute === true, isFreeAction = toState.data.freeRoute === true;
            if (isAuthAction) {
                // If the route needs authentication and user is not logged in
                if (!isAuthenticated) {
                    //console.log('Authenticate URL - ' + isAuthAction + '. Token doesn\'t already exist.');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    // Navigating to Login Page
                    event.preventDefault();  // Stop the state change
                } else {
                    //console.log('Authenticate URL - ' + isAuthAction + '. Token already exist in localStorage.');
                    $rootScope.$broadcast(AUTH_EVENTS.alreadyAuthenticated);
                }
            } else if (isFreeAction) {
                if (isAuthenticated) {
                    $rootScope.$broadcast(AUTH_EVENTS.alreadyAuthenticated);
                    // Navigating to Login Page
                    event.preventDefault();  // Stop the state change
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.loggedOut);
                }
            } else {
                console.log('no params');
            }
        } */
    });
});
