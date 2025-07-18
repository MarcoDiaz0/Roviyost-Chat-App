import e from "express";

import {
  AccountConfirmation,
  CheckAuth,
  Login,
  Logout,
  Recover,
  register,
  updateProfile,
} from "../Controllers/Auth.controller.js";
import { protectRoute } from "../Middlewares/Auth.middleware.js";

const AuthRouter = e.Router();

// Route for user registration
AuthRouter.post("/register", register);
AuthRouter.post("/register/confirm", AccountConfirmation);

// Route for user login
AuthRouter.post("/login", Login).get("/logout", Logout).post("/recover",Recover);
AuthRouter.post("/updateProfile",protectRoute, updateProfile);
AuthRouter.get("/check",protectRoute, CheckAuth);

export default AuthRouter;
