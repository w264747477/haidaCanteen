var express = require('express');
var router = express.Router();
const db = require("../../plugins/db"); //引入mysql数据库封装模块
const sendMessage = require('../../plugins/sendMessage')
//引入redis数据库
const redis = require("../../plugins/redis");
/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
    pMobile = param.mobile;
    pCode = param.code;
    const c = redis.getString(pMobile)
   
    c.then((data) => {
        console.log(data + '39行')
        
      var  code = data
      console.log(pCode + "18行")
      console.log(code + "19行")
      if(pCode != code){
          console.log("test2")
          res.json({ "code": "HD0001", "msg": "验证码错误" })
          return;
      }
      db.selectAll('SELECT * from register', function (err, data, fields) {
          if (err) {
              console.log(err);
              return;
          };
          console.log("test1")
     var dataList = data;
     console.log(dataList)
     for(var i=0;i<dataList.length;i++){
         console.log( pMobile)
         console.log(typeof(pMobile))
         console.log(pCode)
         console.log(typeof(pCode))
         if(pMobile == dataList[i].mobile){
           
          //    if(pCode != code){
          //     console.log("test2")
          //     res.json({ "code": "HD0001", "msg": "验证码错误" })
          //     return;
    
  
          //     //    res.end()
          //    }else{
              var changeNum = dataList[i].password;
  //    sendMessage.sendMessage(pMobile, changeNum,'找回密码成功','SMS_186596257',`{"code":'${changeNum}'}`)
  
                console.log(dataList[i].password)
                
                 res.json({"code":"000000","msg":"找回密码成功","data":dataList[i].password})
                 redis.delString(pMobile)
                 console.log("test3")
                 return;
             
          //    }
         }else{
          console.log("test4")
          res.json({ "code": "HD0003", "msg": "手机号未注册" })
          return;
         }
     }
  
  
  
      })
    })
   

});

module.exports = router;