'use strict';
var dataService = require('../services/dataService'),
    authorizationUser = require('../services/authentication').authUserChecker,
    authorizationAdmin = require('../services/authentication').authAdminChecker,
    authService = require('../services/authentication'),
    config = require('../config/config.js'),
    adminService = require('../services/adminService'),
    product = require('../models/product'),
    user = require('../models/user'),
    async = require('async'),
    __ = require('lodash');

module.exports = {};
var adminController = module.exports;

adminController.init = function (app) {

    /**
     * @api {post} /Add Admin
     * @apiName  Add New Admin user
     * @apiGroup Admin
     *
     * @apiParam N/A.
     * @apiSuccess {Status code} 200.
     * @apiSuccess {String} Admin pagination.
     */



    app.get('/admin/getAdminList/:page', function (req, res) {


        var page = req.params.page;
        var query = {
            deleted: 0,
            role: 0
        };
        var options = {
            page: page,
            sort: {created: -1}

        };
        dataService.getPagination(config.models.Admin, query, options, function (err, data) {
            if (!err) {
                console.log(data);

                console.log(data);
                res.status(200).json(data);
            }
        })
    });

    app.get('/admin/getProductList_bkp/:page', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        var page = req.params.page;
        var query = {
            deleted: 0,
            user: userId
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
                res.status(200).json(data.docs);
            }
        })
    });


    app.get('/user/getUserProductList/:page/:limit/:sort/:minValue/:maxValue/:rating/:lat/:lng/:categoryId/:productName', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        console.log(req.params.location);

        //  var location= [];
        // var location = JSON.parse(req.params.location);

        // console.log(location);

        var page = req.params.page;
        var sort = req.params.sort;
        var minValue = parseInt(req.params.minValue);
        var maxValue = parseInt(req.params.maxValue);
        var limit = parseInt(req.params.limit);

        var lat = parseInt(req.params.lat);
        var lng = parseInt(req.params.lng);
        var categoryId = req.params.categoryId;


        if (lat == 0 && lng == 0) {
            console.log(0);
            console.log(lat);
            console.log(lng);
            var query = {
                deleted: 0,
                user: userId,
                price: {"$gte": minValue, "$lt": maxValue}

            };
        } else {
            var query = {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lat, lng]
                        },
                        $maxDistance: 20
                    }
                },
                deleted: 0,
                user: userId,
                price: {"$gte": minValue, "$lt": maxValue}

            };

        }

        if(req.params.rating != 'null'){
            var avgRating = parseFloat(req.params.rating);
            var avgMinRating = avgRating-.5;

            query.avgRating= {"$gt": avgMinRating, "$lte": avgRating};
        }

        if (categoryId != 'null') {


            query.category = categoryId;

        }

        var productName = req.params.productName;
        if (productName != 'null') {

            query.title = {$regex: '.*' + productName + '.*','$options' : 'i'}
        }


        query.type = 'Product';


        var options = {
            page: page,
            sort: {title: sort},
            limit: limit,
            populate: [{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}]
        };
        dataService.getPagination(config.models.Product, query, options, function (err, data) {
            if (!err && data.docs.length != 0) {

                var query1 = {
                    user: userId,
                    deleted: 0
                };

                var rate = require('../models/rate');
                rate.find(query1)
                    .exec(function (error, rating) {
                        //  console.log(rating);
                        if (!error && rating.length != 0) {
                            for (var i = 0; i < data.docs.length; i++) {
                                data.docs[i]['rate'] = 0;
                                for (var j = 0; j < rating.length; j++) {
                                    if (data.docs[i]._id.equals(rating[j].product) && rating[j].user == userId) {
                                        console.log('abc');
                                        data.docs[i]['rate'] = rating[j].rating;
                                    }

                                }

                            }

                            res.status(200).json(data);
                        } else {
                            res.status(200).json(data);
                        }
                    });


            } else {

                res.status(200).json(data);
            }


        })
    });
    app.get('/user/getUserServiceList/:page/:limit/:sort/:minValue/:maxValue/:rating/:lat/:lng/:categoryId/:productName', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        console.log(req.params.location);

        //  var location= [];
        // var location = JSON.parse(req.params.location);

        // console.log(location);

        var page = req.params.page;
        var sort = req.params.sort;
        var minValue = parseInt(req.params.minValue);
        var maxValue = parseInt(req.params.maxValue);
        var limit = parseInt(req.params.limit);

        var lat = parseInt(req.params.lat);
        var lng = parseInt(req.params.lng);

        var categoryId = req.params.categoryId;


        if (lat == 0 && lng == 0) {
            console.log(0);
            console.log(lat);
            console.log(lng);
            var query = {
                deleted: 0,
                user: userId,
                price: {"$gte": minValue, "$lt": maxValue}
            };
        } else {
            var query = {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        $maxDistance: 2000000
                    }
                },
                deleted: 0,
                user: userId,
                price: {"$gte": minValue, "$lt": maxValue}
            };

        }


        if(req.params.rating != 'null'){
            var avgRating = parseFloat(req.params.rating);
            var avgMinRating = avgRating-.5;

            query.avgRating= {"$gt": avgMinRating, "$lte": avgRating};
        }
        if (categoryId != 'null') {


            query.category = categoryId;

        }

        var productName = req.params.productName;
        if (productName != 'null') {

            query.title = {$regex: '.*' + productName + '.*','$options' : 'i'}
        }


        query.type = 'Service';

        console.log(query);

        var options = {
            page: page,
            sort: {title: sort},
            limit: limit,
            populate: [{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}]
        };
        dataService.getPagination(config.models.Product, query, options, function (err, data) {
            if (!err && data.docs.length != 0) {

                var query1 = {
                    user: userId,
                    deleted: 0
                };

                var rate = require('../models/rate');
                rate.find(query1)
                    .exec(function (error, rating) {
                        //  console.log(rating);
                        if (!error && rating.length != 0) {
                            for (var i = 0; i < data.docs.length; i++) {
                                data.docs[i]['rate'] = 0;
                                for (var j = 0; j < rating.length; j++) {
                                    if (data.docs[i]._id.equals(rating[j].product) && rating[j].user == userId) {
                                        console.log('abc');
                                        data.docs[i]['rate'] = rating[j].rating;
                                    }

                                }

                            }

                            res.status(200).json(data);
                        } else {
                            res.status(200).json(data);
                        }
                    });


            } else {

                res.status(200).json(data);
            }


        })
    });


    app.get('/user/getAllProductList/:page/:limit/:sort/:minValue/:maxValue/:rating/:lat/:lng/:categoryId/:productName/:productType', authorizationUser, function (req, res) {


        var page = req.params.page;
        var sort = req.params.sort;
        var minValue = parseInt(req.params.minValue);
        var maxValue = parseInt(req.params.maxValue);
        var limit = parseInt(req.params.limit);
        var lat = parseInt(req.params.lat);
        var lng = parseInt(req.params.lng);
        var categoryId = req.params.categoryId;
        if (lat == 0 && lng == 0) {
            var query = {
                deleted: 0,
                price: {"$gte": minValue, "$lte": maxValue}
            };
        } else {
            var query = {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        $maxDistance: 2000000
                    }
                },
                deleted: 0,
                price: {"$gte": minValue, "$lte": maxValue}
            };

        }

        if(req.params.rating != 'null'){
            var avgRating = parseFloat(req.params.rating);
            var avgMinRating = avgRating-.5;

            query.avgRating= {"$gt": avgMinRating, "$lte": avgRating};
        }
        if (categoryId != 'null') {
            query.category = categoryId;
        }
        var productType = req.params.productType;
        if (productType != 'null') {
            query.type = productType;
        }
        var options = {
            page: page,
            sort: {title: sort},
            limit: limit,
            populate: [{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}]
        };

        var productName = req.params.productName;
        if (productName != 'null') {

            user.find({name: {$regex: '.*' + productName + '.*','$options' : 'i'}, deleted: 0, status: 1})
                .exec(function (err, dataDetail) {
                    if (!err && dataDetail.length != 0) {

                        query.user = __.map(dataDetail, '_id');
                        dataService.getPagination(config.models.Product, query, options, function (err, data) {
                            if (!err && data.docs.length != 0) {

                                var query1 = {
                                    deleted: 0
                                };

                                var rate = require('../models/rate');
                                rate.find(query1)
                                    .exec(function (error, rating) {
                                        //  console.log(rating);
                                        if (!error && rating.length != 0) {
                                            for (var i = 0; i < data.docs.length; i++) {
                                                data.docs[i]['rate'] = 0;
                                                for (var j = 0; j < rating.length; j++) {
                                                    if (data.docs[i]._id.equals(rating[j].product)) {
                                                        console.log('abc');
                                                        data.docs[i]['rate'] = rating[j].rating;
                                                    }

                                                }

                                            }

                                            res.status(200).json(data);
                                        } else {
                                            res.status(200).json(data);
                                        }
                                    });


                            } else {

                                res.status(200).json(data);
                            }


                        })


                    } else {
                        query.title = {$regex: '.*' + productName + '.*', '$options' : 'i'};
                        dataService.getPagination(config.models.Product, query, options, function (err, data) {
                            if (!err && data.docs.length != 0) {

                                var query1 = {
                                    deleted: 0
                                };

                                var rate = require('../models/rate');
                                rate.find(query1)
                                    .exec(function (error, rating) {
                                        //  console.log(rating);
                                        if (!error && rating.length != 0) {
                                            for (var i = 0; i < data.docs.length; i++) {
                                                data.docs[i]['rate'] = 0;
                                                for (var j = 0; j < rating.length; j++) {
                                                    if (data.docs[i]._id.equals(rating[j].product)) {
                                                        console.log('abc');
                                                        data.docs[i]['rate'] = rating[j].rating;
                                                    }

                                                }

                                            }

                                            res.status(200).json(data);
                                        } else {
                                            res.status(200).json(data);
                                        }
                                    });


                            } else {

                                res.status(200).json(data);
                            }


                        })


                    }

                });


        } else {

            dataService.getPagination(config.models.Product, query, options, function (err, data) {
                if (!err && data.docs.length != 0) {

                    var query1 = {
                        deleted: 0
                    };

                    var rate = require('../models/rate');
                    rate.find(query1)
                        .exec(function (error, rating) {
                            //  console.log(rating);
                            if (!error && rating.length != 0) {
                                for (var i = 0; i < data.docs.length; i++) {
                                    data.docs[i]['rate'] = 0;
                                    for (var j = 0; j < rating.length; j++) {
                                        if (data.docs[i]._id.equals(rating[j].product)) {
                                            console.log('abc');
                                            data.docs[i]['rate'] = rating[j].rating;
                                        }

                                    }

                                }

                                res.status(200).json(data);
                            } else {
                                res.status(200).json(data);
                            }
                        });


                } else {

                    res.status(200).json(data);
                }


            })


        }


    });

    app.get('/user/getOtherUserProductList/:page/:userId/:limit/:sort/:minValue/:maxValue/:rating/:lat/:lng/:categoryId/:productName', authorizationUser, function (req, res) {


        console.log(req.params.location);

        //  var location= [];
        // var location = JSON.parse(req.params.location);

        // console.log(location);


        var userId = req.params.userId;

        var page = req.params.page;
        var sort = req.params.sort;
        var minValue = parseInt(req.params.minValue);
        var maxValue = parseInt(req.params.maxValue);
        var limit = parseInt(req.params.limit);

        var lat = parseInt(req.params.lat);
        var lng = parseInt(req.params.lng);

        var categoryId = req.params.categoryId;
        if (lat == 0 && lng == 0) {
            console.log(0);
            console.log(lat);
            console.log(lng);
            var query = {
                user: userId,
                deleted: 0,
                price: {"$gte": minValue, "$lte": maxValue}
            };
        } else {
            var query = {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        $maxDistance: 2000000
                    }
                },
                user: userId,
                deleted: 0,
                price: {"$gte": minValue, "$lte": maxValue}
            };

        }
        if(req.params.rating != 'null'){
            var avgRating = parseInt(req.params.rating);
            query.avgRating = avgRating;
        }
        if (categoryId != 'null') {


            query.category = categoryId;

        }

        var productName = req.params.productName;
        if (productName != 'null') {

            query.title = {$regex: '.*' + productName + '.*', '$options' : 'i'}
        }

        query.type = 'Product';

        var options = {
            page: page,
            sort: {title: sort},
            limit: limit,
            populate: [{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}]
        };
        dataService.getPagination(config.models.Product, query, options, function (err, data) {
            if (!err && data.docs.length != 0) {

                var query1 = {
                    deleted: 0
                };

                var rate = require('../models/rate');
                rate.find(query1)
                    .exec(function (error, rating) {
                        //  console.log(rating);
                        if (!error && rating.length != 0) {
                            for (var i = 0; i < data.docs.length; i++) {
                                data.docs[i]['rate'] = 0;
                                for (var j = 0; j < rating.length; j++) {
                                    if (data.docs[i]._id.equals(rating[j].product)) {
                                        console.log('abc');
                                        data.docs[i]['rate'] = rating[j].rating;
                                    }

                                }

                            }

                            res.status(200).json(data);
                        } else {
                            res.status(200).json(data);
                        }
                    });


            } else {

                res.status(200).json(data);
            }


        })
    });


    app.get('/user/getOtherUserServiceList/:page/:userId/:limit/:sort/:minValue/:maxValue/:rating/:lat/:lng/:categoryId/:productName', authorizationUser, function (req, res) {


        console.log(req.params.location);

        //  var location= [];
        // var location = JSON.parse(req.params.location);

        // console.log(location);


        var userId = req.params.userId;

        var page = req.params.page;
        var sort = req.params.sort;
        var minValue = parseInt(req.params.minValue);
        var maxValue = parseInt(req.params.maxValue);
        var limit = parseInt(req.params.limit);

        var lat = parseInt(req.params.lat);
        var lng = parseInt(req.params.lng);

        var categoryId = req.params.categoryId;
        if (lat == 0 && lng == 0) {
            console.log(0);
            console.log(lat);
            console.log(lng);
            var query = {
                user: userId,
                deleted: 0,
                price: {"$gte": minValue, "$lte": maxValue}
            };
        } else {
            var query = {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        $maxDistance: 2000000
                    }
                },
                user: userId,
                deleted: 0,
                price: {"$gte": minValue, "$lte": maxValue}
            };

        }
        if(req.params.rating != 'null'){
            var avgRating = parseFloat(req.params.rating);
            var avgMinRating = avgRating-.5;

            query.avgRating= {"$gt": avgMinRating, "$lte": avgRating};
        }
        if (categoryId != 'null') {


            query.category = categoryId;

        }

        var productName = req.params.productName;
        if (productName != 'null') {

            query.title = {$regex: '.*' + productName + '.*','$options' : 'i'}
        }

        query.type = 'Service';

        var options = {
            page: page,
            sort: {title: sort},
            limit: limit,
            populate: [{path: 'category', select: 'name'}, {path: 'subCategory', select: 'name'}]
        };
        dataService.getPagination(config.models.Product, query, options, function (err, data) {
            if (!err && data.docs.length != 0) {

                var query1 = {
                    deleted: 0
                };

                var rate = require('../models/rate');
                rate.find(query1)
                    .exec(function (error, rating) {
                        //  console.log(rating);
                        if (!error && rating.length != 0) {
                            for (var i = 0; i < data.docs.length; i++) {
                                data.docs[i]['rate'] = 0;
                                for (var j = 0; j < rating.length; j++) {
                                    if (data.docs[i]._id.equals(rating[j].product)) {
                                        console.log('abc');
                                        data.docs[i]['rate'] = rating[j].rating;
                                    }

                                }

                            }

                            res.status(200).json(data);
                        } else {
                            res.status(200).json(data);
                        }
                    });


            } else {

                res.status(200).json(data);
            }


        })
    });


    app.get('/user/getProductDetail/:productId', authorizationUser, function (req, res) {

        var productId = req.params.productId;
        var rate = require('../models/rate');
        product.findOne({_id: productId})
            .lean()
            .exec(function (err, data) {
                if (!err && data != null) {

                    var query1 = {
                        product: productId,
                        deleted: 0
                    };

                    var rate = require('../models/rate');
                    rate.find(query1)
                        .populate({path: 'user', select: 'name , email , profilePic'})
                        .exec(function (error, rating) {

                            console.log(error);
                            console.log(rating);

                            if (!error) {
                                data.rate = {};
                                data.rate = rating;
                                res.status(200).json(data);
                            } else {
                                res.status(200).json(data);
                            }
                        });


                } else {

                    res.status(400).json(err);
                }


            })
    });


    app.get('/admin/getOtherProductList/:page/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;

        var page = req.params.page;
        var query = {
            deleted: 0,
            user: userId
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
                res.status(200).json(data.docs);
            }
        })
    });

    app.post('/admin/changePassword', authorizationAdmin, function (req, res) {
        var email = req.decoded.email;
        var password = req.body.newPassword;
        var currentPassword = req.body.currentPassword;


        if (email === undefined || email === '' || password === undefined || password === '' || currentPassword === undefined || currentPassword === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.changePassword(email, password, currentPassword, function (error, user) {
            if (error)
                res.status(500).json(error);

            res.status(200).json(user);
        });
    });


    app.post('/admin/userChangePassword', authorizationUser, function (req, res) {
        var email = req.decoded.email;
        var password = req.body.newPassword;
        var currentPassword = req.body.currentPassword;


        if (email === undefined || email === '' || password === undefined || password === '' || currentPassword === undefined || currentPassword === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.userChangePassword(email, password, currentPassword, function (error, user) {
            if (error)
                res.status(500).json(error);

            res.status(200).json(user);
        });
    });


    app.get('/admin/getLatestUserList', function (req, res) {


        user.find({deleted: 0, status: 1})
            .sort('created')
            .limit(5)
            .exec(function (err, data) {
                res.status(200).json({
                    message: (err == null) ? null : err.message,
                    data: data
                });

            });
    });


    app.get('/admin/getLatestProductList', function (req, res) {


        product.find({deleted: 0})
            .populate([{path: 'category', select: 'name'}, {path: 'user', select: 'name'}])
            .sort('created')
            .limit(5)
            .exec(function (err, data) {
                res.status(200).json({
                    message: (err == null) ? null : err.message,
                    data: data
                });

            });
    });


    app.get('/admin/:id/edit', function (req, res) {

        var adminId = req.params.id;
        dataService.getSingleRecord(config.models.Admin, adminId, function (status, err, user) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: user
            });

        });
    });
    app.get('/admin/profile', authorizationAdmin, function (req, res) {

        var adminId = req.decoded.id;
        dataService.getSingleRecord(config.models.Admin, adminId, function (status, err, user) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: user
            });

        });
    });


    app.get('/admin/:id/delete', function (req, res) {

        var adminId = req.params.id;
        dataService.deleteSingleRecord(config.models.Admin, adminId, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });

    app.post('/admin/multiDelete', function (req, res) {

        dataService.deleteMultipleRecords(config.models.Admin, req.body, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });

    app.post('/admin/multiStatusChange/:status', function (req, res) {

        var status = req.params.status;

        dataService.changeStatusMultipleRecords(config.models.Admin, req.body, status, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });

    app.get('/admin/:id/statusChange/:status', function (req, res) {

        var adminId = req.params.id;
        var status = (req.params.status == 1) ? 0 : 1;

        dataService.changeStatusSingleRecord(config.models.Admin, adminId, status, function (status, err) {
            res.status(status).json({
                message: (err == null) ? null : err.message
            });

        });
    });

    app.get('/admin/getPostList_bkppp/:page', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        var page = req.params.page;
        var query = {
            deleted: 0,
            user: userId
        };
        var options = {
            page: page,
            sort: {created: 'desc'},
            populate: [{path: 'user', select: 'name email type profilePic'}]
        };
        dataService.getPagination(config.models.UserPost, query, options, function (err, data) {
            if (!err && data.docs.length != 0) {

                var query1 = {
                    userPost: __.map(data.docs, '_id'),
                    deleted: 0
                };

                // console.log(query1);

                var comment = require('../models/comment');

                comment.find(query1)
                    .populate([{path: 'user', select: 'name email type profilePic'}])
                    .exec(function (error, comments) {
                        //  console.log(error);
                        console.log(data.docs);
                        if (!error && comments.length != 0) {


                            for (var i = 0; i < data.docs.length; i++) {
                                data.docs[i]['comment'] = [];
                                for (var j = 0; j < comments.length; j++) {

                                    //  console.log(data.docs[i]);
                                    //  console.log(comments[j]);

                                    if (data.docs[i]._id.equals(comments[j].userPost)) {
                                        console.log('hi');


                                        data.docs[i]['comment'].push(comments[j]);


                                    }


                                }

                            }

                            res.status(200).json(data.docs);


                        }
                    });


                //  res.status(200).json(data.docs);
            }
        })
    });


    app.get('/admin/othersGeneralPost/:page/:userId', authorizationUser, function (req, res) {

        var userId = req.params.userId;
        var page = req.params.page;

        var following = require('../models/following');
        following.find({follower: userId, accept: true, cancel: false})
            .exec(function (err, data) {
                if (!err && data.length == 0) {
                    var query = {
                        user: userId,
                        deleted: 0
                    };

                } else {
                    var query = {
                        $or: [{'user': __.map(data, 'following')}, {'user': userId}],
                        deleted: 0
                    };

                }
                var options = {
                    page: page,
                    sort: {created: 'desc'},
                    populate: [{path: 'user', select: 'name email type profilePic'}]
                };
                dataService.getPagination(config.models.UserPost, query, options, function (err, data) {
                    if (!err && data.docs.length != 0) {

                        var query1 = {
                            userPost: __.map(data.docs, '_id'),
                            deleted: 0
                        };

                        var comment = require('../models/comment');
                        comment.find(query1)
                            .populate([{path: 'user', select: 'name email type profilePic'}])
                            .exec(function (error, comments) {
                                console.log(data.docs);
                                if (!error && comments.length != 0) {
                                    for (var i = 0; i < data.docs.length; i++) {
                                        data.docs[i]['comment'] = [];
                                        for (var j = 0; j < comments.length; j++) {
                                            if (data.docs[i]._id.equals(comments[j].userPost)) {
                                                data.docs[i]['comment'].push(comments[j]);
                                            }

                                        }

                                    }
                                    var query2 = {
                                        userPost: __.map(data.docs, '_id'),
                                        deleted: 0
                                    };
                                    var like = require('../models/like');

                                    like.find(query2)
                                        .exec(function (likeError, likes) {

                                            if (!likeError && likes.length != 0) {

                                                for (var i = 0; i < data.docs.length; i++) {
                                                    data.docs[i]['like'] = [];
                                                    data.docs[i]['likeCount'] = '';
                                                    data.docs[i]['likeByMe'] = 0;
                                                    var k = 0;
                                                    for (var j = 0; j < likes.length; j++) {

                                                        if (data.docs[i]._id.equals(likes[j].userPost)) {
                                                            //  console.log('hiiiii');
                                                            data.docs[i]['likeCount'] = k;
                                                            data.docs[i]['like'].push(likes[j]);
                                                            if (likes[j].like == true) {
                                                                data.docs[i]['likeCount'] = ++k;
                                                            }

                                                        }
                                                        if (userId == likes[j].user && data.docs[i]._id.equals(likes[j].userPost)) {
                                                            if (likes[j].like == true) {
                                                                data.docs[i]['likeByMe'] = 1;
                                                            }
                                                        }

                                                    }

                                                }


                                            }

                                            res.status(200).json(data.docs);
                                        });


                                } else {

                                    var query2 = {
                                        userPost: __.map(data.docs, '_id'),
                                        deleted: 0
                                    };

                                    // console.log(query1);

                                    var like = require('../models/like');

                                    like.find(query2)
                                        .exec(function (likeError, likes) {

                                            if (!likeError && likes.length != 0) {

                                                console.log('likes');
                                                console.log(likes);

                                                for (var i = 0; i < data.docs.length; i++) {
                                                    data.docs[i]['like'] = [];
                                                    data.docs[i]['likeCount'] = '';
                                                    data.docs[i]['likeByMe'] = 0;
                                                    var k = 0;
                                                    for (var j = 0; j < likes.length; j++) {

                                                        if (data.docs[i]._id.equals(likes[j].userPost)) {
                                                            //  console.log('hiiiii');
                                                            data.docs[i]['like'].push(likes[j]);
                                                            data.docs[i]['likeCount'] = ++k;
                                                        }
                                                        if (userId == likes[j].user && data.docs[i]._id.equals(likes[j].userPost)) {
                                                            if (likes[j].like == true) {
                                                                data.docs[i]['likeByMe'] = 1;
                                                            }
                                                        }

                                                    }

                                                }


                                            }


                                            res.status(200).json(data.docs);
                                        });

                                }
                            });

                    } else {

                        res.status(200).json({status: true});
                    }
                })

            });
    });

    app.get('/admin/getPostList_new_old/:page', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        var page = req.params.page;
        var query = {
            deleted: 0,
            user: userId
        };
        var options = {
            page: page,
            sort: {_id: -1},
            populate: [{path: 'user', select: 'name email type profilePic'}]
        };
        dataService.getPagination(config.models.UserPost, query, options, function (err, data) {
            if (!err && data.docs.length != 0) {

                var query1 = {
                    userPost: __.map(data.docs, '_id'),
                    deleted: 0
                };

                var comment = require('../models/comment');
                comment.find(query1)
                    .sort({_id: -1})
                    .populate([{path: 'user', select: 'name email type profilePic'}])
                    .exec(function (error, comments) {
                        console.log(data.docs);
                        if (!error && comments.length != 0) {
                            for (var i = 0; i < data.docs.length; i++) {
                                data.docs[i]['comment'] = [];
                                for (var j = 0; j < comments.length; j++) {
                                    if (data.docs[i]._id.equals(comments[j].userPost)) {
                                        data.docs[i]['comment'].push(comments[j]);
                                    }

                                }

                            }
                            var query2 = {
                                userPost: __.map(data.docs, '_id'),
                                deleted: 0
                            };
                            var like = require('../models/like');

                            like.find(query2)
                                .exec(function (likeError, likes) {

                                    if (!likeError && likes.length != 0) {

                                        for (var i = 0; i < data.docs.length; i++) {
                                            data.docs[i]['like'] = [];
                                            data.docs[i]['likeCount'] = '';
                                            data.docs[i]['likeByMe'] = 0;
                                            var k = 0;
                                            for (var j = 0; j < likes.length; j++) {

                                                if (data.docs[i]._id.equals(likes[j].userPost)) {
                                                    //  console.log('hiiiii');
                                                    data.docs[i]['likeCount'] = k;
                                                    data.docs[i]['like'].push(likes[j]);
                                                    if (likes[j].like == true) {
                                                        data.docs[i]['likeCount'] = ++k;
                                                    }

                                                }
                                                if (userId == likes[j].user && data.docs[i]._id.equals(likes[j].userPost)) {
                                                    if (likes[j].like == true) {
                                                        data.docs[i]['likeByMe'] = 1;
                                                    }
                                                }

                                            }

                                        }


                                    }

                                    res.status(200).json(data.docs);
                                });


                        } else {

                            var query2 = {
                                userPost: __.map(data.docs, '_id'),
                                deleted: 0
                            };

                            // console.log(query1);

                            var like = require('../models/like');

                            like.find(query2)
                                .exec(function (likeError, likes) {

                                    if (!likeError && likes.length != 0) {

                                        console.log('likes');
                                        console.log(likes);

                                        for (var i = 0; i < data.docs.length; i++) {
                                            data.docs[i]['like'] = [];
                                            data.docs[i]['likeCount'] = '';
                                            data.docs[i]['likeByMe'] = 0;
                                            var k = 0;
                                            for (var j = 0; j < likes.length; j++) {

                                                if (data.docs[i]._id.equals(likes[j].userPost)) {
                                                    //  console.log('hiiiii');
                                                    data.docs[i]['like'].push(likes[j]);
                                                    data.docs[i]['likeCount'] = ++k;
                                                }
                                                if (userId == likes[j].user && data.docs[i]._id.equals(likes[j].userPost)) {
                                                    if (likes[j].like == true) {
                                                        data.docs[i]['likeByMe'] = 1;
                                                    }
                                                }

                                            }

                                        }


                                    }


                                    res.status(200).json(data.docs);
                                });

                        }
                    });

            } else {

                //   res.status(200).json(data);
            }
        })
    });
    app.get('/admin/getPostList/:page', authorizationUser, function (req, res) {

        var userId = req.decoded.id;

        var page = req.params.page;
        var query = {
            deleted: 0,
            user: userId
        };
        var options = {
            page: page,
            sort: {_id: -1},
            populate: [{path: 'user', select: 'name email type profilePic'}]
        };
        dataService.getPagination(config.models.UserPost, query, options, function (err, data) {
            if (!err && data.docs.length != 0) {

                var query1 = {
                    userPost: __.map(data.docs, '_id'),
                    deleted: 0
                };

                var comment = require('../models/comment');
                comment.find(query1)
                    .sort({_id: -1})
                    .populate([{path: 'user', select: 'name email type profilePic'}])
                    .exec(function (error, comments) {
                        console.log(data.docs);
                        if (!error && comments.length != 0) {
                            for (var i = 0; i < data.docs.length; i++) {
                                data.docs[i]['comment'] = [];
                                for (var j = 0; j < comments.length; j++) {
                                    if (data.docs[i]._id.equals(comments[j].userPost)) {
                                        data.docs[i]['comment'].push(comments[j]);
                                    }

                                }

                            }
                            var query2 = {
                                userPost: __.map(data.docs, '_id'),
                                deleted: 0
                            };
                            var like = require('../models/like');

                            like.find(query2)
                                .exec(function (likeError, likes) {

                                    if (!likeError && likes.length != 0) {

                                        for (var i = 0; i < data.docs.length; i++) {
                                            data.docs[i]['like'] = [];
                                            data.docs[i]['likeCount'] = '';
                                            data.docs[i]['likeByMe'] = 0;
                                            var k = 0;
                                            for (var j = 0; j < likes.length; j++) {

                                                if (data.docs[i]._id.equals(likes[j].userPost)) {
                                                    //  console.log('hiiiii');
                                                    data.docs[i]['likeCount'] = k;
                                                    data.docs[i]['like'].push(likes[j]);
                                                    if (likes[j].like == true) {
                                                        data.docs[i]['likeCount'] = ++k;
                                                    }

                                                }
                                                if (userId == likes[j].user && data.docs[i]._id.equals(likes[j].userPost)) {
                                                    if (likes[j].like == true) {
                                                        data.docs[i]['likeByMe'] = 1;
                                                    }
                                                }

                                            }

                                        }


                                    }

                                    res.status(200).json(data.docs);
                                });


                        } else {

                            var query2 = {
                                userPost: __.map(data.docs, '_id'),
                                deleted: 0
                            };

                            // console.log(query1);

                            var like = require('../models/like');

                            like.find(query2)
                                .exec(function (likeError, likes) {

                                    if (!likeError && likes.length != 0) {

                                        console.log('likes');
                                        console.log(likes);

                                        for (var i = 0; i < data.docs.length; i++) {
                                            data.docs[i]['like'] = [];
                                            data.docs[i]['likeCount'] = '';
                                            data.docs[i]['likeByMe'] = 0;
                                            var k = 0;
                                            for (var j = 0; j < likes.length; j++) {

                                                if (data.docs[i]._id.equals(likes[j].userPost)) {
                                                    //  console.log('hiiiii');
                                                    data.docs[i]['like'].push(likes[j]);
                                                    data.docs[i]['likeCount'] = ++k;
                                                }
                                                if (userId == likes[j].user && data.docs[i]._id.equals(likes[j].userPost)) {
                                                    if (likes[j].like == true) {
                                                        data.docs[i]['likeByMe'] = 1;
                                                    }
                                                }

                                            }

                                        }


                                    }


                                    res.status(200).json(data.docs);
                                });

                        }
                    });

            } else {

                res.status(200).json({status: true});
            }
        })
    });

    app.get('/admin/getPostList_new/:page', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var page = req.params.page;

        var following = require('../models/following');
        following.find({follower: userId, accept: true, cancel: false})
            .exec(function (err, data) {

                if (!err && data.length == 0) {
                    var query = {
                        user: userId,
                        deleted: 0
                    };

                } else {
                    var query = {
                        $or: [{'user': __.map(data, 'following')}, {'user': userId}],
                        deleted: 0
                    };

                }
                var options = {
                    page: page,
                    sort: {_id: -1},
                    populate: [{path: 'user', select: 'name email type profilePic'}]
                };
                dataService.getPagination(config.models.UserPost, query, options, function (err, data) {
                    if (!err && data.docs.length != 0) {

                        var query1 = {
                            userPost: __.map(data.docs, '_id'),
                            deleted: 0
                        };

                        var comment = require('../models/comment');
                        comment.find(query1)
                            .populate([{path: 'user', select: 'name email type profilePic'}])
                            .exec(function (error, comments) {
                                console.log(data.docs);
                                if (!error && comments.length != 0) {
                                    for (var i = 0; i < data.docs.length; i++) {
                                        data.docs[i]['comment'] = [];
                                        for (var j = 0; j < comments.length; j++) {
                                            if (data.docs[i]._id.equals(comments[j].userPost)) {
                                                data.docs[i]['comment'].push(comments[j]);
                                            }

                                        }

                                    }
                                    var query2 = {
                                        userPost: __.map(data.docs, '_id'),
                                        deleted: 0
                                    };
                                    var like = require('../models/like');

                                    like.find(query2)
                                        .exec(function (likeError, likes) {

                                            if (!likeError && likes.length != 0) {

                                                for (var i = 0; i < data.docs.length; i++) {
                                                    data.docs[i]['like'] = [];
                                                    data.docs[i]['likeCount'] = '';
                                                    data.docs[i]['likeByMe'] = 0;
                                                    var k = 0;
                                                    for (var j = 0; j < likes.length; j++) {

                                                        if (data.docs[i]._id.equals(likes[j].userPost)) {
                                                            //  console.log('hiiiii');
                                                            data.docs[i]['likeCount'] = k;
                                                            data.docs[i]['like'].push(likes[j]);
                                                            if (likes[j].like == true) {
                                                                data.docs[i]['likeCount'] = ++k;
                                                            }

                                                        }
                                                        if (userId == likes[j].user && data.docs[i]._id.equals(likes[j].userPost)) {
                                                            if (likes[j].like == true) {
                                                                data.docs[i]['likeByMe'] = 1;
                                                            }
                                                        }

                                                    }

                                                }


                                            }

                                            res.status(200).json(data.docs);
                                        });


                                } else {

                                    var query2 = {
                                        userPost: __.map(data.docs, '_id'),
                                        deleted: 0
                                    };

                                    // console.log(query1);

                                    var like = require('../models/like');

                                    like.find(query2)
                                        .exec(function (likeError, likes) {

                                            if (!likeError && likes.length != 0) {

                                                console.log('likes');
                                                console.log(likes);

                                                for (var i = 0; i < data.docs.length; i++) {
                                                    data.docs[i]['like'] = [];
                                                    data.docs[i]['likeCount'] = '';
                                                    data.docs[i]['likeByMe'] = 0;
                                                    var k = 0;
                                                    for (var j = 0; j < likes.length; j++) {

                                                        if (data.docs[i]._id.equals(likes[j].userPost)) {
                                                            //  console.log('hiiiii');
                                                            data.docs[i]['like'].push(likes[j]);
                                                            data.docs[i]['likeCount'] = ++k;
                                                        }
                                                        if (userId == likes[j].user && data.docs[i]._id.equals(likes[j].userPost)) {
                                                            if (likes[j].like == true) {
                                                                data.docs[i]['likeByMe'] = 1;
                                                            }
                                                        }

                                                    }

                                                }


                                            }


                                            res.status(200).json(data.docs);
                                        });

                                }
                            });

                    } else {

                        res.status(200).json({status: true});
                    }
                })

            });
    });

    app.get('/admin/getPostList_new_bkp/:page', authorizationUser, function (req, res) {

        var userId = req.decoded.id;
        var page = req.params.page;

        var following = require('../models/following');
        following.find({follower: userId, accept: true, cancel: false})
            .exec(function (err, data) {
                console.log(data);

                if (!err && data.length == 0) {
                    var query = {
                        user: userId,
                        deleted: 0
                    };

                } else {
                    var query = {
                        $or: [{'user': __.map(data, 'following')}, {'user': userId}],
                        deleted: 0
                    };

                }
                console.log(query);
                var options = {
                    page: page,
                    sort: {created: 'desc'},
                    populate: [{path: 'user', select: 'name email type profilePic'}]
                };
                dataService.getPagination(config.models.UserPost, query, options, function (err, data) {
                    if (!err) {
                        console.log(data);

                        console.log(data);
                        res.status(200).json(data.docs);
                    }
                })
            });


    });
    app.get('/admin/userFollowers/:userId', authorizationAdmin, function (req, res) {

        var userId = req.params.userId;

        var following = require('../models/following');

        following.find({following: userId, accept: true, cancel: false})
            .populate([{path: 'follower', select: 'name email type profilePic'}])
            .exec(function (err, data) {
                console.log(err);
                console.log(data);
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });

    app.get('/admin/cancelFollower/:followerId/:followingId', authorizationAdmin, function (req, res) {

        var followerId = req.params.followerId;
        var followingId = req.params.followingId;

        var following = require('../models/following');

        following.remove({following: followingId, follower: followerId})
            .exec(function (err, data) {
                console.log(err);
                console.log(data);
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });

    app.get('/admin/cancelFollowing/:followerId/:followingId', authorizationAdmin, function (req, res) {

        var followerId = req.params.followerId;
        var followingId = req.params.followingId;

        var following = require('../models/following');

        following.remove({following: followingId, follower: followerId})
            .exec(function (err, data) {
                console.log(err);
                console.log(data);
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });


    app.get('/admin/userFollowing/:userId', authorizationAdmin, function (req, res) {

        var userId = req.params.userId;

        var following = require('../models/following');

        following.find({follower: userId, accept: true, cancel: false})
            .populate([{path: 'following', select: 'name email type profilePic'}])
            .exec(function (err, data) {
                console.log(err);
                console.log(data);
                if (!err) {
                    res.status(200).json(data);
                }
            });
    });


};

