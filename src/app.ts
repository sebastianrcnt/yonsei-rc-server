import express from "express";
import cors from "cors";
import users from "./routes/users";
import programs from "./routes/programs";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/programs", programs);

app.get("/", (req, res) => {
	res.send("Root");
});

export default app;
