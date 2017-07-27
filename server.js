'use strict';
var http = require('http'),
    bodyParser = require('body-parser'),
    express = require('express'),
    port = process.env.PORT || 9090,
    app = express(),
    passport = require('passport'),
    controllers = require('./controllers'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    config = require('./config/config.js'),
    session = require('express-session');

mongoose.connect(config.mongoUrl, function (err) {
    if (err) {
        console.log(err);
        console.error('Could not connect to MongoDB!'); 
    }
});

app.use(express.static('www'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();

});

//app.route(/^((?!\/(admin\/)|(api\/)).)*$/).get(function (req, res) {
//    res.render('home');
//});

require('./authentication/passport')(passport);
app.set('view engine', 'vash');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(session({secret: 'ssshhhhh'}));

var sess;

console.log('Environment ', app.get('env'));
console.log(port);
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
            //error: {}
        });
    });
}

controllers.init(app, passport);

app.set('views', __dirname + '/www');

var server = http.createServer(app);
server.listen(port);
