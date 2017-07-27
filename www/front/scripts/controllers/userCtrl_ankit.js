/*global token */
angular.module('Front').controller('userCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, userService, toastr, Reddit, messageBoardService) {


    $scope.fromData = {};
    $scope.Data = {};
    $scope.oldAddress = null;
    $scope.user = {};
    var selectedCheckbox = [];
    $scope.results = [];
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
    $scope.addres = [];
    $scope.userList = [];
    $scope.country = '';
    $scope.searchField = '';
    $scope.from = {};
    $scope.from.address = '';


    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function () {
        $scope.itemsPerPage = CONFIG.limit;
        $scope.currentPage = 1;  //reset to first paghe
    };


    $scope.address = function () {

        if ($scope.fromData.address.formatted_address == '' || $scope.fromData.address.formatted_address == undefined)
            $scope.fromData.address = '';
    };


    if ($stateParams.userId != undefined) {

        var userId = $stateParams.userId;
        $scope.userId = $stateParams.userId;


    }


    $scope.addUser = function (valid) {

        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        if ($scope.fromData.address != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
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

        if ($scope.fromData.address.geometry != undefined) {

            $scope.fromData.location = $scope.fromData.address.geometry.location;
            if ($scope.fromData.address.address_components[3] != undefined) {
                $scope.fromData.country = $scope.fromData.address.address_components[3]['short_name'];
            }
            $scope.fromData.address = $scope.fromData.address.formatted_address;
        }


        userService.updateUser($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('User updated Successfully', 'Success');
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
        if ($stateParams.userId == undefined) {
            toastr.error('Invalid Credentials', 'Error');
        } else {
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
        $scope.userLoggedIn = false;
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

        if ($stateParams.userId == undefined) {
            toastr.error('Invalid Credentials', 'Error');
        } else {
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

    if ($stateParams.activateId != undefined) {

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
        $scope.userLoggedIn = true;
        $scope.loginUserName = $localStorage.loginUserName;
        $scope.profilePic = $localStorage.image;


    };
    /* Display the signInModal method */
    $scope.notLoggedIn = function () {
        $scope.userLoggedIn = false;
        $state.go('front-login');
    };

    $scope.loggedOut = function () {
        $scope.userLoggedIn = false;
    };
    $scope.navigateDashboard = function () {
        $scope.userLoggedIn = true;
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
                $scope.country = result.data.country;
                //userService.userCountry(result.data.location[0], result.data.location[1], function (err, results) {
                //    if (!err) {
                //        $scope.country = results;
                //    }
                //});

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };


    $scope.deleteProduct = function (productId) {

        $confirm({text: 'Are you sure you want to delete  this ?'}).then(function () {
            userService.deleteProduct(productId, function (err, data) {
                if (!err) {
                    toastr.success('Product has been deleted Successfully', 'Success');
                    $state.reload();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
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


    $scope.getAllProductListByName = function (name) {

        if (!name) {
            return false;
        }

        document.getElementById('SearchBox').classList.remove('open');
        $state.go('product-search', {userName: name});
    };


    $scope.changeCoverPic = function ($event) {

        $timeout(function () {

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


    $scope.changeProfilePic = function ($event) {

        $timeout(function () {

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
                        } else if (data.data.length == 0) {


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


    codeAddress = function (locations,miles) {
        geocoder = new google.maps.Geocoder();

        var address = document.getElementById('city_country').value;
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map = new google.maps.Map(document.getElementById('mapCanvas'), {
                    zoom: 3,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP]
                    },
                    center: results[0].geometry.location,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                map.setCenter(results[0].geometry.location);
               //var marker = new google.maps.Marker({
               //     map: map,
               //     position: results[0].geometry.location,
               //     draggable: true,
               //     title: 'My Title',
               //
               // });
//for circle
                var circle = new google.maps.Circle(
                    {
                        radius: miles*1609,
                        center: results[0].geometry.location,
                        fillColor: "#3333FF",
                        fillOpacity: 0.1,
                        strokeColor: "#3333FF",
                        strokeOpacity: 0.5
                    });
                map.fitBounds(circle.getBounds());
                circle.setMap(map)
//for circle
                updateMarkerPosition(results[0].geometry.location);
                geocodePosition(results[0].geometry.location);


                // Add dragging event listeners.
                google.maps.event.addListener(marker, 'dragstart', function() {
                });

                google.maps.event.addListener(marker, 'drag', function() {
                    updateMarkerPosition(marker.getPosition());
                });

                google.maps.event.addListener(marker, 'dragend', function() {
                    geocodePosition(marker.getPosition());
                    map.panTo(marker.getPosition());
                });
                //google.maps.event.addListener(map, 'click', function(e) {
                //    updateMarkerPosition(e.latLng);
                //    geocodePosition(marker.getPosition());
                //    marker.setPosition(e.latLng);
                //    map.panTo(marker.getPosition());
                //});

                if(locations.length>0) {

                    var iconBase = 'front/img/google_user_icon.png';

                    var i;
                    var markers = [];
                    var markerUser;
                    for (i = 0; i < locations.length; i++) {
                        markerUser = new google.maps.Marker({
                            position: new google.maps.LatLng(locations[i].location[1], locations[i].location[0]),
                            map: map,
                            icon: iconBase

                        });

                        var infowindow = new google.maps.InfoWindow();

                        var content = "Name: " + locations[i].name + '</h3></br>' + "Address: " + locations[i].address + '</h3></br>' + "Type: " + locations[i].type;
                        google.maps.event.addListener(markerUser, 'click', (function (markerUser, content, infowindow) {
                            return function () {
                                infowindow.setContent(content);
                                infowindow.open(map, markerUser);
                            };
                        })(markerUser, content, infowindow));
                        markers.push(markerUser);
                    }
                    var markerCluster = new MarkerClusterer(map, markers, {
                        maxZoom: 10,
                        gridSize: 10,
                        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                    });
                }


            }
        });
    };

    $scope.initcodeAddress = function () {
        geocoder = new google.maps.Geocoder();

        var address = 'USA';
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map = new google.maps.Map(document.getElementById('mapCanvas'), {
                    zoom: 3,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP]
                    },
                    center: results[0].geometry.location,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    draggable: true,
                    title: 'USA'
                });

                updateMarkerPosition(results[0].geometry.location);
                geocodePosition(results[0].geometry.location);


                // Add dragging event listeners.
                google.maps.event.addListener(marker, 'dragstart', function() {
                });

                google.maps.event.addListener(marker, 'drag', function() {
                    updateMarkerPosition(marker.getPosition());
                });

                google.maps.event.addListener(marker, 'dragend', function() {
                    geocodePosition(marker.getPosition());
                    map.panTo(marker.getPosition());
                });

                google.maps.event.addListener(map, 'click', function(e) {
                    updateMarkerPosition(e.latLng);
                    geocodePosition(marker.getPosition());
                    marker.setPosition(e.latLng);
                    map.panTo(marker.getPosition());
                });



            }
        });
    }

    function geocodePosition(pos) {
        geocoder.geocode({
            latLng: pos
        }, function (responses) {
            if (responses && responses.length > 0) {


                updateMarkerAddress(responses[0].formatted_address);
            } else {
                updateMarkerAddress('Cannot determine address at this location.');
            }
        });
    }

    //function updateMarkerStatus(str) {
    //    document.getElementById('markerStatus').innerHTML = str;
    //}

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
        $scope.from.address=str;
        document.getElementById('city_country').value = str;
    }


    $scope.productsList = function ($event) {
        $scope.reddit = new Reddit();
    };


    $scope.postList = function ($event) {
        $scope.reddit = new Reddit();
    };


    $scope.searchSubmit = function () {

        $scope.fromData.lat = document.getElementById('lat').value;
        $scope.fromData.long = document.getElementById('long').value;
        $scope.fromData.currentPage = $scope.currentPage;
        if (!$scope.from.address) {

            $scope.fromData.lat = '';
            $scope.fromData.long = '';

        }
        dataService.geographicalsearch($scope.fromData, function (err, data) {

            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
                codeAddress($scope.results,$scope.fromData.miles);
            } else {
                toastr.error(data.message, 'Error');
            }
        });

    }


    $scope.editUserProfile = function () {


        userService.userProfile(function (err, result) {
            if (!err) {
                $scope.fromData = result.data;

            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };


    $scope.getMessageDetail = function () {


        if ($stateParams.messageId != undefined && $stateParams.type) {
            var messageId = $stateParams.messageId;
            var type = $stateParams.type;
        }
        $scope.messageDetail = {};

        messageBoardService.getMessageDetail(messageId, function (err, data) {
            if (!err) {
                if (type == 'sent') {
                    $scope.messageDetail.description = data.description;
                    $scope.messageDetail.name = data.to.name;
                    $scope.messageDetail.email = data.to.email;
                    $scope.messageDetail.profilePic = data.to.profilePic;
                    $scope.messageDetail.type = data.to.type;
                    $scope.messageDetail.created = data.created;
                } else if (type == 'inbox') {
                    $scope.messageDetail.description = data.description;
                    $scope.messageDetail.name = data.from.name;
                    $scope.messageDetail.email = data.from.email;
                    $scope.messageDetail.profilePic = data.from.profilePic;
                    $scope.messageDetail.type = data.from.type;
                    $scope.messageDetail.created = data.created;
                    $scope.messageDetail.from = data.from._id;

                }
            }
        });
    };


    $scope.getMessageInboxDetail = function () {


        messageBoardService.getMessage('inbox', function (err, data) {
            if (!err) {

                $scope.messageReceiveResults = data;
                $scope.messageSentResults = {};

            }
        });
    };


    $scope.rate = {};
    $scope.ratedCallback = function (val, userId) {
        var productId = val;
        var rate = $scope.rate[val];
        var userId = userId;

        userService.rateProduct(productId, rate, userId, function (err, result) {
            if (err) {
                toastr.error(err.message, 'Error');

            }
        });


    };










    $scope.search = '';

    $scope.searchProductsByPincode = function () {


        userService.searchProductsByPincode($scope.search, function (err, result) {
            if (!err) {

                $scope.checkProducts = result;
            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };


    $scope.messageNotification = function () {


        userService.messageNotification(function (err, result) {
            if (!err) {

                $scope.msgNotifications = result;
            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };

    $scope.messageNotificationCount = function () {


        userService.messageNotificationCount(function (err, result) {
            if (!err) {

                $scope.msgNotificationsCount = result;
            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };

    $scope.followingCount = function () {


        userService.followingCount(function (err, result) {
            if (!err) {

                $scope.followingsCount = result;


            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };


    $scope.followNotification = function () {


        userService.followNotification(function (err, result) {
            if (!err) {

                $scope.flwNotifications = result;
            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };
    ;


    $scope.getFollowersCount = function () {


        userService.getFollowersCount(function (err, result) {
            if (!err) {

                $scope.FollowersCount = result;
            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };


    $scope.getFollowersList = function () {
        userService.getFollowersList($scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.getFollowingList = function () {
        userService.getFollowingList($scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.getFollowingCount = function () {


        userService.getFollowingCount(function (err, result) {
            if (!err) {

                $scope.FollowingCount = result;
            } else {

                toastr.error(err.message, 'Error');


            }
        });


    };


});

