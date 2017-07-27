'use strict';
var mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate');

var rateSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

rateSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Rate', rateSchema);
