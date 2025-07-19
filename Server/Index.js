//! packages
import e from "express";
import { connectMongoDB } from "./Configs/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { app, server } from "./Utils/socket.js";
import path from "path";
//! Routes
import AuthRouter from "./Routes/Auth.route.js";
import MessageRouter from "./Routes/Message.route.js";

const __dirname = path.resolve();
dotenv.config();
app.use(e.json());
app.use(cookieParser());
app.use(fileUpload());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies to be sent
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;

// Sample route
app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

if (process.env.NODE_ENV === "production") {
 app.use(e.static(path.join(__dirname, "../Client/dist")));

 app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
 });
}

server.listen(port, () => {
  connectMongoDB();
  console.log(`Server is running on http://localhost:${port}`);
});
