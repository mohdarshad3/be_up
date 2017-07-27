angular.module('Admin').controller('authCtrl', function ($scope, toastr, $localStorage, $rootScope, $location, $state,CONFIG, $stateParams, dataService, AUTH_EVENTS) {
  $scope.fromData = {};
  $scope.appName = CONFIG.appName;
  $scope.doLogin = function () {
    dataService.login($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Logged in successfully.', 'Success');
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




  $scope.doSignUp = function (valid) {
    if (!valid) {
      toastr.error('Invalid Form Data', 'Error');
      return false;
    }
    console.log($scope.fromData);
    dataService.userSignUp($scope.fromData, function (err, data) {
      if (!err) {
        toastr.success('Follow instructions in email to activate your account', 'Success');
        $state.go('admin-login');
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