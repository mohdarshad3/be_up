angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null;
};
angular.module('Front').config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, CONFIG) {
    $httpProvider.interceptors.push('httpInterceptor');
    $urlRouterProvider.otherwise('/front-dashboard');
    //$locationProvider.html5Mode(false);
    $stateProvider.state('otp-confirm', {
        url: '/otp-confirm/:userId',
        templateUrl: CONFIG.baseUrl + 'views/front/user/otp-confirm.html',
        controller: 'userCtrl',
        data: {freeRoute: true}
    }).state('front-login', {
        url: '/front',
        templateUrl: CONFIG.baseUrl + 'front/views/user/login.html',
        controller: 'userCtrl',
        data: {freeRoute: true}
    }).state('front-forgot-password', {
        url: '/front-forgot-password',
        templateUrl: CONFIG.baseUrl + 'front/views/user/forgot-password.html',
        controller: 'userCtrl',
        data: {freeRoute: true}
    }).state('front-user-signup', {
        url: '/front-user-signup',
        templateUrl: CONFIG.baseUrl + 'front/views/user/signup.html',
        controller: 'userCtrl',
        data: {freeRoute: true}
    }).state('front-dashboard', {
        url: '/front-dashboard',
        templateUrl: CONFIG.baseUrl + 'front/views/user/dashboard.html',
        controller: 'userCtrl',
        data: {authenticatedRoute: true}
    }).state('user-forgot-password', {
        url: '/user-forgot-password',
        templateUrl: 'front/views/user/forgot-password.html',
        controller: 'userCtrl',
        data: {freeRoute: true}
    }).state('reset-password', {
        url: '/reset-password/:userId',
        templateUrl: CONFIG.baseUrl + 'front/views/user/reset-password.html',
        controller: 'userCtrl',
        data: {freeRoute: true}
    }).state('activate-account', {
        url: '/activate-account/:activateId',
        controller: 'userCtrl',
        data: {freeRoute: true}
    }).state('user-profile', {
            url: '/user-profile',
            templateUrl: 'front/views/user/profile.html',
            controller: 'userCtrl',
            data: {authenticatedRoute: true}
        }).state('product-edit', {
        url: '/product-edit/:productId',
        templateUrl: 'front/views/product/edit.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
       }).state('product-add', {
            url: '/product-add',
            templateUrl: 'front/views/product/add.html',
            controller: 'productCategoryCtrl',
            data: {authenticatedRoute: true}
        }).state('product-add-images', {
        url: '/product-add-images/:productId',
        templateUrl: 'front/views/product/add-product-images.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('product-update-images', {
        url: '/product-update-images/:productId',
        templateUrl: 'front/views/product/update-product-images.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('service-add', {
        url: '/service-add',
        templateUrl: 'front/views/service/add.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('service-edit', {
        url: '/service-edit/:serviceId',
        templateUrl: 'front/views/service/edit.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('service-update-images', {
        url: '/service-update-images/:serviceId',
        templateUrl: 'front/views/service/update-service-images.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('service-add-images', {
        url: '/service-add-images/:serviceId',
        templateUrl: 'front/views/service/add-service-images.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('user-products', {
            url: '/user-product',
            templateUrl: 'front/views/product/products.html',
            controller: 'productCategoryCtrl',
            data: {authenticatedRoute: true}
        }).state('user-services', {
        url: '/user-services',
        templateUrl: 'front/views/service/services.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('product-search', {
        url: '/product-search/:userName',
        templateUrl: 'front/views/product/product-search.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('product-detail', {
        url: '/product-detail/:productId',
        templateUrl: 'front/views/product/detail.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
        }).state('other-products', {
        url: '/other-products/:userId',
        templateUrl: 'front/views/product/other-products.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('other-services', {
        url: '/other-services/:userId',
        templateUrl: 'front/views/service/other-services.html',
        controller: 'productCategoryCtrl',
        data: {authenticatedRoute: true}
    }).state('user-private-timeline', {
            url: '/user-private-timeline',
            templateUrl: 'front/views/user/private-timeline.html',
            controller: 'userTimeLineCtrl',
            data: {authenticatedRoute: true}
        }).state('user-general-timeline', {
        url: '/user-general-timeline',
        templateUrl: 'front/views/user/general-timeline.html',
        controller: 'userTimeLineCtrl',
        data: {authenticatedRoute: true}
    }).state('other-general-timeline', {
        url: '/other-general-timeline/:userId',
        templateUrl: 'front/views/user/other-general-timeline.html',
        controller: 'userTimeLineCtrl',
        data: {authenticatedRoute: true}
    })
        .state('geographical-search', {
            url: '/geographical-search',
            templateUrl: 'front/views/user/geographical-search.html',
            controller: 'userCtrl',
            data: {authenticatedRoute: true}
        }).state('user-details', {
            url: '/user-details',
            abstract: true,
            templateUrl: 'front/views/user/user-details.html',
            controller: 'userCtrl',
            data: {authenticatedRoute: true}
        }).state('user-details.edit-profile', {
            url: '/edit-profile',
            views: {
                details: {
                    templateUrl: 'front/views/user/user-details.edit-profile.html'
                }
            },
            data: {authenticatedRoute: true}
        }).state('search-users', {
            url: '/search-users',
            templateUrl: 'front/views/user/search-users.html',
            controller: 'messageBoardCtrl',
            data: {authenticatedRoute: true}
        }).state('user-dashboard', {
            url: '/user-dashboard/:userId',
            templateUrl: CONFIG.baseUrl + 'front/views/user/user-dashboard.html',
            controller: 'otherUserCtrl',
            data: {authenticatedRoute: true}
        }).state('message-board', {
            url: '/message-board/:composeId',
            abstract: true,
            controller: 'messageBoardCtrl',
            templateUrl: 'front/views/message-board/message-board.html',
            data: {authenticatedRoute: true}
        }).state('message-board.details', {
            url: '/message-board.details/:messageId/:type',
            views: {
                details: {
                    templateUrl: 'front/views/message-board/message-board.details.html'
                }
            },
            controller: 'messageCtrl',
            data: {authenticatedRoute: true}
        }).state('message-board.compose', {
            url: '/message-board.compose',
            views: {
                details: {
                    templateUrl: 'front/views/message-board/message-board.compose.html'
                }
            },
            controller: 'messageBoardCtrl',
            data: {authenticatedRoute: true}
        }).state('followers', {
            url: '/followers',
            templateUrl: 'front/views/user/followers.html',
            controller: 'userCtrl',
            data: {authenticatedRoute: true}
        }).state('following', {
            url: '/following',
            templateUrl: 'front/views/user/following.html',
            controller: 'userCtrl',
            data: {authenticatedRoute: true}
        }).state('user-followers', {
            url: '/user-followers/:userId',
            templateUrl: 'front/views/user/user-followers.html',
            controller: 'otherUserCtrl',
            data: {authenticatedRoute: true}
        }).state('user-following', {
            url: '/user-following/:userId',
            templateUrl: 'front/views/user/user-following.html',
            controller: 'otherUserCtrl',
            data: {authenticatedRoute: true}
        });


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
