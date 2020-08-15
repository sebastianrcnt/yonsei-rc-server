import Joi from "joi";

export default interface User {
	user_id?: number;
	student_id: string;
	password: string;
	first_name: string;
	last_name: string;
	role_id: number;
}

const userSchema = {
	student_id: Joi.string().max(10).required(),
	password: Joi.string().max(45).required(),
	first_name: Joi.string().max(45).required(),
	last_name: Joi.string().max(45).required(),
	role_id: Joi.number().required()
};

export const validateUser = (u: User) => Joi.object(userSchema).validate(u);
