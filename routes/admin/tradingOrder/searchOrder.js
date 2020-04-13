var express = require('express');
var router = express.Router();
const db = require("../../../plugins/db"); //引入mysql数据库封装模块


/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
    var mobile = param.mobile;
   
    if(param.name){
        var name = param.name;
        db.selectAll("SELECT * FROM pay   WHERE mobile='" + mobile + "' AND allProducts LIKE '%" + name + "%'", function (err, data, fields) {
            if (err) {
                console.log(err);
                return;
            };
            res.json({"code":"000000","msg":"获取收藏菜品成功","data":data})
        })
      
    }else if(param.orderNumber){
        var orderNumber = param.orderNumber;
        db.selectAll("SELECT * FROM pay   WHERE orderNumber='" + orderNumber + "'", function (err, data, fields) {
            if (err) {
                console.log(err);
                return;
            };
            res.json({"code":"000000","msg":"获取收藏菜品成功","data":data})
        })
      
    }else{
        res.json({"code":"HD0012","msg":"请输入有效关键字"})
    }
});

module.exports = router;