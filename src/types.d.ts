import UserModel from "./database/models/user";

declare global {
	namespace Express {
		export interface User extends UserModel {}
	}
}
