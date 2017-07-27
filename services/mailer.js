'use strict';
var MongoClient = require('mongodb').MongoClient,
    config = require('../config/config.js'),
    nodemailer = require('nodemailer'),
    path = require('path'),
    fs = require('fs'),
    vash = require('vash'),
    smtpTransport = nodemailer.createTransport(config.mailer.options);

exports.sendMail = function (mailData, content, template, layout, callback) {

    var filePath = path.resolve(__dirname, '..', 'www/mailer'),
        layoutName = (layout) ? layout : 'default.vash',
        templateName = filePath + '/partials/' + template;

    fs.readFile(filePath + '/' + layoutName, 'utf8', function (err, data) {
        if (err)
            return callback(err);

        var mailOptions = {
            to: mailData.email,
            from: config.mailer.from,
            subject: mailData.subject,
            html: vash.compile(data)(content)
        };
        smtpTransport.sendMail(mailOptions, function (err, responseStatus) {
            if (err) {
                console.log(err);
                return callback({status: 400, message: 'Mail sending failed.'});
            }
            callback(null, responseStatus);
        });
    });
};
