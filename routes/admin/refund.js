const express = require('express');
const router = express.Router();
let a;
const db = require("../../plugins/db"); //引入数据库封装模块


router.get('/', function (req, res, next) {
    const param = req.query || req.params;

    var orderNumber = param.orderNumber;
    db.updateData("pay", {status : 2}, {orderNumber : orderNumber}, function (err, data, fields) {
    
        console.log('更新成功')
        if (err) {
            console.log(err);
            return;
        };
        res.json({ "code": "000000", "msg": "退款成功" });
    })
   
})

module.exports = router;