import { Request, Response } from "express";
import { date } from "zod";
import { CreateReportSchema, GetReportsQuerySchema } from "../schemas/report.schema";
import { createReport, getReport } from "../services/report.service";

export const createReportHandler = async (req: Request<{}, {}, CreateReportSchema["body"]>, res: Response) => {
    const body = {
        ...req.body,
        users: [req.body.userID],
        price: (req.body.price / req.body.convFctr),
        priceUnit: "KG",
        timestamp: Date.now().toString()
    }
    try {
        let { _id } = await createReport(body)
        return res.status(201).send({
            reportID: _id,
            status: "success"
        });
    } catch(err) {
        console.log(err);
        return res.status(409).send(err);
    }
}

export const getReportHandler = async (req: Request<{}, {}, {}, GetReportsQuerySchema>, res: Response) => {
    const reportID = req.query.reportID;
    try {
        const report = await getReport(reportID);
        if(!report) {
            return res.status(400).send("404 not found!");
        }
        return res.send(report);
    } catch(err) {
        console.log(err);
        return res.status(409).send(err);
    }
}