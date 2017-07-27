'use strict';
var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

var websiteContentSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, trim: true},
    hostName: {type:String, required: true},
    portNumber: {type:String, required: true},
    smtpUserName: {type:String, required: true},
    smtpPassword: {type:String, required: true},
    phone: {type:String, required: true},
    image:String,
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

websiteContentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('WebsiteContent', websiteContentSchema);
