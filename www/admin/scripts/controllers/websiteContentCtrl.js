angular.module('Admin').controller('websiteContentCtrl', function ($scope, toastr, $state, adminService, CONFIG, $stateParams,websiteContentService, $confirm, _) {

    $scope.fromData = {};
    $scope.user = {};
    var selectedCheckbox = [];
    $scope.results = {};
    $scope.currentPage = 1;
    $scope.appName = CONFIG.appName;
    $scope.imageUrl = CONFIG.imageUrl;
    $scope.adminType = CONFIG.adminType;




    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function () {
        $scope.itemsPerPage = CONFIG.limit;
        $scope.currentPage = 1;  //reset to first paghe
    };



    
      $scope.websiteContentDetail = function () {


          websiteContentService.websiteDetail( function (err, result) {
            if (!err) {
                $scope.fromData = result;
                $scope.fromData.oldImage = result.image;
                $scope.fromData.image=undefined;

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };

    $scope.updateContent = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        websiteContentService.updateContent($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Website Content updated Successfully', 'Success');
                $state.go('website-content');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };




});