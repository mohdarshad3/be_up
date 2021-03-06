angular.module('Admin').service('therapistService', function ($http, $q, $localStorage,CONFIG,Upload) {
    return {
        addTherapist: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'admin/addTherapist',
                data: data
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        frontTherapistSignUp: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'admin/frontTherapistSignUp',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
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
        therapistProfile: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'therapist/profile'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },

        editTherapist: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'therapist/' + id + '/edit'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        updateTherapist: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'therapist/update',
                data: data  //pass file as data, should be therapist ng-model
            }).success(function (result) {
                //upload function returns a promise
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        changeStatusTherapist: function (id, status, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'therapist/' + id + '/statusChange/' + status
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        deleteTherapist: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'therapist/' + id + '/delete'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        addTherapistCoverPic: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'therapist/addTherapistCoverPic',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        addTherapistProfilePic: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'therapist/addTherapistProfilePic',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },





    };
});