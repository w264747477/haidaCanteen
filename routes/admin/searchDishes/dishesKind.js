var express = require('express');
var router = express.Router();
const db = require("../../../plugins/db"); //引入mysql数据库封装模块


/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
    var kind = param.kind;    
        db.selectAll("SELECT * FROM allDishes   WHERE kind='" + kind + "'", function (err, data, fields) {
            if (err) {
                console.log(err);
                return;
            };
            res.json({"code":"000000","msg":"获取收藏菜品成功","data":data})
        })
});

module.exports = router;