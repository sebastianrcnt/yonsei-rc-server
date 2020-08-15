import jwt from "jsonwebtoken";
import config from "config";

const key: string = config.get("jwtKey");

console.log("jwtKey is ", key);

export default function issueJWT(id: number) {
	const expiresIn = "1d";

	const payload = {
		sub: id,
		iat: Date.now()
	};

	const signedToken = jwt.sign(payload, key, {
		expiresIn: expiresIn
	});

	return {
		token: `Bearer ${signedToken}`,
		expires: expiresIn
	};
}
