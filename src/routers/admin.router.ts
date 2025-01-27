import { Router } from "express";

const router = Router();

import { getMe } from "../controllers/user";
import { register, login } from "../controllers/auth";
import { checkAuth } from "../middleware/check-auth.middleware";

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/me", checkAuth, getMe)



export default router;
