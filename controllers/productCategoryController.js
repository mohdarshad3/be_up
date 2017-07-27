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
    productCategory = require('../models/productCategory'),
    product = require('../models/product'),
    following = require('../models/following'),
    user = require('../models/user'),
    authorizationUser = require('../services/authentication').authUserChecker,
    authorizationAdmin = require('../services/authentication').authAdminChecker;

var express = require('express');
var route = express.Router();

module.exports = {};
var authController = module.exports;

authController.init = function (app, passport) {


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



    app.post('/productCategory/add', function (req, res, next) {

        try {
            upload(req, res, function (err) {

                if (err) {
                    return callback({status: 400, message: err});
                } else {

                    productCategory.findOne({'name': req.body.name, deleted: 0}, function (err, category) {
                        // if there are any errors, return the error
                        if (err)
                            res.status(400).json({message: err});


                        // check to see if theres already a user with that email
                        if (category) {
                            res.status(400).json({message: 'That Product Category  already exist.'});
                        } else {


                            var newProductCategory = new productCategory(req.body);
                            newProductCategory.save(function (error) {
                                if (!error) {
                                    res.status(200).json({message: 'That Product Category  saved Successfully.'});
                                } else {
                                    res.status(400).json({message: error});
                                }
                            });
                        }

                    });
                }
            });
        } catch (error) {
            return callback({status: 500, message: 'Unknown internal error.'});
        }

    });


    app.post('/productCategory/update', function (req, res, callback) {
        var modelName = config.models.ProductCategory;
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
                            var productCategory = require('../models/' + modelName);
                            var data = req.body;
                            if (data.length === 0)
                                return res.status(400).json({
                                    status: 400,
                                    message: 'Bad request. No record found.'
                                });

                            productCategory.findOne({
                                $and: [
                                    {
                                        name: data.name
                                    }, {
                                        '_id': {$ne: mongoose.Types.ObjectId(data._id)}
                                    }
                                ]
                            }, function (err, result) {
                                if (!err) {
                                    if (result) {
                                        return res.status(400).json({
                                            status: 400,
                                            message: 'Name no all ready  Exist'
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
                                                var productCategory = require('../models/' + modelName);

                                                productCategory.update({_id: mongoose.Types.ObjectId(_id)},
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
                                                    status: 400,
                                                    message: error.message || 'File Upload Failed'
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    return res.status(500).json({
                                        status: 500,
                                        message: 'Unknown internal error.'
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
                                status: 400,
                                message: 'Bad request. No record found.'
                            });
                        if (_id === undefined)
                            return res.status(400).json({
                                status: 400,
                                message: 'Update _id not found.'
                            });
                        var productCategory = require('../models/' + modelName);
                        productCategory.findOne({phone: data.phone}, function (err, result) {
                            if (!err) {
                                if (result) {
                                    return res.status(400).json({
                                        status: 400,
                                        message: 'Name no all ready  Exist'
                                    });
                                } else {
                                    productCategory.update({_id: mongoose.Types.ObjectId(_id)},
                                        data, function (error, response) {
                                            if (error) {
                                                return res.status(500).json({
                                                    status: 500,
                                                    message: 'Unknown internal error.'
                                                });
                                            }
                                            return res.status(200).json(response);
                                        });
                                }
                            } else {
                                return res.status(500).json({
                                    status: 500,
                                    message: 'Unknown internal error.'
                                });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unknown internal error.'
            });
        }

    });


    app.get('/productCategory/getProductCategoryList/:page', function (req, res) {

        var page = req.params.page;
        var query = {
            deleted: 0
        };
        var options = {
            page: page,
            sort: {created: -1},
            populate: 'parent'
        };
        dataService.getPagination(config.models.ProductCategory, query, options, function (err, data) {
            if (!err) {
                console.log(data);

                console.log(data);
                res.status(200).json(data);
            }
        })
    });

    app.get('/productCategory/:id/edit', function (req, res) {

        var adminId = req.params.id;
        dataService.getSingleRecord(config.models.ProductCategory, adminId, function (status, err, user) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: user
            });

        });
    });

    app.get('/productCategory/getAllParentCategoryList', function (req, res) {

        productCategory.find({deleted: 0, parent: null}, function (err, data) {

            res.status(200).json({
                message: (err == null) ? null : err.message,
                data: data
            });

        });
    });
    app.get('/productCategory/getSubCaegoryList', function (req, res) {

        productCategory.find({deleted: 0}, function (err, data) {

            res.status(200).json({
                message: (err == null) ? null : err.message,
                data: data
            });

        });
    });

    app.get('/product/userProductList', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        product.find({user: userId, deleted: 0, check: true,type:'Product'})
            .populate([{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}])
            .sort('created')
            .limit(6)
            .lean(true)
            .exec(function (err, data) {
                if (!err && data.length != 0) {

                    var query1 = {
                        user: userId,
                        deleted: 0
                    };

                    var rate = require('../models/rate');
                    rate.find(query1)
                        .exec(function (error, rating) {
                            //  console.log(rating);
                            if (!error && rating.length != 0) {
                                for (var i = 0; i < data.length; i++) {
                                    data[i]['rate'] = 0;
                                    for (var j = 0; j < rating.length; j++) {
                                        if (data[i]._id.equals(rating[j].product) && rating[j].user == userId) {
                                            console.log('abc');
                                            data[i]['rate'] = rating[j].rating;
                                        }
                                    }
                                }
                                return res.status(200).json({
                                    message: (err == null) ? null : err.message,
                                    data: data
                                });
                            } else {
                                return res.status(200).json({
                                    message: (err == null) ? null : err.message,
                                    data: data
                                });

                            }
                        });

                } else {
                    return res.status(200).json({
                        message: (err == null) ? null : err.message,
                        data: data
                    });
                }

            });
    });


    app.get('/service/userServiceList', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        product.find({user: userId, deleted: 0, check: true,type:'Service'})
            .populate([{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}])
            .sort('created')
            .limit(6)
            .lean(true)
            .exec(function (err, data) {
                if (!err && data.length != 0) {

                    var query1 = {
                        user: userId,
                        deleted: 0
                    };

                    var rate = require('../models/rate');
                    rate.find(query1)
                        .exec(function (error, rating) {
                            //  console.log(rating);
                            if (!error && rating.length != 0) {
                                for (var i = 0; i < data.length; i++) {
                                    data[i]['rate'] = 0;
                                    for (var j = 0; j < rating.length; j++) {
                                        if (data[i]._id.equals(rating[j].product) && rating[j].user == userId) {
                                            console.log('abc');
                                            data[i]['rate'] = rating[j].rating;
                                        }
                                    }
                                }
                                return res.status(200).json({
                                    message: (err == null) ? null : err.message,
                                    data: data
                                });
                            } else {
                                return res.status(200).json({
                                    message: (err == null) ? null : err.message,
                                    data: data
                                });

                            }
                        });

                } else {
                    return res.status(200).json({
                        message: (err == null) ? null : err.message,
                        data: data
                    });
                }

            });
    });


    app.get('/otherUser/userProductList/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        //    var myId = req.decoded.id;
        product.find({user: userId, deleted: 0, check: true})
            .populate([{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}])
            .sort('created')
            .limit(6)
            .lean(true)
            .exec(function (err, data) {

                console.log('data');
                console.log(data);


                if (!err && data.length != 0) {

                    var query1 = {
                        user: userId,
                        deleted: 0
                    };

                    var rate = require('../models/rate');
                    rate.find(query1)
                        .exec(function (error, rating) {
                            //  console.log(rating);
                            if (!error && rating.length != 0) {
                                for (var i = 0; i < data.length; i++) {
                                    data[i]['rate'] = 0;
                                    for (var j = 0; j < rating.length; j++) {
                                        if (data[i]._id.equals(rating[j].product) && rating[j].user == userId) {
                                            data[i]['rate'] = rating[j].rating;
                                        }

                                    }

                                }

                                res.status(200).json({
                                    message: (err == null) ? null : err.message,
                                    data: data
                                });

                            } else {

                                res.status(200).json({
                                    message: (err == null) ? null : err.message,
                                    data: data
                                });

                            }
                        });


                } else {

                    res.status(200).json({
                        message: (err == null) ? null : err.message,
                        data: {}
                    });
                }


            });
    });


    app.get('/otherUser/userFollowingCheck/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        var myId = req.decoded.id;
        following.update({following: myId, follower: userId},
            {check: true})
            .exec(function (err, data) {

                if (!err) {

                    res.status(200).json({
                        message: (err == null) ? null : err.message,
                        data: data
                    });


                } else {

                    res.status(200).json({
                        message: (err == null) ? null : err.message,
                        data: {}
                    });
                }


            });
    });

    app.get('/otherUser/userProductList_bkp/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        product.find({user: userId, deleted: 0, check: true})
            .populate([{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}])
            .sort('created')
            .limit(6)
            .exec(function (err, data) {
                res.status(200).json({
                    message: (err == null) ? null : err.message,
                    data: data
                });

            });
    });


    app.get('/productCategory/:id/statusChange/:status', function (req, res) {

        var adminId = req.params.id;
        var status = (req.params.status == 1) ? 0 : 1;

        dataService.changeStatusSingleRecord(config.models.ProductCategory, adminId, status, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });
    app.get('/post/:id/statusChange/:status', function (req, res) {

        var adminId = req.params.id;
        var status = (req.params.status == 1) ? 0 : 1;

        dataService.changeStatusSingleRecord(config.models.UserPost, adminId, status, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });
    app.get('/productCategory/:id/delete', function (req, res) {

        var categoryId = req.params.id;
        dataService.deleteSingleRecord(config.models.ProductCategory, categoryId, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });
    app.get('/post/:id/deleteComment', function (req, res) {

        var commentId = req.params.id;
        dataService.deleteSingleRecord(config.models.Comment, commentId, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });
    app.get('/post/:id/unlikePost', function (req, res) {

        var likeId = req.params.id;
        var like = require('../models/like');

        like.remove({_id: likeId})
            .exec(function (err, data) {
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });
    app.get('/post/:id/deleteRating', function (req, res) {

        var rateId = req.params.id;
        var rate = require('../models/rate');

        rate.remove({_id: rateId})
            .exec(function (err, data) {
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });


    app.get('/post/:id/delete', function (req, res) {

        var categoryId = req.params.id;
        dataService.deleteSingleRecord(config.models.UserPost, categoryId, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });

    app.get('/message/:id/deleteMessage', function (req, res) {

        var messageId = req.params.id;
        dataService.deleteSingleRecord(config.models.Message, messageId, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });

    app.get('/post/commentList/:postId', function (req, res) {

        var postId = req.params.postId;

        var comment = require('../models/comment');

        comment.find({userPost: postId,deleted:0})
            .populate([{path: 'user', select: 'name email type profilePic'}])
            .exec(function (err, data) {
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });

    app.get('/post/ratingList/:productId', function (req, res) {

        var productId = req.params.productId;

        var rate = require('../models/rate');

        rate.find({product: productId})
            .populate([{path: 'user', select: 'name email type profilePic'}])
            .exec(function (err, data) {
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });


    app.get('/post/likeListOnPost/:postId', function (req, res) {

        var postId = req.params.postId;

        var like = require('../models/like');

        like.find({userPost: postId,deleted:0})
            .populate([{path: 'user', select: 'name email type profilePic'}])
            .exec(function (err, data) {
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });


    app.get('/productCategory/getAllSubcategoryList/:categoryId', function (req, res) {

        var categoryId = req.params.categoryId;

        productCategory.find({deleted: 0, parent: categoryId}, function (err, data) {

            res.status(200).json({
                message: (err == null) ? null : err.message,
                data: data
            });

        });
    });


    app.post('/productCategory/addProduct', authorizationUser, function (req, res, next) {

        try {
            upload(req, res, function (err) {
                console.log(req.body);
                if (err) {
                    return callback({status: 400, message: err});
                } else {

                    req.body.user = req.decoded.id;

                    product.findOne({'title': req.body.title, deleted: 0}, function (err, productData) {
                        // if there are any errors, return the error
                        if (err)
                            res.status(400).json({message: err});


                        // check to see if theres already a product with this Title
                        if (productData) {
                            res.status(400).json({message: 'That Product  already exist.'});
                        } else {


                            var newProduct = new product(req.body);
                            newProduct.save(function (error) {
                                if (!error) {
                                    res.status(200).json({message: 'That Product saved Successfully.'});
                                } else {
                                    res.status(400).json({message: error});
                                }
                            });
                        }

                    });
                }
            });
        } catch (error) {
            return callback({status: 500, message: 'Unknown internal error.'});
        }

    });
    app.post('/productCategory/addProductByAdmin', authorizationAdmin, function (req, res, next) {

        try {
            upload(req, res, function (err) {
                console.log(req.body);
                if (err) {
                    return callback({status: 400, message: err});
                } else {

                    product.findOne({'title': req.body.title, deleted: 0}, function (err, productData) {
                        // if there are any errors, return the error
                        if (err)
                            res.status(400).json({message: err});


                        // check to see if theres already a product with this Title
                        if (productData) {
                            res.status(400).json({message: 'That Product  already exist.'});
                        } else {
                            //  var location = [req.body.lng.replace("'",''), req.body.lat.replace("'",'')];


                            req.body.location = [];
                            req.body.location = JSON.parse("[" + [req.body.lng, req.body.lat] + "]");


                            delete req.body.lat;
                            delete req.body.lng;


                            var newProduct = new product(req.body);
                            newProduct.save(function (error) {
                                if (!error) {
                                    res.status(200).json({message: 'That Product saved Successfully.'});
                                } else {
                                    res.status(400).json({message: error});
                                }
                            });
                        }

                    });
                }
            });
        } catch (error) {
            return callback({status: 500, message: 'Unknown internal error.'});
        }

    });


    app.post('/product/updateProduct', function (req, res, callback) {
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
                            var data = req.body;
                            if (data.length === 0)
                                return res.status(400).json({
                                    status: 400,
                                    message: 'Bad request. No record found.'
                                });

                            product.findOne({
                                $and: [
                                    {
                                        title: data.title
                                    }, {
                                        '_id': {$ne: mongoose.Types.ObjectId(data._id)}
                                    }
                                ]
                            }, function (err, result) {
                                if (!err) {
                                    if (result) {
                                        return res.status(400).json({
                                            status: 400,
                                            message: 'Product Title all ready  Exist'
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


                                                product.update({_id: mongoose.Types.ObjectId(_id)},
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
                                                    status: 400,
                                                    message: error.message || 'File Upload Failed'
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    return res.status(500).json({
                                        status: 500,
                                        message: 'Unknown internal error.'
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
                                status: 400,
                                message: 'Bad request. No record found.'
                            });
                        if (_id === undefined)
                            return res.status(400).json({
                                status: 400,
                                message: 'Update _id not found.'
                            });
                        product.findOne({title: data.title}, function (err, result) {
                            if (!err) {
                                if (result) {
                                    return res.status(400).json({
                                        status: 400,
                                        message: 'Product Title all ready  Exist'
                                    });
                                } else {
                                    product.update({_id: mongoose.Types.ObjectId(_id)},
                                        data, function (error, response) {
                                            if (error) {
                                                return res.status(500).json({
                                                    status: 500,
                                                    message: 'Unknown internal error.'
                                                });
                                            }
                                            return res.status(200).json(response);
                                        });
                                }
                            } else {
                                return res.status(500).json({
                                    status: 500,
                                    message: 'Unknown internal error.'
                                });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unknown internal error.'
            });
        }

    });


    app.post('/product/updateProductAdmin', function (req, res, callback) {

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
                            var data = req.body;
                            if (data.length === 0)
                                return res.status(400).json({
                                    status: 400,
                                    message: 'Bad request. No record found.'
                                });

                            product.findOne({
                                $and: [
                                    {
                                        title: data.title
                                    }, {
                                        '_id': {$ne: mongoose.Types.ObjectId(data._id)}
                                    }
                                ]
                            }, function (err, result) {
                                if (!err) {
                                    if (result) {
                                        return res.status(400).json({
                                            status: 400,
                                            message: 'Product Title all ready  Exist'
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


                                                product.update({_id: mongoose.Types.ObjectId(_id)},
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
                                                    status: 400,
                                                    message: error.message || 'File Upload Failed'
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    return res.status(500).json({
                                        status: 500,
                                        message: 'Unknown internal error.'
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
                                status: 400,
                                message: 'Bad request. No record found.'
                            });
                        if (_id === undefined)
                            return res.status(400).json({
                                status: 400,
                                message: 'Update _id not found.'
                            });
                        product.findOne({title: data.title}, function (err, result) {
                            if (!err) {
                                if (result) {
                                    return res.status(400).json({
                                        status: 400,
                                        message: 'Product Title all ready  Exist'
                                    });
                                } else {
                                    product.update({_id: mongoose.Types.ObjectId(_id)},
                                        data, function (error, response) {
                                            if (error) {
                                                return res.status(500).json({
                                                    status: 500,
                                                    message: 'Unknown internal error.'
                                                });
                                            }
                                            return res.status(200).json(response);
                                        });
                                }
                            } else {
                                return res.status(500).json({
                                    status: 500,
                                    message: 'Unknown internal error.'
                                });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unknown internal error.'
            });
        }

    });


    app.get('/productCategory/getProductListByUserId/:userId/:page', function (req, res) {

        var page = req.params.page;
        var user = req.params.userId;
        var query = {
            deleted: 0,
            user: user
        };
        var options = {
            page: page,
            sort: {created: -1},
            populate: [{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}]
        };
        dataService.getPagination(config.models.Product, query, options, function (err, data) {
            if (!err) {
                console.log(data);

                console.log(data);
                res.status(200).json(data);
            }
        })
    });

    app.get('/product/:id/statusChange/:status', function (req, res) {

        var adminId = req.params.id;
        var status = (req.params.status == 1) ? 0 : 1;

        dataService.changeStatusSingleRecord(config.models.Product, adminId, status, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });
    app.get('/product/:id/delete', function (req, res) {

        var categoryId = req.params.id;
        dataService.deleteSingleRecord(config.models.Product, categoryId, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });


    app.get('/product/:id/edit', function (req, res) {

        var productId = req.params.id;
        dataService.getSingleRecord(config.models.Product, productId, function (status, err, user) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: user
            });

        });
    });

    app.post('/user/addUserCoverPic', authorizationUser, function (req, res, next) {

        try {
            upload(req, res, function (err) {
                if (err) {
                    return callback({status: 400, message: err});
                } else {

                    user.update({_id: req.decoded.id}, {
                        coverPic: req.body.image
                    }, function (error, affected, resp) {
                        if (!error) {
                            res.status(200).json({message: 'User Cover Picture Updated Successfully.'});
                        } else {
                            res.status(400).json({message: error});
                        }
                    })

                }
            });
        } catch (error) {
            return callback({status: 500, message: 'Unknown internal error.'});
        }

    });

    app.post('/user/addUserProfilePic', authorizationUser, function (req, res, next) {


        try {
            upload(req, res, function (err) {
                if (err) {
                    return callback({status: 400, message: err});
                } else {

                    console.log(req.body.image);

                    user.update({_id: req.decoded.id}, {
                        profilePic: req.body.image
                    }, function (error, affected, resp) {
                        console.log(affected);
                        if (!error) {
                            res.status(200).json({message: 'User Profile Picture Updated Successfully.'});
                        } else {
                            res.status(400).json({message: error});
                        }
                    })

                }
            });
        } catch (error) {
            return callback({status: 500, message: 'Unknown internal error.'});
        }

    });


    app.get('/post/getPostListByUserId/:userId/:page', function (req, res) {

        var page = req.params.page;
        var user = req.params.userId;
        var query = {
            deleted: 0,
            user: user
        };
        var options = {
            page: page,
            sort: {created: -1}
        };
        dataService.getPagination(config.models.UserPost, query, options, function (err, data) {
            if (!err) {
                console.log(data);

                console.log(data);
                res.status(200).json(data);
            }
        })
    });


    app.get('/message/getUserInboxList/:page/:userId', function (req, res) {

        var page = req.params.page;
        var user = req.params.userId;
        var query = {
            deleted: 0,
            to: user
        };
        var options = {
            page: page,
            sort: {_id: -1},
            populate: [{path: 'from', select: 'name email'}]
        };
        dataService.getPagination(config.models.Message, query, options, function (err, data) {
            if (!err) {
                console.log(data);

                console.log(data);
                res.status(200).json(data);
            }
        })
    });


    app.get('/message/getUserSentBoxList/:page/:userId', function (req, res) {

        var page = req.params.page;
        var user = req.params.userId;
        var query = {
            deleted: 0,
            from: user
        };
        var options = {
            page: page,
            sort: {_id: -1},
            populate: [{path: 'to', select: 'name email'}]
        };
        dataService.getPagination(config.models.Message, query, options, function (err, data) {
            if (!err) {
                console.log(data);

                console.log(data);
                res.status(200).json(data);
            }
        })
    });


    var Unlink = function (orgFile, thumbFile, callback) {
        fs.exists(orgFile, function (exists) {
            if (exists) {
                fs.unlink(orgFile, function (err) {
                    if (!err) {
                        if (thumbFile) {
                            fs.exists(thumbFile, function (exists) {
                                if (exists) {
                                    fs.unlink(thumbFile, function (err) {
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

