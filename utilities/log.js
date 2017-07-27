'use strict';
var log = {
    info: function(info) {
        console.log('Info: ' + info);
    },
    warning: function(warning) {
        console.warn('Warning: ' + warning);
    },
    error: function(error) {
        console.error('Error: ' + error);
    }
};

module.exports = log;