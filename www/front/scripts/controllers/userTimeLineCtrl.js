
/*global token */
angular.module('Front').controller('userTimeLineCtrl', function ($scope,$modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout,$stateParams,$confirm,userService,userTimeLineService,otherUserService,toastr) {


    $scope.userData = {};
    $scope.postData = {};
    $scope.pictureData = {};
    $scope.loginUserId = $localStorage.loginUserId;


    if($stateParams.userId != undefined){

        var userId = $stateParams.userId;
        $scope.userId = $stateParams.userId;


    }


    $scope.userProfile = function () {

       userService.userProfile(function (err, result) {
            if (!err) {
                $scope.userData = result.data;

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };

    $scope.sharePost = function(postId,userName) {
        $confirm({text: 'Are you sure you want to share this post?'}).then(function () {
            otherUserService.sharePost(postId,userName, function (err, data) {
                if (!err) {
                    toastr.success('Post has been Shared Successfully', 'Success');
                    $state.reload('user-general-timeline');
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };




    $scope.otherUserProfile = function () {


        otherUserService.otherUserProfile(userId,function (err, result) {
            if (!err) {
                $scope.userData = result.data;

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };





    $scope.activeTab = function (a,b) {

        var elementOne = document.getElementById(a);
        elementOne.classList.add("active");

        var elementTwo = document.getElementById(b);
        elementTwo.classList.remove("active");
    };






    $scope.addUserTimeLinePost = function (valid) {


        if (!valid) {
            toastr.error('Invalid Post Data', 'Error');
            return false;
        }

        userTimeLineService.addUserTimeLinePost($scope.postData, function (err, data) {
            if (!err) {
                toastr.success('Post added Successfully', 'Success');
                $state.reload();
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.addUserTimeLinePicture = function (valid) {


        if (!valid) {
            toastr.error('Invalid Post Data', 'Error');
            return false;
        }

        userTimeLineService.addUserTimeLinePicture($scope.pictureData, function (err, data) {
            if (!err) {
                toastr.success('Picture uploaded Successfully', 'Success');

                $scope.pictureData.image = undefined;
                $state.reload();
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.likeUnlike = function (val,postId) {


        userTimeLineService.likeUnlike(val,postId, function (err, data) {
            if (err) {
                toastr.error(err.message, 'Error');
            }
        });
    };


    $scope.comment = {};
    $scope.postComment = function(val){


        var postId = val;
        var comment = $scope.comment[val];

        var data = {};
        data.userPost = postId;
        data.comment = comment;

        userTimeLineService.postComment(data,function (err, result) {
            if (err) {
                toastr.error(err.message, 'Error');

            }
        });


    };






});

