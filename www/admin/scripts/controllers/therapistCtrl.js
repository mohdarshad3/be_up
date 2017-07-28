
/*global token */
angular.module('Admin').controller('therapistCtrl', function ($scope,$modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout,$stateParams,$confirm,therapistService,therapistService,toastr,Reddit) {


    $scope.fromData = {};
    $scope.Data = {};
    $scope.user = {};
    $scope.therapist = {};
    var selectedCheckbox = [];
    $scope.results = {};
    $scope.currentPage = 1;
    $scope.appName = CONFIG.appName;
    $scope.userType = CONFIG.userType;
    $scope.adminLoggedIn = false;
    $scope.loginTherapistName = $localStorage.loginTherapistName;
    $scope.role = $localStorage.role;
    $scope.profilePic = $localStorage.image;
    $scope.imageUrl = CONFIG.imageUrl;
    $scope.therapistData = {};





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
        /*if($scope.fromData.address.geometry != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.country = $scope.fromData.address;
            $scope.fromData.address = $scope.fromData.address.formatted_address;


        }*/


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

    $scope.editTherapist = function () {



        $scope.id = $stateParams.id ? $stateParams.id : null;
        therapistService.editTherapist($scope.id, function (err, result) {
            if (!err) {
                $scope.fromData = result.data;
                //  $scope.fromData.oldImage = result.data.image;
            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };



    $scope.updateTherapist = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }

        if($scope.fromData.address.geometry != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.country = $scope.fromData.address.address_components;
            $scope.fromData.address = $scope.fromData.address.formatted_address;


        }
        therapistService.updateTherapist($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Admin updated Successfully', 'Success');
                $state.go('therapist-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.doLogin = function () {
        dataService.therapistLogin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Therapist logged in Successfully', 'Success');
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $state.go('front-dashboard');
            } else {
                toastr.error(data.message, 'Error');
                $state.go('front-login');
            }
        });
    };

    $scope.frontTherapistSignUp = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        therapistService.frontTherapistSignUp($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Follow instructions in email to activate your account', 'Success');
                $state.go('front-login');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };
    $scope.doOtpConfirmation = function () {
        if($stateParams.userId == undefined){
            toastr.error('Invalid Credentials', 'Error');
        }else {
            $scope.fromData._id = $stateParams.userId;
            dataService.otpConfirmation($scope.fromData, function (err, data) {
                if (!err) {
                    toastr.success(data.message, 'Success');
                    $state.go('admin-login');
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        }
    };

    $scope.statusChange = function (id, status) {
        $confirm({text: 'Are you sure you want to change status?'}).then(function () {
            therapistService.changeStatusTherapist(id, status, function (err, data) {
                if (!err) {
                    toastr.success('Therapist status has been changes Successfully', 'Success');
                    $scope.getTherapistList();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };



    $scope.delete = function (id) {
        $confirm({text: 'Are you sure you want to delete?'}).then(function () {
            therapistService.deleteTherapist(id, function (err, data) {
                if (!err) {
                    toastr.success('Therapist has been deleted Successfully', 'Success');
                    $scope.getTherapistList();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };


    $scope.logout = function () {
        dataService.logout();
        $scope.adminLoggedIn = false;
        $state.go('front-login');

    };


    $scope.reddit = new Reddit();














});

