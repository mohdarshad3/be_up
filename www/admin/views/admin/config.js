var mongoosePaginate = require('mongoose-paginate');

mongoosePaginate.paginate.options = {
    lean: true,
    limit: 20
};

module.exports = {
    mongoGrunt: {
        host: 'localhost',
        port: '27017',
        db: 'Be_Up'
    },
    mongoUrl: 'mongodb://localhost:27017/Be_Up',
    baseUrl: 'http://localhost:9090/',
    otpConfirmationUrl: 'http://52.87.137.2:9090/#/otp-confirm/',


    mailer: {
        from: process.env.MAILER_FROM || 'BeUp <ankit@appunison.com>',
        options: {
           // service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
            host: 'sg2plcpnl0256.prod.sin2.secureserver.net',
            port: 465,
            debug: true,
            secure: true,
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'ankit.kumar@appunison.com',
                pass: process.env.MAILER_PASSWORD || '123@ankit'
            }
        }
    },
    env: 'local',
    superJwtSecret: 'test@!23',
    superJwtSecretUser: 'test@$#@!23',
    forgotJwtSecret: 'test@!23',
    expJwtMin: 1440 * 30, // expires in 24hours = (1440),
    forgotExpJwtMin: 2,
    expires_in_seconds: 1440 * 365,
    models: {
        Admin: 'admin',
        EmailConfig: 'emailConfig',
        User: 'user',
        Question: 'question',
        Answer: 'answer',
        QuestionCategory: 'questionCategory',
        AlexaRequest:'alexaRequest',
        Product:'product',
        WebsiteContent: 'websiteContent'
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
