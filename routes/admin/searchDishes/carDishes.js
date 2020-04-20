var express = require('express');
var router = express.Router();
const db = require("../../../plugins/db"); //引入mysql数据库封装模块


/* GET users listing. */
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
     var list=[];
     console.log(param.idList)
if(param.idList){
  
    if(param.idList.length=="1"){
        list.unshift(param.idList)
        console.log("14行")
    }else{
        list = param.idList;
    }
  
   console.log(list)
}else{
    res.json({"code":"000000","msg":"查询购物车菜品成功","data":[]})
    return;
}
console.log(list +"12行")
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