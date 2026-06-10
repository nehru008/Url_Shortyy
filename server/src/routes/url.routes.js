
import { Router } from "express";
const router = Router() 

import { CreateShortUrl } from "../controllers/url.controller.js";
import { getUrlHistory } from "../controllers/user.controller.js";

router.route("/shorten").post(CreateShortUrl)
router.route("/history").get(getUrlHistory)

export default router


