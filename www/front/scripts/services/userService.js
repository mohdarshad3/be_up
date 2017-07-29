angular.module('Front').service('userService', function ($http, $q, $localStorage, CONFIG, Upload) {
    return {
        adduser: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'admin/adduser',
                data: data
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        frontUserSignUp: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'admin/frontUserSignUp',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },

        getUser: function (page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'admin/getUserList/' + page
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        userProfile: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/profile'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        userProductList: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'product/userProductList'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        userServiceList: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'service/userServiceList'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        editUser: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/' + id + '/edit'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        updateUser: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'user/update',
                data: data  //pass file as data, should be user ng-model
            }).success(function (result) {
                //upload function returns a promise
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        changeStatusUser: function (id, status, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/' + id + '/statusChange/' + status
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        rateProduct: function (productId, rate, userId, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/rateProduct/' + productId + '/' + rate + '/' + userId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getProductRating: function (productId,  callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getProductRating/' + productId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },

        searchProductsByPincode: function (pincode, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/searchProductsByPincode/' + pincode
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        messageNotification: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/messageNotification'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        messageNotificationCount: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/messageNotificationCount'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        followingCount: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/followingCount'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        followNotification: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/followNotification'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getFollowersCount: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getFollowersCount'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getFollowersList: function (page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getFollowersList/' + page
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getFollowingList: function (page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getFollowingList/' + page
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getFollowingCount: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getFollowingCount'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        deleteUser: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/' + id + '/delete'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        deleteProduct: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'product/' + id + '/delete'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        addUserCoverPic: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'user/addUserCoverPic',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        addProductPic1: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'frontProductCategory/addProductPic1',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        addProductPic2: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'frontProductCategory/addProductPic2',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        addProductPic3: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'frontProductCategory/addProductPic3',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        userCountry: function (lat, lng, callback) {

            var latlng = new google.maps.LatLng(lat, lng);
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        callback(null, results[0].address_components[6].short_name);

                    }else{
                        callback(null, {});
                    }
                }else{
                    callback(null, {});
                }
            });
        },
        addUserProfilePic: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'user/addUserProfilePic',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        deleteUser: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/' + id + '/delete'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        followRequest: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/' + id + '/followRequest'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        cancelFollowRequest: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/' + id + '/cancelFollowRequest'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        cancelFollower: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/' + id + '/cancelFollower'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        }



    };
});