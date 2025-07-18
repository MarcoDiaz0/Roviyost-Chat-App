import e from "express";

import { protectRoute } from "../Middlewares/Auth.middleware.js";
import {
  GetMessages,
  GetUsers,
  SendMessages,
} from "../Controllers/message.controller.js";

const MessageRouter = e.Router();

MessageRouter
  .get("/users", protectRoute, GetUsers)
  .get("/message/:id", protectRoute, GetMessages)
  .post("/send/:id", protectRoute, SendMessages);
 // تم تعديل هذا

export default MessageRouter;
