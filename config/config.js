var mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = {
    lean: true,
    limit: 20
};

module.exports = {
    mongoGrunt: {
        host: '52.87.137.2',
        port: '27017',
        db: 'Be_Up'
    },
 //   mongoUrl: 'mongodb://appunison:34ft#2!gbsTa45NcXQzaDloI@52.87.137.2:27017/socialsite',
  //  baseUrl: 'http://52.87.137.2:9090/',
   // otpConfirmationUrl: 'http://52.87.137.2:9090/admin#/otp-confirm/',
 //  adminBaseUrl: 'http://52.87.137.2:9090/admin',
  //  resetUrl: 'http://52.87.137.2:9090/#/reset-password/',
   // userAccountActivateUrl: 'http://52.87.137.2:9090/#/activate-account/',
  // imageUrl: 'http://52.87.137.2:9090/uploads/admin/',
    mongoUrl: 'mongodb://localhost:27017/Be_Up',
     baseUrl: 'http://localhost:9090/',
     otpConfirmationUrl: 'http://localhost:9090/admin#/otp-confirm/',
     adminBaseUrl: 'http://localhost:9090/admin',
     resetUrl: 'http://localhost:9090/#/reset-password/',
    userAccountActivateUrl: 'http://localhost:9090/#/activate-account/',
    imageUrl: 'http://localhost:9090/uploads/admin/',


    mailer: {
        from: process.env.MAILER_FROM || 'BeUp <mkmits@gmail.com>',
        options: {
           // service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
            host: '',
            port: 465,
            debug: true,
            secure: true,
            auth: {
                user: process.env.MAILER_EMAIL_ID || '4umithilesh@gmail.com',
                pass: process.env.MAILER_PASSWORD || 'password'
            }
        }
    },
    env: 'local',
    superJwtSecretAdmin: 'test@!23',
    superJwtSecretUser: 'test@$#@!23',
    superJwtSecretTherapist: 'test@$#@!23',
    forgotJwtSecret: 'test@!23',
    expJwtMin: 1440 * 30, // expires in 24hours = (1440),
    forgotExpJwtMin: 2,
    expires_in_seconds: 1440 * 365,
    models: {
        Admin: 'admin',
        EmailConfig: 'emailConfig',
        User: 'user',
        Therapist: 'therapist',
        WebsiteContent: 'websiteContent',
        ProductCategory: 'productCategory',
        Product: 'product',
        UserPost: 'userPost',
        Following: 'following',
        Message: 'message',
        Comment: 'comment',
        Like: 'like'



    },
    ImageLoc: {
        userProfile: './www/uploads/profile/',
        userProfileThumb: './www/uploads/profile/thumb/'
    },
    ImageThumbSize: {
        height: 200,
        width: 200
    },
    StatusCode: {
        Success: 200,
        NoContent: 204,
        BedRequest: 400,
        AuthError: 401
    }

};
