'use strict';
var dataService = require('../services/dataService'),
    authorizationUser = require('../services/authentication').authUserChecker,
    authorizationAdmin = require('../services/authentication').authAdminChecker,
    config = require('../config/config.js'),
    mongoose = require('mongoose'),
    config = require('../config/config.js'),
    fs = require('fs'),
    multer = require('multer'),
    path = require('path');


module.exports = {};
var websiteController = module.exports;

websiteController.init = function (app) {


    app.get('/admin/:id/edit', function (req, res) {

        var adminId = req.params.id;
        dataService.getSingleRecord(config.models.Admin, adminId, function (status, err, user) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: user
            });

        });
    });
    app.get('/admin/websiteDetail', function (req, res) {


       var modelName = config.models.WebsiteContent;
        var WebsiteDetail = require('../models/' + modelName);
        WebsiteDetail.findOne(function (err, result) {
            console.log(err);
            console.log(result);
            if (err) {
                return res.status(500).json({
                    status:500,
                    message:'Unknown internal error.'
                });
            } else if(result == null){
                    var result = {
                        "name" : "admin",
                        "email" : "dummy@gmail.com",
                        "hostName" : "http://localhost",
                        "phone" : "9716983944",
                        "portNumber" : "25",
                        "smtpPassword" : "1234",
                        "smtpUserName" : "1234"


                    };
                console.log(result);
                    var NewObj = new WebsiteDetail(result);
                    NewObj.
                        save(function (error) {
                        console.log(error);
                        if (!error) {
                            return res.status(200).json(result);
                        } else {
                            return callback(config.StatusCode.BedRequest, error);
                        }
                    });


                }else{
                    return res.status(200).json(result);

                }


        });
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


    app.post('/admin/updateContent', function (req, res, callback) {
        var modelName = config.models.WebsiteContent;
        try {
            upload(req, res, function (err) {
                console.log(req.body);
                if (err) {
                    return res.status(400).json({
                        status: 400,
                        message: err
                    });
                } else {

                    console.log(req.body);

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
                                        '_id': {$ne: mongoose.Types.ObjectId(data._id)}
                                    }
                                ]
                            }, function (err, result) {
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
    var Unlink                            = function(orgFile, thumbFile, callback) {
     console.log(orgFile);
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

