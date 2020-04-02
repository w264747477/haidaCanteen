var express = require('express');
var router = express.Router();
const db = require("../../plugins/db"); //引入mysql数据库封装模块


/* GET users listing. */
router.get('/', function(req, res, next) {
   
   
    db.selectAll('SELECT * FROM allDishes,sliders WHERE allDishes.id = sliders.id', function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
  
   res.json({"code":"000000","msg":"获取sliders成功","data":data})

   

    })

});

module.exports = router;