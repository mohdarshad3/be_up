'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    mongoosePaginate = require('mongoose-paginate')
    ;

var adminSchema = mongoose.Schema({
    email: {type: String,required: true, trim: true},
    password: {type:String, required: true},
    name: {type:String, required: true},
    forgotPasswordToken: String,
    image:String,
    type:{type: String},
    otp: String,
    phone: {type: Number},
    role: {type: Number, default: 0},//1 =  admin  0 =  user
    deleted: {type: Number, default: 0},
    status: {type: Number, default: 1},
    alexaToken: String,
    created: {type: Date, default: Date.now()},
    modified: {type: Date, default: Date.now()}
});

adminSchema.plugin(mongoosePaginate);


/* generating a hash*/
adminSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function (password) {
    if (this.password != undefined) {
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Admin', adminSchema);
