import { DocumentDefinition } from "mongoose";
import ReportModel, { ReportDocument } from "../models/reportModel";

export const createReport = async(input: DocumentDefinition<ReportDocument>) => {
    try {
        //try to fetch the report with market-ID and cmdty-ID
        const fReport = await ReportModel.findOne<ReportDocument>({
            marketID: input.marketID,
            cmdtyID: input.cmdtyID
        });
        //if Report does not exist create new report
        if(!fReport) {
            let report = await ReportModel.create(input);
            return report;
        }
        /* 
        change the price by taking mean
         */
        fReport.price = (fReport.price + input.price) / 2;
        if(fReport.users.indexOf(input.users[0]) == -1) {
            fReport.users.push(input.users[0]);
        }
        fReport.save();
        return fReport;
    } catch(err) {
        throw err;
    }
}

export const getReport = async (reportID: string) => {
    try {
        const report = await ReportModel.findOne({
            _id: reportID
        });
        if(!report) {
            return;
        } 
        return report;
    } catch(err) {
        throw err;
    }
}