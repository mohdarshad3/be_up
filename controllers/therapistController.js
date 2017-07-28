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
    authorizationTherapist = require('../services/authentication').authTherapistChecker,
    authorizationAdmin = require('../services/authentication').authAdminChecker,
    Therapist = require('../models/therapist');


module.exports = {};
var therapistController = module.exports;

therapistController.init = function (app, passport) {

    app.post('/admin/addtherapist', function (req, res, next) {

        passport.authenticate('local-therapist-addtherapist', function (err, therapist, info) {

            if (!err && therapist) {

                var email = req.body.email;
                var password = req.body.password;
                var name = req.body.name;

                var baseUrl = config.baseUrl;

                var mailData = {email: therapist.email, subject: 'Password Details'},
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

                    authService.createTokenTherapist(therapist, function (err, token) {
                        if (!err)
                            res.status(200).json({token: token, message: null});
                    });
                });

            } else {

                res.status(400).json({token: null, message: info.message});
            }
        })(req, res, next);
    });

    app.get('/admin/getTherapistList/:page', authorizationAdmin, function (req, res) {
        var page = req.params.page;
        var query = {
            deleted: 0
        };
        var options = {
            page: page,
            sort: {created: -1}
        };
        dataService.getPagination(config.models.Therapist, query, options, function (err, data) {
            if (!err) {
                res.status(200).json(data);
            }
        })
    });

    app.get('/therapist/:id/edit', function (req, res) {

        var adminId = req.params.id;
        dataService.getSingleRecord(config.models.Therapist, adminId, function (status, err, therapist) {
            res.status(status).json({
                message: (err == null) ? null : err.message,
                data: therapist
            });

        });
    });

    app.post('/therapist/update', function (req, res) {


        if (req.body.location.lat != undefined && req.body.location.lng != undefined) {
            req.body.location = JSON.parse("[" + [req.body.location.lng, req.body.location.lat] + "]");
        }
        dataService.update(config.models.Therapist, req.body._id, req.body, function (status, err) {
            return res.status(status).json({
                message: (err == null) ? null : err.message
            });
        });
    });

    app.post('/therapist/otpConfirmation', function (req, res, next) {

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

    app.post('/therapist/resetPassword', function (req, res, next) {

        var _id = req.body._id,
            password = req.body.password;

        if (_id === undefined || _id === '' || password === undefined || password === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.resetTherapistPassword(_id, password, function (error) {

            return res.status(error.status || 500).json({
                code: error.status || 500,
                message: error.message || 'Unable to process request.'
            });


        });
    });

    app.get('/therapist/activateAccount/:activateId', function (req, res, next) {


        var activateId = req.params.activateId;


        if (activateId === undefined || activateId === '')
            return res.status(400).json({code: 400, message: 'Invalid request.'});

        authService.activateAccount(activateId, function (err, therapist) {


            if (!err && therapist) {
                authService.createTokenTherapist(therapist, function (error, token) {
                    if (!error)
                        res.status(200).json({
                            token: token,
                            name: therapist.name,
                            role: therapist.role,
                            image: therapist.image,
                            message: 'Your Account Activated Successfully'
                        });
                });
            } else {
                res.status(401).json({token: null, message: info.message});
            }


        });
    });

};