var express = require('express'),
    bookRouter = express.Router(),
    mongodb = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;


module.exports = function (nav) {


    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.find({}).toArray(
                    function (err, books) {
                        res.render('books', {
                            title: 'Books',
                            nav: nav,
                            books: books
                        });
                });

            });

            
        });

    bookRouter.route('/:bookId')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            var id = new ObjectID(req.params.bookId);
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.findOne({_id: id},
                    function (err, book) {
                        res.render('book', {
                            title: 'Book',
                            nav: nav,
                            book: book
                        });
                });

            });

            
        });

    return bookRouter;

};
