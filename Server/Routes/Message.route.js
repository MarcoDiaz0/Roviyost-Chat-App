import e from "express";

import { protectRoute } from "../Middlewares/Auth.middleware.js";
import { GetMessages, GetUsers, SendMessages } from "../Controllers/message.controller.js";

const MessageRouter = e.Router();

MessageRouter.get("/users",protectRoute,GetUsers)
MessageRouter.get("/:id",protectRoute,GetMessages)
MessageRouter.post("/send/:id",protectRoute,SendMessages)

export default MessageRouter;
