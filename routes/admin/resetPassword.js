var express = require('express');
var router = express.Router();
const db = require("../../plugins/db"); //引入mysql数据库封装模块
//引入redis数据库
const redis = require("../../plugins/redis");
/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
    pMobile = param.mobile;
    pPassword = param.password
    pCode = param.code;
    const c = redis.getString(pMobile)
  
    c.then((data) => {
        console.log(data + '39行')
     var  code = data
     db.selectAll('SELECT * from register', function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
   var dataList = data;
   console.log(dataList)
  
   for(var i=0;i<dataList.length;i++){
       console.log("aaaa")
       console.log(pMobile)
       console.log(dataList[0].mobile)
       console.log(code +"25");
       if(pMobile === dataList[i].mobile){
           console.log(code +"26");
           console.log(pCode +"27")
           if(pCode == code){
            db.updateData('register', {password : pPassword}, {mobile : pMobile}, function (err, data, fields) {
    
                console.log('更新成功')
                if (err) {
                    console.log(err);
                    return;
                };
            })
               res.json({"code":"000000","msg":"重置密码成功"})
               redis.delString(pMobile)
               return;
           }else{
            res.json({ "code": "HD0001", "msg": "验证码错误" })
            return;
           }
       }    
   }
   res.json({ "code": "HD0003", "msg": "手机号未注册" })



    })
    })
    

});

module.exports = router;