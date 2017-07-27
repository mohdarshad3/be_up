angular.module('Front').service('userTimeLineService', function ($http, $q, $localStorage,CONFIG,Upload) {
  return {

    addUserTimeLinePost: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'userTimeLine/addUserTimeLinePost',
        data: data
      }).then(function (result) {
        callback(null, result);
      }, function (err) {
        callback(true, err.data);
      });
    },
    addUserTimeLinePicture: function (data, callback) {
      Upload.upload({
        method: 'POST',
        url: CONFIG.baseUrl + 'userTimeLine/addUserTimeLinePicture',
        data: data
      }).then(function (result) {
        callback(null, result);
      }, function (err) {
        callback(true, err.data);
      });
    },
    likeUnlike: function (likeUnlike,postId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'userTimeLine/likeUnlikePost/' + likeUnlike + '/' + postId
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    postComment: function (data, callback) {
      $http({
        method: 'POST',
        url: CONFIG.baseUrl + 'userTimeLine/postComment',
        data:data
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    },
    deleteComment: function (commentId, callback) {
      $http({
        method: 'GET',
        url: CONFIG.baseUrl + 'userTimeLine/deleteComment/' + commentId
      }).success(function (result) {
        callback(null, result);
      }).error(function (err) {
        callback(true, err);
      });
    }








  };
});