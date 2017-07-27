angular.module('Admin').service('adminService', function ($http, $q, $localStorage,CONFIG,Upload) {
  return {
    signUpp: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/signUp',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    signUp: function (data, callback) {
      Upload.upload({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/signUp',
        data: data
      }).then(function (result) {
        callback(null, result);
      }, function (err) {
        callback(true, err.data);
      });
    },
    getAdmin: function (page, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/getAdminList/' + page
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getProductList: function (page, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/getPostList/' + page
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },



    getLatestProductList: function (page, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/getLatestProductList'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getLatestUserList: function (page, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/getLatestUserList'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    editAdmin: function (id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/edit'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    adminProfile: function (callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/profile'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    updateAdmin: function (data, callback) {
      Upload.upload({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/update',
        data: data
      }).then(function (result) {
        callback(null, result);
      }, function (err) {
        callback(true, err.data);
      });
    },
    deleteAdmin: function (id, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/delete'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deleteMulti: function (ids, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/multiDelete',
        data: ids
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    multiStatusChange: function (ids, status, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/multiStatusChange/' + status,
        data: ids
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    changeStatusAdmin: function (id, status, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/' + id + '/statusChange/' + status
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getEmailConfigDetail: function (callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/emailConfigDetail'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    updateEmailConfigDetail: function (data, callback) {
      $http({
        method: 'PUT',
        url: CONFIG.baseUrl + 'admin/updateEmailConfigDetail',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    }
  };
});