'use strict';
var mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate');

var followingSchema = mongoose.Schema({
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    following: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cancel: {type: Boolean, default: false},
    accept: {type: Boolean, default: true},
    check:{type:Boolean,default:false},
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

followingSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Following', followingSchema);
