angular.module('Admin').service('dataService', function ($http, $q, $localStorage, CONFIG) {
  // Containers
  var _identity;
  return {
    userSignUp: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/userSignUp',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },

    therapistSignUp: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/therapistSignUp',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },

    usersCount: function (callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/usersCount'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    totalQuestions: function (callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/totalQuestions'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    totalAlexaRequestCount: function (callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/totalAlexaRequestCount'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    login: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/login',
        data: data
      }).success(function (result) {
        $localStorage.token = result.token;
        $localStorage.loginUserName = result.name;
        $localStorage.loginTherapistName = result.name;
        $localStorage.role = result.role;
        $localStorage.image = result.image;
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    userLogin: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'user/login',
        data: data
      }).success(function (result) {
        $localStorage.token = result.token;
        $localStorage.loginUserName = result.name;
        $localStorage.role = result.role;
        $localStorage.image = result.image;
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },

    therapistLogin: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'therapist/login',
        data: data
      }).success(function (result) {
        $localStorage.token = result.token;
        $localStorage.loginTherapistName = result.name;
        $localStorage.role = result.role;
        $localStorage.image = result.image;
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },

    otpConfirmation: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'user/otpConfirmation',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    doResetPassword: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'therapist/resetPassword',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },

    doResetPassword: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'therapist/resetPassword',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },

    doResetPassword: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'user/resetPassword',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    activateAccount: function (activateId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'user/activateAccount/' + activateId
      }).success(function (result) {
       $localStorage.token = result.token;
        $localStorage.loginUserName = result.name;
        $localStorage.role = result.role;
        $localStorage.image = result.image;
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },

    activateAccount: function (activateId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'therapist/activateAccount/' + activateId
      }).success(function (result) {
        $localStorage.token = result.token;
        $localStorage.loginTherapistName = result.name;
        $localStorage.role = result.role;
        $localStorage.image = result.image;
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },

     alexaAuthlogin: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/alexaAuthlogin',
        data: data
      }).success(function (result) {
        $localStorage.token = result.token;
        $localStorage.loginUserName = result.name;
        $localStorage.role = result.role;
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    checkAuthStatus: function (callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/authenticate'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    forgotPassword: function (formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/forgotPassword',
        data: formData
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(err);
      });
    },
    frontForgotPassword: function (formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'user/forgotPassword',
        data: formData
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(err);
      });
    },

    frontForgotPassword: function (formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'therapist/forgotPassword',
        data: formData
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(err);
      });
    },

    verifyToken: function (token, callback) {
      $http({
        method: 'get',
        url: CONFIG.baseUrl + 'admin/verifyForgotToken/' + token
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(err);
      });
    },
    changePassword: function (formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/changePassword',
        data: formData
      }).then(function successCallback(result) {
        callback(null, result);
      }, function errorCallback(err) {
        callback(err);
      });
    },
    userChangePassword: function (formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/userChangePassword',
        data: formData
      }).then(function successCallback(result) {
        callback(null, result);
      }, function errorCallback(err) {
        callback(err);
      });
    },

    therapistChangePassword: function (formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/therapistChangePassword',
        data: formData
      }).then(function successCallback(result) {
        callback(null, result);
      }, function errorCallback(err) {
        callback(err);
      });
    },

    userFollowers: function (userId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/userFollowers/' + userId
      }).then(function successCallback(result) {
        callback(null, result);
      }, function errorCallback(err) {
        callback(err);
      });
    },
    cancelFollower: function (followerId,followingId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/cancelFollower/' + followerId + '/' + followingId
      }).then(function successCallback(result) {
        callback(null, result);
      }, function errorCallback(err) {
        callback(err);
      });
    },
    cancelFollowing: function (followerId,followingId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/cancelFollowing/' + followerId + '/' + followingId
      }).then(function successCallback(result) {
        callback(null, result);
      }, function errorCallback(err) {
        callback(err);
      });
    },
    userFollowing: function (userId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/userFollowing/' + userId
      }).then(function successCallback(result) {
        callback(null, result);
      }, function errorCallback(err) {
        callback(err);
      });
    },
    logout: function () {
      delete $localStorage.token;
      delete $localStorage.loginUserName;
      delete $localStorage.role;
      delete $localStorage.image;
    },
    isAuthenticated: function () {
      return $localStorage.token === '' || $localStorage.token === undefined ? false : true;
    },
    getToken: function () {
      return $localStorage.token;
    }
  };
});