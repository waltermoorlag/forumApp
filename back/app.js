// import * as express from 'express';
const express = require('express');
// import * as path from 'path';
const path = require('path');
// import * as logger from 'morgan';
const logger = require('morgan');
// import * as cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');
// import * as bodyParser from 'body-parser';
const bodyParser = require('body-parser');
// import * as mongoose from 'mongoose';
const mongoose = require('mongoose');
// import * as index from './routes/index';
const index = require('./routes/index');
const login = require('./routes/login');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

const app = express();

mongoose.connect('mongodb://localhost/forumapp');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





const allowCrossDomain = function(req, res, next) {
    // intercept OPTIONS method
    if ('OPTIONS'==req.method) {
      res.set({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Accept, Header, Content-Type, access-control-allow-origin',
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      });
      return res.sendStatus(200);
    }
    res.set({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':"header, Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since",
      'Access-Control-Allow-Credentials': true
    });
    next();   
};
app.use(allowCrossDomain);


const retardo = (req, res, next) => {
  setTimeout( () => next() , 4000);
}

app.use('/', index);
// app.all('/',login)
app.use('/login', login);
app.use('/post', posts);
app.use('/comment', comments);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
