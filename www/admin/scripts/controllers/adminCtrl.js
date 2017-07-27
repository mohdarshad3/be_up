angular.module('Admin').controller('adminCtrl', function ($scope,$route, toastr, $state, adminService, CONFIG, $stateParams, $confirm, _, dataService, Reddit) {

    $scope.fromData = {};
    $scope.user = {};
    var selectedCheckbox = [];
    $scope.results = [];
    $scope.currentPage = 1;
    $scope.appName = CONFIG.appName;
    $scope.imageUrl = CONFIG.imageUrl;
    $scope.adminType = CONFIG.adminType;
    var admin = {};
    $scope.numbers = [];

    $scope.doSignUp = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        adminService.signUp($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Admin added Successfully', 'Success');
                $state.go('admin-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


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

  /*  $scope.getAdminList = function () {
        adminService.getAdmin($scope.currentPage, function (err, data) {
            if (!err) {


                for (var i = 0; i < 5; i++) {


                    admin.name = data.docs[0].name;
                    admin.email = data.docs[0].email;
                    admin.phone = data.docs[0].phone;
                    admin.type = data.docs[0].type;
                    $scope.numbers.push(admin);


                }
                ;

                $scope.currentPage = $scope.currentPage + 1;


            } else {
                toastr.error(data.message, 'Error');
            }
        });
    }; */

    $scope.editAdmin = function () {
        $scope.id = $stateParams.id ? $stateParams.id : null;
        adminService.editAdmin($scope.id, function (err, result) {
            if (!err) {
                $scope.fromData = result.data;
                $scope.fromData.oldImage = result.data.image;
                $scope.fromData.image = undefined;
            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };

    $scope.adminProfile = function () {

        adminService.adminProfile(function (err, result) {
            if (!err) {
                $scope.fromData = result.data;

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };


    $scope.delete = function (id) {
        $confirm({text: 'Are you sure you want to delete?'}).then(function () {
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
        $confirm({text: 'Are you sure you want to change status?'}).then(function () {
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

    $scope.updateAdmin = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        adminService.updateAdmin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Admin updated Successfully', 'Success');
                $state.go('admin-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.updateProfile = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        adminService.updateAdmin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Admin updated Successfully', 'Success');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };
    $scope.updateProfile = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        adminService.updateAdmin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Account updated Successfully', 'Success');
                $state.go('admin-answer-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.deleteMulti = function () {
        $confirm({text: 'Are you sure you want to delete?'}).then(function () {
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
        $confirm({text: 'Are you sure you want to change status?'}).then(function () {
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


    $scope.changePassword = function (valid) {

        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        dataService.changePassword($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Password Changed successfully ', 'Success');
            } else {
                toastr.error(err.data.message, 'Error');
            }
        });
    };


    $scope.reddit = new Reddit();


});