import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
	"/",
	passport.authenticate("jwt", {
		successRedirect: "/",
		failureRedirect: "/login"
	})
);

export default router;
