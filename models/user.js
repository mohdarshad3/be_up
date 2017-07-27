'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    mongoosePaginate = require('mongoose-paginate')
    ;

var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true},
    company: {type: String},
    coverPic:{type: String},
    profilePic:{type: String},
    password: String,
    address: {type: String},
    country: {type: String},
    location:{type: Array},
    dob: {type: String},
    type:{type: String},
    description:{type: String},
    otp:{type: String},
    deleted: {type: Number, default: 0},
    status: {type: Number, default: 1},
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

userSchema.plugin(mongoosePaginate);


/* generating a hash*/
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    if (this.password != undefined) {
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
