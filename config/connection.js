'use strict';
var mongoose = require('mongoose'),
    config = require('../config/config.js');

var connection = mongoose.connect(config.mongoUrl, function (err) {
    if (err) {
        console.error('Could not connect to MongoDB from model !'+ err);
        console.log(err);
    }
    else console.log('Connected to mongoDB'+ config.mongoUrl);
});

module.exports = connection;
