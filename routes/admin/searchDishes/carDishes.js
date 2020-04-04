var express = require('express');
var router = express.Router();
const db = require("../../../plugins/db"); //引入mysql数据库封装模块


/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
      const list = param.idList;
   
        db.selectAll("SELECT * FROM allDishes", function (err, data, fields) {
            if (err) {
                console.log(err);
                return;
            };
            let m=[];
        for(var i=0;i<data.length;i++){
            for(var j=0;j<list.length;j++){
                if(data[i].id==list[j]){
                 m.unshift(data[i])
                }
            }
        }
        console.log(m)
       res.json({"code":"000000","msg":"查询购物车菜品成功","data":m})
    
       
    
        })
    
   
    

});

module.exports = router;