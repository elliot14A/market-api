import { TypeOf, z } from "zod";
import { MarketType } from "../models/reportModel";

export const createReportSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "userID is required",
    }),
    marketID: z.string({
      required_error: "marketID is required",
    }),
    marketName: z.string({
      required_error: "marketName is required",
    }),
    cmdtyID: z.string({
        required_error: "comdtyID is required"
    }),
    cmdtyName: z.string({
        required_error: "comdtyName is required"
    }),
    marketType: z.nativeEnum(MarketType, {
        required_error: "marketType is required"
    }),
    convFctr : z.number({
        required_error: "convFact is required"
    }),
    priceUnit : z.enum(["KG","PACK","Quintal"],),
    price: z.number({required_error: "price is required"})
  }),
});

export const getReportsQuerySchema = z.object({
    reportID : z.string({
        required_error: "reportID is required"
    })
});

export type CreateReportSchema = Omit<TypeOf<typeof createReportSchema>, "body.priceUnit">;
export type GetReportsQuerySchema = TypeOf<typeof getReportsQuerySchema>;