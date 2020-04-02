var db = require("../../../plugins/db")
var express = require("express")
var router = express.Router()
router.get('/', function (req, res, next) {
    const param = req.query || req.params;
    var mobile = param.mobile;
    console.log(mobile + "15行呀")
    var productId = param.productId
    db.selectAll('SELECT * from allLove', function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        console.log(data)
        if (data.length == "0") {
            res.json({ "code": "HD0007", "msg": "菜品未收藏" });
            return;
        } else {
            // this.a = JSON.parse(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                if (data[i].mobile == mobile && data[i].id == productId) {
                    db.deleteData("allLove",{mobile : mobile,id:productId},function (err, data, fields) {
                        if (err) {
                            console.log(err);
                            return;
                        };
                    })
                    console.log("35行")
                    res.json({ "code": "000000", "msg": "菜品已取消收藏" })
                    return;
                }                    
            }
                   
                    res.json({ "code": "000000", "msg": "菜品未收藏" });
                    return;
           
        }

    })
})

module.exports = router;