'use strict';
var jwt = require('jsonwebtoken'),
        jwtConfig = require('../config/config'),
        Admin = require('../models/admin'),
        User = require('../models/user'),
        Therapist = require('../models/therapist'),
        mailer = require('../utilities/mailerService'),
        _ = require('lodash');

exports.authUserChecker = function (req, res, next) {

    if (req.headers) {
        var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
        try {
        } catch (e) {
            jwt.verify(token, jwtConfig.superJwtSecretUser, function (err, decoded) {
                if (err) {
                    //  logger.stream.write({error: err});
                    return res.status(err.status || 401).json({code: err.status || 401, message: 'Failed to authenticate token.',data:'expired'});
                }
                req.decoded = decoded;
                req.decoded.token = token;
                next();
            });
            //  logger.stream.write({error: e});
            return res.status(401).json({code: 401, message: 'Invalid token'});
        }
    } else {
        return res.status(401).json({code: 401, message: 'Invalid tokennn'});
    }
};
exports.authTherapistChecker = function (req, res, next) {

    if (req.headers) {
        var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
        try {
            jwt.verify(token, jwtConfig.superJwtSecretTherapist, function (err, decoded) {
                if (err) {
                    //  logger.stream.write({error: err});
                    return res.status(err.status || 401).json({code: err.status || 401, message: 'Failed to authenticate token.',data:'expired'});
                }
                req.decoded = decoded;
                req.decoded.token = token;
                next();
            });
        } catch (e) {
            //  logger.stream.write({error: e});
            return res.status(401).json({code: 401, message: 'Invalid token'});
        }
    } else {
        return res.status(401).json({code: 401, message: 'Invalid tokennn'});
    }
};

exports.authAdminChecker = function (req, res, next) {
    if (req.headers) {
        var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
        try {
            jwt.verify(token, jwtConfig.superJwtSecretAdmin, function (err, decoded) {
                if (err) {
                    //  logger.stream.write({error: err});
                    return res.status(err.status || 401).json({code: err.status || 401, message: 'Failed to authenticate token.',data:'expired'});
                }
                req.decoded = decoded;
                req.decoded.token = token;
                next();
            });
        } catch (e) {
            //  logger.stream.write({error: e});
            return res.status(401).json({code: 401, message: 'Invalid token'});
        }
    } else {
        return res.status(401).json({code: 401, message: 'Invalid tokennn'});
    }
};

exports.createUserToken = function (user, callback) {
    var token = jwt.sign({
        email: user.email,
        name: user.name,
        id: user._id,
    }, jwtConfig.superJwtSecretUser, {
        expiresIn: jwtConfig.expJwtMin
    });
    return callback(null, token);
};
exports.createTherapistToken = function (therapist, callback) {
    var token = jwt.sign({
        email: therapist.email,
        name: therapist.name,
        id: therapist._id,
    }, jwtConfig.superJwtSecretTherapist, {
        expiresIn: jwtConfig.expJwtMin
    });
    return callback(null, token);
};


exports.createAdminToken = function (user, callback) {
    var token = jwt.sign({
        email: user.email,
        name: user.name,
        id: user._id,
        role:user.role
    }, jwtConfig.superJwtSecretAdmin, {
        expiresIn: jwtConfig.expJwtMin
    });
    return callback(null, token);
};
exports.createAdminToken = function (user, callback) {
    var token = jwt.sign({
        email: user.email,
        name: user.name,
        id: user._id,
        role:user.role
    }, jwtConfig.superJwtSecretAdmin, {
        expiresIn: jwtConfig.expJwtMin
    });
    return callback(null, token);
};

exports.forgotPassword = function(req, res, callback) {

    Admin.findOne({email: req.body.email}, function(err, admin) {
        if (err) {
            res.status(500).json({status: 500, message: 'Error Occurred'});
        }
        if (admin) {

            var newAdmin = new Admin();
            var password          = Math.floor(100000 + Math.random() * 900000);

            Admin.update(
                {email: req.body.email}, //which condition
                {password: newAdmin.generateHash(password)}, //fields need to set
                {}, //optional parameter
                function (error, result) {
                    if (error) {
                        console.log(err);
                        return callback({status: 400, message: 'Database Error !'});
                    } else if (!result) {
                        return callback({status: 400, message: 'No rows updated !'});
                    } else {

                        var mailData     = {email: req.body.email, subject: 'Forgot Password'},
                            data         = {
                                templateName: 'OTP Email',
                                password: password,
                                name:admin.name
                            },
                            templateName = "forgot.vash";
                        mailer.sendMail(mailData, data, templateName, false, function(er, responseStatus) {
                            console.log(responseStatus);
                            console.log(er);
                        });

                        res.status(200).json({status: 200, message: 'Success'});
                    }
                });



        } else {
            res.status(500).json({status: 500, message: 'Not registered email.'});
        }
    });

}

exports.frontForgotPassword = function(req, res, callback) {

    User.findOne({email: req.body.email,deleted:0}, function(err, user) {
        if (err) {
            res.status(500).json({status: 500, message: 'Error Occurred'});
        }
        if (user) {

            var baseUrl =  jwtConfig.resetUrl + user._id;

            var mailData     = {email: req.body.email, subject: 'Forgot Password'},
                data         = {
                    templateName: 'Recovery Password',
                    name:user.name,
                    siteUrl:baseUrl
                },
                templateName = "front-forgot-password.vash";
            mailer.sendMail(mailData, data, templateName, false, function(er, responseStatus) {
                console.log(responseStatus);
                console.log(er);
            });

            res.status(200).json({status: 200, message: 'Success'});



        } else {
            res.status(500).json({status: 500, message: 'Not registered email.'});
        }
    });

}
exports.createTokenUser = function (user, callback) {
    var token = jwt.sign({
        email: user.email,
        name: user.name,
        id: user._id,
        role:user.role
    }, jwtConfig.superJwtSecretTherapist, {
        expiresIn: jwtConfig.expJwtMin
    });
    return callback(null, token);
};

