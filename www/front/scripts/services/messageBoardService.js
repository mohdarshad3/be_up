angular.module('Front').service('messageBoardService', function ($http, $q, $localStorage,CONFIG,Upload) {
  return {
    compose: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'user/compose',
        data: data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getMessage: function (active, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'user/getMessage/'+ active
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    getMessageDetail: function (messageId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'user/getMessageDetail/'+ messageId
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    searchMessageByName: function (searchField,active, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'user/searchMessageByName/'+ searchField + '/' + active
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    }





  };
});