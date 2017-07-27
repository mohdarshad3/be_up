'use strict';
var mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate');

var productCategorySchema = mongoose.Schema({
    name: {type: String, required: true},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory'},
    description: {type: String},
    image:String,
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

productCategorySchema.plugin(mongoosePaginate);


module.exports = mongoose.model('ProductCategory', productCategorySchema);
