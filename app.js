var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt =require("bcryptjs")
const jwt=require("jsonwebtoken")
// const cookieParser=require("cookie-parser")
require("./db/conn")

const Register=require("./public/javascripts/registers")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registRouter = require('./routes/register');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
//Using Cookie parser Here
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// console.log(process.env.SECRET_KEY)

app.use('/', indexRouter);
app.get('/home',function(req,res,next){

})
app.use('/users', usersRouter);

// app.use('/home',usersRouter.homeroute);
app.use('/', registRouter);
app.use('/', loginRouter);
app.get('/secret',(req,res)=>{
  console.log(`Our Cookie ${req.cookies.jwt}`)
  res.render('secret');
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//JSON WEB TOKEN

// Exmaple of how to use json web token

// const createToken=async()=>{
//   const token=await jwt.sign({_id:"12345"},"Paras Goswami",);
//   console.log(token);
  
//   const userver=await jwt.verify(token,"Paras Goswami");;
//   console.log(userver);
// }
// createToken();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
