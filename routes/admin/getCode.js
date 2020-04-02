
// // 导入MySQL模块
 const mysql = require('mysql');
const db = require("../../plugins/db"); //引入数据库封装模块
const express = require('express');
const router = express.Router();
//这里的url模块用来获取前端的手机号码
const url=require("url");
// 引入发送短信模块
const sendMessage = require('../../plugins/sendMessage')


const redis = require("../../plugins/redis");
//产生随机数
function getCode(){
    let str="";
    for(let i=0;i<6;i++){
        str+=parseInt(Math.random()*10);
    }
    return str;
};

router.get("/",function(req,resout,next){

let changeNum=getCode();
const param = req.query || req.params;
const mobile = param.mobile;
console.log(mobile)
redis.setString(mobile,changeNum,360)


// sendMessage.sendMessage(mobile, changeNum,'食堂点餐','SMS_186596258',`{"code":'${changeNum}'}`)
resout.json({
    code:"000000",
    msg:"Ok",
    data:changeNum  //changeNum是自行产生的手机验证码，返回到前端以做验证
})
})

module.exports =router;


