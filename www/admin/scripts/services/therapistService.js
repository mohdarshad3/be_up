angular.module('Admin').service('therapistService', function ($http, $q, $localStorage,CONFIG,Upload) {
    return {
        addTherapist: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'admin/addtherapist',
                data: data
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },


        getTherapist: function (page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'admin/getTherapistList/' + page
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },

        getTherapist: function (page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'admin/getUserList/' + page
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },




    };
});