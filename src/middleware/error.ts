import { Request, Response, RequestHandler } from "express";

export default (
	err: any,
	req: Request,
	res: Response,
	next: RequestHandler
) => {
	res.status(500).send("Unexpected Server Error :(");
};
