var express = require('express'),
    authRouter = express.Router(),
    mongodb = require('mongodb').MongoClient,
    passport = require('passport');


module.exports = function (nav) {

    authRouter.route('/signUp')
        .post(function (req, res, next) {

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                if (err) {
                    return next(err);
                }
                var collection = db.collection('users');
                var user = {
                    username: req.body.username,
                    password: req.body.password
                };
                collection.insert(user, function (err, results) {
                    if (err) {
                        return next(err);
                    }
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                });

            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;

};
