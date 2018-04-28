var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session=require("express-session");

var mongoose=require("mongoose");
var MongoStore=require("connect-mongo")(session);

mongoose.connect("mongodb://127.0.0.1:27017/myapp");
var fileStore=require("session-file-store")(session);

var routes = require('./routes/index');
// var users = require('./routes/user');
// var uploads=require("./routes/upload");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(app.router);

const sessionMiddleWare=session({
    // store:new fileStore(),//自动创建一个session文件夹，如果不设置，就是存储在内存
    store:new MongoStore({
        url:"mongodb://127.0.0.1:27017/myapp"
    }),
    secret:"abcdefg",
    cookie:{maxAge:60*60*24*30*1000},//毫秒单位，60000=60S
    resave:false,
    saveUninitialized: false

})
app.use(sessionMiddleWare);
app.use('/', routes);
app.use('/upload', require("./routes/upload"));
app.use('/user', require('./routes/user'));


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
