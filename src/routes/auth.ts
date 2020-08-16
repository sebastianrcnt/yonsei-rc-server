import { Router } from "express";
import DB from "../database/database";
import issueJWT from "../auth/issueJWT";

export interface authResponse {
	success: boolean;
	user: any;
	token: string;
	expires: string;
}

const router = Router();

router.post("/", async (req, res) => {
	const user = await DB.readUserByStudentID(req.body.student_id);
	if (!user) res.status(400).send("Invalid Username or Password");

	if (req.body.password === user.password) {
		const jwt = issueJWT(user);
		res.json({
			success: true,
			user: user,
			token: jwt.token,
			expires: jwt.expires
		} as authResponse);
	} else {
		res.status(400).send("Invalid Username or Password");
	}
});

export default router;
