'use strict';

var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin');
var User = require('../models/user'),
    config = require('../config/config');
// expose this function to our app using module.exports
module.exports = function (passport) {




    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-admin-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                Admin.findOne({'email': email,deleted:0}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, {message:'That email is already taken.'});
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new Admin();
                        // set the user's local credentials
                        newUser.email = email;
                        newUser.name = (req.body.name) ? req.body.name : '';
                        newUser.image = (req.body.image) ? req.body.image : '';
                        newUser.phone = (req.body.phone) ? req.body.phone : '';
                        newUser.type = (req.body.type) ? req.body.type : '';

                        newUser.password = newUser.generateHash(password);
                        // save the user
                        saveUser(newUser, done);
                    }

                });

            });

        }));


    // =========================================================================
    // LOCAL FRONT SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-front-user-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({'email': email,deleted:0}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, {message:'That email is already taken.'});
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();
                        // set the user's local credentials

                        var otp          = Math.floor(100000 + Math.random() * 900000);
                        newUser.email = email;
                        newUser.name = (req.body.name) ? req.body.name : '';
                        newUser.status = '0';
                        newUser.type = (req.body.type) ? req.body.type : '';



                        newUser.password = newUser.generateHash(password);
                        // save the user
                        saveUser(newUser, done);
                    }

                });

            });

        }));


    // =========================================================================
    // LOCAL USER SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-user-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({'email': email,status:1,deleted:0}, function (err, user) {
                // if there are any errors, return the error before anything else
                console.log(err);
                console.log(user);
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {message:'Email not exists in our system or user dactivate from the system.'}); // req.flash is the way to set flashdata using connect-flash
                //console.log(user);
                // if the user is found but the password is wrong

                if (!user.validPassword(password))
                    return done(null, false, {message:'Oops! Wrong password.'}); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user
                return done(null, user);
            });

        }));


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-admin-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            Admin.findOne({'email': email,status:1,deleted:0}, function (err, user) {
                // if there are any errors, return the error before anything else

                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {message:'Email not exists in our system or user dactivate from the system.'}); // req.flash is the way to set flashdata using connect-flash
                //console.log(user);
                // if the user is found but the password is wrong

                if (!user.validPassword(password))
                    return done(null, false, {message:'Oops! Wrong password.'}); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user
                return done(null, user);
            });

        }));


// =========================================================================
    // LOCAL User Add ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-user-adduser', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({'email': email,deleted:0}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, {message:'That email is already taken.'});
                    } else {

                        // if there is no user with that email
                        // create the user
                        var location = [];
                        var newUser = new User();
                        // set the user's local credentials
                        newUser.email = email;
                        newUser.name = (req.body.name) ? req.body.name : '';
                        newUser.lastName = (req.body.lastName) ? req.body.lastName : '';
                        newUser.dob = (req.body.dob) ? req.body.dob : '';
                        newUser.company = (req.body.company) ? req.body.company : '';
                        newUser.address = (req.body.address) ? req.body.address : '';
                        newUser.location[0] = req.body.location;
                        newUser.location[1] = req.body.location;
                        newUser.type = (req.body.type) ? req.body.type : '';
                        newUser.country = (req.body.country) ? req.body.country : '';
                        console.log(newUser);



                        newUser.password = newUser.generateHash(password);
                        // save the user
                        saveUser(newUser, done);
                    }

                });

            });

        }));

    function saveUser(user, done) {
        user.save(function (err) {
            if (err)
                throw err;
            return done(null, user);
        });
    }
};
