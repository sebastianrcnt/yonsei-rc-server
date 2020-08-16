import jwt from "jsonwebtoken";
import config from "config";
import User from "../database/models/user";

const key: string = config.get("jwtKey");

export default function issueJWT(user: User) {
	const expiresIn = "1d";

	const payload = {
		sub: user.user_id,
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
