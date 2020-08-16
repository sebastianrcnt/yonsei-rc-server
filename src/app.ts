import express from "express";
import cors from "cors";
import morgan from "morgan";
import error from "./middleware/error";
import passport from "passport";
import passportConfig from "./auth/passport";
passportConfig(passport);

import auth from "./routes/auth";
import users from "./routes/users";
import programs from "./routes/programs";
import enrollments from "./routes/enrollments";

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/programs", programs);
app.use("/api/enrollments", enrollments);

app.get(
	"/api/protected",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		console.log(req.user);
		res.send("you are logged in");
	}
);

app.use(error);

export default app;
