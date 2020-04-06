const express = require('express');
const router = express.Router();
let a;
const db = require("../../plugins/db"); //引入数据库封装模块


// 密码登录
router.get('/', function (req, res, next) {
    const param = req.query || req.params;
    var mobile = param.mobile;
    let orderNumber = getCode()
    var list = param.list
    //产生随机数
function getCode(){
    let str="";
    for(let i=0;i<19;i++){
        str+=parseInt(Math.random()*10);
    }
    return str;
};

    console.log(list)
   
    db.insertData("pay", { mobile: mobile, orderNumber: orderNumber,allProducts:list[0],time:list[1],person:list[2],tool:list[3],remark:list[4],money:list[5] }, function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        res.json({ "code": "000000", "msg": "支付成功" ,data:orderNumber});

    })

   
})

module.exports = router;