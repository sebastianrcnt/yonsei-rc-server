import express from "express";
import cors from "cors";
import users from "./routes/users";
import programs from "./routes/programs";
import morgan from "morgan";
import passport from "passport";
import passportConfig from "./auth/passport";
passportConfig(passport);

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", users);
app.use("/api/programs", programs);

app.get("/", (req, res) => {
	res.send("Root");
});

export default app;
