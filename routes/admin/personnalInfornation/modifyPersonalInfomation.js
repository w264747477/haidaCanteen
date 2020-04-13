var db = require("../../../plugins/db")
var express = require("express")
var router = express.Router()
router.get('/', function (req, res, next) {
   
    const param = req.query || req.params;
   mobile = param.mobile;
   if(param.headPortrait){
    headPortrait = param.headPortrait
    db.updateData("personalInfomation",{ headPortrait:headPortrait},{mobile:mobile},function (err, data, fields) {
     if (err) {
         console.log(err);
         return;
     };
     res.json({"code":"000000","msg":"修改头像成功","data":data})
 })
 
 return;
   } else if(param.name){
      let name = param.name
    db.updateData("personalInfomation",{ name:name},{mobile:mobile},function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        res.json({"code":"000000","msg":"修改姓名成功","data":data})
    })
  
    return;
   }else{
    res.json({"code":"HD0013","msg":"修改个人信息失败成功"})
   }
  
  
  
   
 
})

module.exports = router;