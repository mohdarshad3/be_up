'use strict';
var config        = require('../config/config.js');
var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path          = require('path');
var fs            = require('fs');
var vash          = require('vash');
var transporter   = nodemailer.createTransport(smtpTransport(config.mailer.options));
//var transporter   = nodemailer.createTransport(smtpTransport(config.mailer.options));

function unEntity(str) {
    return str.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
}

exports.sendMail = function(mailData, content, template, layout, callback) {
    var filePath     = path.resolve(__dirname, '..', 'www/views/mailer');
    var templateName = template ? template : 'default.vash';
//    var templateName = '/partials/' + template;
    fs.readFile(filePath + '/' + templateName, 'utf8', function(err, data) {
        if (err)
            return callback(err);

        var mailOptions = {
            to: mailData.email,
            from: config.mailer.from,
            subject: mailData.subject,
            html: vash.compile(data)(content)
        };

        console.log(config.mailer.options);
       console.log(mailOptions);


        transporter.sendMail(mailOptions, function(err, response) {
            if (err) {
                console.log('error');
                console.log(err);
                return callback(err);
            }
            callback(null, response);
        });
    });
};
