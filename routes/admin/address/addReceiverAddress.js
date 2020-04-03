const express = require('express');
const router = express.Router();

const db = require("../../../plugins/db"); //引入数据库封装模块

let a;
// 添加收货地址
router.get('/', function (req, res, next) {
    const param = req.query || req.params;
   mobile = param.mobile;
   location = param.location;
   addr = param.addr;
   name =param.name;
   gender = param.gender;
   Tmobile = param.Tmobile;
   db.selectAll("SELECT addressId FROM addReceiverAddress   WHERE mobile='" + mobile + "'", function (err, data, fields) {
    if (err) {
        console.log(err);
        return;
    };
    let m =0;
    let isPrimary=1;
    if(data == null||data==""){
        console.log("ddd")
     m=0;
     isPrimary=1
    }else{

        m=data.length
        isPrimary=0;
    }
    console.log(data+"21行")
    db.insertData("addReceiverAddress", { mobile: param.mobile,
         location : param.location,
         addressId:m,
        addr : param.addr,
        name :param.name,
        gender : param.gender,
        Tmobile : param.Tmobile,
        isPrimary:isPrimary,
     }, function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        res.json({ "code": "000000", "msg": "添加收货地址成功", "data": null })
    })

})


   
   
})




module.exports = router;
