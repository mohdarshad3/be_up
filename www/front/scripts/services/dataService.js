angular.module('Front').service('dataService', function ($http, $q, $localStorage, CONFIG) {
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
        $localStorage.adminToken = result.token;
        $localStorage.loginAdminName = result.name;
        $localStorage.role = result.role;
        $localStorage.adminImage = result.image;
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
        $localStorage.userToken = result.token;
        $localStorage.loginUserName = result.name;
        $localStorage.userImage = result.image;
        $localStorage.loginUserId = result._id;
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
        $localStorage.loginUserId = result._id;
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
    geographicalsearch: function (formData, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'user/geographicalsearch',
        data: formData
      }).then(function successCallback(result) {
        callback(null, result.data);
      }, function errorCallback(err) {
        callback(err);
      });
    },
    logout: function () {
     // delete $localStorage.token;
     // delete $localStorage.loginUserName;
    //  delete $localStorage.role;
    //  delete $localStorage.image;
      delete $localStorage.userToken;
      delete $localStorage.loginUserName;
      delete $localStorage.role;
      delete $localStorage.userImage;
      delete $localStorage.loginUserId;
    },
    isAuthenticated: function () {
      return $localStorage.userToken === '' || $localStorage.userToken === undefined ? false : true;
    },
    getToken: function () {
      return $localStorage.token;
    }
  };
});