exports.createTokenTherapist = function (therapist, callback) {
    var token = jwt.sign({
        email: therapist.email,
        name: therapist.name,
        id: therapist._id,
        role:therapist.role
    }, jwtConfig.superJwtSecretTherapist, {
        expiresIn: jwtConfig.expJwtMin
    });
    return callback(null, token);
};

var createTokenForgotPassword = function (user, callback) {

    var token = jwt.sign(
            {id: user._id, email: user.email},
            jwtConfig.forgotJwtSecret,
            {expiresIn: jwtConfig.forgotExpJwtMin});
    return callback(null, token);
};

exports.createTokenForgotPassword = createTokenForgotPassword;

exports.isLoggedIn = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers.authorization;
    if (!token)
        return res.status(400).json({'code': 400, 'message': 'Bad Request'});
    try {
        jwt.verify(token, jwtConfig.superJwtSecret, function (err, decoded) {
            if (err)
                checkSocialToken(res, req, token, next);
            else {
                req.decoded = decoded;
                req.decoded.token = token;
                next();
            }
        });

    } catch (e) {
        return res.status(401).json({'code': 401, 'message': 'Invalid token'});
    }
};

/* @todo - Added mail functionality without Vash partials*/
exports.resetPassword = function (request, callback) {
    Admin.findOne({email: request.email}, {password: 0}, function (err, result) {
        if (err)
            return callback({status: 400, message: 'Database error.'});

        else if (!result)
            return callback({status: 400, message: 'Invalid E-mail address.'});

        else
            createTokenForgotPassword(result, function (error, token) {
                result.resetPassword = token;
                return callback(null, result);
            });
    });
};

exports.verifyForgotToken = function (token, callback) {
    if (!token)
        return callback({status: 401, message: 'Invalid Token.'});

    jwt.verify(token, jwtConfig.forgotJwtSecret, function (err, decoded) {
        if (err)
            return callback({status: 401, message: 'Invalid Token.'});

        callback(null, decoded);
    });
};

/* @todo - Add mail functionality for notification of password change*/
exports.changePassword = function (email, password, currentPassowrd, callback) {

    var newAdmin = new Admin();


    Admin.findOne({email:email}, function (err, result) {
        if (!err && result){

            console.log(result);

            if (!result.validPassword(currentPassowrd))
                return callback({status: 400, message: 'Invalid Current Password.'});

            Admin.update(
                {email: email}, //which condition
                {password: newAdmin.generateHash(password)}, //fields need to set
                {}, //optional parameter
                function (error, data) {
                    if (error) {

                        return callback({status: 400, message: 'Database Error !'});
                    } else if (!data)
                        return callback({status: 400, message: 'No rows updated !'});

                    else
                        return callback(null, data);
                });

        }else{

            return callback({status: 400, message: 'Invalid Current Password...'});

        }
    });





};


exports.userChangePassword = function (email, password, currentPassowrd, callback) {

    var newUser = new User();


    User.findOne({email:email,deleted:0}, function (err, result) {
        if (!err && result){


            if (!result.validPassword(currentPassowrd))
                return callback({status: 400, message: 'Invalid Current Password.'});

            User.update(
                {email: email}, //which condition
                {password: newUser.generateHash(password)}, //fields need to set
                {}, //optional parameter
                function (error, data) {
                    if (error) {

                        return callback({status: 400, message: 'Database Error !'});
                    } else if (!data)
                        return callback({status: 400, message: 'No rows updated !'});

                    else
                        return callback(null, data);
                });

        }else{

            return callback({status: 400, message: 'Invalid Current Password...'});

        }
    });





};


exports.resetUserPassword = function (_id, password, callback) {

    var newUser = new User();


    User.findOne({_id:_id}, function (err, result) {
        if (!err && result){


            User.update(
                {_id: _id}, //which condition
                {password: newUser.generateHash(password)}, //fields need to set
                {}, //optional parameter
                function (error, data) {
                    if (error) {

                        return callback({status: 400, message: 'Database Error !'});
                    } else if (!data)
                        return callback({status: 400, message: 'No rows updated !'});

                    else
                        return callback({status: 200, message: 'Password Changed Successfully'});
                });

        }else{

            return callback({status: 400, message: 'Invalid Request...'});

        }
    });





};

exports.activateAccount = function (_id, callback) {


  User.findOne({_id:_id}, function (err, result) {
        if (!err && result){


            User.update(
                {_id: _id}, //which condition
                {status: 1}, //fields need to set
                {}, //optional parameter
                function (error, data) {
                    if (error) {

                        return callback({status: 400, message: 'Database Error !'});
                    } else if (!data)
                        return callback({status: 400, message: 'No rows updated !'});

                    else
                        return callback(null, result);

                });

        }else{

            return callback({status: 400, message: 'Invalid Request...'});

        }
    });





};


exports.otpConfirmation = function (_id, otp, callback) {
  //  console.log('abcdes');
  //  var newAdmin = new Admin();

   //  created: { $lt: Date.now() - INTERVAL 1 HOUR }
    User.update(
        {_id: _id,otp:otp}, //which condition
        {status:1}, //fields need to set
        {}, //optional parameter
        function (err, result) {
            console.log(err);
            console.log(result);
            if (err) {

                return callback({status: 400, message: 'Database Error !'});
            }else if (result.n == '1'){

                return callback({status: 200, message: 'User Account Activated Successfully !'});

            }  else {

                return callback({status: 400, message: 'Invalid Credentials'});



            }
        });
};









