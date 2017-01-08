var express = require('express'),
        app = express(),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);

//Nav
var nav = [{link:'/books', Text:'Book'},{link:'/authors', Text:'Author'}];

//Import Routes
var bookRouter = require('./routes/bookRoute')(nav);
var adminRouter = require('./routes/adminRoute')(nav);
var authRouter = require('./routes/authRoute')(nav);


//Designate Dirs
//NB: bodyParser must be b4 Route Use!!
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'library'}));

//import all passport's stuff
require('./src/config/passport')(app);

//Use Routes
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

//Views conf
app.set('views', 'src/views');
app.set('view engine', 'ejs');

//Default Route
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