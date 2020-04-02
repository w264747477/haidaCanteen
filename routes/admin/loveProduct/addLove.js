const express = require('express');
const router = express.Router();
let a;
const db = require("../../../plugins/db"); //引入数据库封装模块


// 密码登录
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
            db.insertData("allLove", { mobile: mobile, id: productId }, function (err, data, fields) {
                if (err) {
                    console.log(err);
                    return;
                };
                res.json({ "code": "000000", "msg": "收藏成功" });

            })
            return;
        } else {
            // this.a = JSON.parse(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                if (data[i].mobile == mobile && data[i].id == productId) {
                    console.log("35行")
                    res.json({ "code": "HD0006", "msg": "菜品已收藏" })
                    return;
                }
                     
            }
                    db.insertData("allLove", { mobile: mobile, id: productId }, function (err, data, fields) {
                        if (err) {
                            console.log(err);
                            return;
                        };
                    })
                    console.log("45行")
                    res.json({ "code": "000000", "msg": "收藏成功" });
                    return;
           
        }

    })
})

module.exports = router;