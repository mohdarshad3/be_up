angular.module('Admin').service('websiteContentService', function ($http, $q, $localStorage,CONFIG,Upload) {
  return {
    updateContent: function (data, callback) {
      Upload.upload({
        method: 'POST',
        url: CONFIG.baseUrl + 'admin/updateContent',
        data: data
      }).then(function (result) {
        callback(null, result);
      }, function (err) {
        callback(true, err.data);
      });
    },
    websiteDetail: function (callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'admin/websiteDetail'
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    }
  };
});