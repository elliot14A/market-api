import express, {Request, Response} from "express";
import { createReportHandler, getReportHandler } from "./controllers/report.controller";

const app = express();
app.use(express.json());
app.get("/hello", (_: Request, res: Response) => {
    return res.status(200).send("Hello There!");
});
app.post('/reports', createReportHandler);
app.get('/reports', getReportHandler);
export default app;