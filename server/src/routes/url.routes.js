
import { Router } from "express";
const router = Router() 

import { CreateShortUrl , redirectUrl } from "../controllers/url.controller.js";
import { getUrlHistory } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/shorten").post(verifyJWT ,CreateShortUrl)
router.route("/history").get(verifyJWT,getUrlHistory)
router.route("/:shortCode").get(redirectUrl)

export default router


