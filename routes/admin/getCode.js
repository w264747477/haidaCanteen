
// // 导入MySQL模块
 const mysql = require('mysql');
const db = require("../../plugins/db"); //引入数据库封装模块
const express = require('express');
const router = express.Router();
//这里的url模块用来获取前端的手机号码
const url=require("url");
// 


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

let str1=getCode();
const param = req.query || req.params;
const mobile = param.mobile;
redis.setString(mobile,str1,360)
resout.json({
    code:"000000",
    msg:"Ok",
    data:str1  //str1是自行产生的手机验证码，返回到前端以做验证
})
//引入SDK
// const SMSClient = require('@alicloud/sms-sdk')
// // accessKeyId /secretAccessKey 根据实际申请的账号信息进行替换
// const accessKeyId = 'LTAI4Fs2q6ZPxwYFRbDELxmP';
// const secretAccessKey = 'WYsUWqBRlhb4znPs1SUGSrQgXwckm8';
// //初始化sms_client
// let smsClient = new SMSClient({accessKeyId, secretAccessKey});
//     //发送短信
//     smsClient.sendSMS({
//         PhoneNumbers: mobile,//必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为：国际区号+号码，如“85200000000”
//         //以下短信签名和模板填入自己申请的即可
//         SignName: '食堂点餐',//必填:短信签名-可在短信控制台中找到
//         TemplateCode: 'SMS_185821599',//必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
//         TemplateParam: `{"code":'${str1}'}`//可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
//     }).then(function (res) {
//         let {Code}=res
//         if (Code === 'OK') {
//             //这里返回的数据自行确定
//             let obj={
//                 msg:"ok",
//                 code:str1  //str1是自行产生的手机验证码，返回到前端以做验证
//             }
//             resout.send(obj);
//             //调试阶段打印出来便于调试
//             console.log(res);
//         }
//     },function(err) {
//         let obj={
//             msg:"fail"
//         }
//         resout.send(obj);
//         console.log(err);
//     })
})

module.exports =router;


