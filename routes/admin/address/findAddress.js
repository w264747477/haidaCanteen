var express = require('express');
var router = express.Router();
const db = require("../../../plugins/db"); //引入mysql数据库封装模块


/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
    var mobile = param.mobile;
   console.log(mobile+"10行")
    db.selectAll("SELECT location,addr,name,gender,Tmobile,addressId,isPrimary FROM addReceiverAddress   WHERE mobile='" + mobile + "'", function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
     console.log(data)
   res.json({"code":"000000","msg":"查询收货地址成功","data":data})
    })

});

module.exports = router;