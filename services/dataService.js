'use strict';
var mongoose = require('mongoose'),
    config = require('../config/config.js');
module.exports.getInit = function (modelName, callback) {
    var ModelObj = require('../models/' + modelName);

    ModelObj.count( function (err, count) {
        if (!err && count == 0) {
            var NewAdmin = new ModelObj({
                "address": "test",
                "deleted": 0,
                "email": "admin@gmail.com",
                "name": "Mithilesh",
                "password": "$2a$08$UsTqmanm6py1oaO.8LUCYepI8NrrKRegWKRHr4IxUUrNTC6spgDT.",
                "phone": "7879404052",
                "type": "Admin",
                "status": 1
            });
            NewAdmin.save();
        }
    });
};



module.exports.accessToken = function (modelName,req, callback) {
    var ModelObj = require('../models/' + modelName);
    var adminId = req.decoded.id;
   
      
     ModelObj.findOne({_id: adminId,deleted:0}, //conditions
        {password: 0, __v: 0}, //Blocking the fields in the result
        function (err, result) {
            if (!err && result != null)
                callback(config.StatusCode.Success, err, result.name);
            else
                callback(config.StatusCode.BedRequest, err, result);

        });


};



module.exports.Save = function (modelName,data, callback) {
    var ModelObj = require('../models/' + modelName);
    var NewAdmin = new ModelObj(data);

    NewAdmin.save(function(err) {
       if (!err) {
            callback(config.StatusCode.Success, err);
        }else {
            callback(config.StatusCode.BedRequest, err);
        }
    });


};




module.exports.getSingleRecord = function (modelName, id, callback) {
    var ModelObj = require('../models/' + modelName);
    ModelObj.findOne({_id: id}, //conditions
        {password: 0, __v: 0}, //Blocking the fields in the result
        function (err, result) {
            console.log(result);
            if (!err)
                callback(config.StatusCode.Success, err, result);
            else
                callback(config.StatusCode.BedRequest, err, result);

        });
};

module.exports.getFirstRecord = function (modelName, callback) {
    var ModelObj = require('../models/' + modelName);
    ModelObj.findOne({}, //conditions
        {password: 0, __v: 0}, //Blocking the fields in the result
        function (err, result) {
            if (!err)
                callback(config.StatusCode.Success, err, result);
            else
                callback(config.StatusCode.BedRequest, err, result);

        });
};



module.exports.deleteSingleRecord = function (modelName, id, callback) {
    var ModelObj = require('../models/' + modelName);

    ModelObj.update({_id: mongoose.Types.ObjectId(id)}, //condition
        {$set: {deleted: 1}}, //fields to update
        function (err, result) {
            if (!err) {
                callback(config.StatusCode.Success, err);
            } else {
                callback(config.StatusCode.BedRequest, err);
            }
        });
};

module.exports.deleteMultipleRecords = function (modelName, ids, callback) {
    var ModelObj = require('../models/' + modelName);

    ModelObj.update({_id: {$in: ids}}, //condition
        {$set: {deleted: 1}}, //fields to update
        {multi: true},
        function (err, result) {
            if (!err) {
                callback(config.StatusCode.Success, err);
            } else {
                callback(config.StatusCode.BedRequest, err);
            }
        });
};

module.exports.changeStatusMultipleRecords = function (modelName, ids, status, callback) {
    var ModelObj = require('../models/' + modelName);

    ModelObj.update({_id: {$in: ids}}, //condition
        {$set: {status: status}}, //fields to update
        {multi: true},
        function (err, result) {
            if (!err) {
                callback(config.StatusCode.Success, err);
            } else {
                callback(config.StatusCode.BedRequest, err);
            }
        });
};


module.exports.update = function (modelName, id, Data, callback) {
    var ModelObj = require('../models/' + modelName);

    delete Data._id;
    Data.modified = Date.now();

    ModelObj.update({_id: mongoose.Types.ObjectId(id)}, //condition
        Data,
        { runValidators: true }, //fields to update
        function (err) {
            if (!err) {
                callback(config.StatusCode.Success, err);
            } else {
                callback(config.StatusCode.BedRequest, err);
            }
        });
};


module.exports.updateEmailConfigDetail = function (modelName, id, Data, callback) {
    var ModelObj = require('../models/' + modelName);
    delete Data._id;
    Data.modified = Date.now();
    ModelObj.update({_id: mongoose.Types.ObjectId(id)}, //condition
        Data, //fields to update
        function (err, result) {
            if (!err) {
                callback(config.StatusCode.Success, err);
            } else {
                callback(config.StatusCode.BedRequest, err);
            }
        });
};

module.exports.getPagination = function (modelName, query, options, callback) {
    var ModelObj = require('../models/' + modelName);

    ModelObj.paginate(query, options).then(function (result) {
        callback(null, result);
    });

};

module.exports.changeStatusSingleRecord = function (modelName, id, status, callback) {
    var ModelObj = require('../models/' + modelName);

    ModelObj.update({_id: mongoose.Types.ObjectId(id)}, //condition
        {$set: {status: status}}, //fields to update
        function (err, result) {
            if (!err) {
                callback(config.StatusCode.Success, err);
            } else {
                callback(config.StatusCode.BedRequest, err);
            }
        });
};

