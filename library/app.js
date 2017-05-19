var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session');

var app = express();


var nav = [{
            Link: '/Books',
            Text: 'Book'
        }, {
            Link: '/Authors',
            Text: 'Author'
        }];


var bookRouter = require('./src/routes/book.router')(nav);
var adminRouter = require('./src/routes/admin.router')(nav);
var authRouter = require('./src/routes/auth.router')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'mysecret-library', resave: true, saveUninitialized: true}));

require('./src/config/passport')(app);


app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index', {
        title: 'my App Title from EJS',
        nav: nav
    });
});

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/auth', authRouter);

var port = process.env.PORT || 5000;
app.listen(port, function (err) {
    console.log('running server on port: ' + port);
});
