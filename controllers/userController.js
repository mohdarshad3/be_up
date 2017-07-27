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
    mongoose = require('mongoose'),
    __ = require('lodash'),
    authorizationUser = require('../services/authentication').authUserChecker,
    authorizationAdmin = require('../services/authentication').authAdminChecker,
    Rate = require('../models/rate'),
    Product = require('../models/product');


var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyBEZCufQ0L9qkDeOtuBBvoUdIOeQDWuZNc', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

module.exports = {};
var userController = module.exports;

userController.init = function (app, passport) {

    app.post('/admin/adduser', function (req, res, next) {

        passport.authenticate('local-user-adduser', function (err, user, info) {

            if (!err && user) {

                var email = req.body.email;
                var password = req.body.password;
                var name = req.body.name;

                var baseUrl = config.baseUrl;

                var mailData = {email: user.email, subject: 'Password Details'},
                    data = {
                        templateName: 'OTP Email',
                        baseUrl: baseUrl,
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

                    authService.createTokenUser(user, function (err, token) {
                        if (!err)
                            res.status(200).json({token: token, message: null});
                    });
                });

            } else {

                res.status(400).json({token: null, message: info.message});
            }
        })(req, res, next);
    });

    app.get('/admin/getUserList/:page', authorizationAdmin, function (req, res) {
        var page = req.params.page;
        var query = {
            deleted: 0
        };
        var options = {
            page: page,
            sort: {created: -1}
        };
        dataService.getPagination(config.models.User, query, options, function (err, data) {
            if (!err) {
                res.status(200).json(data);
            }
        })
    });

    app.get('/user/:id/edit', function (req, res) {

        var adminId = req.params.id;
        dataService.getSingleRecord(config.models.User, adminId, function (status, err, user) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: user
            });

        });
    });

    app.post('/user/update', function (req, res) {


        if (req.body.location.lat != undefined && req.body.location.lng != undefined) {
            req.body.location = JSON.parse("[" + [req.body.location.lng, req.body.location.lat] + "]");
        }
        dataService.update(config.models.User, req.body._id, req.body, function (status, err) {
            return res.status(status).json({
                message: (err == null) ? null : err.message
            });
        });
    });

    app.post('/user/otpConfirmation', function (req, res, next) {

        var _id = req.body._id,
            otp = req.body.otp;

        if (_id === undefined || _id === '' || otp === undefined || otp === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.otpConfirmation(_id, otp, function (error) {

            return res.status(error.status || 500).json({
                code: error.status || 500,
                message: error.message || 'Unable to process request.'
            });


        });
    });

    app.post('/user/resetPassword', function (req, res, next) {

        var _id = req.body._id,
            password = req.body.password;

        if (_id === undefined || _id === '' || password === undefined || password === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.resetUserPassword(_id, password, function (error) {

            return res.status(error.status || 500).json({
                code: error.status || 500,
                message: error.message || 'Unable to process request.'
            });


        });
    });

    app.get('/user/activateAccount/:activateId', function (req, res, next) {


        var activateId = req.params.activateId;


        if (activateId === undefined || activateId === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.activateAccount(activateId, function (err, user) {


            if (!err && user) {
                authService.createTokenUser(user, function (error, token) {
                    if (!error)
                        res.status(200).json({
                            token: token,
                            name: user.name,
                            role: user.role,
                            image: user.image,
                            message: 'Your Account Activated Successfully'
                        });
                });
            } else {
                res.status(401).json({token: null, message: info.message});
            }


        });
    });


    app.get('/user/:id/statusChange/:status', function (req, res) {

        var adminId = req.params.id;
        var status = (req.params.status == 1) ? 0 : 1;

        dataService.changeStatusSingleRecord(config.models.User, adminId, status, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });

    app.get('/user/:id/delete', function (req, res) {

        var userId = req.params.id;
        dataService.deleteSingleRecord(config.models.User, userId, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });

    app.post('/user/forgotpassword', function (req, res) {


        var email = req.body.email;

        if (email === undefined || email === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.frontForgotPassword(req, res, function (error) {

            return res.status(error.status || 500).json({
                code: error.status || 500,
                message: error.message || 'Unable to process request.'
            });


        });
    });

    app.get('/user/profile', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        dataService.getSingleRecord(config.models.User, userId, function (status, err, user) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: user
            });

        });
    });


    app.get('/otherUser/profile/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        dataService.getSingleRecord(config.models.User, userId, function (status, err, user) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: user
            });

        });
    });


    app.get('/otherUser/sharePost/:postId/:userName', authorizationUser, function (req, res) {

        var postId = req.params.postId;
        var userName = req.params.userName;
        var userId = req.decoded.id;
        var userPost = require('../models/userPost');
        userPost.findOne({_id: postId})
            .lean()
            .exec(function (err, data) {
                if (!err) {
                    data.originalUser = data.user;
                    data.originalUserName = userName;
                    data.user = userId;
                    data.original = false;
                    delete(data._id);

                    var NewPost = new userPost(data);

                    NewPost.save(function (err) {
                        if (!err) {
                            res.status(200).json(data);
                        } else {
                            res.status(400).json(err);
                        }
                    });


                }
            });
    });


    app.get('/user/getMessage/:active', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var active = req.params.active;

        if (active == 'inbox') {

            var query = {
                to: userId,
                deleted: 0
            }
        } else {
            var query = {
                from: userId,
                deleted: 0
            }

        }

        var message = require('../models/message');
        message.find(query)
            .sort({_id: -1})
            .populate([{path: 'from', select: 'name email type profilePic'}, {
                path: 'to',
                select: 'name email type profilePic'
            }])
            .exec(function (err, data) {
                if (!err) {
                    res.status(200).json(data);
                }
            });


    });

    app.get('/userSearch/find_bkp', authorizationUser, function (req, res) {

        var username = req.query.s;
        var userId = req.decoded.id;
        var following = require('../models/following');
        following.find({follower: userId, accept: true, cancel: false})
            .exec(function (err, dataDetail) {
                if (!err && dataDetail.length != 0) {
                    var query = {
                        name: {$regex: '.*' + username + '.*'},
                        deleted: 0,
                        status: 1,
                        _id: __.map(dataDetail, 'following')
                    };
                    var user = require('../models/user');
                    user.find(query)
                        .lean()
                        .exec(function (err, data) {
                            if (!err && data.length != 0) {
                                for (var i = 0; i < data.length; i++) {
                                    data[i].profilePic = config.imageUrl + data[i].profilePic;

                                }

                                return res.status(200).json({results: data});
                            } else {
                                return res.status(200).json({results: data});
                            }
                        });
                } else {
                    return res.status(400).json({results: data});
                }
            });


    });

    app.get('/userSearch/find', authorizationUser, function (req, res) {

        var username = req.query.s;
        var userId = req.decoded.id;
        var following = require('../models/following');
        var query = {
            name: {$regex: '.*' + username + '.*'},
            deleted: 0,
            status: 1,
            _id: {$ne: userId}

        };
        var user = require('../models/user');
        user.find(query)
            .lean()
            .exec(function (err, data) {
                if (!err && data.length != 0) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].profilePic = config.imageUrl + data[i].profilePic;

                    }

                    return res.status(200).json({results: data});
                } else {
                    return res.status(200).json({results: data});
                }
            });

    });

    app.post('/user/compose', authorizationUser, function (req, res) {

        var from = req.decoded.id;
        req.body.from = from;

        if (req.body.testObject.originalObject != undefined) {


            var to = req.body.testObject.originalObject._id;

            req.body.to = to;

        }


        var ModelObj = require('../models/message');
        var NewAdmin = new ModelObj(req.body);

        NewAdmin.save(function (err) {
            if (!err) {
                res.status(200).json({message: 'success'});
            } else {
                res.status(400).json({err: 'error'});
            }
        });


    });


    app.get('/user/searchMessageByName/:name/:active', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var active = req.params.active;
        var name = req.params.name;
        var user = require('../models/user');
        user.find({name: {$regex: '.*' + name + '.*'}, deleted: 0, status: 1})
            .exec(function (err, data) {

                if (!err && data.length != 0) {
                    if (active == 'inbox') {

                        var query = {
                            to: userId,
                            deleted: 0,
                            from: __.map(data, '_id')
                        }
                    } else {
                        var query = {
                            from: userId,
                            deleted: 0,
                            to: __.map(data, '_id')
                        }

                    }

                    var message = require('../models/message');
                    message.find(query)
                        .populate([{path: 'from', select: 'name email type profilePic'}, {
                            path: 'to',
                            select: 'name email type profilePic'
                        }])
                        .exec(function (err, result) {
                            if (!err) {
                                res.status(200).json(result);
                            }
                        });


                }else{
                    res.status(200).json(data);

                }
            });


    });


    app.get('/user/getMessageDetail/:id', authorizationUser, function (req, res) {

        var message = require('../models/message');

        message.update({_id: mongoose.Types.ObjectId(req.params.id)}, //condition
            {$set: {check: true}}, function (err) {
                if (!err) {
                    message.findOne({_id: req.params.id})
                        .populate([{path: 'from', select: 'name email type profilePic'}, {
                            path: 'to',
                            select: 'name email type profilePic'
                        }])
                        .exec(function (error, result) {
                            if (!error) {
                                res.status(200).json(result);
                            }
                        });
                } else {
                    res.status(400).json({err: 'err'});
                }
            });


    });
    app.get('/user/messageNotification', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var message = require('../models/message');
        message.find({to: userId, check: false})
            .populate([{path: 'from', select: 'name email type profilePic'}])
            .exec(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                }
            });

    });
    app.get('/user/messageNotificationCount', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var message = require('../models/message');
        message.count({to: userId, check: false})
            .exec(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                }
            });

    });

    app.get('/user/followingCount', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var message = require('../models/following');
        message.count({following: userId, accept: true, cancel: false,check:false})
            .exec(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                }
            });

    });

    app.get('/user/followNotification', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        var following = require('../models/following');
        following.find({following: userId, accept: true, cancel: false,check:false})
            .populate([{path: 'follower', select: 'name email type profilePic'}])
            .exec(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                }
            });

    });


    app.get('/user/getFollowersCount', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var following = require('../models/following');
        following.count({following: userId, accept: true, cancel: false})
            .exec(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                }
            });

    });

    app.get('/user/getUserFollowersCount/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        var following = require('../models/following');
        following.count({following: userId, accept: true, cancel: false})
            .exec(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                }
            });

    });


    app.get('/user/getFollowersList/:page', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        var page = req.params.page;
        var query = {
            following: userId,
            accept: true,
            cancel: false
        };
        var options = {
            page: page,
            sort: {created: -1},
            populate: [{path: 'follower', select: 'name email profilePic type'}]
        };
        dataService.getPagination(config.models.Following, query, options, function (err, data) {
            if (!err) {
                res.status(200).json(data);
            }
        })
    });

    app.get('/user/getUserFollowersList/:page/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        var loginUserId = req.decoded.id;

        var page = req.params.page;
        var query = {
            following: userId,
            accept: true,
            cancel: false
        };
        var options = {
            page: page,
            sort: {created: -1},
            populate: [{path: 'follower', select: 'name email profilePic type'}]
        };
        dataService.getPagination(config.models.Following, query, options, function (err, resultData) {

         console.log(resultData.docs);
            if (!err && resultData.docs.length != 0) {

                var query1 = {
                    follower: loginUserId,
                    deleted: 0
                };
                var follow = require('../models/following');
                follow.find(query1)
                    .exec(function (error, followData) {

                        console.log(followData);


                        if (!error && followData.length != 0) {
                            for (var i = 0; i < resultData.docs.length; i++) {
                                resultData.docs[i]['follow'] = 0;
                                for (var j = 0; j < followData.length; j++) {
                                    if (resultData.docs[i].follower._id.equals(followData[j].following) && loginUserId == followData[j].follower && followData[j].cancel == false) {
                                        resultData.docs[i]['follow'] = 1
                                    }

                                }

                            }

                            res.status(200).json(resultData);

                        } else {

                            res.status(200).json(resultData);

                        }
                    });


            } else {
                res.status(200).json(resultData);
            }
        })
    });

    /*  app.get('/user/getFollowingList',authorizationUser, function (req, res) {

     var userId = req.decoded.id;
     var following = require('../models/following');
     following.find({follower:userId,accept:true,cancel:false})
     .populate([{path:'following', select:'name email profilePic type'}])
     .exec(function (err, result) {
     if (!err) {
     res.status(200).json(result);
     }
     });

     }); */

    app.get('/user/getFollowingList/:page', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        var page = req.params.page;
        var query = {
            follower: userId,
            accept: true,
            cancel: false
        };
        var options = {
            page: page,
            sort: {created: -1},
            populate: [{path: 'following', select: 'name email profilePic type'}]
        };
        dataService.getPagination(config.models.Following, query, options, function (err, data) {
            if (!err) {
                res.status(200).json(data);
            }
        })
    });

   /* app.get('/user/getUserFollowingList/:page/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;

        var page = req.params.page;
        var query = {
            follower: userId,
            accept: true,
            cancel: false
        };
        var options = {
            page: page,
            sort: {created: -1},
            populate: [{path: 'following', select: 'name email profilePic type'}]
        };
        dataService.getPagination(config.models.Following, query, options, function (err, data) {
            if (!err) {
                res.status(200).json(data);
            }
        })
    }); */


    app.get('/user/getFollowingCount', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var following = require('../models/following');
        following.count({follower: userId, accept: true, cancel: false})
            .exec(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                }
            });

    });
    app.get('/user/getUserFollowingCount/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        var following = require('../models/following');
        following.count({follower: userId, accept: true, cancel: false})
            .exec(function (err, result) {
                if (!err) {
                    res.status(200).json(result);
                }
            });

    });


    app.get('/user/getUserFollowingList/:page/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        var loginUserId = req.decoded.id;
        console.log('ki');

        var page = req.params.page;
        var query = {
            follower: userId,
            accept: true,
            cancel: false
        };
        var options = {
            page: page,
            sort: {created: -1},
            populate: [{path: 'following', select: 'name email profilePic type'}]
        };
        dataService.getPagination(config.models.Following, query, options, function (err, resultData) {
            if (!err && resultData.docs.length != 0) {

                var query1 = {
                    follower: loginUserId,
                    deleted: 0
                };
                console.log(resultData.docs[0].following._id);

                var follow = require('../models/following');
                follow.find(query1)
                    .exec(function (error, followData) {
                        console.log(followData);


                        if (!error && followData.length != 0) {
                            for (var i = 0; i < resultData.docs.length; i++) {
                                resultData.docs[i]['follow'] = 0;
                                for (var j = 0; j < followData.length; j++) {
                                    if (resultData.docs[i].following._id.equals(followData[j].following) && loginUserId == followData[j].follower && followData[j].cancel == false) {
                                        resultData.docs[i]['follow'] = 1
                                    }

                                }

                            }

                            res.status(200).json(resultData);

                        } else {

                            res.status(200).json(resultData);

                        }
                    });


            } else {
                res.status(200).json(resultData);
            }
        })
    });





    app.post('/user/geographicalsearch', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        var page = req.body.currentPage;


        var query = {
            _id: {$ne: userId},
            deleted: 0
        };

        if (req.body.lat != undefined && req.body.lat != '' && req.body.long != undefined && req.body.long != '') {
            if(req.body.miles != undefined && req.body.miles != ''){
                query.location={
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [req.body.long, req.body.lat]
                        },
                        $maxDistance: req.body.miles * 1609.34
                    }
                };
            }


        }



        if (req.body.searchUser != undefined && req.body.searchUser != '') {
            query.name= {$regex: '.*' + req.body.searchUser + '.*'};
        }
        if (req.body.type != undefined && req.body.type != '') {

            query.type = req.body.type;

        }

        console.log(query);

        var options = {
            page: page,
            sort: {created: -1}
        };

        dataService.getPagination(config.models.User, query, options, function (err, resultData) {
            if (!err && resultData.docs.length != 0) {

                var query1 = {
                    follower: userId,
                    deleted: 0
                };

                var follow = require('../models/following');
                follow.find(query1)
                    .exec(function (error, followData) {


                        if (!error && followData.length != 0) {
                            for (var i = 0; i < resultData.docs.length; i++) {
                                resultData.docs[i]['following'] = 0;
                                for (var j = 0; j < followData.length; j++) {
                                    if (resultData.docs[i]._id.equals(followData[j].following) && userId == followData[j].follower && followData[j].cancel == false) {
                                        resultData.docs[i]['following'] = 1
                                    }

                                }

                            }

                            res.status(200).json(resultData);

                        } else {

                            res.status(200).json(resultData);

                        }
                    });


            } else {
                res.status(200).json(resultData);
            }
        });

    });



    app.post('/user/geographicalsearch_bkp', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var user = require('../models/user');
        user.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [req.body.lat, req.body.long]
                    },
                    $maxDistance: req.body.miles
                }
            },
            type: req.body.type,
            _id: {$ne: userId}
        }).lean(true)
            .exec(function (err, resultData) {
                if (!err && resultData.length != 0) {

                    var query1 = {
                        follower: userId,
                        deleted: 0
                    };

                    var follow = require('../models/following');
                    follow.find(query1)
                        .exec(function (error, followData) {


                            if (!error && followData.length != 0) {
                                for (var i = 0; i < resultData.length; i++) {
                                    resultData[i]['following'] = 0;
                                    for (var j = 0; j < followData.length; j++) {
                                        if (resultData[i]._id.equals(followData[j].following) && userId == followData[j].follower && followData[j].cancel == false) {
                                            resultData[i]['following'] = 1
                                        }

                                    }

                                }

                                res.status(200).json(resultData);

                            } else {

                                res.status(200).json(resultData);

                            }
                        });


                }
            });

    });

    app.get('/user/searchUserByPinCode/:pincode', function (req, res) {


        geocoder.geocode({address: re.params.pincode})
            .then(function (result) {
                if (res.length != 0) {

                    var user = require('../models/user');
                    user.find({
                        location: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [result.latitude, result.longitude]
                                },
                                $maxDistance: req.body.miles
                            }
                        },
                        type: req.body.type
                    }).exec(function (error, resultData) {
                        if (!error) {
                            res.status(200).json(resultData);
                        }
                    });
                }

            })
            .catch(function (err) {
                console.log(err);
            });

    });


    app.get('/user/searchProductsByPincode/:pincode', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        geocoder.geocode({address: req.params.pincode})
            .then(function (result) {


                if (result.length != 0) {

                    var product = require('../models/product');
                    product.find({
                        location: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [result[0].longitude, result[0].latitude]
                                },
                                $maxDistance: 10000
                            }
                        },
                        user: req.decoded.id, deleted: 0
                    }).populate([{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}])
                        .lean(true)
                        .exec(function (err, resultData) {
                            if (!err && resultData.length != 0) {

                                var query1 = {
                                    user: userId,
                                    deleted: 0
                                };

                                var rate = require('../models/rate');
                                rate.find(query1)
                                    .exec(function (error, rating) {
                                        if (!error && rating.length != 0) {
                                            for (var i = 0; i < resultData.length; i++) {
                                                resultData[i]['rate'] = 0;
                                                for (var j = 0; j < rating.length; j++) {
                                                    if (resultData[i]._id.equals(rating[j].product) && rating[j].user == userId) {
                                                        resultData[i]['rate'] = rating[j].rating;
                                                    }

                                                }

                                            }

                                            res.status(200).json(resultData);

                                        } else {

                                            res.status(200).json(resultData);

                                        }
                                    });


                            } else {
                                res.status(200).json(resultData);
                            }
                        });
                } else {
                    res.status(200).json({});

                }

            })
            .catch(function (err) {
                console.log(err);
            });

    });


    app.get('/otherUser/searchProductsByPincode/:pincode/:userId', authorizationUser, function (req, res) {


        geocoder.geocode({address: req.params.pincode})
            .then(function (result) {


                if (result.length != 0) {

                    var product = require('../models/product');
                    product.find({
                        location: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [result[0].latitude, result[0].longitude]
                                },
                                $maxDistance: 100
                            }
                        },
                        user: req.params.userId, deleted: 0
                    }).populate([{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}])
                        .exec(function (error, resultData) {

                            if (!error) {
                                res.status(200).json(resultData);
                            } else {
                                res.status(400).json({err: 'err'});
                            }
                        });
                } else {
                    res.status(200).json({});

                }

            })
            .catch(function (err) {
                console.log(err);
            });

    });


    app.get('/user/rateProduct/:productId/:rate/:userId', authorizationUser, function (req, res) {

        var data = {};
        data.rating = req.params.rate;
        data.user = req.params.userId;
        data.product = req.params.productId;

        var userId = data.user;
        var productId = data.product;
        var RateObj = require('../models/rate');

        RateObj.findOne({user: data.user, product: data.product}, function (err, result) {
            if (!err && result == null) {
                var NewRate = new RateObj(data);
                NewRate.save(function (err) {
                    if (!err) {


                        var agquery = [{$match: {product: mongoose.Types.ObjectId(productId)}},
                            {
                                $group: {
                                    _id: "$product",
                                    markAvg: {$avg: "$rating"}
                                }

                            }];


                        Rate.aggregate(agquery, function (errorr, averageRatingData) {

                                if (errorr) {
                                    return res.status(400).json({err: 'error'});
                                } else {
                                    Product.update({_id: mongoose.Types.ObjectId(productId)}, //condition
                                        {$set: {avgRating: averageRatingData[0].markAvg}}, function (errorrrr, avgrating) {
                                            if (!errorrrr) {

                                                return res.status(200).json({message: 'update'});

                                            } else {

                                                return res.status(400).json({err: 'err'});
                                            }

                                        });
                                }
                            }
                        );
                    } else {
                        res.status(400).json({err: 'error'});
                    }
                });
            } else if (!err && result != null) {


                RateObj.update({_id: mongoose.Types.ObjectId(result._id)}, //condition
                    {$set: {rating: data.rating}}, function (err) {
                        if (!err) {

                            var agquery = [{$match: {product: mongoose.Types.ObjectId(productId)}},
                                {
                                    $group: {
                                        _id: "$product",
                                        markAvg: {$avg: "$rating"}
                                    }

                                }];


                            Rate.aggregate(agquery, function (errorr, averageRatingData) {

                                    if (errorr) {
                                        return res.status(400).json({err: 'errorrrrrr'});
                                    } else {


                                        Product.update({_id: mongoose.Types.ObjectId(productId)}, //condition
                                            {$set: {avgRating: averageRatingData[0].markAvg}}, function (errorrrr, avgrating) {

                                                if (!errorrrr) {

                                                    return res.status(200).json({message: 'update'});

                                                } else {

                                                    return res.status(400).json({err: 'erred'});
                                                }

                                            });
                                    }
                                }
                            );

                        } else {
                            res.status(400).json({err: 'e'});
                        }
                    });

            } else {
                res.status(400).json({err: 'errorrr'});

            }


        })


    });

    app.get('/user/getProductRating/:productId', authorizationUser, function (req, res) {



        var userId = req.decoded.id;
        var productId = req.params.productId;
        var RateObj = require('../models/rate');

        RateObj.findOne({user: userId, product: productId}, function (err, result) {
            if (!err) {
                res.status(200).json({data: result, message: 'success'});

            } else {
                res.status(400).json({data: result, error: 'error'});

            }


        })


    });



    app.get('/user/:followId/cancelFollowRequest', authorizationUser, function (req, res) {

        var data = {};

        data.follower = req.decoded.id;
        data.following = req.params.followId;


        var FollowingObj = require('../models/following');


        FollowingObj.findOne({follower: data.follower, following: data.following}, function (err, result) {
            if (!err && result != null) {
                FollowingObj.update({_id: result._id}, {$set: {cancel: true}}, function (er, resultData) {
                    if (!er) {
                        res.status(200).json({data: resultData.accept, message: 'Follow request cancel successfully'});
                    } else {
                        res.status(400).json({err: 'error'});
                    }
                });
            }
        });


    });

    app.get('/user/:followerId/cancelFollower', authorizationUser, function (req, res) {

        var data = {};

        data.following = req.decoded.id;
        data.follower = req.params.followerId;


        var FollowingObj = require('../models/following');


        FollowingObj.findOne({follower: data.follower, following: data.following}, function (err, result) {
            if (!err && result != null) {
                FollowingObj.update({_id: result._id}, {$set: {accept: false}}, function (er, resultData) {
                    if (!er) {
                        res.status(200).json({
                            data: resultData.accept,
                            message: 'Follower request cancel successfully'
                        });
                    } else {
                        res.status(400).json({err: 'error'});
                    }
                });
            }
        });


    });
    app.get('/user/:followId/followRequest', authorizationUser, function (req, res) {

        var data = {};

        data.follower = req.decoded.id;
        data.following = req.params.followId;


        var FollowingObj = require('../models/following');


        FollowingObj.findOne({follower: data.follower, following: data.following}, function (err, result) {
            if (!err && result != null) {
                FollowingObj.update({_id: result._id}, {
                    $set: {
                        cancel: false,
                        accept: true
                    }
                }, function (er, resultData) {
                    if (!er) {
                        res.status(200).json({
                            data: resultData.accept,
                            message: 'Follow request send again successfully'
                        });
                    } else {
                        res.status(400).json({err: 'error'});
                    }
                });
            } else {
                var NewFollowing = new FollowingObj(data);
                NewFollowing.save(function (er, resultData) {
                    if (!er) {
                        res.status(200).json({data: resultData.accept, message: 'Follow request send successfully'});
                    } else {
                        res.status(400).json({err: 'error'});
                    }
                });
            }
        });


    });
};