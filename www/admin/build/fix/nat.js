angular.module('myApp.constants', []).constant('CONFIG', {
  appName: 'Sample MEAN',
  appTitle: '...',
  limit: 20,
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
angular.module('Admin', [
  'ui.router',
  'ngResource',
  'myApp.constants',
  'ngStorage',
  'ngMessages',
  'toastr',
  'ui.bootstrap',
  'angular-confirm',
  'ngFileUpload',
  'ngQuill'  //'ui.bootstrap.datetimepicker'
             //'myApp.controllers', 'myApp.directives', 'myApp.filters', 'myApp.constants', 'myApp.services'
]);
//main
angular.isUndefinedOrNull = function (val) {
  return angular.isUndefined(val) || val === null;
};
angular.module('Admin').config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, ngQuillConfigProvider, CONFIG) {
  ngQuillConfigProvider.set([
    {
      alias: '10',
      size: '10px'
    },
    {
      alias: '12',
      size: '12px'
    },
    {
      alias: '14',
      size: '14px'
    },
    {
      alias: '16',
      size: '16px'
    },
    {
      alias: '18',
      size: '18px'
    },
    {
      alias: '20',
      size: '20px'
    },
    {
      alias: '22',
      size: '22px'
    },
    {
      alias: '24',
      size: '24px'
    }
  ], [
    {
      label: 'Arial',
      alias: 'Arial'
    },
    {
      label: 'Sans Serif',
      alias: 'sans-serif'
    },
    {
      label: 'Serif',
      alias: 'serif'
    },
    {
      label: 'Monospace',
      alias: 'monospace'
    },
    {
      label: 'Trebuchet MS',
      alias: '"Trebuchet MS"'
    },
    {
      label: 'Verdana',
      alias: 'Verdana'
    }
  ]);
  $httpProvider.interceptors.push('httpInterceptor');
  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/admin');
  $stateProvider.state('admin-login', {
    url: '/admin',
    templateUrl: 'views/admin/admin/login.html',
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
        }
      } else {
      }
    }
  });
});
angular.module('Admin').factory('httpInterceptor', function ($q, $location, $localStorage) {
  //console.log($location);
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($localStorage.token) {
        config.headers.Authorization = $localStorage.token;
      }
      return config;  //console.log("Request via Interceptor !!");
                      //console.log(config.url); // Contains the data about the request before it is sent.
                      //return config || $q.when(config); // Return the config or wrap it in a promise if blank.
    },
    requestError: function (rejection) {
      //console.log(rejection); // Contains the data about the error on the request.
      return $q.reject(rejection);  // Return the promise rejection.
    },
    response: function (response) {
      //console.log(response); // Contains the data from the response.
      return response || $q.when(response);  // Return the response or promise.
    },
    responseError: function (rejection) {
      if (rejection.status === 401 || rejection.status === 403) {
        //Login Authentication
        $location.path('/login');
      }
      if (rejection.status === 404) {
        // Not found
        $location.path('/');
      }
      return $q.reject(rejection);  //                if (rejection.status === 0) {
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
    signUp: function (data, callback) {
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
    getAdmin: function (page, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/getAdminList/' + page
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    editAdmin: function (id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/edit'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    updateAdmin: function (data, callback) {
      Upload.upload({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/upload',
        //webAPI exposed to upload the file
        data: data  //pass file as data, should be user ng-model
      }).success(function (result) {
        //upload function returns a promise
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deleteAdmin: function (id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/delete'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deleteMulti: function (ids, callback) {
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
    multiStatusChange: function (ids, status, callback) {
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
    changeStatusAdmin: function (id, status, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/statusChange/' + status
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getEmailConfigDetail: function (callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/emailConfigDetail'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    updateEmailConfigDetail: function (data, callback) {
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
    login: function (data, callback) {
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
    checkAuthStatus: function (callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/authenticate'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    forgotPassword: function (formData, callback) {
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
    verifyToken: function (token, callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/verifyForgotToken/' + token
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(err);
      });
    },
    changePassword: function (formData, callback) {
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
    logout: function () {
      delete $localStorage.token;
    },
    isAuthenticated: function () {
      return $localStorage.token === '' || $localStorage.token === undefined ? false : true;
    },
    getToken: function () {
      return $localStorage.token;
    }
  };
});
angular.module('Admin').service('pageService', function ($http, $q, $localStorage, Upload, CONFIG) {
  return {
    addPage: function (data, callback) {
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
    getPage: function (page, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/getPagesList/' + page
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    editPage: function (id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/editPage'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    updatePage: function (data, callback) {
      Upload.upload({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/updatePage',
        //webAPI exposed to upload the file
        data: data  //pass file as data, should be user ng-model
      }).success(function (result) {
        //upload function returns a promise
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deletePage: function (id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/deletePage'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deleteMultiPage: function (ids, callback) {
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
    multiStatusChange: function (ids, status, callback) {
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
    changeStatusAdmin: function (id, status, callback) {
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
angular.module('Admin').controller('adminCtrl', function ($scope, toastr, $state, adminService, CONFIG, $stateParams, $confirm) {
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
    $scope.currentPage = 1;  //reset to first paghe
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
    if ($scope.fromData === null)
      $scope.fromData = { SMTP_status: status };
    else
      $scope.fromData.SMTP_status = status;
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
      } else
        $scope.List = data;
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
angular.module('Admin').controller('pageCtrl', function ($scope, toastr, $state, pageService, CONFIG, $stateParams, $confirm, ngQuillConfig) {
  $scope.fromData = {};
  $scope.user = {};
  var selectedCheckbox = [];
  $scope.showToolbar = true;
  $scope.translations = angular.extend({}, ngQuillConfig.translations, { 10: 'smallest' });
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
    $scope.currentPage = 1;  //reset to first paghe
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
    link: function (scope, element, attr) {
    }
  };
});
/**
 * A directive for adding google places autocomplete to a text box
 * google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places
 *
 * Usage:
 *
 * <input type="text"  ng-autocomplete ng-model="autocomplete" options="options" details="details/>
 *
 * + ng-model - autocomplete textbox value
 *
 * + details - more detailed autocomplete result, includes address parts, latlng, etc. (Optional)
 *
 * + options - configuration for the autocomplete (Optional)
 *
 *       + types: type,        String, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
 *       + bounds: bounds,     Google maps LatLngBounds Object, biases results to bounds, but may return results outside these bounds
 *       + country: country    String, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'
 *       + watchEnter:         Boolean, true; on Enter select top autocomplete result. false(default); enter ends autocomplete
 *
 * example:
 *
 *    options = {
 *        types: '(cities)',
 *        country: 'ca'
 *    }
 **/
angular.module('ngAutocomplete', []).directive('ngAutocomplete', function () {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '=',
      options: '=?'
    },
    link: function (scope, element, attrs, controller) {
      //options for autocomplete
      var opts;
      var result = '';
      var preValue = '';
      //convert options provided to opts
      var initOpts = function () {
        opts = {};
        if (scope.options) {
          if (scope.options.country) {
            opts.componentRestrictions = { country: scope.options.country };
            scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
          } else {
            scope.gPlace.setComponentRestrictions(null);
          }
        }
      };
      if (scope.gPlace === undefined) {
        scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
      }
      google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
        result = scope.gPlace.getPlace();
        if (result !== undefined) {
          if (result.address_components !== undefined) {
            preValue = element.val();
            scope.$apply(function () {
              scope.details = result;
              controller.$setViewValue({
                address: result.formatted_address,
                location: [
                  result.geometry.location.lat(),
                  result.geometry.location.lng()
                ]
              });
            });
          }
        }
      });
      element.bind('blur', function () {
        if (result !== '' && element.val() !== '') {
          result = scope.gPlace.getPlace();
          element.val(preValue);
          scope.$apply(function () {
            controller.$setViewValue({
              address: result.formatted_address,
              location: [
                result.geometry.location.lat(),
                result.geometry.location.lng()
              ]
            });
          });
        } else {
          element.val('');
          scope.$apply(function () {
            controller.$setViewValue(undefined);
          });
        }
      });
      scope.$watch(function () {
        initOpts();
      }, true);
    }
  };
});
angular.module('Admin').directive('map', function (toastr) {
  return {
    restrict: 'E',
    scope: {
      currentLocation: '=',
      destination: '=',
      distance: '=',
      time: '=',
      stopone: '=',
      stoptwo: '='
    },
    replace: true,
    template: '<div>' + '<div id="distance"></div>' + '</div>',
    link: function (scope, element, attrs) {
      var map;
      var directionsService;
      var directionsDisplay;
      function initMap() {
        map = new google.maps.Map(document.getElementById(attrs.id), {
          zoom: 5,
          center: {
            lat: 21,
            lng: 78
          }
        });
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
      }
      var Src = { location: null };
      var Dst = { location: null };
      var Stop1 = { location: null };
      var Stop2 = { location: null };
      initMap();
      function init() {
        calculateAndDisplayRoute();
      }
      function calcDistanceAndTime(response) {
        var Distance = 0;
        var Time = 0;
        for (var i = 0; i < response.routes[0].legs.length; i++) {
          Distance += response.routes[0].legs[i].distance.value;
          Time += response.routes[0].legs[i].duration.value;
        }
        scope.$apply(function () {
          scope.distance = Distance;
          scope.time = Time;
        });
        document.getElementById('distance').value = Distance;
        document.getElementById('time').value = Time;
      }
      function getDirectionWithWayPoint(waypts) {
        if (scope.currentLocation !== undefined && scope.destination !== undefined) {
          directionsService.route({
            origin: new google.maps.LatLng(scope.currentLocation.location[0], scope.currentLocation.location[1]),
            destination: new google.maps.LatLng(scope.destination.location[0], scope.destination.location[1]),
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: waypts
          }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              calcDistanceAndTime(response);
            } else {
              toastr.error('Directions request failed due to ' + status, 'Error');
              document.getElementById('start').value = '';
              document.getElementById('end').value = '';
              document.getElementById('distance').value = '';
              document.getElementById('Stop1').value = '';
              document.getElementById('Stop2').value = '';
              document.getElementById('time').value = '';
              scope.traveltime = '';
              scope.currentLocation = '';
              scope.destination = '';
              scope.distance = '';
              scope.Stop1 = '';
              scope.Stop2 = '';
              Src = { location: null };
              Dst = { location: null };
              Stop1 = { location: null };
              Stop2 = { location: null };
              directionsDisplay.setMap(map);
            }
          });
        }
      }
      function calculateAndDisplayRoute() {
        var waypts = [];
        if (scope.stopone !== undefined) {
          if (scope.stopone.location !== undefined) {
            waypts.push({
              location: scope.stopone.address,
              stopover: true
            });
          }
        }
        if (scope.stoptwo !== undefined) {
          if (scope.stoptwo.location !== undefined) {
            waypts.push({
              location: scope.stoptwo.address,
              stopover: true
            });
          }
        }
        if (scope.currentLocation !== undefined && scope.destination !== undefined) {
          if (scope.currentLocation.location !== undefined && scope.destination.location !== undefined) {
            if (scope.currentLocation.location !== Src.location || scope.destination.location !== Dst.location) {
              Src = scope.currentLocation !== undefined ? scope.currentLocation : { location: null };
              Dst = scope.destination !== undefined ? scope.destination : { location: null };
              getDirectionWithWayPoint(waypts);
            }
            if (scope.stopone !== undefined) {
              if (scope.stopone.location !== undefined) {
                if (scope.stopone.location !== Stop1.location) {
                  Stop1 = scope.stopone !== undefined ? scope.stopone : { location: null };
                  getDirectionWithWayPoint(waypts);
                }
              }
            }
            if (scope.stoptwo !== undefined) {
              if (scope.stoptwo.location !== undefined) {
                if (scope.stoptwo.location !== Stop2.location) {
                  Stop2 = scope.stoptwo !== undefined ? scope.stoptwo : { location: null };
                  getDirectionWithWayPoint(waypts);
                }
              }
            }
            if (scope.stopone === undefined && Stop1.location !== undefined) {
              Stop1 = { location: null };
              getDirectionWithWayPoint(waypts);
            }
            if (scope.stoptwo === undefined && Stop2.location !== undefined) {
              Stop2 = { location: null };
              getDirectionWithWayPoint(waypts);
            }
          }
        }
      }
      scope.$watch(function () {
        init();
      }, true);
    }
  };
});