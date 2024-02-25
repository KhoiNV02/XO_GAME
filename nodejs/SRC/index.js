//đường dẫn vì sử dụng trong folder
const path = require('path');
//gọi thư viện express để dùng các thứ có trong nó
const express = require('express');
// import { engine } from 'express-handlebars';
//morgan được sử dụng để thông báo cho trạng thái của server hiện tại
const morgan = require('morgan');
//handlebars để tải các trang, cấu trúc trang
const { engine } = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
// import engine  from 'express-handlebars';
const app = express();
// const port = 8080;
// var server=require("http").Server(app);
// var io=require("socket.io")(server);
// server.listen(8080);

const port = 8080;
const server = http.createServer(app);
// const io = socketIo(server);
const io = socketIo(server, {
  cors: {
    origin: "https://xo-game-eta.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://xo-game-eta.vercel.app/');
  // Cho phép các phương thức HTTP được sử dụng (GET, POST, PUT, DELETE...)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Cho phép các header được gửi trong yêu cầu (Content-Type, Authorization...)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
var Players=[];
io.on("connection",function(socket){
 
    socket.on("disconnect", () => {
     if (Players.includes(socket.id))
     {

      const so=socket.id;
      Players=Players.filter(item=>item!==so);
      io.sockets.in(0).emit("F5");
     }
  
    });
  console.log("có người kết nối");
  socket.on("sendIndex",(index)=>{
    io.sockets.in(0).emit("handleCheckIndex",index);
  })
  socket.on("createRoom",(data)=>{
    var numUsers = 0;
   
    // Lặp qua danh sách các phòng
    for (const room of socket.adapter.rooms.keys()) {
      // Kiểm tra nếu phòng đã đủ 2 người
      if (socket.adapter.rooms.get(room).size === 2) {
        numUsers = 2;
        break; // Thoát khỏi vòng lặp nếu đã tìm được phòng đủ người
      }
    }
  
  
    if (numUsers === 2) {
      socket.emit("reject", "Phòng đã đủ người. Không thể kết nối.");
    } else {
      socket.join(data);
      Players.push(socket.id);
      if (Players.length===2)
      io.sockets.in(0).emit("Start")
    }


    socket.emit("sendId",socket.id);
    socket.on("sendMessage",(mes)=>{
      const id=socket.id;
     io.sockets.in(0).emit("getMessage",{mes,id})
    })
  })
});

// const handlebars = require('express-handlebars')

const methodOverride = require('method-override')
app.use(express.static(path.join(__dirname, 'Resouses/public')));

//gọi ra để sử dụng
app.use(morgan('combined'));

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers:{
      sum: (a,b) => a+b,
    }
  }),
);
app.use(methodOverride('_method'))
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'Resouses','views'));
//sửa link đường dẫn mặc định thành link đường dẫn hợp lệ
//render đến các trang đó thông qua đường dẫn

const route = require('./routes/');

const db=require('./config/db');
db.connect();
app.use(express.urlencoded({
  extended:true
 }));
//  app.use(express.json);
route(app);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

