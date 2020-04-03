var db = require("../../../plugins/db")
var express = require("express")
var router = express.Router()
router.get('/', function (req, res, next) {
   
    const param = req.query || req.params;
   mobile = param.mobile;
   location = param.location;
   addr = param.addr;
   name =param.name;
   gender = param.gender;
   Tmobile = param.Tmobile;
   addressId = param.addressId;
    db.selectAll("SELECT * from addReceiverAddress",function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        if(data ==null){
            res.json({ "code": "HD0009", "msg": "修改收货地址失败" })
        }
        for(var i=0;i<data.length;i++){
            if(data[i].mobile==mobile&&data[i].addressId==addressId){
                db.updateData("addReceiverAddress",{mobile : mobile,
                    location : location,
                    addr : addr,
                    name :name,
                    gender : gender,
                    Tmobile : Tmobile,
                    addressId : addressId},{addressId:data[i].addressId},function (err, data, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    };
               })
         
                res.json({ "code": "000000", "msg": "修改收货地址成功" })
            }
        }
        
        
    })
  
  
   
 
})

module.exports = router;