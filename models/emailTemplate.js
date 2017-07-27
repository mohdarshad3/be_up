'use strict';
var mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate');

var emailTemplateSchema = mongoose.Schema({
    subject: {type: String, required: true},
    variable: {type: String, required: true},
    emailBody: {type:String, required: true},
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

emailTemplateSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
