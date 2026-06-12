import { Router } from "express";
import { RegisterUser , LogOutUser , LoginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router() 

router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.post("/logout", verifyJWT, LogOutUser);



export default router


