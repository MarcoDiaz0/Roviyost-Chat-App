import e from "express";

import { protectRoute } from "../Middlewares/Auth.middleware.js";
import {
  GetMessages,
  GetUsers,
  SendMessages,
} from "../Controllers/message.controller.js";

const MessageRouter = e.Router();

MessageRouter.get("/users", protectRoute, GetUsers);
MessageRouter.post("/send/:id", protectRoute, SendMessages);
MessageRouter.get("/message/:id", protectRoute, GetMessages); // تم تعديل هذا

export default MessageRouter;
