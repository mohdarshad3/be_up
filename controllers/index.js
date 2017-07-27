'use strict';

module.exports.init = function (app, passport) {

    require('./authController').init(app, passport);
    require('./adminController').init(app);
    require('./userController').init(app,passport);
    require('./productCategoryController').init(app,passport);
    require('./frontProductCategoryController').init(app,passport);
    require('./websiteController').init(app);
    require('./frontUserTimeLineController').init(app);


};
