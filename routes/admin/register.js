const express = require('express');
const router = express.Router();
// 导入MySQL模块
const mysql = require('mysql');
// const dbConfig = require('../plugins/db.config');
// const loginSQL = require('../plugins/loginSql');
// let pool = mysql.createConnection( dbConfig);
const db = require("../../plugins/db"); //引入数据库封装模块
//引入redis数据库
const redis = require("../../plugins/redis");
let a;
// 添加用户
router.get('/', function (req, res, next) {
    const param = req.query || req.params;
    pMobile = param.mobile;
    pCode = param.code;
    console.log(pCode + '31行')
    flag = true;
    codeFlag = false;
    console.log(param)
    const login = "login"
    const c = redis.getString(pMobile)
    var code = '';
    c.then((data) => {
        console.log(data + '39行')
        code = data
    })


    console.log(code + '37行')


    db.selectAll('SELECT * from register', function (err, data, fields) {
        if (pCode == code) {
            codeFlag = true;
            console.log('验证码正确')
        }
        if (err) {
            console.log(err);
            return;
        };
        a = data;
        // console.log(a)
        console.log(a)

        for (var i = 0; i < a.length; i++) {
            aMobile = a[i].mobile;
            console.log('62行' + aMobile)
            console.log('63行' + pMobile)
            if (aMobile == pMobile) {
                console.log('64行')
                flag = false;
            }
            console.log(flag)
        }
        console.log(flag)
        if (flag) {



            if (codeFlag) {
                const register = "register"
                db.insertData(register, { mobile: param.mobile, password: param.password }, function (err, data, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    };
                })
                res.json({ "code": "000000", "msg": "注册成功", "data": null })
            } else {
                res.json({ "code": "HD0001", "msg": "验证码错误" })
            }

        } else {
            res.json({ "code": "HD0002", "msg": "手机号已注册" })
        }
    })
})




module.exports = router;
