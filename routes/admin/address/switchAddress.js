var db = require("../../../plugins/db")
var express = require("express")
var router = express.Router()
router.get('/', function (req, res, next) {
    const param = req.query || req.params;
    var mobile = param.mobile;
    console.log(mobile + "15行呀")
    var addressId = param.addressId
    db.selectAll("SELECT * from addReceiverAddress",function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        if(data ==null){
            res.json({ "code": "HD0010", "msg": "切换默认收货地址失败" })
        }
        for(var i=0;i<data.length;i++){
         if(data[i].isPrimary =="1"){
            db.updateData("addReceiverAddress",{isPrimary:"0"},{addressId:data[i].addressId},function (err, data, fields) {
                if (err) {
                    console.log(err);
                    return;
                };
           })
         };

            if(data[i].mobile==mobile&&data[i].addressId==addressId){
                db.updateData("addReceiverAddress",{isPrimary:"1"},{addressId:data[i].addressId},function (err, data, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    };
               })
            
                res.json({ "code": "000000", "msg": "切换默认收货地址成功" })
            }
        }
        
        
    })
  
  
   
 
})

module.exports = router;