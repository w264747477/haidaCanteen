var express = require('express');
var router = express.Router();
const db = require("../../plugins/db"); //引入mysql数据库封装模块
const pageingQuery = require("../../plugins/pageingQuery")

/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
     var page = param.page;
     var num = param.num;
     
     console.log(page+"   " + num)
     var charts = "allDishes"
     var sql =  pageingQuery.select(page,num,charts)
     var a=  db.selectAll(sql, (err, data, fields) => {
        if (err) {
            console.log(err);
            return;
        };
      
        
        res.json({"code":"000000","msg":"获取分页数据成功","data":data})
    })

  
 

     

   

});

module.exports = router;