const express = require('express');
const router = express.Router();
const token = require('../token') //引入
// 导入MySQL模块
const mysql = require('mysql');
let a;
// const dbConfig = require('../plugins/db.config');
// const loginSQL = require('../plugins/loginSql');
// let pool = mysql.createConnection( dbConfig);
const db = require("../../plugins/db"); //引入数据库封装模块
//响应一个JSON数据
// const responseJSON = function (res, ret) {
//     if(typeof ret === 'undefined') {
//         res.json({     code:'-200',     msg: '操作失败'
//         });
//     } else {
//         res.json(ret);
//     }};

// router.use((req, res, next) => {
//     console.log(`路由执行成功啦~~~`, Date.now());
//     next()
// })

// 密码登录
router.get('/', function(req, res, next) {
    const param = req.query || req.params;
   
    console.log(param);
    db.selectAll('SELECT * from register', function (err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        // this.a = JSON.parse(JSON.stringify(data));
        this.a = data
        // console.log(this.a);

        pMobile = param.mobile;
        pPassword = param.password;
        
        let num=0;
        let n = 0;
        
    for(var i=0;i<this.a.length;i++){
        aMobile = this.a[i].mobile;

        aPassWord = this.a[i].password;
        if(aMobile == pMobile){
            n +=1;
        }
        if(aMobile == pMobile&&aPassWord==pPassword) {
        num +=1;
            // return num;
    }
}

    if(n==1&& num == 1){


        const tokens = token.createToken(param.mobile)
    
        const tok = "tok"
        db.selectAll('SELECT * from tok', function (err, data, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    };
                    let isLogin = true;
                    var mobileList = data;
                    for (var i = 0; i < mobileList.length; i++) {
                        if (mobileList[i].mobile == pMobile) {
                            console.log('92行')
                            isLogin = false;
                        }
                    }
                    console.log(isLogin)
                    if (isLogin) {
                        db.insertData(tok, { mobile: param.mobile, token: tokens }, function (err, data, fields) {
                            if (err) {
                                console.log(err);
                                return;
                            };
                        })
                    } else {
                        console.log('正在更新')
                        // db.updateData('tok', {token :tokens}, {mobile :'17383062157'},{})
                        db.updateData(tok, {token : tokens}, {mobile : pMobile}, function (err, data, fields) {
    
                            console.log('更新成功')
                            if (err) {
                                console.log(err);
                                return;
                            };
                        })
                    }

                })
        res.json( {"code":"000000","msg":"登录成功","data":tokens});
       

    }else if(n==1&& num != 1) {
    
        res.json({"code":"HD0004","msg":"密码错误"})
    }else if(n !=1){
        res.json({"code":"HD0003","msg":"手机号未注册"})
    }

    })
   
})
module.exports = router;
