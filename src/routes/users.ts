import { Router } from "express";
import DB from "../database/database";
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

export default router;
