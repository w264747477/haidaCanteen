var express = require('express');
var router = express.Router();
var expressWs = require('express-ws');
var io = require('../plugins/sokect');

/* GET users listing. */
var sokect = io.getSocketio()


  

router.get('/', function(req, res, next) {

  sokect.sockets.on('connection', function (socket) {  
    console.log('连接成功');  
    socket.emit('news', { hello: 'world' })
    socket.on('news',function(data){  
   console.log(data)
    })  
  })
  
  console.log('users启动')
  res.send('respond with a resource');
})


module.exports = router;
