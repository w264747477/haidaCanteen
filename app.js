var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//引入mysql数据库
var db = require('./plugins/db')
var logger = require('morgan');
//路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/admin/login');
var codeLogin = require('./routes/admin/codeLogin');
var register = require('./routes/admin/register');
var getCode = require('./routes/admin/getCode');
var address = require('./routes/admin/address');
//找回密码
var findPassword = require('./routes/admin/findPassword');
//重置密码
var resetPassword = require('./routes/admin/resetPassword');
var upload = require('./routes/upload');
var app = express();




const session = require('express-session');

const http = require('http');

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  // res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Content-Type", "");
  // var url = req.url;
  // var handlerUrl = url.split('?')
  // //token拦截器,未登录无法访问
  // if (handlerUrl[0] == '/getCode' || handlerUrl[0] == '/register' || handlerUrl[0] == '/login' || handlerUrl[0] == '/codeLogin'
  // || handlerUrl[0] =='/findPassword'|| handlerUrl[0] =='/resetPassword'||'/upload') {
  //   console.log('11111')
    next();
  // } else {
  //   const param = req.query || req.params;
  //   var hasToken = false
  //   var tokens = [];
  //   db.selectAll('SELECT * from tok', function (err, data, fields) {
  //     tokens = data;
  //     console.log(param.token + '51行')

  //     for (var i = 0; i < tokens.length; i++) {
  //       console.log(param.token + '51行')
  //        console.log(tokens[i].token)
  //       if (param.token == tokens[i].token) {
  //         hasToken = true
  //       }
  //     }
  //     console.log(hasToken)
  //     if (hasToken) {
  //       next()
  //     } else {
        
  //       res.json({
  //         "code": "HD0000", "msg": "身份信息已过期"
  //       })
  //     }


  //     if (err) {
  //       console.log(err);
  //       return;
  //     };
  //   })


  //   console.log(hasToken + '60行')
    



  // }

  // console.log(handlerUrl[0])
  // console.log(url)

});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));//静态托管文件
// 路由使用
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/codeLogin', codeLogin)
app.use('/register', register)
app.use('/getCode', getCode)
app.use('/address', address)
app.use('/findPassword', findPassword)
app.use('/resetPassword', resetPassword)
app.use('/upload', upload)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
