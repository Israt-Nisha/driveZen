import express from "express";
import { authContorller } from "./auth.contorller";


const router = express.Router();

router.post("/signup", authContorller.signUpUser);
router.post("/signin", authContorller.loginUser);

export const authRoutes = router;