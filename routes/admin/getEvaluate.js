var express = require('express');
var router = express.Router();
const db = require("../../plugins/db"); //引入mysql数据库封装模块


/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
    var mobile = param.mobile;
 
    db.selectAll("SELECT * FROM pay  WHERE pay.mobile='" + mobile  + "' and pay.evaluate != '' ", function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        console.log("allLove2")
   res.json({"code":"000000","msg":"获取收藏菜品成功","data":data})

   

    })

});

module.exports = router;