import request from "supertest";
import app from "../src/app";
import { connect, disconnect } from "../src/utils/connection";
import config from "config";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Market API", () => {
    let reportId: string;
    beforeAll(async () => {
    const mongodb = await MongoMemoryServer.create();   
    const uri = mongodb.getUri();
    await connect(uri);
  });

  it("should create a report", async () => {
    const res = await request(app).post("/reports").send({
      userID: "user-1",
      marketID: "market-1",
      marketName: "market name",
      cmdtyID: "cmdty-1",
      cmdtyName: "cmdty name",
      marketType: "mandi",
      price: 1600,
      priceUnit: "PACK",
      convFctr: 2,
    });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
    reportId = res.body.reportID;
  });

  it("should say hello", async () => {
    const res = await request(app)
      .get("/hello")
      .set("accept", "application/json")
      .send();
    expect(res.text).toBe("Hello There!");
  });
  
  it("should fectch a report", async () => {
      const res = await request(app).get(`/reports?reportID=${reportId}`);
      //priceSaved = 1600(price) / 2(convFctr) 
      expect(res.body.price).toBe(800);
      expect(res.body.priceUnit).toBe("KG");
  });

  it("should update the price", async () => {
      let res = await request(app).post('/reports').send({
        userID: "user-2",
        marketID: "market-1",
        marketName: "market name",
        cmdtyID: "cmdty-1",
        cmdtyName: "cmdty name",
        marketType: "mandi",
        price: 1000,
        priceUnit: "PACK",
        convFctr: 5,
      });
      //priceSaved = (previousPrice(800) + currentPrice(200))/2
      res = await request(app)
        .get(`/reports?reportID=${reportId}`);
      expect(res.body.price).toBe(500);
      expect(res.body.users).toStrictEqual(["user-1","user-2"]);
  }) 
});
