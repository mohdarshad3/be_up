/*global token */
angular.module('Admin').controller('mainCtrl', function ($scope, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout) {
  $scope.appName = CONFIG.appName;
  $scope.adminLoggedIn = false;
  $scope.loginUserName = $localStorage.loginUserName;
  $scope.role = $localStorage.role;
  $scope.profilePic = $localStorage.image;
  $scope.imageUrl = CONFIG.imageUrl;




  $scope.logout = function () {
    dataService.logout();
    $scope.adminLoggedIn = false;
    $state.go('admin-login');
  };



  $scope.signInSuccessful = function () {
    $scope.adminLoggedIn = true;
    $scope.loginUserName = $localStorage.loginUserName;
    $scope.loginTherapistName = $localStorage.loginTherapistName;
    $scope.role = $localStorage.role;
    $scope.profilePic = $localStorage.image;

  
  };
  /* Display the signInModal method */
  $scope.notLoggedIn = function () {
    $scope.adminLoggedIn = false;
    $state.go('admin-login');
  };
  $scope.navigateDashboard = function () {
    $scope.adminLoggedIn = true;
  };


  $rootScope.$on(AUTH_EVENTS.notAuthenticated, $scope.notLoggedIn);
  $rootScope.$on(AUTH_EVENTS.loginSuccess, $scope.signInSuccessful);
  $rootScope.$on(AUTH_EVENTS.alreadyAuthenticated, $scope.navigateDashboard);

 // $scope.logout();
});
