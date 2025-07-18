//! packages
import e from "express";
import { connectMongoDB } from "./Configs/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { app, server } from "./Utils/socket.js";

//! Routes
import AuthRouter from "./Routes/Auth.route.js";
import MessageRouter from "./Routes/Message.route.js";

dotenv.config();
app
app.use(e.json());
app.use(cookieParser());
app.use(fileUpload());
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, // Allow cookies to be sent
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;

// Sample route
app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

server.listen(port, () => {
  connectMongoDB();
  console.log(`Server is running on http://localhost:${port}`);
});
