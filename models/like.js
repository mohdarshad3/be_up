'use strict';
var mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate');

var likeSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    like: {type: Boolean},
    userPost: {type: mongoose.Schema.Types.ObjectId, ref: 'UserPost'},
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

likeSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Like', likeSchema);
