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
//找回密码
var findPassword = require('./routes/admin/findPassword');
//重置密码
var resetPassword = require('./routes/admin/resetPassword');
//获取首页轮播图
var sliders = require('./routes/admin/sliders');
//获取推荐产品
var recommend = require('./routes/admin/recommend');
var upload = require('./plugins/upload');
var addLove = require('./routes/admin/loveProduct/addLove')
var removeLove = require("./routes/admin/loveProduct/removeLove")
var allLove = require("./routes/admin/loveProduct/allLove")
var addReceiverAddress = require("./routes/admin/address/addReceiverAddress")
var findAddress = require("./routes/admin/address/findAddress")
var deleteAddress = require("./routes/admin/address/deleteAddress")
var modifyAddress = require("./routes/admin/address/modifyAddress")
var switchAddress = require("./routes/admin/address/switchAddress")
var recommendDishes = require("./routes/admin/searchDishes/recommendDishes")
var searchDishes = require("./routes/admin/searchDishes/searchDishes")
var carDishes = require("./routes/admin/searchDishes/carDishes")
var pay = require("./routes/admin/pay")
var checkOrder = require("./routes/admin/tradingOrder/checkOrder")
var searchOrder = require("./routes/admin/tradingOrder/searchOrder")
var refund = require("./routes/admin/refund")
var evaluate = require("./routes/admin/evaluate")
var noRemarkOrder = require("./routes/admin/tradingOrder/noRemarkOrder")
var refundOrder = require("./routes/admin/tradingOrder/refundOrder")
var dishesKind = require("./routes/admin/searchDishes/dishesKind")
var personalInfomation = require("./routes/admin/personnalInfornation/personalInfomation")
var modifyPersonalInfomation = require("./routes/admin/personnalInfornation/modifyPersonalInfomation")
var getEvaluate = require("./routes/admin/getEvaluate")
var app = express();
const session = require('express-session');
const http = require('http');
//设置跨域访问  
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
   //用于判断request来自ajax还是传统请求
   res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  // res.header("Content-Type", "");
  var url = req.url;
  var handlerUrl = url.split('?')
  console.log(handlerUrl[0]+"38行")
  //token拦截器,未登录无法访问
  if (handlerUrl[0] == '/getCode' || handlerUrl[0] == '/register' || handlerUrl[0] == '/login' || handlerUrl[0] == '/codeLogin'
  || handlerUrl[0] =='/findPassword'|| handlerUrl[0] =='/resetPassword'||handlerUrl[0] =='/upload'||handlerUrl[0].indexOf("/images")!=-1) {
    console.log('11111新')
    next();
  } else {
    const param = req.query || req.params;
    var hasToken = false
    var tokens = [];
    db.selectAll('SELECT * from tok', function (err, data, fields) {
      tokens = data;
      console.log(param.token + '51行')

      for (var i = 0; i < tokens.length; i++) {
        console.log(param.token + '51行')
         console.log(tokens[i].token)
        if (param.token == tokens[i].token) {
          param.mobile = tokens[i].mobile
          hasToken = true
        }

      }
      console.log(hasToken)
      if (hasToken==true) {
         
        next()
      } else {
        
        res.json({
          "code": "HD0000", "msg": "身份信息已过期"
        })
      }


      if (err) {
        console.log(err);
        return;
      };
    })


    console.log(hasToken + '60行')
    



  }

  console.log(handlerUrl[0])
  console.log(url)

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
app.use('/findPassword', findPassword)
app.use('/resetPassword', resetPassword)
app.use('/upload', upload)
app.use('/sliders', sliders)
app.use('/recommend', recommend)
app.use('/addLove',addLove)
app.use('/removeLove',removeLove)
app.use('/allLove',allLove)
app.use('/addReceiverAddress',addReceiverAddress)
app.use('/findAddress',findAddress)
app.use('/deleteAddress',deleteAddress)
app.use('/modifyAddress',modifyAddress)
app.use('/switchAddress',switchAddress)
app.use('/recommendDishes',recommendDishes)
app.use('/searchDishes',searchDishes)
app.use('/carDishes',carDishes)
app.use("/pay",pay)
app.use("/checkOrder",checkOrder)
app.use("/searchOrder",searchOrder)
app.use("/refund",refund)
app.use("/evaluate",evaluate)
app.use("/noRemarkOrder",noRemarkOrder)
app.use("/refundOrder",refundOrder)
app.use("/dishesKind",dishesKind)
app.use("/personalInfomation",personalInfomation)
app.use("/modifyPersonalInfomation",modifyPersonalInfomation)
app.use("/getEvaluate",getEvaluate)
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
