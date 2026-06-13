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

router.route("/change-password").post(VerifyJWT, ChangeCurrentPassword)
router.route("/current-user").get(VerifyJWT, getCurrentUser)
router.route("/update-account").patch(VerifyJWT, UpdateAccountDetails)
router.route("get-urlHistory").patch(VerifyJWT,getUrlHistory )





export default router


