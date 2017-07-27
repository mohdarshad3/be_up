'use strict';

angular.module('Admin', ['ui.router', 'ngResource', 'myApp.constants', 'ngStorage', 'ngMessages', 'toastr', 'ui.bootstrap', 'angular-confirm', 'ngFileUpload', 'myApp.templates', 'underscore' //'ui.bootstrap.datetimepicker'
//'myApp.controllers', 'myApp.directives', 'myApp.filters', 'myApp.constants', 'myApp.services'
]); //main

angular.module('myApp.constants', []).constant('CONFIG', {
  appName: 'Sample MEAN',
  appTitle: '...',
  limit: 20,
  //jatin
  offset: 0,
  baseUrl: 'http://localhost:1337/'
}).value('version', '1.0.0').constant('AUTH_EVENTS', {
  // Broadcast when user logs in successfully
  loginSuccess: 'auth-login-success',
  // Broadcast when user login fails
  loginFailed: 'auth-login-failed',
  // Broadcast when an authenticatedRoute is navigated to, and the user is not logged in - opens the signInModal
  notAuthenticated: 'auth-not-authenticated',
  //Broadcast when user is already authenticated and tried to access free route it would be navigated to dashboard page
  alreadyAuthenticated: 'auth-authenticated'
});
angular.isUndefinedOrNull = function (val) {
  return angular.isUndefined(val) || val === null;
};
angular.module('Admin').config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, CONFIG) {
  $httpProvider.interceptors.push('httpInterceptor');
  $urlRouterProvider.otherwise('/admin-dashboard');
  $locationProvider.html5Mode(true);
  $stateProvider.state('admin-login', {
    url: '/admin',
    templateUrl: CONFIG.baseUrl + 'views/admin/admin/login.html',
    controller: 'authCtrl',
    data: { freeRoute: true }
  }).state('admin-forgot-password', {
    url: '/admin-forgot-password',
    templateUrl: 'views/admin/admin/forgot-password.html',
    controller: 'authCtrl',
    data: { freeRoute: true }
  }).state('admin-password-reset', {
    url: '/admin-password-reset/:token',
    templateUrl: 'views/admin/admin/password-reset.html',
    controller: 'authCtrl',
    data: { freeRoute: true }
  }).state('admin-dashboard', {
    url: '/admin-dashboard',
    templateUrl: 'views/admin/admin/dashboard.html',
    controller: 'authCtrl',
    data: { authenticatedRoute: true }
  }).state('admin-list', {
    url: '/admin-list',
    templateUrl: 'views/admin/admin/sentbox.html',
    controller: 'adminCtrl',
    data: { authenticatedRoute: true }
  }).state('admin-add', {
    url: '/admin-add',
    templateUrl: 'views/admin/admin/add_bkp.html',
    controller: 'adminCtrl',
    data: { authenticatedRoute: true }
  }).state('admin-profile', {
    url: '/admin-profile',
    templateUrl: 'views/admin/admin/admin-details.profile.html',
    controller: 'authCtrl',
    data: { freeRoute: true }
  }).state('admin-edit', {
    url: '/admin/:id/edit',
    templateUrl: 'views/admin/admin/inbox.html',
    controller: 'adminCtrl',
    data: { authenticatedRoute: true }
  }).state('admin-email-config-edit', {
    url: '/admin-email-config-edit',
    templateUrl: 'views/admin/admin/admin-email-config-inbox.html',
    controller: 'adminCtrl',
    data: { authenticatedRoute: true }
  }).state('admin-page-add', {
    url: '/admin-page-add',
    templateUrl: 'views/admin/page/add-page.html',
    controller: 'pageCtrl',
    data: { authenticatedRoute: true }
  }).state('admin-page-edit', {
    url: '/admin/:id/page-edit',
    templateUrl: 'views/admin/page/edit-page.html',
    controller: 'pageCtrl',
    data: { authenticatedRoute: true }
  }).state('admin-page-list', {
    url: '/admin-page-list',
    templateUrl: 'views/admin/page/page-sentbox.html',
    controller: 'pageCtrl',
    data: { authenticatedRoute: true }
  });
}).run(function ($rootScope, $state, $stateParams, AUTH_EVENTS, dataService) {
  $rootScope.isActive = function (stateName) {
    return $state.includes(stateName);
  };
  $rootScope.$state = $state;
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var isAuthenticated = dataService.isAuthenticated();
    if (!angular.isUndefinedOrNull(toState.data)) {
      var isAuthAction = toState.data.authenticatedRoute === true,
          isFreeAction = toState.data.freeRoute === true;
      if (isAuthAction) {
        // If the route needs authentication and user is not logged in
        if (!isAuthenticated) {
          //console.log('Authenticate URL - ' + isAuthAction + '. Token doesn\'t already exist.');
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          // Navigating to Login Page
          event.preventDefault(); // Stop the state change
        } else {
            //console.log('Authenticate URL - ' + isAuthAction + '. Token already exist in localStorage.');
            $rootScope.$broadcast(AUTH_EVENTS.alreadyAuthenticated);
          }
      } else if (isFreeAction) {
        if (isAuthenticated) {
          $rootScope.$broadcast(AUTH_EVENTS.alreadyAuthenticated);
          // Navigating to Login Page
          event.preventDefault(); // Stop the state change
        }
      } else {}
    }
  });
});
angular.module('Admin').factory('httpInterceptor', function ($q, $location, $localStorage) {
  //console.log($location);
  return {
    request: function request(config) {
      config.headers = config.headers || {};
      if ($localStorage.token) {
        config.headers.Authorization = $localStorage.token;
      }
      return config; //console.log("Request via Interceptor !!");
      //console.log(config.url); // Contains the data about the request before it is sent.
      //return config || $q.when(config); // Return the config or wrap it in a promise if blank.
    },
    requestError: function requestError(rejection) {
      //console.log(rejection); // Contains the data about the error on the request.
      return $q.reject(rejection); // Return the promise rejection.
    },
    response: function response(_response) {
      //console.log(response); // Contains the data from the response.
      return _response || $q.when(_response); // Return the response or promise.
    },
    responseError: function responseError(rejection) {
      if (rejection.status === 401 || rejection.status === 403) {
        //Login Authentication
        $location.path('/login');
      }
      if (rejection.status === 404) {
        // Not found
        $location.path('/');
      }
      return $q.reject(rejection); //                if (rejection.status === 0) {
      //                    console.log("No response from server !!"); // Contains the data about the error.
      //                }
      //                    if (rejection.status === 401 && (flag === 0)) {
      //                        $location.path('/401');
      //                    }
      //                return $q.reject(rejection); // Return the promise rejection.
    }
  };
});
angular.module('Admin').service('adminService', function ($http, $q, $localStorage, Upload, CONFIG) {
  return {
    signUp: function signUp(data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/signUp',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getAdmin: function getAdmin(page, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/getAdminList/' + page
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    editAdmin: function editAdmin(id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/edit'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    updateAdmin: function updateAdmin(data, callback) {
      Upload.upload({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/upload',
        //webAPI exposed to upload the file
        data: data //pass file as data, should be user ng-model
      }).success(function (result) {
        //upload function returns a promise
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deleteAdmin: function deleteAdmin(id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/delete'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deleteMulti: function deleteMulti(ids, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/multiDelete',
        data: ids
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    multiStatusChange: function multiStatusChange(ids, status, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/multiStatusChange/' + status,
        data: ids
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    changeStatusAdmin: function changeStatusAdmin(id, status, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/statusChange/' + status
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getEmailConfigDetail: function getEmailConfigDetail(callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/emailConfigDetail'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    updateEmailConfigDetail: function updateEmailConfigDetail(data, callback) {
      $http({
        method: 'PUT',
        url: CONFIG.baseUrl + 'admin/updateEmailConfigDetail',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    }
  };
});
angular.module('Admin').service('dataService', function ($http, $q, $localStorage, CONFIG) {
  // Containers
  var _identity;
  return {
    login: function login(data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/login',
        data: data
      }).success(function (result) {
        $localStorage.token = result.token;
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    checkAuthStatus: function checkAuthStatus(callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/authenticate'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    forgotPassword: function forgotPassword(formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/forgotPassword',
        data: formData
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(err);
      });
    },
    verifyToken: function verifyToken(token, callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/verifyForgotToken/' + token
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(err);
      });
    },
    changePassword: function changePassword(formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/changePassword',
        data: formData
      }).then(function successCallback(result) {
        callback(null, result);
      }, function errorCallback(err) {
        callback(err);
      });
    },
    logout: function logout() {
      delete $localStorage.token;
    },
    isAuthenticated: function isAuthenticated() {
      return $localStorage.token === '' || $localStorage.token === undefined ? false : true;
    },
    getToken: function getToken() {
      return $localStorage.token;
    }
  };
});
angular.module('Admin').service('pageService', function ($http, $q, $localStorage, Upload, CONFIG) {
  return {
    addPage: function addPage(data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/addPage',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getPage: function getPage(page, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/getPagesList/' + page
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    editPage: function editPage(id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/editPage'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    updatePage: function updatePage(data, callback) {
      Upload.upload({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/updatePage',
        //webAPI exposed to upload the file
        data: data //pass file as data, should be user ng-model
      }).success(function (result) {
        //upload function returns a promise
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deletePage: function deletePage(id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/deletePage'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deleteMultiPage: function deleteMultiPage(ids, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/multiDeletePage',
        data: ids
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    multiStatusChange: function multiStatusChange(ids, status, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/multiStatusChangePage/' + status,
        data: ids
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    changeStatusAdmin: function changeStatusAdmin(id, status, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/statusChangePage/' + status
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    }
  };
});
angular.module('Admin').controller('adminCtrl', function ($scope, toastr, $state, adminService, CONFIG, $stateParams, $confirm, _) {
  $scope.fromData = {};
  $scope.user = {};
  var selectedCheckbox = [];
  $scope.results = {};
  $scope.doSignUp = function () {
    adminService.signUp($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Admin added Successfully', 'Success');
        $state.go('admin-list');
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.currentPage = 1;
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
  $scope.setItemsPerPage = function () {
    $scope.itemsPerPage = CONFIG.limit;
    $scope.currentPage = 1; //reset to first paghe
  };
  $scope.getAdminList = function () {
    adminService.getAdmin($scope.currentPage, function (err, data) {
      if (!err) {
        $scope.itemsPerPage = CONFIG.limit;
        $scope.totalItems = data.total;
        $scope.results = data.docs;
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.editAdmin = function () {
    $scope.id = $stateParams.id ? $stateParams.id : null;
    adminService.editAdmin($scope.id, function (err, result) {
      if (!err) {
        $scope.fromData = result.data;
      } else {
        toastr.error(result.message, 'Error');
      }
    });
  };
  $scope.delete = function (id) {
    $confirm({ text: 'Are you sure you want to delete?' }).then(function () {
      adminService.deleteAdmin(id, function (err, data) {
        if (!err) {
          toastr.success('Admin has been deleted Successfully', 'Success');
          $scope.getAdminList();
        } else {
          toastr.error(data.message, 'Error');
        }
      });
    });
  };
  $scope.statusChange = function (id, status) {
    $confirm({ text: 'Are you sure you want to change status?' }).then(function () {
      adminService.changeStatusAdmin(id, status, function (err, data) {
        if (!err) {
          toastr.success('Admin status has been changes Successfully', 'Success');
          $scope.getAdminList();
        } else {
          toastr.error(data.message, 'Error');
        }
      });
    });
  };
  $scope.updateAdmin = function () {
    adminService.updateAdmin($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Admin updated Successfully', 'Success');
        $state.go('admin-list');
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.allNeedsClicked = function () {
    var newValue = !$scope.allNeedsMet();
    _.each($scope.results, function (todo) {
      todo.id = todo._id;
      todo.done = newValue;
    });
  };
  // Returns true if and only if all todos are done.
  $scope.allNeedsMet = function () {
    selectedCheckbox = [];
    var needsMet = _.reduce($scope.results, function (memo, todo) {
      if (todo.done) {
        selectedCheckbox.push(todo._id);
      } else {
        delete selectedCheckbox[todo._id];
      }
      return memo + (todo.done ? 1 : 0);
    }, 0);
    $scope.selected = needsMet;
    return needsMet === $scope.results.length;
  };
  $scope.deleteMulti = function () {
    $confirm({ text: 'Are you sure you want to delete?' }).then(function () {
      adminService.deleteMulti(selectedCheckbox, function (err, data) {
        if (!err) {
          toastr.success('Admin deleted Successfully', 'Success');
          $scope.getAdminList();
        } else {
          toastr.error(data.message, 'Error');
        }
      });
    });
  };
  $scope.multiStatusChange = function (status) {
    $confirm({ text: 'Are you sure you want to change status?' }).then(function () {
      adminService.multiStatusChange(selectedCheckbox, status, function (err, data) {
        if (!err) {
          toastr.success('Admin status has been changes Successfully', 'Success');
          $scope.getAdminList();
        } else {
          toastr.error(data.message, 'Error');
        }
      });
    });
  };
  $scope.emailConfigDetail = function () {
    adminService.getEmailConfigDetail(function (err, result) {
      if (!err) {
        $scope.fromData = result.data;
      } else {
        toastr.error(result.message, 'Error');
      }
    });
  };
  $scope.updateEmailConfigDetail = function () {
    adminService.updateEmailConfigDetail($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Email Config Detail Updated Successfully', 'Success');
        $state.go('admin-email-config-edit');
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.toggleSwitch = function (status) {
    if ($scope.fromData === null) $scope.fromData = { SMTP_status: status };else $scope.fromData.SMTP_status = status;
  };
});
angular.module('Admin').controller('authCtrl', function ($scope, toastr, $localStorage, $rootScope, $location, $state, $stateParams, dataService, AUTH_EVENTS) {
  $scope.userLoggedIn = false;
  $scope.fromData = {};
  $scope.doLogin = function () {
    dataService.login($scope.fromData, function (err, data) {
      if (!err) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $state.go('admin-dashboard');
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.doForgotPassword = function () {
    dataService.forgotPassword($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Password reset mail has been sent successfully.', 'Success');
        $state.go('admin-login');
      } else {
        console.log(err.message);
        toastr.error(err.message, 'Error');
      }
    });
  };
  $scope.doSignUp = function () {
    console.log($scope.fromData);
    dataService.signUp($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Admin added Successfully', 'Success');
        $state.go('admin-manage');
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.adminList = function () {
    console.log('admin list');
    $scope.List = {};
    dataService.adminList(function (err, data) {
      if (err) {
        console.log(err);
        toastr.error(err.message, 'Error');
      } else $scope.List = data;
    });
  };
  $scope.adminProfile = function () {
    console.log('admin list');
    $scope.profileTab = 'active';
    $scope.editProfileTab = 'inactive';
  };
  $scope.profileTab = function () {
    $scope.profileTab = 'active';
    $scope.editProfileTab = 'inactive';
  };
  $scope.editProfileTab = function () {
    $scope.profileTab = 'inactive';
    $scope.editProfileTab = 'active';
  };
});
/*global token */
angular.module('Admin').controller('mainCtrl', function ($scope, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout) {
  $scope.appName = CONFIG.appName;
  $scope.userLoggedIn = false;
  $scope.logout = function () {
    dataService.logout();
    $scope.userLoggedIn = false;
    $state.go('admin-login');
  };
  $scope.signInSuccessful = function () {
    $scope.userLoggedIn = true;
  };
  /* Display the signInModal method */
  $scope.notLoggedIn = function () {
    $scope.userLoggedIn = false;
    $state.go('admin-login');
  };
  $scope.navigateDashboard = function () {
    $scope.userLoggedIn = true;
  };
  $rootScope.$on(AUTH_EVENTS.notAuthenticated, $scope.notLoggedIn);
  $rootScope.$on(AUTH_EVENTS.loginSuccess, $scope.signInSuccessful);
  $rootScope.$on(AUTH_EVENTS.alreadyAuthenticated, $scope.navigateDashboard);
});
angular.module('Admin').controller('pageCtrl', function ($scope, toastr, $state, pageService, CONFIG, $stateParams, $confirm, _) {
  $scope.fromData = {};
  $scope.user = {};
  var selectedCheckbox = [];
  $scope.showToolbar = true;
  $scope.toggle = function () {
    $scope.showToolbar = !$scope.showToolbar;
  };
  $scope.results = {};
  $scope.doAddPage = function () {
    pageService.addPage($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Admin added Successfully', 'Success');
        $state.go('admin-list');
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.currentPage = 1;
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
  $scope.setItemsPerPage = function () {
    $scope.itemsPerPage = CONFIG.limit;
    $scope.currentPage = 1; //reset to first paghe
  };
  $scope.getPageList = function () {
    pageService.getPage($scope.currentPage, function (err, data) {
      if (!err) {
        $scope.itemsPerPage = CONFIG.limit;
        $scope.totalItems = data.total;
        $scope.results = data.docs;
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.editPage = function () {
    $scope.id = $stateParams.id ? $stateParams.id : null;
    pageService.editPage($scope.id, function (err, result) {
      if (!err) {
        $scope.fromData = result.data;
      } else {
        toastr.error(result.message, 'Error');
      }
    });
  };
  $scope.deletePage = function (id) {
    $confirm({ text: 'Are you sure you want to delete?' }).then(function () {
      pageService.deletePage(id, function (err, data) {
        if (!err) {
          toastr.success('Admin has been deleted Successfully', 'Success');
          $scope.getAdminList();
        } else {
          toastr.error(data.message, 'Error');
        }
      });
    });
  };
  $scope.statusChangePage = function (id, status) {
    $confirm({ text: 'Are you sure you want to change status?' }).then(function () {
      pageService.changeStatusPage(id, status, function (err, data) {
        if (!err) {
          toastr.success('Admin status has been changes Successfully', 'Success');
          $scope.getAdminList();
        } else {
          toastr.error(data.message, 'Error');
        }
      });
    });
  };
  $scope.updatePage = function () {
    pageService.updatePage($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Admin updated Successfully', 'Success');
        $state.go('admin-list');
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
  $scope.allNeedsClicked = function () {
    var newValue = !$scope.allNeedsMet();
    _.each($scope.results, function (todo) {
      todo.id = todo._id;
      todo.done = newValue;
    });
  };
  // Returns true if and only if all todos are done.
  $scope.allNeedsMet = function () {
    selectedCheckbox = [];
    var needsMet = _.reduce($scope.results, function (memo, todo) {
      if (todo.done) {
        selectedCheckbox.push(todo._id);
      } else {
        delete selectedCheckbox[todo._id];
      }
      return memo + (todo.done ? 1 : 0);
    }, 0);
    $scope.selected = needsMet;
    return needsMet === $scope.results.length;
  };
  $scope.deleteMulti = function () {
    $confirm({ text: 'Are you sure you want to delete?' }).then(function () {
      pageService.deleteMultiPage(selectedCheckbox, function (err, data) {
        if (!err) {
          toastr.success('Admin deleted Successfully', 'Success');
          $scope.getAdminList();
        } else {
          toastr.error(data.message, 'Error');
        }
      });
    });
  };
  $scope.multiStatusChange = function (status) {
    $confirm({ text: 'Are you sure you want to change status?' }).then(function () {
      pageService.multiStatusChangePage(selectedCheckbox, status, function (err, data) {
        if (!err) {
          toastr.success('Admin status has been changes Successfully', 'Success');
          $scope.getAdminList();
        } else {
          toastr.error(data.message, 'Error');
        }
      });
    });
  };
});
angular.module('Admin').directive('footer', function ($state, $window, $timeout) {
  return {
    templateUrl: 'views/directives/header.html',
    replace: true,
    link: function link(scope, element, attr) {}
  };
});
//# sourceMappingURL=ES5-nat.js.map
