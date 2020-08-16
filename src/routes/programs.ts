import { Router } from "express";
import DB from "../database/database";
import Program, { validateProgram } from "../database/models/program";

const router = Router();

router.get("/", async (req, res) => {
	const result: Program[] = await DB.readPrograms();
	res.send(result);
});

router.get("/:id", async (req, res) => {
	const result = await DB.readProgram(parseInt(req.params.id));
	result ? res.send(result) : res.sendStatus(404);
});

router.post("/", async (req, res) => {
	const result = validateProgram(req.body);
	if (result.errors) return res.status(400).send(result.errors);
	res.send(await DB.createProgram(req.body));
});

router.put("/:id", async (req, res) => {
	const result = validateProgram(req.body);
	if (result.errors) return res.status(400).send(result.errors);
	res.send(await DB.updateProgram(parseInt(req.params.id), req.body));
});

router.delete("/:id", async (req, res) => {
	await DB.deleteProgram(parseInt(req.params.id));
	res.sendStatus(204);
});

export default router;
