var express = require('express'),
        app = express();

app.set('port', process.env.PORT || 3000);

//Designate Dirs
app.use(express.static('public'));
app.use(express.static('src/views'));

//Routes
app.get('/', function (req, res) {
   res.send('<h1>Hello Guys?</h1>'); 
});

//Server
var server = app.listen(app.get('port'), function (err) {
   console.log('Zoombie detected on port '+app.get('port')); 
});