angular.module('Admin').controller('dashboardCtrl', function ($scope, toastr, $localStorage, $rootScope, $location, $state,CONFIG, $stateParams, dataService,adminService, AUTH_EVENTS) {
  $scope.adminLoggedIn = false;
  $scope.fromData = {};
  $scope.appName = CONFIG.appName;
  $scope.currentPage = 1;






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


  $scope.getLatestUserList = function () {
    adminService.getLatestUserList($scope.currentPage, function (err, users) {
      if (!err) {

        $scope.latestUsers = users.data;
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };

  $scope.getLatestProductList = function () {
    adminService.getLatestProductList($scope.currentPage, function (err, products) {
      if (!err) {

        $scope.latestProducts = products.data;
      } else {
        toastr.error(data.message, 'Error');
      }
    });
  };










});