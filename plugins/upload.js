let path = require('path');
var fs = require('fs');
let express = require('express');
let router = express.Router();

let formidable = require('formidable');

router.post('/', function (req, res, next) {


  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8'; // 编码
  // 保留扩展名
  form.keepExtensions = true;

  console.log(req.body)
  // 文件存储路径 最后要注意加 '/' 否则会被存在public下
  // form.uploadDir = path.join(__dirname, '../public/images/');
  //   let a = path.join(__dirname, '../public/images/');



  // 解析 formData 数据
  form.parse(req, (err, fields, files) => {
    if (err) return next(err)

    let path1 = files.file.path;
    //要放入的位置
    let a;
    //返回的位置
    let b;

    let name = files.file.name;
    console.log(JSON.stringify(name))
    var extname = path.extname(name);	 //获取文件的后缀名
    console.log(extname)
    if (extname == '.png') {
      console.log('44')
      form.uploadDir = path.join(__dirname, '../public/images/');
      a = path.join(__dirname, '../public/images/');
      b = "images/"
      // return;
    } else if (extname == '.mp3') {
      console.log('44')
      form.uploadDir = path.join(__dirname, '../public/mp3/');
      a = path.join(__dirname, '../public/mp3/');
      b = "mp3/"
      // return;
    } else if (extname == '.apk') {
      console.log('44')
      form.uploadDir = path.join(__dirname, '../public/apk/');
      a = path.join(__dirname, '../public/apk/');
      b = "apk/"
      // return;
    }else{
      form.uploadDir = path.join(__dirname, '../public/other/');
      a = path.join(__dirname, '../public/other/');
      b = "other/"
      // return;
    }
    // res.json({code: 1, data: { name: name, path: 'localhost:3000/'+b+name }});
    console.log(extname + '19行')

let date = new Date();
console.log(JSON.stringify(date))
let date1 = format(JSON.stringify(date));
console.log(date1)
//时间格式化
function format(date){
  var a= date.replace(/T/g,"-")
  console.log(a)
  var n = a.replace(/:/g,"-")
  console.log(n)
   var b = n.slice(1,20)
console.log(b)
var c = JSON.stringify(b).split("-")

c[3] = c[3]*1+8 +"h"
c[4] = c[4] + "m"
console.log(c)
// var d = c.replace()
// console.log(d+"82行")
var d = c.join("-")
var m = d.slice(0,d.length-1) + "s-" +"\""
console.log(m)
 return JSON.parse(m)
}

console.log(date)

      let oldpath = files.file.path;
      // console.log(oldpath)
      // let c = oldpath.split("\\")
      // let d = c[c.length-1];
      // let m = d.slice(7,d.length-4)
      // console.log(c)
      // console.log(d)
      // console.log(m)
      // let  newpath =   a +m+ name ;
     let  newpath =    a +date1+ name ;
    // let  newpath =    a +"2020-01-03:02"+ name ;
     console.log(newpath)

    fs.rename(oldpath,newpath,function(err){

          if(err){
            res.json({"code":"HD0005","msg":"上传失败"})
          }else{
            res.json({code: "000000", data: { name: name, path: 'localhost:3000/'+b+date1+name }});
          }
         
        });


  });


})


module.exports = router;

