var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID,
    bookRouter = express.Router();

//Declare the (nav) fcn used in app.js
var router = function(nav) {
    //All Books Route
    bookRouter.route('/').get(function (req, res) {
        //MongoDB code
        var url = "mongodb://127.0.0.1:27017/libraryApp";
        
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            
            collection.find().toArray(function (err, results) {
                res.render('books',{
                    nav : nav,
                    books: results
                }); //render
            }); //collection
            
        }); //connect
        
        
    }); //route

    //Single Book Route
    bookRouter.route('/:id')
        .get(function (req, res) {
            //create the mongoObjID
            var bookId = new objectId(req.params.id);
            var url = "mongodb://127.0.0.1:27017/libraryApp";
        
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.findOne({ _id: bookId }, function (err, results) {
                    res.render('book',{
                        nav : nav,
                        book: results
                    }); //render
                }); //collection

            }); //connect        
    });
    
    return bookRouter;
}; //router

module.exports = router;