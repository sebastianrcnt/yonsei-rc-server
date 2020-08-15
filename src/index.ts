import http from "http";
import app from "./app";

const PORT = process.env.PORT || "3900";
app.set("port", PORT);

const server = http.createServer(app);

server.listen(PORT);

server.on("error", (err) => {
	console.log("ERROR: ", err);
});

server.on("listening", () => {
	console.log(`Listening on Port ${PORT}...`);
});
