'use strict';
var mongoose = require('mongoose')
    ;

var emailConfigSchema = mongoose.Schema({
    host: {type: String, required: true},
    port: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()},
    SMTP_status: {type: Boolean, default: false}//OFF =0 ON =1
});

module.exports = mongoose.model('emailconfig', emailConfigSchema);
