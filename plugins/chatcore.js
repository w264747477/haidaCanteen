var chatcore = {};
var dataList=[]
/**
 * chatroom app
 */
chatcore.init = function(io) {
  io.on('connection', function(socket) {
  
    //从客户端接收消息
    socket.on('news', function(data){
        console.log(data.roomId)
    dataList.push(data)
     //向客户端发送消息
     
     socket.emit("news",dataList)
      console.log(dataList)
    });
       
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
};

module.exports = chatcore;