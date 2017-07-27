'use strict';
var mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate');

var userPostSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: {type: String},
    image:String,
    original:{type: Boolean, default: true},
    originalUser:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    originalUserName:{type:String},
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

userPostSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('UserPost', userPostSchema);
