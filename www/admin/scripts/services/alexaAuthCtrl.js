angular.module('Admin').controller('alexaAuthCtrl', function ($scope, toastr, $localStorage, $rootScope, $location, $state, $stateParams, dataService, AUTH_EVENTS) {
  $scope.userLoggedIn = false;
  $scope.fromData = {};
  $scope.doLogin = function () {
    dataService.alexaAuthlogin($scope.fromData, function (err, data) {
      if (!err) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $state.go('admin-dashboard');
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };
 
});