angular.module('Front').service('userService', function ($http, $q, $localStorage, CONFIG, Upload) {
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
                data: data  //pass file as data, should be Therapist ng-model
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
       /* rateProduct: function (productId, rate, userId, callback) {
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
        },*/


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

        TherapistCountry: function (lat, lng, callback) {

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
       /* deleteTherapist: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'therapist/' + id + '/delete'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },*/




    };
});