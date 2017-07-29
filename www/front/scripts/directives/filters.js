'use strict';
angular.module('Front.filters', []).
    filter('htmlToPlaintext', function() {
        return function(text) {
            return angular.element(text).text();
        }
    }
);