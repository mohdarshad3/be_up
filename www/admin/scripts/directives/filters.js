'use strict';
angular.module('Admin.filters', []).
    filter('htmlToPlaintext', function() {
        return function(text) {
            return angular.element(text).text();
        }
    }
);