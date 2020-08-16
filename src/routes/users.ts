import { Router } from "express";
import DB from "../database/database";
import issueJWT from "../auth/issueJWT";
const router = Router();

router.get("/", async (req, res) => {
	res.send(await DB.readUsers());
});

router.get("/:id", async (req, res) => {
	const result = await DB.readUser(parseInt(req.params.id));
	result ? res.send(result) : res.sendStatus(404);
});

router.post("/", async (req, res) => {
	const newUser = req.body;
	const result = await DB.readUserByStudentID(newUser.student_id);
	if (result)
		return res
			.status(400)
			.json({ success: false, message: "user already exists" });

	const createdUser = await DB.createUser(req.body);

	const jwt = issueJWT(createdUser);
	res.json({
		success: true,
		user: createdUser,
		token: jwt.token,
		expires: jwt.expires
	});
});

export default router;
