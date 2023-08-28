import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";
import usersControllers from "../usersControllers/index.js";
const { JWT_KEY } = process.env;

const DB_HOST = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

const app = express();
app.use(express.json());
app.post("/api/users/signin", usersControllers.signin);

const user = {
  email: "example@gmail.com",
  password: "123456",
};

describe("test signin function", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen();
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test response status", async () => {
    const res = await request(app).post("/api/users/signin").send(user);
    expect(res.status).toBe(200);
  });

  test("test responce body includes token", async () => {
    const res = await request(app).post("/api/users/signin").send(user);
    expect(res.body).toHaveProperty("token");

    const { token } = res.body;
    expect(typeof token).toBe("string");
    expect(() => jwt.verify(token, JWT_KEY).not.toThrow(Error));
  });

  test("test responce body includes user", async () => {
    const res = await request(app).post("/api/users/signin").send(user);
    expect(res.body).toHaveProperty("user");

    const { user: dbUser } = res.body;
    expect(dbUser).toHaveProperty("email");
    expect(dbUser).toHaveProperty("subscription");

    const { email, subscription } = dbUser;
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });
});
