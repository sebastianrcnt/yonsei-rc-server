import Joi from "joi";

export default interface Program {
	program_id?: number;
	name: string;
	description: string;
}

const programSchema = {
	name: Joi.string().max(45).required(),
	description: Joi.string().max(255).required()
};

export const validateProgram = (p: Program) =>
	Joi.object(programSchema).validate(p);
