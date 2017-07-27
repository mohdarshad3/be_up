angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null;
};
angular.module('Admin').config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, CONFIG) {
    $httpProvider.interceptors.push('httpInterceptor');
    $urlRouterProvider.otherwise('/admin-dashboard');
    //$locationProvider.html5Mode(false);
    $stateProvider.state('admin-login', {
        url: '/user',
        templateUrl: 'views/admin/login.html',
        controller: 'authCtrl',
        data: {freeRoute: true}
    }).state('admin-signup', {
        url: '/admin-signup',
        templateUrl: 'views/admin/signup.html',
        controller: 'authCtrl',
        data: {freeRoute: true}
    }).state('otp-confirm', {
        url: '/otp-confirm/:userId',
        templateUrl: CONFIG.baseUrl + 'views/front/user/otp-confirm.html',
        controller: 'userCtrl',
        data: {freeRoute: true}
    }).state('admin-dashboard', {
        url: '/admin-dashboard',
        templateUrl: 'views/admin/dashboard.html',
        controller: 'dashboardCtrl',
        data: {authenticatedRoute: true}
    }).state('admin-list', {
        url: '/admin-list',
        templateUrl: 'views/admin/list.html',
        controller: 'adminCtrl',
        data: {authenticatedRoute: true}
    }).state('admin-add', {
        url: '/admin-add',
        templateUrl: 'views/admin/add.html',
        controller: 'adminCtrl',
        data: {authenticatedRoute: true}
    }).state('admin-edit', {
        url: '/admin/:id/edit',
        templateUrl: 'views/admin/edit.html',
        controller: 'adminCtrl',
        data: {authenticatedRoute: true}
    }).state('website-content', {
        url: '/website-content',
        templateUrl: 'views/admin/website-content.html',
        controller: 'websiteContentCtrl',
        data: {authenticatedRoute: true}
    }).state('user-list', {
        url: '/user-list',
        templateUrl: 'views/user/list.html',
        controller: 'userCtrl',
        data: {authenticatedRoute: true}
    }).state('therapist-list', {
        url: '/therapist-list',
        templateUrl: 'views/therapist/list.html',
        controller: 'userCtrl',
        data: {authenticatedRoute: true}
    }).state('user-add', {
        url: '/user-add',
        templateUrl: 'views/user/add.html',
        controller: 'userCtrl',
        data: {authenticatedRoute: true}
    }).state('user-edit', {
        url: '/user/:id/edit',
        templateUrl: 'views/user/edit.html',
        controller: 'userCtrl',
        data: {authenticatedRoute: true}
    }).state('forgot-password', {
        url: '/forgot-password',
        templateUrl: 'views/admin/forgot-password.html',
        controller: 'authCtrl',
        data: {freeRoute: true}
    }).state('product-category-list', {
        url: '/product-category-list',
        templateUrl: 'views/category/list.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('product-category-add', {
        url: '/product-category-add',
        templateUrl: 'views/category/add.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('product-category-edit', {
        url: '/category/:id/edit',
        templateUrl: 'views/category/edit.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('admin-profile', {
            url: '/admin-profile',
            abstract: true,
            templateUrl: 'views/admin/admin-details.html',
            controller: 'adminCtrl',
            data: {authenticatedRoute: true}
        }).state('admin-profile.profile', {
            url: '/profile',
            views: {
                details: {
                    templateUrl: 'views/admin/admin-details.profile.html'
                }
            },
            data: {authenticatedRoute: true}
        }).state('admin-profile.change-password', {
            url: '/change-password',
            views: {
                details: {
                    templateUrl: 'views/admin/admin-details.change-password.html'
                }
            },
            data: {authenticatedRoute: true}
        })
        .state('admin-product-list', {
            url: '/admin-product-list/:userId',
            templateUrl: 'views/product/list.html',
            controller: 'productCategoryCtrl',
            data: {authenticatedRoute: true}
        })
        .state('admin-product-add', {
            url: '/admin-product-add/:userId',
            templateUrl: 'views/product/add.html',
            controller: 'productCategoryCtrl',
            data: {authenticatedRoute: true}
        })
        .state('admin-product-edit', {
            url: '/admin-product-edit/:productId',
            templateUrl: 'views/product/edit.html',
            controller: 'productCategoryCtrl',
            data: {authenticatedRoute: true}
        }).state('admin-post-list', {
            url: '/admin-post-list/:userId',
            templateUrl: 'views/post/list.html',
            controller: 'postCtrl',
            data: {authenticatedRoute: true}
        }).state('admin-inbox-list', {
            url: '/admin-inbox-list/:userId',
            templateUrl: 'views/message/inbox.html',
            controller: 'messageCtrl',
            data: {authenticatedRoute: true}
        }).state('admin-sentbox-list', {
            url: '/admin-sentbox-list/:userId',
            templateUrl: 'views/message/sentbox.html',
            controller: 'messageCtrl',
            data: {authenticatedRoute: true}
        })





    ;


}).run(function ($rootScope, $state, $stateParams, AUTH_EVENTS, dataService) {
    $rootScope.isActive = function (stateName) {
        return $state.includes(stateName);
    };
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        var isAuthenticated = dataService.isAuthenticated();
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
        }
    });
});
