var express = require('express'),
    authRouter = express.Router(),
    mongodb = require('mongodb').MongoClient;


module.exports = function () {

    authRouter.route('/signUp')
        .post(function (req, res, next) {
            console.log(req.body);
        });

    return authRouter;

};
