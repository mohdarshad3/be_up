angular.module('Front').service('otherUserService', function ($http, $q, $localStorage, CONFIG, Upload) {
    return {


        sharePost: function (postId,userName, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'otherUser/sharePost/' + postId + '/' + userName
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        otherUserProfile: function (userId, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'otherUser/profile/' + userId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        otherUserProductList: function (userId, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'otherUser/userProductList/' + userId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        userFollowingCheck: function (userId, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'otherUser/userFollowingCheck/' + userId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        searchProductsByPincode: function (pincode, userid, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'otherUser/searchProductsByPincode/' + pincode + '/' + userid
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getUserFollowersCount: function (userId,callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getUserFollowersCount/' + userId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getUserFollowingCount: function (userId,callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getUserFollowingCount/' + userId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getUserFollowingList: function (userId,page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getUserFollowingList/' + page + '/' + userId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getUserFollowersList: function (userId,page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getUserFollowersList/' + page + '/' + userId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },


    };
});