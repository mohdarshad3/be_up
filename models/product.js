'use strict';
var mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate');

var productSchema = mongoose.Schema({
    title: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory'},
    subCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory'},
    price:{type:Number},
    type: {type:String, enum: ["Product", "Service"] },
    productUrl: {type: String},
    address: {type: String},
    location:{type: Array},
    description: {type: String},
    image:{type: String},
    image2:{type: String},
    image3:{type: String},
    avgRating:{type: Number, default: 0},
    check: {type: Boolean, default: false},
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

productSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Product', productSchema);
