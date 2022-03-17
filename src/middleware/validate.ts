import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export default (schema: AnyZodObject) => (req: Request, res: Response, nextFunction: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        nextFunction();
    } catch(err) {
        return res.status(400).send(err);
    }
}