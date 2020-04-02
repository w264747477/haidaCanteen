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
   db.insertData("addReceiverAddress", { mobile: param.mobile, location : param.location,
    addr : param.addr,
    name :param.name,
    gender : param.gender,
    Tmobile : param.Tmobile }, function (err, data, fields) {
    if (err) {
        console.log(err);
        return;
    };
    res.json({ "code": "000000", "msg": "添加收货地址成功", "data": null })
})
   
})




module.exports = router;
