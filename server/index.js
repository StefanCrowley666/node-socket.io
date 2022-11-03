import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

//App configuration
const app = express();
dotenv.config();

//Express middlewares
app.use(cors());

//App variables
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

//Socket.io config
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

//Listening on port 8000
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
