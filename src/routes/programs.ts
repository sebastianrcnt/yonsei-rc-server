import { Router } from "express";
import DB from "../database/database";
import Program, { validateProgram } from "../database/program";

const router = Router();

router.get("/", async (req, res) => {
	const result: Program[] = await DB.readPrograms();
	res.send(result);
});

router.get("/:id", async (req, res) => {
	try {
		const result = await DB.readProgram(parseInt(req.params.id));
		result ? res.send(result) : res.sendStatus(404);
	} catch (error) {
		res.status(500).send("Database Error");
	}
});

router.post("/", async (req, res) => {
	try {
		const result = validateProgram(req.body);
		if (result.errors) return res.status(400).send(result.errors);
		res.send(await DB.createProgram(req.body));
	} catch (error) {
		console.error(error);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const result = validateProgram(req.body);
		if (result.errors) return res.status(400).send(result.errors);
		res.send(await DB.updateProgram(parseInt(req.params.id), req.body));
	} catch (error) {
		console.error(error);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await DB.deleteProgram(parseInt(req.params.id));
		res.sendStatus(204);
	} catch (error) {
		console.error(error);
	}
});

export default router;
