
var express = require('express');
var router = express.Router();
const db = require("./db"); //引入mysql数据库封装模块
//搜索所有job并分页
var select = function(page, num, chart) {

   
    //分页实现
    var current_page = page; //当前页数
    var num = num; //每页条数
    var data1 ;
    //设置最后一页页码
    var last_page = current_page - 1;
    //假如目前仅有一页，则最后一页则为1
    if (current_page <= 1) {
        last_page = 1;
    }
    //如果需要下一页，则开启
    //var next_page = current_page + 1;
    var sql = 'select * FROM ' + chart + ' limit ' + num + '  offset ' + (current_page-1)*num
  return sql;
}
exports.select= select;
