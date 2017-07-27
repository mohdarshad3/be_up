
/*global token */
angular.module('Admin').controller('therapistCtrl', function ($scope,$modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout,$stateParams,$confirm,therapistService,therapistService,toastr,Reddit) {


    $scope.fromData = {};
    $scope.Data = {};
    $scope.user = {};
    var selectedCheckbox = [];
    $scope.results = {};
    $scope.currentPage = 1;
    $scope.appName = CONFIG.appName;
    $scope.userType = CONFIG.userType;
    $scope.adminLoggedIn = false;
    $scope.loginUserName = $localStorage.loginUserName;
    $scope.role = $localStorage.role;
    $scope.profilePic = $localStorage.image;
    $scope.imageUrl = CONFIG.imageUrl;
    $scope.userData = {};





    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function () {
        $scope.itemsPerPage = CONFIG.limit;
        $scope.currentPage = 1;  //reset to first paghe
    };




    $scope.address = function () {

        if ($scope.fromData.address.formatted_address == '' ||  $scope.fromData.address.formatted_address == undefined)
            $scope.fromData.address = '';
    };



    $scope.addTherapist = function (valid) {

        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        if($scope.fromData.address.geometry != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.country = $scope.fromData.address;
            $scope.fromData.address = $scope.fromData.address.formatted_address;


        }


        therapistService.addTherapist($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Follow instructions in email to activate your account', 'Success');
                $state.go('therapist-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.getTherapistList = function () {
        therapistService.getTherapist($scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.reddit = new Reddit();














});

