//! packages
import express from "express";
import { connectMongoDB } from "./Configs/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { app, server } from "./Utils/socket.js";
import path from "path";
import fs from "fs";

//! Routes
import AuthRouter from "./Routes/Auth.route.js";
import MessageRouter from "./Routes/Message.route.js";


dotenv.config();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Sample route
app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./Client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Client", "dist", "index.html"));
  });
}

server.listen(port, () => {
  connectMongoDB();
  console.log(`Server is running on http://localhost:${port}`);
});
