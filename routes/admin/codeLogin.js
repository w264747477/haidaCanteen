const express = require('express');
const router = express.Router();
const token = require('../../plugins/token') //引入
// 导入MySQL模块
const mysql = require('mysql');
let a;
// const dbConfig = require('../plugins/db.config');
// const loginSQL = require('../plugins/loginSql');
// let pool = mysql.createConnection( dbConfig);
const db = require("../../plugins/db"); //引入数据库封装模块
//引入redis数据库
const redis = require("../../plugins/redis");
//响应一个JSON数据
// const responseJSON = function (res, ret) {
//     if(typeof ret === 'undefined') {
//         res.json({     code:'-200',     msg: '操作失败'
//         });
//     } else {
//         res.json(ret);
//     }};

// router.use((req, res, next) => {
//     console.log(`路由执行成功啦~~~`, Date.now());
//     next()
// })

// 验证码登录
router.get('/', function (req, res, next) {
    const param = req.query || req.params;
    pMobile = param.mobile;
    pCode = param.code;
    console.log( pMobile+ pCode)
   
    let flag = false;
    let codeFlag = false;
    
    console.log(pMobile)
    var c = redis.getString(pMobile)
    c.then((data) => {
      
      var  code = data
      console.log(param);
      db.selectAll('SELECT * from register', function (err, data, fields) {
          //判断验证码是否正确
          console.log('52行' + code)
          console.log('53行' + pCode)
          if (code == pCode) {
              console.log('53行')
              codeFlag = true;
            
          }
          if (err) {
              console.log(err);
              return;
          };
          // this.a = JSON.parse(JSON.stringify(data));
          this.a = data
          // console.log(this.a);
  
  
  
  
  
          console.log(pMobile)
  
  
          for (var i = 0; i < this.a.length; i++) {
              aMobile = this.a[i].mobile;
  
              //判断手机号是否注册
              if (aMobile == pMobile) {
                  flag = true;
              }
  
          }
          //响应
          if (flag) {
  
              if (codeFlag) {
                  const tokens = token.createToken(param.mobile)
                  const tok = "tok"
                  db.selectAll('SELECT * from tok', function (err, data, fields) {
                      if (err) {
                          console.log(err);
                          return;
                      };
                      let isLogin = true;
                      var mobileList = data;
                      for (var i = 0; i < mobileList.length; i++) {
                          if (mobileList[i].mobile == pMobile) {
                              console.log('92行')
                              isLogin = false;
                          }
                      }
                      console.log(isLogin)
                      if (isLogin) {
                          db.insertData(tok, { mobile: param.mobile, token: tokens }, function (err, data, fields) {
                              if (err) {
                                  console.log(err);
                                  return;
                              };
                          })
                      } else {
                          console.log('正在更新')
                          // db.updateData('tok', {token :tokens}, {mobile :'17383062157'},{})
                          db.updateData(tok, {token : tokens}, {mobile : pMobile}, function (err, data, fields) {
      
                              console.log('更新成功')
                              if (err) {
                                  console.log(err);
                                  return;
                              };
                          })
                      }
  
                  })
              
  
  
                      res.json({ "code": "000000", "msg": "登录成功", "data": tokens });
                      redis.delString(pMobile)
                      return;
                  } else {
                      res.json({ "code": "HD0001", "msg": "验证码错误" });
                      return;
                  }
  
              } else {
                  res.json({ "code": "HD0003", "msg": "手机号未注册" })
                  return;
              }
  
          })

    })


   

})
module.exports = router;