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
            res.json({ "code": "HD0008", "msg": "删除收货地址失败" })
        }
        for(var i=0;i<data.length;i++){
            if(data[i].mobile==mobile&&data[i].addressId==addressId){
                db.deleteData("addReceiverAddress", { mobile: mobile, addressId: addressId }, function (err, data, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    };
                })
               for(var j=i+1;j<data.length;j++){
                   if(j==1){
                    db.updateData("addReceiverAddress",{addressId:data[j].addressId-1,isPrimary:"1"},{addressId:data[j].addressId},function (err, data, fields) {
                        if (err) {
                            console.log(err);
                            return;
                        };
                   })
                   }else{
                    db.updateData("addReceiverAddress",{addressId:data[j].addressId-1},{addressId:data[j].addressId},function (err, data, fields) {
                        if (err) {
                            console.log(err);
                            return;
                        };
                   })
                   }
                
            }
                res.json({ "code": "000000", "msg": "删除收货地址成功" })
            }
        }
        
        
    })
  
  
   
 
})

module.exports = router;