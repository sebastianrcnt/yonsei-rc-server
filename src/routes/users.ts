import { Router } from "express";
import DB from "../database/database";
import issueJWT from "../auth/issueJWT";
const router = Router();

router.get("/", async (req, res) => {
	res.send(await DB.readUsers());
});

router.get("/:id", async (req, res) => {
	try {
		const result = await DB.readUser(parseInt(req.params.id));
		result ? res.send(result) : res.sendStatus(404);
	} catch (error) {
		res.status(500).send("Database Error");
	}
});

router.post("/", async (req, res) => {
	try {
		const newUser = req.body;
		const result = await DB.readUserByStudentID(newUser.student_id);
		if (result) return res.status(400).send("Already exists");
		const newID = await DB.createUser(req.body);
		console.log("new ID: ", newID);
		const jwt = issueJWT(newID);
		res.json({
			success: true,
			user: newUser,
			token: jwt
		});
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

export default router;
