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
            console.log(file.fieldname);

            var datetimestamp = Date.now();
            req.body.image = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];

            console.log(req.body.image);
            cb(null, req.body.image);
        }
    });


    var storage2 = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './www/uploads/admin');
        },
        filename: function (req, file, cb) {
            console.log(file.fieldname);

            var datetimestamp = Date.now();
            req.body.image2 = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];

            console.log(req.body.image2);
            cb(null, req.body.image2);
        }
    });

    var storage3 = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './www/uploads/admin');
        },
        filename: function (req, file, cb) {
            console.log(file.fieldname);

            var datetimestamp = Date.now();
            req.body.image3 = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];

            console.log(req.body.image3);
            cb(null, req.body.image3);
        }
    });



    var upload = multer({
        storage: storage
    }).single('image');



    var upload2 = multer({
        storage: storage2
    }).single('image2');






    var upload3 = multer({
        storage: storage3
    }).single('image3');


    var uploadProduct = multer({ //multer settings
        storage: multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb) {

                cb(null, './www/uploads/admin');
            },
            filename: function (req, file, cb) {
                console.log(file);
                console.log('hi');
                //
                //var datetimestamp = Date.now();
                //req.body.image = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
                //
                //console.log(req.body.image);
                //cb(null, req.body.image);
            }
        })
    }).array('files', 3);


    app.post('/frontProductCategory/addProduct_bkp', authorizationUser, function (req, res, next) {

        try {
            uploadProduct(req, res, function (err) {
                console.log(req.body);
                //if (err) {
                //    return callback({status: 400, message: err});
                //} else {
                //
                //    req.body.user = req.decoded.id;
                //
                //    product.findOne({'title': req.body.title,deleted:0}, function (err, productData) {
                //        // if there are any errors, return the error
                //        if (err)
                //            res.status(400).json({message: err});
                //
                //
                //        // check to see if theres already a product with this Title
                //        if (productData) {
                //            res.status(400).json({message: 'That Product  already exist.'});
                //        } else {
                //
                //            req.body.location = [];
                //            req.body.location = JSON.parse("[" + [req.body.lat,req.body.lng] + "]");
                //
                //            delete req.body.lat;
                //            delete req.body.lng;
                //
                //            console.log(req.body);
                //
                //            var newProduct = new product(req.body);
                //            newProduct.save(function(error) {
                //                if (!error) {
                //                    res.status(200).json({message: 'That Product saved Successfully.'});
                //                }else {
                //                    res.status(400).json({message: error});
                //                }
                //            });
                //        }
                //
                //    });
                //}
            });
        } catch (error) {
            res.status(400).json({message: 'Unknown internal error.'});
        }

    });

    app.post('/frontProductCategory/addProduct', authorizationUser, function (req, res, next) {

        req.body.user = req.decoded.id;

            product.findOne({'title': req.body.title,deleted:0}, function (err, productData) {
               // if there are any errors, return the error
                if (err)
                    res.status(400).json({message: err});

               if (productData) {
                    res.status(400).json({message: 'That Product  already exist.'});
                } else {

                   req.body.location = [];
                    req.body.location = JSON.parse("[" + [req.body.lng,req.body.lat] + "]");

                    delete req.body.lat;
                    delete req.body.lng;

                    var newProduct = new product(req.body);
                    newProduct.save(function(error,data) {
                        if (!error) {
                            res.status(200).json({message: 'That Product saved Successfully.',data:data});
                        }else {
                            res.status(400).json({message: error});
                        }
                    });
                }

           });

    });



    app.post('/frontProductCategory/updateProduct', authorizationUser, function (req, res, next) {

        req.body.user = req.decoded.id;
        var productId = req.body._id;

        product.findOne({_id: { $ne: productId }, 'title': req.body.title,deleted:0}, function (err, productData) {
            // if there are any errors, return the error
            if (err)
                res.status(400).json({message: err});

            if (productData) {
                res.status(400).json({message: 'That Product  already exist.'});
            } else {

                if(req.body.lng != undefined && req.body.lat != undefined) {

                    req.body.location = [];
                    req.body.location = JSON.parse("[" + [req.body.lng, req.body.lat] + "]");

                    delete req.body.lat;
                    delete req.body.lng;
                }
                    var data = {};
                var data = req.body;
                delete req.body._id;
                product.update({_id: productId},
                    data, function (error, affected, resp) {
                    console.log(affected);
                    if (!error) {
                        res.status(200).json({message: 'Product  Updated Successfully.'});
                    } else {
                        res.status(400).json({message: error});
                    }
                })

            }

        });

    });


    app.post('/frontProductCategory/addProductPic1', authorizationUser, function (req, res, next) {

        try {
            upload(req, res, function (err) {
                if (err) {
                    return callback({status: 400, message: err});
                } else {


                    product.update({_id: req.body.productId}, {
                        image: req.body.image
                    }, function (error, affected, resp) {
                        console.log(affected);
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

    app.post('/frontProductCategory/addProductPic2', authorizationUser, function (req, res, next) {

        try {
            upload2(req, res, function (err) {
                if (err) {
                    return callback({status: 400, message: err});
                } else {


                    product.update({_id: req.body.productId}, {
                        image2: req.body.image2
                    }, function (error, affected, resp) {
                        console.log(affected);
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

    app.post('/frontProductCategory/addProductPic3', authorizationUser, function (req, res, next) {

        try {
            upload3(req, res, function (err) {
                if (err) {
                    return callback({status: 400, message: err});
                } else {


                    product.update({_id: req.body.productId}, {
                        image3: req.body.image3
                    }, function (error, affected, resp) {
                        console.log(affected);
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

};

