var express = require('express');
var router = express.Router();
const db = require("../../../plugins/db"); //引入mysql数据库封装模块


/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
    if(param.name){
        var name = param.name
        db.selectAll("SELECT * FROM allDishes WHERE allDishes.name = '" +name +"'" , function (err, data, fields) {
            if (err) {
                console.log(err);
                return;
            };
      
       res.json({"code":"000000","msg":"搜索菜品成功","data":data})
    
       
    
        })
    }else if(param.id){
        var id = param.id
        db.selectAll("SELECT * FROM allDishes WHERE allDishes.id = '" +id +"'" , function (err, data, fields) {
            if (err) {
                console.log(err);
                return;
            };
      
       res.json({"code":"000000","msg":"搜索菜品成功","data":data})
    
       
    
        })
    }else{
        res.json({"code":"HD0011","msg":"搜索菜品失败"})
    }
  
   
    

});

module.exports = router;