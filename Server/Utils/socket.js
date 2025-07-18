import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
// store online User
const userSocketMap = {};
export const getReceiverSocketID = (userID) => {
  return userSocketMap[userID];
};
io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
  const userID = socket.handshake.query.userID;
  if (userID) userSocketMap[userID] = socket.id;

  // Is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected ", socket.id);
    delete userSocketMap[userSocketMap];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { io, app, server };
