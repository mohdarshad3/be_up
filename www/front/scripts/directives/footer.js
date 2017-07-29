angular.module('Front').directive('footer', function ($state, $window, $timeout) {
  return {
    templateUrl: 'views/directives/header.html',
    replace: true,
    link: function (scope, element, attr) {
    }
  };
});