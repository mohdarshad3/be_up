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
    authorizationUser = require('../services/authentication').authUserChecker,
    authorizationAdmin = require('../services/authentication').authAdminChecker;

module.exports = {};
var frontUserTimeLineController = module.exports;

frontUserTimeLineController.init = function (app) {


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


    app.post('/userTimeLine/addUserTimeLinePost',authorizationUser, function (req, res) {

        try {

            var ModelObj = require('../models/userPost');

            req.body.user = req.decoded.id;

            var userPost = new ModelObj(req.body);
            userPost.save(function(error) {
                if (!error) {
                    res.status(200).json({message: 'That Post saved Successfully.'});
                }else {
                    res.status(400).json({message: error});
                }
            });
        } catch (error) {
            res.status(500).json({message: 'Unknown internal errorrr.'});
        }

    });



    app.post('/userTimeLine/addUserTimeLinePicture',authorizationUser, function (req, res, next) {

        try {
            upload(req, res, function (err) {
                console.log(req.body);
                if (err) {
                    return callback({status: 400, message: err});
                } else {
                    var ModelObj = require('../models/userPost');


                    req.body.user = req.decoded.id;
                    var userPost = new ModelObj(req.body);
                    userPost.save(function(error) {
                        if (!error) {
                            res.status(200).json({message: 'That Post saved Successfully.'});
                        }else {
                            res.status(400).json({message: error});
                        }
                    });
                }
            });
        } catch (error) {
            return callback({status: 500, message: 'Unknown internal error.'});
        }

    });


    app.get('/userTimeLine/likeUnlikePost/:likeUnlike/:postId', authorizationUser, function (req, res) {

        var data = {};
        data.like= req.params.likeUnlike;
        data.user = req.decoded.id;
        data.userPost = req.params.postId;



        var LikeObj = require('../models/like');

        LikeObj.findOne({user:data.user,userPost:data.userPost},function(err,result){


            if(!err && result == null){
                var NewLike = new LikeObj(data);
                NewLike.save(function(err) {
                    if (!err) {
                        LikeObj.count({userPost:data.userPost,like:true},function(err,count){


                            res.status(200).json({message:'success',count:count});



                        })
                    }else {
                        res.status(400).json({err:'error'});
                    }
                });
            }else if(!err && result != null){



                LikeObj.update({_id: mongoose.Types.ObjectId(result._id)}, //condition
                    {$set: {like: data.like}},function(err) {
                        if (!err) {
                            LikeObj.count({userPost:data.userPost,like:true},function(err,count){


                                res.status(200).json({message:'success',count:count});



                            })
                        }else {
                            res.status(400).json({err:'err'});
                        }
                    });

            }else{
                res.status(400).json({err:'errorrr'});

            }



        })




    });

    app.post('/userTimeLine/postComment', authorizationUser, function (req, res) {

        var data = {};
        data = req.body;
        data.user = req.decoded.id;



        var CommentObj = require('../models/comment');

        var NewComment = new CommentObj(data);
        NewComment.save(function(err,data) {
            if (!err) {
                res.status(200).json({message:'success',id:data._id});
            }else {
                res.status(400).json({err:'error'});
            }
        });




    });

    app.get('/userTimeLine/deleteComment/:commentId', authorizationUser, function (req, res) {



         var commentId = req.params.commentId;

        var CommentObj = require('../models/comment');


        CommentObj.update({_id: mongoose.Types.ObjectId(commentId)}, //condition
            {$set: {deleted: 1}},function(err) {
                if (!err) {
                    res.status(200).json({message:'delete successfully'});
                }else {
                    res.status(400).json({err:'err'});
                }
            });




    });




};

