
/*global token */
angular.module('Admin').controller('userCtrl', function ($scope,$modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout,$stateParams,$confirm,userService,userService,toastr,Reddit) {


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



    $scope.addUser = function (valid) {

         if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        if($scope.fromData.address.geometry != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
           $scope.fromData.country = $scope.fromData.address.address_components[6]['short_name'];
            $scope.fromData.address = $scope.fromData.address.formatted_address;


        }


        userService.adduser($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Follow instructions in email to activate your account', 'Success');
                $state.go('user-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.getUserList = function () {
        userService.getUser($scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.editUser = function () {



        $scope.id = $stateParams.id ? $stateParams.id : null;
        userService.editUser($scope.id, function (err, result) {
            if (!err) {
                $scope.fromData = result.data;
                //  $scope.fromData.oldImage = result.data.image;
            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };



    $scope.updateUser = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }

        if($scope.fromData.address.geometry != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.country = $scope.fromData.address.address_components[6]['short_name'];
            $scope.fromData.address = $scope.fromData.address.formatted_address;


        }
        userService.updateUser($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Admin updated Successfully', 'Success');
                $state.go('user-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.doLogin = function () {
        dataService.userLogin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('User logged in Successfully', 'Success');
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $state.go('front-dashboard');
            } else {
                toastr.error(data.message, 'Error');
                $state.go('front-login');
            }
        });
    };

    $scope.frontUserSignUp = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        userService.frontUserSignUp($scope.fromData, function (err, data) {
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
            userService.changeStatusUser(id, status, function (err, data) {
                if (!err) {
                    toastr.success('User status has been changes Successfully', 'Success');
                    $scope.getUserList();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };



    $scope.delete = function (id) {
        $confirm({text: 'Are you sure you want to delete?'}).then(function () {
            userService.deleteUser(id, function (err, data) {
                if (!err) {
                    toastr.success('User has been deleted Successfully', 'Success');
                    $scope.getUserList();
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

  $scope.doForgotPassword = function () {
        dataService.frontForgotPassword($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Password reset mail has been sent successfully.', 'Success');
            } else {
                console.log(err.message);
                toastr.error(err.message, 'Error');
            }
        });
    };



    $scope.doResetPassword = function () {

        if($stateParams.userId == undefined){
            toastr.error('Invalid Credentials', 'Error');
        }else {
            $scope.fromData._id = $stateParams.userId;
            dataService.doResetPassword($scope.fromData, function (err, data) {
                if (!err) {
                    toastr.success(data.message, 'Success');
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        }
    };

    if($stateParams.activateId != undefined){

        var activateId = $stateParams.activateId;

        dataService.activateAccount(activateId, function (err, data) {
            if (!err) {
               $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $state.go('front-dashboard');
                toastr.success(data.message, 'Success');

            } else {
                toastr.error(data.message, 'Error');
            }
        });

    }


    $scope.signInSuccessful = function () {
        $scope.adminLoggedIn = true;
        $scope.loginUserName = $localStorage.loginUserName;
        $scope.role = $localStorage.role;
        $scope.profilePic = $localStorage.image;


    };
    /* Display the signInModal method */
    $scope.notLoggedIn = function () {
        $scope.adminLoggedIn = false;
        $state.go('front-login');
    };

    $scope.loggedOut = function () {
        $scope.adminLoggedIn = false;
    };
    $scope.navigateDashboard = function () {
        $scope.adminLoggedIn = true;
    };

    $rootScope.$on(AUTH_EVENTS.logedOut, $scope.loggedOut);
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, $scope.notLoggedIn);
    $rootScope.$on(AUTH_EVENTS.loginSuccess, $scope.signInSuccessful);
    $rootScope.$on(AUTH_EVENTS.alreadyAuthenticated, $scope.navigateDashboard);


    $scope.userLogout = function () {
        dataService.logout();
        $state.go('front-login');
    };


    $scope.userProfile = function () {


        userService.userProfile(function (err, result) {
            if (!err) {
                $scope.userData = result.data;

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };

    $scope.userProductList = function () {


        userService.userProductList(function (err, result) {
            if (!err) {
                $scope.checkProducts = result.data;

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };







    $scope.changeCoverPic = function($event) {

        $timeout(function() {

            userService.addUserCoverPic($scope.fromData, function (err, data) {
                if (!err) {
                    toastr.success('User Cover Picture Updated Successfully', 'Success');
                    $scope.userProfile();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };



    $scope.changeProfilePic = function($event) {

        $timeout(function() {

            userService.addUserProfilePic($scope.Data, function (err, data) {
                if (!err) {
                    toastr.success('User Profile Picture Updated Successfully', 'Success');
                    $scope.userProfile();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };


    $scope.open = function (user) {
        $scope.user = user;
        $modal.open({
            templateUrl: 'myModalContent.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {
               $scope.submit = function () {
                   dataService.userChangePassword($scope.fromData, function (err, data) {
                       if (!err) {
                           $modalInstance.dismiss('cancel');
                           toastr.success('Password Changed successfully ', 'Success');

                       } else {
                           toastr.error(err.data.message, 'Error');
                       }
                   });

                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                user: function () {
                    return $scope.user;
                }
            }
        });
    };


    $scope.followers = function (postId) {


        $scope.postId = postId;
        $modal.open({
            templateUrl: 'followers.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {
                dataService.userFollowers(postId,function (err, data) {
                    if (!err) {

                        $scope.users = data;

                    } else {
                        toastr.error(err.data.message, 'Error');
                    }
                });
                $scope.cancelFollower = function (followerId,followingId) {

                    $confirm({text: 'Are you sure you want to cancel?'}).then(function () {
                        dataService.cancelFollower(followerId,followingId, function (err, data) {
                            if (!err) {
                                toastr.success('Follower Cancel  Successfully', 'Success');
                                dataService.userFollowers(postId, function (err, data) {
                                    if (!err) {

                                        $scope.users = data;

                                    } else {
                                        toastr.error(err.data.message, 'Error');
                                    }
                                });
                            } else {
                                toastr.error(data.message, 'Error');
                            }
                        });
                    });
                };



                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                user: function () {
                    return $scope.postId;
                }
            }
        });
    };

    $scope.following = function (postId) {


        $scope.postId = postId;
        $modal.open({
            templateUrl: 'following.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {
                dataService.userFollowing(postId,function (err, data) {
                    if (!err) {

                        $scope.users = data;

                    } else {
                        toastr.error(err.data.message, 'Error');
                    }
                });

                $scope.cancelFollowing = function (followerId,followingId) {

                    $confirm({text: 'Are you sure you want to cancel?'}).then(function () {
                        dataService.cancelFollowing(followerId,followingId, function (err, data) {
                            if (!err) {
                                toastr.success('Following Cancel  Successfully', 'Success');
                                dataService.userFollowing(postId, function (err, data) {
                                    if (!err) {

                                        $scope.users = data;

                                    } else {
                                        toastr.error(err.data.message, 'Error');
                                    }
                                });
                            } else {
                                toastr.error(data.message, 'Error');
                            }
                        });
                    });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                user: function () {
                    return $scope.postId;
                }
            }
        });
    };



    $scope.reddit = new Reddit();














});

