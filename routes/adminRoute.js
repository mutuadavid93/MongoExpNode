var express = require('express'),
        mongodb = require('mongodb').MongoClient;
        adminRouter = express.Router();
        
var books = [
    {
        title: 'War and Peace',
        genre: 'Historical',
        author: 'Linux Tolvods',
        read: false
    },
    {
        title: 'Childhood',
        genre: 'Biography',
        author: 'Jonathan Mills',
        read: false
    },
    {
        title: 'Sweet Bakon',
        genre: 'Nutriton',
        author: 'Tim Banners',
        read: false
    },
    {
        title: 'River Between',
        genre: 'Novel',
        author: 'Ngugi Wathiong\'o ',
        read: false
    }
];       

var router = function (nav) {
    //Admin Route
    adminRouter.route('/addbooks')
        .get(function (req, res) {
            
        //MongoDB code
        var url = "mongodb://127.0.0.1:27017/libraryApp";
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.insertMany(books, function (err, results) {
                res.send(results);
                db.close(); //closed inside callback
            });
        }); 
        
        //res.send('Inserting Books');    
    });
    
    return adminRouter;
};

module.exports = router;  