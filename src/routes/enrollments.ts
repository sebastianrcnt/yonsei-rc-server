import passport from "passport";
import { Router } from "express";
import DB from "../database/database";
import User from "../database/models/user";
const router = Router();
//protected route for RC, RA

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", (req: any, res) => {
	console.log(req.user);
	DB.connection.query(
		req.user.role_id === 1
			? `
        SELECT *
				FROM view_enrollments
				WHERE client_id = ${req.user.user_id}
		`
			: `
        SELECT *
				FROM view_enrollments
		`,
		(err, data) => {
			if (err) throw new Error("server error");
			res.json({ success: true, data: data });
		}
	);
});

router.post("/", (req: any, res) => {
	DB.connection.query(
		`
		INSERT INTO enrollments
		VALUES (
			${req.user?.user_id},
			${req.body.program_id},
			NOW(),
			1
		) 
	`,
		(err, data) => {
			if (err) throw new Error("server error");
			res.json({ success: true });
		}
	);
});

router.patch("/", (req, res) => {
	DB.connection.query(
		`
		UPDATE enrollments
		SET status_id = ${req.body.status_id}
		WHERE program_id=${req.body.program_id} AND client_id=${req.body.client_id}
		`,
		(err, data) => {
			if (err) throw new Error("server error");
			res.json({ success: true });
		}
	);
});

router.delete("/:id", (req: any, res) => {
	DB.connection.query(
		`
		DELETE FROM enrollments
		WHERE program_id=${req.params.id} AND client_id=${req.user?.user_id}
		`,
		(err, data) => {
			if (err) throw new Error("server error");
			res.json({ success: true });
		}
	);
});

export default router;
