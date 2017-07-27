'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    mongoosePaginate = require('mongoose-paginate')
    ;

var therapistSchema = mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true},
    company: {type: String},
    phoneNumber:{type: String},
    birthday:{type: String},
    jobTitle:{type: String},
    password: String,
    address: {type: String},
    country: {type: String},
    location:{type: Array},
    type:{type: String},
    resume:{type: String},
    otp:{type: String},
    deleted: {type: Number, default: 0},
    status: {type: Number, default: 1},
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

therapistSchema.plugin(mongoosePaginate);


/* generating a hash*/
therapistSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
therapistSchema.methods.validPassword = function (password) {
    if (this.password != undefined) {
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }
};


// create the model for users and expose it to our app
module.exports = mongoose.model('therapist', therapistSchema);
