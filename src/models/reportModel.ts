import mongoose from "mongoose";

export enum MarketType {
  mandi,
  market,
}

export interface ReportDocument extends mongoose.Document {
  users: string[];
  marketID: string;
  marketName: string;
  cmdtyID: string;
  cmdtyName: string;
  marketType: MarketType;
  priceUnit: String;
  timestamp: String;
  price: number;
}

const reportSchema = new mongoose.Schema({
  users: { type: [String], required: true },
  marketID: { type: String, required: true },
  marketName: { type: String, required: true },
  cmdtyID: { type: String, required: true },
  cmdtyName: { type: String, required: true },
  marketType: {
    type: String,
    enum: ["mandi", "market"],
    required: true,
  },
  price: { type: Number, required: true },
  priceUnit: {
      type: String,
      enum: ["KG", "PACK", "Quintal"],
      required: true
  },
  timestamp: {
      type: String,
      required: true
  }
});


const ReportModel = mongoose.model("report", reportSchema);

export default ReportModel;
