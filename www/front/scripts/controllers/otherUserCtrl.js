
/*global token */
angular.module('Front').controller('otherUserCtrl', function ($scope,$modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout,$stateParams,$confirm,otherUserService,toastr,Reddit) {


    $scope.fromData = {};
    $scope.Data = {};
    $scope.oldAddress = null;
    $scope.user = {};
    var selectedCheckbox = [];
    $scope.results = {};
    $scope.currentPage = 1;
    $scope.appName = CONFIG.appName;
    $scope.userType = CONFIG.userType;
    $scope.userLoggedIn = false;
    $scope.loginUserName = $localStorage.loginUserName;
    $scope.loginUserId = $localStorage.loginUserId;
    $scope.role = $localStorage.role;
    $scope.profilePic = $localStorage.userImage;
    $scope.imageUrl = CONFIG.imageUrl;
    $scope.userData = {};
    $scope.userList = {};




    if($stateParams.userId != undefined){

        var userId = $stateParams.userId;
        $scope.userId = $stateParams.userId;


    }




    $scope.userProfile = function () {

        otherUserService.otherUserProfile(userId,function (err, result) {
            if (!err) {
                $scope.userData = result.data;
                $scope.country = result.data.country;
                //
                //userService.userCountry(result.data.location[0].lat, result.data.location[0].lng, function (err, results) {
                //    if (!err) {
                //        $scope.country = results;
                //    }
                //});
            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };


    $scope.userProductList = function () {


        otherUserService.otherUserProductList(userId,function (err, result) {
            if (!err) {
                $scope.checkProducts = result.data;

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };

    $scope.userFollowingCheck = function () {


        otherUserService.userFollowingCheck(userId,function (err, result) {
            if (err) {
                toastr.error(result.message, 'Error');

            }
        });
    };











    $scope.changeCoverPic = function($event) {

        $timeout(function() {

            userService.addUserCoverPic($scope.fromData, function (err, data) {
                if (!err) {
                    toastr.success('Userrrrr Cover Picture Updated Successfully', 'Success');
                    $scope.userProfile();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };
    $scope.changeUserCoverPic = function($event) {

        $timeout(function() {

            userService.addUserCoverPic($scope.fromData, function (err, data) {
                if (!err) {
                    toastr.success('Userr Cover Picture Updated Successfully', 'Success');
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
    $scope.geographicalsearch = function (user) {
        $scope.user = user;
        $modal.open({
            templateUrl: 'geographicalsearch.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {



                $scope.submit = function () {

                   $scope.fromData.lat = document.getElementById('lat').value;
                   $scope.fromData.long = document.getElementById('long').value;

                    dataService.geographicalsearch($scope.fromData, function (err, data) {


                        if (err) {

                            toastr.error(err.data.message, 'Error');
                            return false;
                        }else if(data.data.length == 0){

                            toastr.error('No User find for this serach', 'Error');
                            return false;


                        }
                        else {
                            $scope.userList = data;
                            $modalInstance.dismiss('cancel');
                            toastr.success('User Find successfully ', 'Success');
                            $state.go('search-users');

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


    var geocoder;
    var map;
    var marker;


   codeAddress = function () {
        geocoder = new google.maps.Geocoder();

        var address = document.getElementById('city_country').value;
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map = new google.maps.Map(document.getElementById('mapCanvas'), {
                    zoom: 16,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        mapTypeIds:[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP]
                    },
                    center: results[0].geometry.location,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    draggable: true,
                    title: 'My Title'
                });

                updateMarkerPosition(results[0].geometry.location);
                geocodePosition(results[0].geometry.location);

                // Add dragging event listeners.
                google.maps.event.addListener(marker, 'dragstart', function() {
                    updateMarkerAddress('Dragging...');
                });

                google.maps.event.addListener(marker, 'drag', function() {
                    updateMarkerStatus('Dragging...');
                    updateMarkerPosition(marker.getPosition());
                });

                google.maps.event.addListener(marker, 'dragend', function() {
                    updateMarkerStatus('Drag ended');
                    geocodePosition(marker.getPosition());
                    map.panTo(marker.getPosition());
                });

                google.maps.event.addListener(map, 'click', function(e) {
                    updateMarkerPosition(e.latLng);
                    geocodePosition(marker.getPosition());
                    marker.setPosition(e.latLng);
                    map.panTo(marker.getPosition());
                });

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    function geocodePosition(pos) {
        geocoder.geocode({
            latLng: pos
        }, function(responses) {
            if (responses && responses.length > 0) {



                updateMarkerAddress(responses[0].formatted_address);
            } else {
                updateMarkerAddress('Cannot determine address at this location.');
            }
        });
    }

    function updateMarkerStatus(str) {
        document.getElementById('markerStatus').innerHTML = str;
    }

    function updateMarkerPosition(latLng) {
        document.getElementById('info').innerHTML = [
            latLng.lat(),
            latLng.lng()
        ].join(', ');



      document.getElementById('lat').value = latLng.lat();
        document.getElementById('long').value = latLng.lng();
        document.getElementById('latlong').value = latLng;


    }

    function updateMarkerAddress(str) {
        document.getElementById('address').innerHTML = str;
        document.getElementById('city_country').value = str;
    }





    $scope.productsList = function($event) {
        $scope.reddit = new Reddit();
    };


    $scope.searchSubmit = function () {

        $scope.fromData.lat = document.getElementById('lat').value;
        $scope.fromData.long = document.getElementById('long').value;

        dataService.geographicalsearch($scope.fromData, function (err, data) {


            if (err) {

                toastr.error(err.data.message, 'Error');
                return false;
            }else if(data.data.length == 0){

              //  $scope.userList = [];

                toastr.error('No User find for this serach', 'Error');
                return false;


            }
            else {
                $scope.userList = data.data;
                toastr.success('User Find successfully ', 'Success');

            }
        });

    }


    $scope.sendFollowRequest = function (followRequestId) {


        userService.followRequest(followRequestId, function (err, data) {


            if (err) {

                toastr.error(err.data.message, 'Error');
                return false;
            }
            else {

                toastr.success(data.message, 'Success');

            }
        });

    }


    $scope.search = '';

    $scope.searchProductsByPincode = function(){


   otherUserService.searchProductsByPincode($scope.search,userId,function (err, result) {
            if (!err) {

                $scope.checkProducts = result;
            }else{

                toastr.error(err.message, 'Error');


            }
        });


    };


    $scope.getUserFollowersCount = function () {


        otherUserService.getUserFollowersCount(userId,function (err, result) {
            if (!err) {

                $scope.FollowersCount = result;
            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };

    $scope.getUserFollowingCount = function () {




        otherUserService.getUserFollowingCount(userId,function (err, result) {
            if (!err) {

                $scope.FollowingCount = result;
            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };

    $scope.getUserFollowingList = function () {
        otherUserService.getUserFollowingList(userId,$scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.getUserFollowersList = function () {
        otherUserService.getUserFollowersList(userId,$scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };




});

