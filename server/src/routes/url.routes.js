
import { Router } from "express";

const router = Router() 

router.route("/geturl").post(RegisterUser)
router.route("/updateurl").post(LoginUser)
router.route("/logout").post(LogOutUser)

export default router


