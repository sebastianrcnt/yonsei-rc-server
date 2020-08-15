import DB from "../database/database";
import { PassportStatic } from "passport";
import config from "config";
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	StrategyOptions
} from "passport-jwt";

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.get("jwtKey")
};

const strategy = new JwtStrategy(opts, async (payload: any, done: any) => {
	try {
		const user = await DB.readUser(parseInt(payload.sub));
		if (user) return done(null, user);
		else return done(null, false);
	} catch (error) {
		return done(error, false);
	}
});

export default (passport: PassportStatic) => passport.use(strategy);
