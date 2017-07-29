/*global token */
angular.module('Front').controller('messageBoardCtrl', function ($scope, $modal, Upload, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, otherUserService, messageBoardService, toastr) {

    $scope.loginUserId = $localStorage.loginUserId;
    $scope.fromData = {};
    $scope.composeData = {};
    $scope.messageResults = {};
    $scope.searchField = '';
    $scope.fromData.testObject = {};




    $scope.replyFunctionality = function (from) {

        var composeId = from;


        otherUserService.otherUserProfile(composeId, function (err, result) {
            if (!err) {

                var email = result.data.email;
                var name = result.data.name;
                var lastName = result.data.lastName;
                var id =  result.data._id;

                $scope.fromData.testObject = {name: name,lastName:lastName, email: email,"originalObject":{"_id":id}};


            } else {
                toastr.error(result.message, 'Error');
            }
        });

    }


    if ($stateParams.composeId != undefined  && $stateParams.composeId != '') {



        var composeId = $stateParams.composeId;


        otherUserService.otherUserProfile(composeId, function (err, result) {
            if (!err) {

                var email = result.data.email;
                var name = result.data.name;
                var lastName = result.data.lastName;
                var id =  result.data._id;

                $scope.fromData.testObject = {name: name,lastName:lastName, email: email,"originalObject":{"_id":id}};


            } else {
                toastr.error(result.message, 'Error');
            }
        });


    }


    $scope.compose = function (valid) {

        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }


        if ($scope.fromData.testObject != undefined) {
            $scope.fromData.to = $scope.fromData.testObject.originalObject._id;
        } else {
            toastr.error('Select Valid User From DropDown List', 'Error');
            return false;

        }


        messageBoardService.compose($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Message Sent Successfully', 'Success');
                $scope.fromData.description = '';
                $state.reload();
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.changeTab = function (active, inactive) {

        document.getElementById(active).classList.add('active');
        document.getElementById(inactive).classList.remove('active');

        messageBoardService.getMessage(active, function (err, data) {
            if (!err) {
                if (active == 'inbox') {
                    $scope.messageReceiveResults = data;
                    $scope.messageSentResults = {};

                } else if (active == 'sent') {

                    $scope.messageReceiveResults = {};
                    $scope.messageSentResults = data;
                }

            }
        });
    };


    $scope.search = function () {

        if (!$scope.searchField) {
            return false;
        }
        var inboxClass = document.getElementById('inbox').className;
        if (inboxClass == 'active') {
            active = 'inbox';
        } else {

            active = 'sent';
        }
        messageBoardService.searchMessageByName($scope.searchField, active, function (err, data) {
            if (!err) {
                if (active == 'inbox') {
                    $scope.messageReceiveResults = data;
                    $scope.messageSentResults = {};

                } else if (active == 'sent') {

                    $scope.messageReceiveResults = {};
                    $scope.messageSentResults = data;
                }

            }
        });
    };

    $scope.messageType = function (type) {


         $scope.type = type;

    }
});

