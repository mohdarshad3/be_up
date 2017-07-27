'use strict';
var mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate');

var messageSchema = mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    description: {type: String},
    check:{type:Boolean,default:false},
    deleted: {type: Number, default: 0},//0=not delete 1= deleted
    status: {type: Number, default: 1},//0=inactive 1=active
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

messageSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Message', messageSchema);
