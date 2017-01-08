var express = require('express'),
        app = express();

app.set('port', process.env.PORT || 3000);

//Nav
var nav = [{link:'/books', Text:'Book'},{link:'/authors', Text:'Author'}];

//Import Routes
var bookRouter = require('./routes/bookRoute')(nav);

//Use Routes
app.use('/books', bookRouter);

//Designate Dirs
app.use(express.static('public'));

//Views conf
app.set('views', 'src/views');
app.set('view engine', 'ejs');

//Routes
app.get('/', function (req, res) {
   res.render('index', {
       nav : [
           {link:'/books', Text:'Books'},
           {link:'/authors', Text:'Authors'}]
   }); 
});

//Server
var server = app.listen(app.get('port'), function (err) {
   console.log('Zoombie detected on port '+app.get('port')); 
});