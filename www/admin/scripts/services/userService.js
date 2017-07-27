angular.module('Admin').service('userService', function ($http, $q, $localStorage,CONFIG,Upload) {
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





  };
});