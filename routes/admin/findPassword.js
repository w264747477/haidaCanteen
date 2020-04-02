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
    var code = '';
    c.then((data) => {
        console.log(data + '39行')
        code = data
    })
    db.selectAll('SELECT * from register', function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
   var dataList = data;
   for(var i=0;i<dataList.length;i++){
       if(pMobile == dataList[i].mobile){
           if(pCode == code){
   var changeNum = dataList[i].password;
//    sendMessage.sendMessage(pMobile, changeNum,'找回密码成功','SMS_186596257',`{"code":'${changeNum}'}`)

              console.log(dataList[i].password)

               res.json({"code":"000000","msg":"找回密码成功","data":dataList[i].password})
               return;
            //    res.end()
           }else{
            res.json({ "code": "HD0001", "msg": "验证码错误" })
            return;
           }
       }else{
        res.json({ "code": "HD0003", "msg": "手机号未注册" })
        return;
       }
   }



    })

});

module.exports = router;