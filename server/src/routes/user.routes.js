import { Router } from "express";
import { RegisterUser , LogOutUser , getCurrentUser, LoginUser , getUrlHistory , ChangeCurrentPassword ,UpdateAccountDetails} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router() 
import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(
    upload.single("profile"),
    RegisterUser
);

router.route("/login").post(LoginUser)
router.route("/logout").post(verifyJWT , LogOutUser)

router.route("/change-password").post(verifyJWT, ChangeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, UpdateAccountDetails)
router.route("get-urlHistory").patch(verifyJWT,getUrlHistory )





export default router


