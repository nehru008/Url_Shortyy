import { Router } from "express";
import { RegisterUser , LogOutUser , LoginUser } from "../controllers/user.controller.js";

const router = Router() 

router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.route("/logout").post(LogOutUser)



export default router


