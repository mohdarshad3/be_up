'use strict';
var authService = require('../services/authentication'),
    dataService = require('../services/dataService'),
    mailer = require('../utilities/mailerService'),
    config = require('../config/config.js'),
    path = require('path'),
    fs = require('fs'),
    vash = require('vash'),
    multer = require('multer'),
    session = require('express-session'),
    mongoose = require('mongoose');

var express = require('express');
var route = express.Router();

module.exports = {};
var authController = module.exports;

authController.init = function (app, passport) {

    app.post('/admin/login', function (req, res, next) {

        passport.authenticate('local-admin-login', function (err, user, info) {
            if (!err && user) {
                authService.createAdminToken(user, function (error, token) {
                    if (!error)
                        res.status(200).json({token: token, name: user.name,image:user.image, message: null});
                });
            } else {
                res.status(401).json({token: null, message: info.message});
            }
        })(req, res, next);
    });


    app.post('/user/login', function (req, res, next) {

        passport.authenticate('local-user-login', function (err, user, info) {
            if (!err && user) {
                console.log(user);
                authService.createUserToken(user, function (error, token) {
                    if (!error)
                        res.status(200).json({token: token, name: user.name, role: user.role,image:user.image, message: null});
                });
            } else {
                res.status(401).json({token: null, message: info.message});
            }
        })(req, res, next);
    });


    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './www/uploads/admin');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            req.body.image = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];

            console.log(req.body.image);
            cb(null, req.body.image);
        }
    });
    var upload = multer({ //multer settings
        storage: storage
    }).single('image');

    app.post('/admin/signUp', function (req, res, next) {

        try {
            upload(req, res, function (err) {
                console.log(req.body);
                if (err) {
                    return callback({status: 400, message: err});
                } else {
                    passport.authenticate('local-admin-signup', function (err, user, info) {
                        if (!err && user) {

                            var email = req.body.email;
                            var password = req.body.password;
                            var name = req.body.name;
                            // var otp          = Math.floor(100000 + Math.random() * 900000);
                            var adminBaseUrl = config.adminBaseUrl;
                            //  passenger.otp    = parseInt(otp);
                            var mailData = {email: user.email, subject: 'Password Details'},
                                data = {
                                    templateName: 'OTP Email',
                                    baseUrl: adminBaseUrl,
                                    name: name,
                                    password: password,
                                    email: email

                                },
                                templateName = "register.vash";
                            mailer.sendMail(mailData, data, templateName, false, function (error, responseStatus) {
                                if (error) {
                                    console.log('e');
                                    console.log(error);
                                }
                                console.log('responseStatus');
                                console.log(responseStatus);
                            });

                            authService.createAdminToken(user, function (err, token) {
                                if (!err)
                                    res.status(200).json({token: token, message: null});
                            });
                        } else {

                            res.status(400).json({token: null, message: info.message});
                        }
                    })(req, res, next);
                }
            });
        } catch (error) {
            return callback({status: 500, message: 'Unknown internal error.'});
        }

    });


    app.post('/admin/frontUserSignUp', function (req, res, next) {

        passport.authenticate('local-front-user-signup', function (err, user, info) {
            if (!err && user) {


                var name = req.body.name;
                var baseUrl =  config.userAccountActivateUrl + user._id;

                var mailData     = {email: user.email, subject: 'Sunny Friday Account Activation'},
                    data         = {
                        templateName: 'Account Activation',
                        siteUrl: baseUrl,
                        name: name


                    },
                    templateName = "activate-account.vash";
                mailer.sendMail(mailData, data, templateName, false, function(error, responseStatus) {
                    if(error){
                        console.log('e');
                        console.log(error);
                    }
                    console.log('responseStatus');
                    console.log(responseStatus);
                });

                authService.createUserToken(user, function (err, token) {
                    if (!err)
                        res.status(200).json({token: token, message: null});
                });
            } else {

                res.status(400).json({token: null, message: info.message});
            }
        })(req, res, next);
    });




    app.get('/', function (req, res) {
        res.render('front');
    });

    app.get('/admin', function (req, res) {
        dataService.getInit(config.models.Admin);
        res.render('home');
    });

    app.get('/admin/api/authenticate', authService.isLoggedIn, function (req, res) {
        res.status(200).json({token: req.decoded, message: 'Token Valid'});
    });


    app.get('/admin/login/:token', function (req, res) {
        var token = req.params.token;
        authService.verifyForgotToken(token, function (error, result) {
            if (error)
                return res.status(error.status || 500).json({
                    code: error.status || 500,
                    message: error.message || 'Unable to process request.'
                });

            res.status(200).json(result);
        });
    });


    app.post('/admin/update', function (req, res, callback) {
        var modelName = config.models.Admin;
        try {
            upload(req, res, function (err) {
                console.log(req.body);
                if (err) {
                    return res.status(400).json({
                        status: 400,
                        message: err
                    });
                } else {

                    if (req.body.image != undefined || req.body.image != '') {
                        if (err) {
                            return res.status(400).json({
                                status: 400,
                                message: err
                            });
                        } else {
                            var Admin = require('../models/' + modelName);
                            var data = req.body;
                            if (data.length === 0)
                                return res.status(400).json({
                                    status: 400,
                                    message: 'Bad request. No record found.'
                                });

                            Admin.findOne({
                                $and: [
                                    {
                                        phone: data.phone
                                    }, {
                                        '_id': {$ne: mongoose.Types.ObjectId(data._id)}
                                    }
                                ]
                            }, function (err, result) {
                                if (!err) {
                                    if (result) {
                                        return res.status(400).json({
                                            status: 400,
                                            message: 'Phone no all ready  Exist'
                                        });
                                    } else {
                                        Unlink('uploads/admin/' + req.body.oldImage, false, function (err) {
                                            if (!err) {
                                                var data = req.body;
                                                var _id = data._id;
                                                delete data._id;
                                                if (data.length === 0)
                                                    return res.status(400).json({
                                                        status: 400,
                                                        message: 'Bad request. No record found.'
                                                    });
                                                if (_id === undefined)
                                                    return res.status(400).json({
                                                        status: 400,
                                                        message: 'Update _id not found.'
                                                    });
                                                var Admin = require('../models/' + modelName);

                                                Admin.update({_id: mongoose.Types.ObjectId(_id)},
                                                    data, function (error, response) {
                                                        if (error) {

                                                            return res.status(error.status || 500).json({
                                                                status: error.status || 500,
                                                                message: error.message || 'Unknown internal error.'
                                                            });
                                                        }

                                                        return res.status(200).json(response);
                                                    });
                                            }
                                            else {
                                                return res.status(400).json({
                                                    status:400,
                                                    message: error.message || 'File Upload Failed'
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    return res.status(500).json({
                                        status:500,
                                        message:'Unknown internal error.'
                                    });
                                }
                            });
                        }
                    } else {
                        var data = req.body;
                        var _id = data._id;
                        delete data._id;
                        if (data.length === 0)
                            return res.status(400).json({
                                status:400,
                                message:'Bad request. No record found.'
                            });
                        if (_id === undefined)
                            return res.status(400).json({
                                status:400,
                                message:'Update _id not found.'
                            });
                        var Admin = require('../models/' + modelName);
                        Admin.findOne({phone: data.phone}, function (err, result) {
                            if (!err) {
                                if (result) {
                                    return res.status(400).json({
                                        status:400,
                                        message:'Phone no all ready  Exist'
                                    });
                                } else {
                                    Admin.update({_id: mongoose.Types.ObjectId(_id)},
                                        data, function (error, response) {
                                            if (error) {
                                                return res.status(500).json({
                                                    status:500,
                                                    message:'Unknown internal error.'
                                                });
                                            }
                                            return res.status(200).json(response);
                                        });
                                }
                            } else {
                                return res.status(500).json({
                                    status:500,
                                    message:'Unknown internal error.'
                                });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:'Unknown internal error.'
            });
        }

    });

    app.post('/admin/forgotpassword', function (req, res) {


          var  email = req.body.email;

        if (email === undefined || email === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.forgotPassword(req, res, function (error) {

            return res.status(error.status || 500).json({
                code: error.status || 500,
                message: error.message || 'Unable to process request.'
            });


        });
    });





    var Unlink                            = function(orgFile, thumbFile, callback) {
        fs.exists(orgFile, function(exists) {
            if (exists) {
                fs.unlink(orgFile, function(err) {
                    if (!err) {
                        if (thumbFile) {
                            fs.exists(thumbFile, function(exists) {
                                if (exists) {
                                    fs.unlink(thumbFile, function(err) {
                                        if (!err) {
                                            return callback(false);
                                        }
                                    });
                                } else {
                                    return callback(false);
                                }
                            })
                        } else {
                            return callback(false);
                        }
                    } else {
                        return callback(true);
                    }
                })
            } else {
                return callback(false);
            }
        })
    };

};

