const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'https://likho.netlify.app'
    }
});

io.on("connection", (socket) => {
    console.log(`User connected with socket Id ${socket.id}`);

    socket.on("join_room", (data) => {
        console.log(`Request to join room with Id : ${data.room}`);
        socket.join(data.room);
        socket.to(data.room).emit("new_user",data);
    });

    socket.on("send_message", (data) => {
        console.log(`New message to room : ${data} from : ${socket.id}`);
        console.log(data);
        socket.to(data.room).emit("recieve_message",data);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected with socket Id ${socket.id}`);
    });
});


server.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})
