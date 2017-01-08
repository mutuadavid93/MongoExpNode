var express = require('express'),
    bookRouter = express.Router();

//Books Data source
var books = [
    {
        title: 'War and Peace',
        genre: 'Historical',
        author: 'Linux Tolvods',
        read: false
    },
    {
        title: 'River Between',
        genre: 'Novel',
        author: 'Ngugi Wathiong\'o ',
        read: false
    }
];

//Declare the (nav) fcn used in app.js
var router = function(nav) {
    //All Books Route
    bookRouter.route('/').get(function (req, res) {
        res.render('books',{
           nav : nav,
           books: books
       });
    });

    //Single Book Route
    bookRouter.route('/:id')
        .get(function (req, res) {
            var bookId = req.params.id;
            res.render('book',{
                nav : nav,
                book: books[bookId]
            });        
    });
    
    return bookRouter;
}; //router

module.exports = router;